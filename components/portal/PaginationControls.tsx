"use client";

import Link from "next/link";
import { PaginationMeta, SearchParamRecord, withUpdatedSearchParams } from "@/lib/portalPagination";

interface PaginationControlsProps {
  pathname: string;
  searchParams: SearchParamRecord;
  pagination: PaginationMeta;
}

export default function PaginationControls({
  pathname,
  searchParams,
  pagination,
}: PaginationControlsProps) {
  if (pagination.total <= pagination.pageSize) {
    return null;
  }

  return (
    <div className="flex flex-wrap justify-content-between align-items-center gap-3 mt-4">
      <div className="text-600 text-sm">
        Page {pagination.page} of {pagination.totalPages} ({pagination.total} total records)
      </div>
      <div className="flex gap-2">
        <Link
          className={`p-button p-component p-button-outlined ${
            !pagination.hasPreviousPage ? "p-disabled pointer-events-none opacity-50" : ""
          }`}
          href={withUpdatedSearchParams(pathname, searchParams, {
            page: pagination.page - 1,
          })}
        >
          Previous
        </Link>
        <Link
          className={`p-button p-component ${
            !pagination.hasNextPage ? "p-disabled pointer-events-none opacity-50" : ""
          }`}
          href={withUpdatedSearchParams(pathname, searchParams, {
            page: pagination.page + 1,
          })}
        >
          Next
        </Link>
      </div>
    </div>
  );
}
