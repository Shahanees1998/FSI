import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import {
  buildPagedResult,
  getSearchValue,
  normalizeSearchTerm,
  parsePagination,
  SearchParamRecord,
} from "@/lib/portalPagination";

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

  const where: Prisma.ClientProfileWhereInput = {
    agentId,
    deletedAt: null,
    ...(stateFilter ? { state: stateFilter } : {}),
    ...(cityFilter ? { city: { contains: cityFilter } } : {}),
    ...(q
      ? {
          OR: [
            { firstName: buildContainsFilter(q) },
            { lastName: buildContainsFilter(q) },
            { preferredFirstName: buildContainsFilter(q) },
            { email: buildContainsFilter(q) },
            { phone: buildContainsFilter(q) },
            { city: buildContainsFilter(q) },
          ],
        }
      : {}),
  };

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
      ...(options?.includeDeleted ? {} : { deletedAt: null }),
    },
  });
}
