import Link from "next/link";
import { portalContentDefaultBody } from "@/lib/portalContentSeeds";

export default function LearnCmsSubpageView({
  slug,
  title,
  backHref,
  backLabel,
}: {
  slug: string;
  title: string;
  backHref?: string;
  backLabel?: string;
}) {
  const body = portalContentDefaultBody(title, slug);
  const showTicketLink = slug.includes("compliance-violation-incident-report");
  const showNbtLink = slug.includes("new-pending-business");

  return (
    <div className="surface-card border-round border-1 surface-border overflow-hidden">
      <div className="p-4 md:p-5 lg:p-6" style={{ maxWidth: "52rem" }}>
        {backHref ? (
          <p className="m-0 mb-2">
            <Link href={backHref} className="text-blue-600 font-medium no-underline hover:underline text-sm">
              ← {backLabel || "Back"}
            </Link>
          </p>
        ) : null}
        <h1 className="text-2xl md:text-3xl font-bold text-900 m-0 mb-3">{title}</h1>
        <p className="text-700 line-height-3 m-0">{body}</p>
        {showTicketLink ? (
          <p className="mt-3 mb-0">
            <Link href="/agent/tickets" className="text-primary font-medium no-underline hover:underline">
              Open Support Tickets →
            </Link>
          </p>
        ) : null}
        {showNbtLink ? (
          <p className="mt-3 mb-0">
            <Link href="/agent/my-business/new-business-transmittals" className="text-primary font-medium no-underline hover:underline">
              New business transmittals →
            </Link>
          </p>
        ) : null}
      </div>
    </div>
  );
}
