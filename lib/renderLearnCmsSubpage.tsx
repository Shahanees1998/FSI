import LearnCmsSubpageView from "@/components/learn/LearnCmsSubpageView";
import PortalContentView from "@/components/portal/PortalContentView";
import { getPortalContentBySlug } from "@/lib/portalContentData";
import { ReactNode } from "react";

export async function renderLearnCmsSubpage({
  slug,
  title,
  backHref,
  backLabel,
  fallback,
}: {
  slug: string;
  title: string;
  backHref?: string;
  backLabel?: string;
  fallback?: ReactNode;
}) {
  const content = await getPortalContentBySlug(slug);
  if (content) {
    return <PortalContentView content={content} backHref={backHref} backLabel={backLabel} />;
  }
  if (fallback) return fallback;
  return <LearnCmsSubpageView slug={slug} title={title} backHref={backHref} backLabel={backLabel} />;
}

/** Alias for pages with rich static UI that CMS can override. */
export const renderLearnPageWithCms = renderLearnCmsSubpage;
