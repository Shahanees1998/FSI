import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import {
  buildPagedResult,
  getSearchValue,
  normalizeSearchTerm,
  parsePagination,
  SearchParamRecord,
} from "@/lib/portalPagination";
import {
  buildSummaryLabel,
  computePolicySubmissionProgress,
  parseFormDataJson,
  PolicySubmissionFormData,
} from "@/lib/policySubmissionForm";

type QueryParams = URLSearchParams | SearchParamRecord;

function notDeleted(): Prisma.PolicySubmissionWhereInput {
  return {
    OR: [{ deletedAt: null }, { deletedAt: { isSet: false } }],
  };
}

function progressBucketWhere(bucket: string | undefined): Prisma.PolicySubmissionWhereInput | undefined {
  if (!bucket) return undefined;
  if (bucket === "low") return { progressPercent: { lte: 33 } };
  if (bucket === "mid") return { progressPercent: { gte: 34, lte: 66 } };
  if (bucket === "high") return { progressPercent: { gte: 67 } };
  return undefined;
}

export async function listPolicySubmissionsForAgent(agentId: string, queryParams: QueryParams) {
  const pagination = parsePagination(queryParams, { defaultPageSize: 15 });
  const q = normalizeSearchTerm(getSearchValue(queryParams, "q"));
  const statusFilter = normalizeSearchTerm(getSearchValue(queryParams, "status"));
  const progressBucket = normalizeSearchTerm(getSearchValue(queryParams, "progress"));

  const progressWhere = progressBucketWhere(progressBucket);

  const where: Prisma.PolicySubmissionWhereInput = {
    agentId,
    ...notDeleted(),
    ...(statusFilter === "DRAFT" || statusFilter === "SUBMITTED" ? { status: statusFilter } : {}),
    ...(progressWhere ?? {}),
    ...(q
      ? {
          summaryLabel: { contains: q },
        }
      : {}),
  };

  const [total, data] = await Promise.all([
    prisma.policySubmission.count({ where }),
    prisma.policySubmission.findMany({
      where,
      orderBy: { updatedAt: "desc" },
      skip: pagination.skip,
      take: pagination.pageSize,
    }),
  ]);

  return buildPagedResult(data, total, pagination);
}

export async function getPolicySubmissionForAgent(agentId: string, id: string, options?: { includeDeleted?: boolean }) {
  return prisma.policySubmission.findFirst({
    where: {
      id,
      agentId,
      ...(options?.includeDeleted ? {} : notDeleted()),
    },
  });
}

export function mergeFormDataProgress(formData: PolicySubmissionFormData): {
  progressPercent: number;
  summaryLabel: string;
  formDataJson: Prisma.InputJsonValue;
} {
  return {
    progressPercent: computePolicySubmissionProgress(formData),
    summaryLabel: buildSummaryLabel(formData),
    formDataJson: formData as unknown as Prisma.InputJsonValue,
  };
}

function deepMergeForm(
  base: PolicySubmissionFormData,
  patch: Partial<PolicySubmissionFormData>
): PolicySubmissionFormData {
  return {
    applicant: { ...base.applicant, ...(patch.applicant ?? {}) },
    company: { ...base.company, ...(patch.company ?? {}) },
    client: { ...base.client, ...(patch.client ?? {}) },
    documents: { ...base.documents, ...(patch.documents ?? {}) },
  };
}

/** Use when PATCH may send a partial `formData` to merge with stored JSON. */
export function mergeStoredAndIncomingFormData(
  stored: unknown,
  incoming: unknown
): PolicySubmissionFormData {
  const prev = parseFormDataJson(stored);
  const next = parseFormDataJson(incoming);
  return deepMergeForm(prev, next);
}

export { computePolicySubmissionProgress, parseFormDataJson };
