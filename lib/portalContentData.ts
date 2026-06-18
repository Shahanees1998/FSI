import { PortalContent, PortalContentCategory, Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import {
  buildPagedResult,
  getSearchValue,
  normalizeSearchTerm,
  parsePagination,
  SearchParamRecord,
} from "@/lib/portalPagination";

type QueryParams = URLSearchParams | SearchParamRecord;

export async function getPortalContentBySlug(slug: string) {
  return prisma.portalContent.findFirst({
    where: { slug, published: true },
  });
}

export async function listPortalContents(queryParams: QueryParams) {
  const pagination = parsePagination(queryParams, { defaultPageSize: 20 });
  const q = normalizeSearchTerm(getSearchValue(queryParams, "q"));
  const category = normalizeSearchTerm(getSearchValue(queryParams, "category")) as
    | PortalContentCategory
    | undefined;

  const where: Prisma.PortalContentWhereInput = {
    ...(category ? { category } : {}),
    ...(q
      ? {
          OR: [
            { slug: { contains: q } },
            { title: { contains: q } },
            { body: { contains: q } },
          ],
        }
      : {}),
  };

  const [total, data] = await Promise.all([
    prisma.portalContent.count({ where }),
    prisma.portalContent.findMany({
      where,
      orderBy: [{ sortOrder: "asc" }, { updatedAt: "desc" }],
      skip: pagination.skip,
      take: pagination.pageSize,
    }),
  ]);

  return buildPagedResult(data, total, pagination);
}

export async function listActivePopups() {
  const oneYearAgo = new Date();
  oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

  return prisma.portalContent.findMany({
    where: {
      category: "POPUP",
      published: true,
      publishedAt: { gte: oneYearAgo },
      OR: [{ expiresAt: null }, { expiresAt: { gte: new Date() } }],
    },
    orderBy: { publishedAt: "desc" },
  });
}

export async function getPortalContentById(id: string) {
  return prisma.portalContent.findUnique({ where: { id } });
}

export type PortalContentInput = {
  slug: string;
  category: PortalContentCategory;
  title: string;
  body?: string | null;
  videoId?: string | null;
  pdfUrl?: string | null;
  externalUrl?: string | null;
  metadata?: Record<string, unknown>;
  published?: boolean;
  publishedAt?: string | Date | null;
  expiresAt?: string | Date | null;
  sortOrder?: number;
};

function parseOptionalDate(value: string | Date | null | undefined) {
  if (!value) return null;
  const date = value instanceof Date ? value : new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

export async function createPortalContent(input: PortalContentInput, createdById?: string) {
  return prisma.portalContent.create({
    data: {
      slug: input.slug.trim(),
      category: input.category,
      title: input.title.trim(),
      body: input.body?.trim() || null,
      videoId: input.videoId?.trim() || null,
      pdfUrl: input.pdfUrl?.trim() || null,
      externalUrl: input.externalUrl?.trim() || null,
      metadata: (input.metadata ?? {}) as Prisma.InputJsonValue,
      published: input.published ?? true,
      publishedAt: parseOptionalDate(input.publishedAt) ?? new Date(),
      expiresAt: parseOptionalDate(input.expiresAt),
      sortOrder: input.sortOrder ?? 0,
      createdById: createdById ?? null,
    },
  });
}

export async function updatePortalContent(id: string, input: Partial<PortalContentInput>) {
  return prisma.portalContent.update({
    where: { id },
    data: {
      ...(input.slug !== undefined ? { slug: input.slug.trim() } : {}),
      ...(input.category !== undefined ? { category: input.category } : {}),
      ...(input.title !== undefined ? { title: input.title.trim() } : {}),
      ...(input.body !== undefined ? { body: input.body?.trim() || null } : {}),
      ...(input.videoId !== undefined ? { videoId: input.videoId?.trim() || null } : {}),
      ...(input.pdfUrl !== undefined ? { pdfUrl: input.pdfUrl?.trim() || null } : {}),
      ...(input.externalUrl !== undefined ? { externalUrl: input.externalUrl?.trim() || null } : {}),
      ...(input.metadata !== undefined ? { metadata: input.metadata as Prisma.InputJsonValue } : {}),
      ...(input.published !== undefined ? { published: input.published } : {}),
      ...(input.publishedAt !== undefined ? { publishedAt: parseOptionalDate(input.publishedAt) } : {}),
      ...(input.expiresAt !== undefined ? { expiresAt: parseOptionalDate(input.expiresAt) } : {}),
      ...(input.sortOrder !== undefined ? { sortOrder: input.sortOrder } : {}),
    },
  });
}

export async function deletePortalContent(id: string) {
  return prisma.portalContent.delete({ where: { id } });
}

export function portalContentToPopupRow(content: PortalContent) {
  const metadata = content.metadata as Record<string, string> | null;
  return {
    id: content.id,
    category: metadata?.popupCategory || "Announcement",
    title: content.title,
    text: content.body || "",
    date: content.publishedAt ? content.publishedAt.toLocaleDateString() : "",
  };
}
