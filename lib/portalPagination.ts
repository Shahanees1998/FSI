type SearchParamValue = string | string[] | undefined;

export interface PaginationInput {
  page: number;
  pageSize: number;
  skip: number;
}

export interface PaginationMeta {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

export interface PagedResult<T> {
  data: T[];
  pagination: PaginationMeta;
}

export type SearchParamRecord = Record<string, SearchParamValue>;

function getSingleValue(value: SearchParamValue): string | undefined {
  if (Array.isArray(value)) {
    return value[0];
  }

  return value;
}

export function getSearchValue(
  searchParams: URLSearchParams | SearchParamRecord,
  key: string
): string | undefined {
  if (searchParams instanceof URLSearchParams) {
    return searchParams.get(key) ?? undefined;
  }

  return getSingleValue(searchParams[key]);
}

export function parsePositiveInteger(
  value: string | undefined,
  fallback: number,
  max?: number
): number {
  const parsed = Number.parseInt(String(value ?? ""), 10);
  if (!Number.isFinite(parsed) || parsed < 1) {
    return fallback;
  }

  return typeof max === "number" ? Math.min(parsed, max) : parsed;
}

export function parsePagination(
  searchParams: URLSearchParams | SearchParamRecord,
  options?: { defaultPage?: number; defaultPageSize?: number; maxPageSize?: number }
): PaginationInput {
  const page = parsePositiveInteger(
    getSearchValue(searchParams, "page"),
    options?.defaultPage ?? 1
  );
  const pageSize = parsePositiveInteger(
    getSearchValue(searchParams, "pageSize"),
    options?.defaultPageSize ?? 10,
    options?.maxPageSize ?? 50
  );

  return {
    page,
    pageSize,
    skip: (page - 1) * pageSize,
  };
}

export function buildPaginationMeta(
  total: number,
  page: number,
  pageSize: number
): PaginationMeta {
  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  return {
    page,
    pageSize,
    total,
    totalPages,
    hasPreviousPage: page > 1,
    hasNextPage: page < totalPages,
  };
}

export function buildPagedResult<T>(
  data: T[],
  total: number,
  pagination: PaginationInput
): PagedResult<T> {
  return {
    data,
    pagination: buildPaginationMeta(total, pagination.page, pagination.pageSize),
  };
}

export function normalizeSearchTerm(value: string | undefined) {
  return value?.trim() || undefined;
}

export function parseBooleanParam(value: string | undefined): boolean | undefined {
  if (value === undefined) {
    return undefined;
  }

  if (value === "true") {
    return true;
  }

  if (value === "false") {
    return false;
  }

  return undefined;
}

export function withUpdatedSearchParams(
  pathname: string,
  currentParams: SearchParamRecord,
  updates: Record<string, string | number | undefined>
) {
  const url = new URL(pathname, "http://localhost");

  Object.entries(currentParams).forEach(([key, value]) => {
    const singleValue = getSingleValue(value);
    if (singleValue) {
      url.searchParams.set(key, singleValue);
    }
  });

  Object.entries(updates).forEach(([key, value]) => {
    if (value === undefined || value === "") {
      url.searchParams.delete(key);
      return;
    }

    url.searchParams.set(key, String(value));
  });

  return `${url.pathname}${url.search}`;
}
