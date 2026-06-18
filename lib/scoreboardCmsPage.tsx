import PortalContentView from "@/components/portal/PortalContentView";
import ScoreboardTrainingView from "@/components/scoreboard/ScoreboardTrainingView";
import SettledInvestmentsFaqView from "@/components/scoreboard/SettledInvestmentsFaqView";
import { getPortalContentBySlug } from "@/lib/portalContentData";
import { ReactNode } from "react";

export async function renderScoreboardCmsPage(slug: string, title: string, fallback?: ReactNode) {
  const content = await getPortalContentBySlug(`scoreboard/${slug}`);
  if (content) {
    return <PortalContentView content={content} backHref="/agent/scoreboard" backLabel="Scoreboard" />;
  }
  if (fallback) return fallback;
  return (
    <div className="surface-card border-round border-1 surface-border p-4">
      <p className="text-600 text-sm m-0 mb-2">Scoreboard</p>
      <h1 className="mt-0 mb-2">{title}</h1>
      <p className="text-600 m-0">Scoreboard content for this page has not been published yet.</p>
    </div>
  );
}

export async function renderScoreboardTrainingPage(investmentsPaidFilterVideoId: string | null) {
  return renderScoreboardCmsPage(
    "training",
    "Scoreboard Training",
    <ScoreboardTrainingView investmentsPaidFilterVideoId={investmentsPaidFilterVideoId} />
  );
}

export async function renderSettledInvestmentsFaqPage() {
  return renderScoreboardCmsPage(
    "settled-investments-faq",
    "Settled Investments FAQ",
    <SettledInvestmentsFaqView />
  );
}
