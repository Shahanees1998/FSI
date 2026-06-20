import { Prisma } from "@prisma/client";
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

function buildContainsFilter(query: string | undefined) {
  if (!query) return undefined;
  return { contains: query };
}

export async function listClientProfilesForAgent(agentId: string, queryParams: QueryParams) {
  const pagination = parsePagination(queryParams, { defaultPageSize: 15 });
  const q = normalizeSearchTerm(getSearchValue(queryParams, "q"));
  const stateFilter = normalizeSearchTerm(getSearchValue(queryParams, "state"));
  const cityFilter = normalizeSearchTerm(getSearchValue(queryParams, "city"));

  const andFilters: Prisma.ClientProfileWhereInput[] = [
    { agentId },
    { OR: [...notDeletedOr()] },
  ];

  if (stateFilter) {
    andFilters.push({ state: stateFilter });
  }
  if (cityFilter) {
    andFilters.push({ city: { contains: cityFilter } });
  }
  if (q) {
    andFilters.push({
      OR: [
        { firstName: buildContainsFilter(q) },
        { lastName: buildContainsFilter(q) },
        { preferredFirstName: buildContainsFilter(q) },
        { email: buildContainsFilter(q) },
        { phone: buildContainsFilter(q) },
        { city: buildContainsFilter(q) },
      ],
    });
  }

  const where: Prisma.ClientProfileWhereInput = { AND: andFilters };

  const [total, data] = await Promise.all([
    prisma.clientProfile.count({ where }),
    prisma.clientProfile.findMany({
      where,
      orderBy: { updatedAt: "desc" },
      skip: pagination.skip,
      take: pagination.pageSize,
    }),
  ]);

  return buildPagedResult(data, total, pagination);
}

export async function getClientProfileForAgent(agentId: string, id: string, options?: { includeDeleted?: boolean }) {
  return prisma.clientProfile.findFirst({
    where: {
      id,
      agentId,
      ...(options?.includeDeleted ? {} : { OR: [...notDeletedOr()] }),
    },
  });
}
