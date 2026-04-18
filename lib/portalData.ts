import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { publishInboxUpdate } from "@/lib/realtime";
import {
  buildPagedResult,
  getSearchValue,
  normalizeSearchTerm,
  parseBooleanParam,
  parsePagination,
  SearchParamRecord,
} from "@/lib/portalPagination";

type QueryParams = URLSearchParams | SearchParamRecord;

export interface PortalAuthContext {
  userId: string;
  role: string;
}

function buildContainsFilter(query: string | undefined) {
  if (!query) {
    return undefined;
  }

  return { contains: query };
}

export async function listUsersByRole(
  role: "AGENT" | "CARRIER",
  queryParams: QueryParams
) {
  const pagination = parsePagination(queryParams, { defaultPageSize: 10 });
  const query = normalizeSearchTerm(getSearchValue(queryParams, "q"));
  const status = normalizeSearchTerm(getSearchValue(queryParams, "status"));

  const where: Prisma.UserWhereInput = {
    role,
    isDeleted: false,
    ...(status ? { status: status as Prisma.EnumUserStatusFilter["equals"] } : {}),
    ...(query
      ? {
          OR: [
            { firstName: buildContainsFilter(query) },
            { lastName: buildContainsFilter(query) },
            { email: buildContainsFilter(query) },
            { phone: buildContainsFilter(query) },
            { jobTitle: buildContainsFilter(query) },
            role === "AGENT"
              ? {
                  agentProfile: {
                    is: {
                      OR: [
                        { agentCode: buildContainsFilter(query) },
                        { licenseNumber: buildContainsFilter(query) },
                        {
                          company: {
                            is: {
                              name: buildContainsFilter(query),
                            },
                          },
                        },
                      ],
                    },
                  },
                }
              : {
                  carrierProfile: {
                    is: {
                      OR: [
                        { carrierCode: buildContainsFilter(query) },
                        { carrierName: buildContainsFilter(query) },
                        { contactEmail: buildContainsFilter(query) },
                      ],
                    },
                  },
                },
          ],
        }
      : {}),
  };

  const include =
    role === "AGENT"
      ? ({ agentProfile: { include: { company: true } } } satisfies Prisma.UserInclude)
      : ({ carrierProfile: true } satisfies Prisma.UserInclude);

  const [total, data] = await Promise.all([
    prisma.user.count({ where }),
    prisma.user.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: pagination.skip,
      take: pagination.pageSize,
      include,
    }),
  ]);

  return buildPagedResult(data, total, pagination);
}

export async function getUserDirectoryDetail(
  role: "AGENT" | "CARRIER",
  id: string
) {
  return prisma.user.findFirst({
    where: {
      id,
      role,
      isDeleted: false,
    },
    include: {
      agentProfile:
        role === "AGENT"
          ? {
              include: {
                company: true,
              },
            }
          : false,
      carrierProfile: role === "CARRIER",
      requestedTickets: {
        take: 5,
        orderBy: { updatedAt: "desc" },
      },
      assignedTickets: {
        take: 5,
        orderBy: { updatedAt: "desc" },
      },
      notifications: {
        take: 5,
        orderBy: { createdAt: "desc" },
      },
      conversationsCreated: {
        take: 5,
        orderBy: { updatedAt: "desc" },
      },
    },
  });
}

export async function listTicketsForUser(
  auth: PortalAuthContext,
  queryParams: QueryParams
) {
  const pagination = parsePagination(queryParams, { defaultPageSize: 10 });
  const query = normalizeSearchTerm(getSearchValue(queryParams, "q"));
  const status = normalizeSearchTerm(getSearchValue(queryParams, "status"));
  const priority = normalizeSearchTerm(getSearchValue(queryParams, "priority"));
  const category = normalizeSearchTerm(getSearchValue(queryParams, "category"));

  const where: Prisma.TicketWhereInput = {
    ...(auth.role === "ADMIN"
      ? {}
      : {
          OR: [{ requesterId: auth.userId }, { assignedToId: auth.userId }],
        }),
    ...(status ? { status: status as Prisma.EnumTicketStatusFilter["equals"] } : {}),
    ...(priority ? { priority: priority as Prisma.EnumPriorityFilter["equals"] } : {}),
    ...(category ? { category: category as Prisma.EnumTicketCategoryFilter["equals"] } : {}),
    ...(query
      ? {
          OR: [
            { subject: buildContainsFilter(query) },
            { description: buildContainsFilter(query) },
            { requester: { is: { firstName: buildContainsFilter(query) } } },
            { requester: { is: { lastName: buildContainsFilter(query) } } },
            { requester: { is: { email: buildContainsFilter(query) } } },
          ],
        }
      : {}),
  };

  const [total, data] = await Promise.all([
    prisma.ticket.count({ where }),
    prisma.ticket.findMany({
      where,
      orderBy: { updatedAt: "desc" },
      skip: pagination.skip,
      take: pagination.pageSize,
      include: {
        requester: { select: { firstName: true, lastName: true, email: true } },
        assignedTo: { select: { firstName: true, lastName: true, email: true } },
        messages: {
          take: 1,
          orderBy: { createdAt: "desc" },
          include: {
            author: { select: { firstName: true, lastName: true, role: true } },
          },
        },
      },
    }),
  ]);

  return buildPagedResult(data, total, pagination);
}

export async function getTicketDetailForUser(
  auth: PortalAuthContext,
  id: string
) {
  const ticket = await prisma.ticket.findUnique({
    where: { id },
    include: {
      requester: { select: { id: true, firstName: true, lastName: true, email: true } },
      assignedTo: { select: { id: true, firstName: true, lastName: true, email: true } },
      messages: {
        orderBy: { createdAt: "asc" },
        include: {
          author: { select: { id: true, firstName: true, lastName: true, role: true } },
        },
      },
    },
  });

  if (!ticket) {
    return null;
  }

  const canView =
    auth.role === "ADMIN" ||
    ticket.requesterId === auth.userId ||
    ticket.assignedToId === auth.userId;

  return canView ? ticket : null;
}

export async function listCommissionsForUser(
  auth: PortalAuthContext,
  queryParams: QueryParams
) {
  const pagination = parsePagination(queryParams, { defaultPageSize: 10 });
  const query = normalizeSearchTerm(getSearchValue(queryParams, "q"));
  const status = normalizeSearchTerm(getSearchValue(queryParams, "status"));

  let where: Prisma.CommissionRecordWhereInput = {};

  if (auth.role === "AGENT") {
    where.agentId = auth.userId;
  }

  if (auth.role === "CARRIER") {
    const carrierProfile = await prisma.carrierProfile.findUnique({
      where: { userId: auth.userId },
      select: { id: true },
    });
    where.carrierProfileId = carrierProfile?.id ?? "__none__";
  }

  if (status) {
    where.status = status as Prisma.EnumCommissionStatusFilter["equals"];
  }

  if (query) {
    where.OR = [
      { clientName: buildContainsFilter(query) },
      { policyNumber: buildContainsFilter(query) },
      { productLine: buildContainsFilter(query) },
      { agent: { is: { firstName: buildContainsFilter(query) } } },
      { agent: { is: { lastName: buildContainsFilter(query) } } },
      { carrierProfile: { is: { carrierName: buildContainsFilter(query) } } },
      { carrierProfile: { is: { carrierCode: buildContainsFilter(query) } } },
    ];
  }

  const [total, data, totalsSource] = await Promise.all([
    prisma.commissionRecord.count({ where }),
    prisma.commissionRecord.findMany({
      where,
      orderBy: { statementMonth: "desc" },
      skip: pagination.skip,
      take: pagination.pageSize,
      include: {
        agent: { select: { id: true, firstName: true, lastName: true, email: true } },
        carrierProfile: { select: { id: true, carrierName: true, carrierCode: true } },
      },
    }),
    prisma.commissionRecord.findMany({
      where,
      select: { amount: true, status: true },
    }),
  ]);

  const totals = totalsSource.reduce(
    (acc, item) => {
      acc.total += item.amount;
      acc[item.status] = (acc[item.status] ?? 0) + item.amount;
      return acc;
    },
    { total: 0 } as Record<string, number>
  );

  return {
    ...buildPagedResult(data, total, pagination),
    totals,
  };
}

export async function getCommissionDetailForUser(
  auth: PortalAuthContext,
  id: string
) {
  const commission = await prisma.commissionRecord.findUnique({
    where: { id },
    include: {
      agent: { select: { id: true, firstName: true, lastName: true, email: true } },
      carrierProfile: {
        select: {
          id: true,
          carrierName: true,
          carrierCode: true,
          contactEmail: true,
        },
      },
      updatedBy: { select: { id: true, firstName: true, lastName: true, email: true } },
    },
  });

  if (!commission) {
    return null;
  }

  if (auth.role === "ADMIN") {
    return commission;
  }

  if (auth.role === "AGENT" && commission.agentId === auth.userId) {
    return commission;
  }

  if (auth.role === "CARRIER") {
    const carrierProfile = await prisma.carrierProfile.findUnique({
      where: { userId: auth.userId },
      select: { id: true },
    });

    if (carrierProfile?.id === commission.carrierProfileId) {
      return commission;
    }
  }

  return null;
}

export async function listInsurerStats(queryParams: QueryParams) {
  const pagination = parsePagination(queryParams, { defaultPageSize: 10 });
  const query = normalizeSearchTerm(getSearchValue(queryParams, "q"));

  const where: Prisma.InsurerStatWhereInput = query
    ? {
        OR: [
          { notes: buildContainsFilter(query) },
          { carrierProfile: { is: { carrierName: buildContainsFilter(query) } } },
          { carrierProfile: { is: { carrierCode: buildContainsFilter(query) } } },
        ],
      }
    : {};

  const [total, data] = await Promise.all([
    prisma.insurerStat.count({ where }),
    prisma.insurerStat.findMany({
      where,
      orderBy: [{ metricMonth: "desc" }, { createdAt: "desc" }],
      skip: pagination.skip,
      take: pagination.pageSize,
      include: {
        carrierProfile: {
          select: {
            id: true,
            carrierName: true,
            carrierCode: true,
          },
        },
      },
    }),
  ]);

  return buildPagedResult(data, total, pagination);
}

export async function getInsurerStatDetail(id: string) {
  return prisma.insurerStat.findUnique({
    where: { id },
    include: {
      carrierProfile: true,
      updatedBy: { select: { firstName: true, lastName: true, email: true } },
    },
  });
}

const conversationListInclude = {
  participants: {
    include: {
      user: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          role: true,
          email: true,
          profileImage: true,
        },
      },
    },
  },
  messages: {
    take: 1,
    orderBy: { createdAt: "desc" },
    include: {
      sender: { select: { id: true, firstName: true, lastName: true, role: true } },
    },
  },
} satisfies Prisma.ConversationInclude;

export type ConversationListRow = Prisma.ConversationGetPayload<{
  include: typeof conversationListInclude;
}>;

function conversationTextSearchWhere(query: string): Prisma.ConversationWhereInput {
  return {
    OR: [
      { subject: { contains: query } },
      {
        participants: {
          some: {
            user: {
              OR: [
                { firstName: { contains: query } },
                { lastName: { contains: query } },
                { email: { contains: query } },
              ],
            },
          },
        },
      },
      {
        messages: {
          some: { body: { contains: query } },
        },
      },
    ],
  };
}

export async function getConversationListSnapshot(
  conversationId: string
): Promise<ConversationListRow | null> {
  return prisma.conversation.findUnique({
    where: { id: conversationId },
    include: conversationListInclude,
  });
}

export async function broadcastConversationInboxUpdate(conversationId: string) {
  const row = await getConversationListSnapshot(conversationId);
  if (!row) {
    return;
  }

  const serialized = JSON.parse(JSON.stringify(row)) as ConversationListRow;
  await Promise.all(
    row.participants.map((p) =>
      publishInboxUpdate(p.userId, { conversation: serialized })
    )
  );
}

export async function validateNewConversationParticipants(
  auth: PortalAuthContext,
  participantIds: string[]
): Promise<{ ok: true } | { ok: false; error: string }> {
  const unique = Array.from(new Set(participantIds)).filter((id) => id && id !== auth.userId);
  if (unique.length === 0) {
    return { ok: false, error: "Select at least one person to message." };
  }

  const users = await prisma.user.findMany({
    where: { id: { in: unique }, isDeleted: false },
    include: { agentProfile: true, carrierProfile: true },
  });

  if (users.length !== unique.length) {
    return { ok: false, error: "One or more participants are invalid." };
  }

  for (const target of users) {
    const allowed = await userCanMessageTarget(auth, target);
    if (!allowed) {
      return {
        ok: false,
        error: "You are not allowed to message one or more selected users.",
      };
    }
  }

  return { ok: true };
}

async function userCanMessageTarget(
  auth: PortalAuthContext,
  target: Prisma.UserGetPayload<{
    include: { agentProfile: true; carrierProfile: true };
  }>
): Promise<boolean> {
  if (auth.role === "ADMIN") {
    return true;
  }

  if (target.role === "ADMIN") {
    return true;
  }

  if (auth.role === "AGENT" && target.role === "CARRIER") {
    const agent = await prisma.agentProfile.findUnique({
      where: { userId: auth.userId },
    });
    return !!(
      target.carrierProfile &&
      agent?.preferredCarrierIds.includes(target.carrierProfile.id)
    );
  }

  if (auth.role === "CARRIER" && target.role === "AGENT") {
    const carrier = await prisma.carrierProfile.findUnique({
      where: { userId: auth.userId },
    });
    return !!(
      carrier &&
      target.agentProfile?.preferredCarrierIds.includes(carrier.id)
    );
  }

  return false;
}

export async function listEligibleConversationPartners(
  auth: PortalAuthContext,
  queryParams: QueryParams
) {
  const pagination = parsePagination(queryParams, {
    defaultPageSize: 25,
    maxPageSize: 100,
  });
  const query = normalizeSearchTerm(getSearchValue(queryParams, "q"));

  const statusFilter: Prisma.UserWhereInput = {
    isDeleted: false,
    id: { not: auth.userId },
    status: { in: ["ACTIVE", "INVITED"] },
  };

  const nameSearch = (q: string): Prisma.UserWhereInput => ({
    OR: [
      { firstName: { contains: q } },
      { lastName: { contains: q } },
      { email: { contains: q } },
      { jobTitle: { contains: q } },
    ],
  });

  let scopeParts: Prisma.UserWhereInput[] = [];

  if (auth.role === "ADMIN") {
    scopeParts = [];
  } else if (auth.role === "AGENT") {
    const agent = await prisma.agentProfile.findUnique({
      where: { userId: auth.userId },
    });
    const carrierIds = agent?.preferredCarrierIds ?? [];
    scopeParts = [
      {
        OR: [
          { role: "ADMIN" },
          {
            role: "CARRIER",
            carrierProfile: { is: { id: { in: carrierIds } } },
          },
        ],
      },
    ];
  } else if (auth.role === "CARRIER") {
    const carrier = await prisma.carrierProfile.findUnique({
      where: { userId: auth.userId },
    });
    if (!carrier) {
      return buildPagedResult([], 0, pagination);
    }
    scopeParts = [
      {
        OR: [
          { role: "ADMIN" },
          {
            role: "AGENT",
            agentProfile: { is: { preferredCarrierIds: { has: carrier.id } } },
          },
        ],
      },
    ];
  }

  const where: Prisma.UserWhereInput = {
    AND: [...scopeParts, statusFilter, ...(query ? [nameSearch(query)] : [])],
  };

  const [total, data] = await Promise.all([
    prisma.user.count({ where }),
    prisma.user.findMany({
      where,
      orderBy: [{ role: "asc" }, { lastName: "asc" }, { firstName: "asc" }],
      skip: pagination.skip,
      take: pagination.pageSize,
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        role: true,
        profileImage: true,
        jobTitle: true,
        carrierProfile: { select: { carrierName: true, carrierCode: true } },
        agentProfile: { select: { agentCode: true } },
      },
    }),
  ]);

  return buildPagedResult(data, total, pagination);
}

export async function listConversationsForUser(
  auth: PortalAuthContext,
  queryParams: QueryParams
) {
  const pagination = parsePagination(queryParams, { defaultPageSize: 10 });
  const query = normalizeSearchTerm(getSearchValue(queryParams, "q"));

  const where: Prisma.ConversationWhereInput = {
    ...(auth.role === "ADMIN"
      ? {}
      : {
          participants: {
            some: { userId: auth.userId },
          },
        }),
    ...(query ? conversationTextSearchWhere(query) : {}),
  };

  const [total, data] = await Promise.all([
    prisma.conversation.count({ where }),
    prisma.conversation.findMany({
      where,
      orderBy: [{ lastMessageAt: "desc" }, { updatedAt: "desc" }],
      skip: pagination.skip,
      take: pagination.pageSize,
      include: conversationListInclude,
    }),
  ]);

  return buildPagedResult(data, total, pagination);
}

export async function getConversationDetailForUser(
  auth: PortalAuthContext,
  id: string,
  queryParams: QueryParams
) {
  const pagination = parsePagination(queryParams, { defaultPageSize: 20, maxPageSize: 100 });
  const conversation = await prisma.conversation.findUnique({
    where: { id },
    include: {
      participants: {
        include: {
          user: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              email: true,
              role: true,
              profileImage: true,
            },
          },
        },
      },
      createdBy: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
        },
      },
    },
  });

  if (!conversation) {
    return null;
  }

  const isParticipant = conversation.participants.some(
    (participant) => participant.userId === auth.userId
  );
  if (auth.role !== "ADMIN" && !isParticipant) {
    return null;
  }

  const messagesWhere: Prisma.ConversationMessageWhereInput = {
    conversationId: id,
  };

  const [total, messages] = await Promise.all([
    prisma.conversationMessage.count({ where: messagesWhere }),
    prisma.conversationMessage.findMany({
      where: messagesWhere,
      orderBy: { createdAt: "desc" },
      skip: pagination.skip,
      take: pagination.pageSize,
      include: {
        sender: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            role: true,
          },
        },
      },
    }),
  ]);

  return {
    conversation,
    messages: messages.reverse(),
    pagination: buildPagedResult([], total, pagination).pagination,
  };
}

export async function listNotificationsForUser(
  auth: PortalAuthContext,
  queryParams: QueryParams
) {
  const pagination = parsePagination(queryParams, { defaultPageSize: 10, maxPageSize: 50 });
  const unreadOnly = parseBooleanParam(getSearchValue(queryParams, "unreadOnly"));
  const query = normalizeSearchTerm(getSearchValue(queryParams, "q"));

  const where: Prisma.NotificationWhereInput = {
    userId: auth.userId,
    ...(typeof unreadOnly === "boolean" ? { isRead: !unreadOnly ? undefined : false } : {}),
    ...(query
      ? {
          OR: [
            { title: buildContainsFilter(query) },
            { message: buildContainsFilter(query) },
          ],
        }
      : {}),
  };

  if (where.isRead === undefined) {
    delete where.isRead;
  }

  const [total, unreadCount, data] = await Promise.all([
    prisma.notification.count({ where }),
    prisma.notification.count({
      where: { userId: auth.userId, isRead: false },
    }),
    prisma.notification.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: pagination.skip,
      take: pagination.pageSize,
    }),
  ]);

  return {
    ...buildPagedResult(data, total, pagination),
    unreadCount,
  };
}

export async function createNotificationAndBroadcast(input: {
  userId: string;
  title: string;
  message: string;
  type?: Prisma.NotificationUncheckedCreateInput["type"];
  link?: string | null;
}) {
  const notification = await prisma.notification.create({
    data: {
      userId: input.userId,
      title: input.title,
      message: input.message,
      type: input.type ?? "SYSTEM",
      link: input.link ?? null,
    },
  });

  return notification;
}

export async function listCompanies(queryParams: QueryParams) {
  const pagination = parsePagination(queryParams, { defaultPageSize: 10 });
  const query = normalizeSearchTerm(getSearchValue(queryParams, "q"));
  const stateFilter = normalizeSearchTerm(getSearchValue(queryParams, "state"));
  const countryFilter = normalizeSearchTerm(getSearchValue(queryParams, "country"));
  const departmentFilter = normalizeSearchTerm(getSearchValue(queryParams, "department"));

  const where: Prisma.CompanyWhereInput = {
    deletedAt: null,
    ...(stateFilter ? { state: stateFilter } : {}),
    ...(countryFilter ? { country: { contains: countryFilter } } : {}),
    ...(departmentFilter ? { department: { contains: departmentFilter } } : {}),
    ...(query
      ? {
          OR: [
            { name: buildContainsFilter(query) },
            { location: buildContainsFilter(query) },
            { department: buildContainsFilter(query) },
            { city: buildContainsFilter(query) },
            { country: buildContainsFilter(query) },
          ],
        }
      : {}),
  };

  const [total, data] = await Promise.all([
    prisma.company.count({ where }),
    prisma.company.findMany({
      where,
      orderBy: { name: "asc" },
      skip: pagination.skip,
      take: pagination.pageSize,
      include: {
        _count: { select: { agents: true } },
      },
    }),
  ]);

  return buildPagedResult(data, total, pagination);
}

export async function getCompanyById(id: string, options?: { allowDeleted?: boolean }) {
  return prisma.company.findFirst({
    where: {
      id,
      ...(options?.allowDeleted ? {} : { deletedAt: null }),
    },
    include: {
      _count: { select: { agents: true } },
    },
  });
}

/** For agent forms and filters; excludes soft-deleted companies. */
export async function listActiveCompanies(limit = 200) {
  return prisma.company.findMany({
    where: { deletedAt: null },
    orderBy: { name: "asc" },
    take: limit,
    select: {
      id: true,
      name: true,
      location: true,
      department: true,
    },
  });
}
