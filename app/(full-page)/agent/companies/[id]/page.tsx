import { notFound } from "next/navigation";
import CompanyDetailForm, { CompanyDetail } from "@/components/portal/CompanyDetailForm";
import { getCompanyById } from "@/lib/portalData";
import { requireCurrentUser } from "@/lib/serverAuth";

export default async function AgentCompanyDetailPage({
  params,
}: {
  params: { id: string };
}) {
  await requireCurrentUser("AGENT");
  const raw = await getCompanyById(params.id);
  if (!raw) {
    notFound();
  }

  const company = JSON.parse(JSON.stringify(raw)) as CompanyDetail;

  return <CompanyDetailForm company={company} variant="agent" />;
}
