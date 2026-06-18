import { WorkspaceRecordType } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import {
  buildPagedResult,
  getSearchValue,
  normalizeSearchTerm,
  parsePagination,
  SearchParamRecord,
} from "@/lib/portalPagination";
import { notDeletedOr } from "@/lib/softDelete";

type QueryParams = URLSearchParams | SearchParamRecord;

export async function listWorkspaceRecordsAdmin(queryParams: QueryParams) {
  const pagination = parsePagination(queryParams, { defaultPageSize: 20 });
  const q = normalizeSearchTerm(getSearchValue(queryParams, "q"));
  const recordType = normalizeSearchTerm(getSearchValue(queryParams, "recordType")) as
    | WorkspaceRecordType
    | undefined;
  const agentId = normalizeSearchTerm(getSearchValue(queryParams, "agentId"));

  const where = {
    OR: [...notDeletedOr()],
    ...(recordType ? { recordType } : {}),
    ...(agentId ? { agentId } : {}),
    ...(q
      ? {
          OR: [
            { clientName: { contains: q } },
            { policyNumber: { contains: q } },
            { associate: { contains: q } },
            { company: { contains: q } },
            { status: { contains: q } },
            { agent: { is: { email: { contains: q } } } },
            { agent: { is: { firstName: { contains: q } } } },
            { agent: { is: { lastName: { contains: q } } } },
          ],
        }
      : {}),
  };

  const [total, data] = await Promise.all([
    prisma.agentWorkspaceRecord.count({ where }),
    prisma.agentWorkspaceRecord.findMany({
      where,
      orderBy: { updatedAt: "desc" },
      skip: pagination.skip,
      take: pagination.pageSize,
      include: {
        agent: { select: { id: true, firstName: true, lastName: true, email: true } },
      },
    }),
  ]);

  return buildPagedResult(data, total, pagination);
}

export async function getWorkspaceRecordAdmin(id: string) {
  return prisma.agentWorkspaceRecord.findFirst({
    where: { id, OR: [...notDeletedOr()] },
    include: {
      agent: { select: { id: true, firstName: true, lastName: true, email: true } },
    },
  });
}

export async function updateWorkspaceRecordAdmin(
  id: string,
  input: {
    clientName?: string | null;
    policyNumber?: string | null;
    associate?: string | null;
    company?: string | null;
    status?: string | null;
    amount?: number | null;
    recordDate?: string | Date | null;
    paidDate?: string | Date | null;
  }
) {
  const existing = await getWorkspaceRecordAdmin(id);
  if (!existing) return null;

  const parseDate = (value: string | Date | null | undefined) => {
    if (!value) return null;
    const date = value instanceof Date ? value : new Date(value);
    return Number.isNaN(date.getTime()) ? null : date;
  };

  return prisma.agentWorkspaceRecord.update({
    where: { id },
    data: {
      ...(input.clientName !== undefined ? { clientName: input.clientName?.trim() || null } : {}),
      ...(input.policyNumber !== undefined ? { policyNumber: input.policyNumber?.trim() || null } : {}),
      ...(input.associate !== undefined ? { associate: input.associate?.trim() || null } : {}),
      ...(input.company !== undefined ? { company: input.company?.trim() || null } : {}),
      ...(input.status !== undefined ? { status: input.status?.trim() || null } : {}),
      ...(input.amount !== undefined ? { amount: typeof input.amount === "number" ? input.amount : null } : {}),
      ...(input.recordDate !== undefined ? { recordDate: parseDate(input.recordDate) } : {}),
      ...(input.paidDate !== undefined ? { paidDate: parseDate(input.paidDate) } : {}),
    },
  });
}

export async function deleteWorkspaceRecordAdmin(id: string) {
  const existing = await getWorkspaceRecordAdmin(id);
  if (!existing) return null;

  return prisma.agentWorkspaceRecord.update({
    where: { id },
    data: { deletedAt: new Date() },
  });
}
