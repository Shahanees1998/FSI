/**
 * MongoDB + Prisma: documents without `deletedAt` are not matched by `{ deletedAt: null }` alone.
 * Use this OR filter for active (non-deleted) records.
 */
export function notDeletedOr() {
  return [{ deletedAt: null }, { deletedAt: { isSet: false } }] as const;
}
