import PortalContentView from "@/components/portal/PortalContentView";
import { getPortalContentBySlug } from "@/lib/portalContentData";
import { ReactNode } from "react";
import { redirect } from "next/navigation";

function shouldRedirectToExternal(content: { externalUrl?: string | null; body?: string | null; videoId?: string | null; pdfUrl?: string | null }) {
  return Boolean(
    content.externalUrl?.trim() && !content.body?.trim() && !content.videoId?.trim() && !content.pdfUrl?.trim()
  );
}

export async function renderRecruitingCmsPage(
  slug: string,
  title: string,
  fallback?: ReactNode,
  defaultExternalUrl?: string
) {
  const content = await getPortalContentBySlug(`recruiting/${slug}`);
  if (content && shouldRedirectToExternal(content)) {
    redirect(content.externalUrl!.trim());
  }
  if (content) {
    return <PortalContentView content={content} backHref="/agent/team/recruiting" backLabel="Recruiting" />;
  }
  if (defaultExternalUrl) {
    redirect(defaultExternalUrl);
  }
  if (fallback) return fallback;
  return (
    <div className="surface-card border-round border-1 surface-border p-4">
      <p className="text-600 text-sm m-0 mb-2">Team / Recruiting</p>
      <h1 className="mt-0 mb-2">{title}</h1>
      <p className="text-600 m-0">Recruiting content for this page has not been published yet.</p>
    </div>
  );
}

export async function renderNewAgentCmsPage(slug: string, title: string, fallback?: ReactNode) {
  const content = await getPortalContentBySlug(`new-agents/${slug}`);
  if (content) {
    return <PortalContentView content={content} backHref="/agent/new-agents" backLabel="New Agents" />;
  }
  if (fallback) return fallback;
  return (
    <div className="surface-card border-round border-1 surface-border p-4">
      <p className="text-600 text-sm m-0 mb-2">New Agents</p>
      <h1 className="mt-0 mb-2">{title}</h1>
      <p className="text-600 m-0">Onboarding content for this section is being published.</p>
    </div>
  );
}
