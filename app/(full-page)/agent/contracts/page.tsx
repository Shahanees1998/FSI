import PortalHubView from "@/components/portal/PortalHubView";
import {
  attachCounts,
} from "@/lib/hubConfigs";
import { WorkspaceRecordType } from "@prisma/client";
import { getWorkspaceRecordCountsForAgent, getWorkspaceRecordTotalForAgent } from "@/lib/workspaceHubData";
import { requireCurrentUser } from "@/lib/serverAuth";

const CONTRACTS_SECTIONS = [
  { href: "/agent/contracts/pre-contracting-documents", title: "Pre-contracting documents", description: "Files needed before carrier applications.", icon: "pi pi-file" },
  { href: "/agent/contracts/my-contracts", title: "My contracts", description: "Carrier contracting status and requests.", icon: "pi pi-book" },
  { href: "/agent/contracts/team-contracts", title: "Team contracts", description: "Team member carrier contracts.", icon: "pi pi-users" },
  { href: "/agent/contracts/corporate", title: "Corporate", description: "Corporate contracting documents.", icon: "pi pi-building" },
];

const CONTRACTS_TYPES: WorkspaceRecordType[] = [
  "PRE_CONTRACTING_DOCUMENT", "CARRIER_CONTRACT", "TEAM_CONTRACT", "CORPORATE_DOCUMENT",
];

const CONTRACTS_TYPE_BY_HREF: Record<string, WorkspaceRecordType> = {
  "/agent/contracts/pre-contracting-documents": "PRE_CONTRACTING_DOCUMENT",
  "/agent/contracts/my-contracts": "CARRIER_CONTRACT",
  "/agent/contracts/team-contracts": "TEAM_CONTRACT",
  "/agent/contracts/corporate": "CORPORATE_DOCUMENT",
};

export default async function AgentContractsPage() {
  const user = await requireCurrentUser("AGENT");
  const counts = await getWorkspaceRecordCountsForAgent(user.id, CONTRACTS_TYPES);
  const total = await getWorkspaceRecordTotalForAgent(user.id, CONTRACTS_TYPES);

  return (
    <PortalHubView
      title="Contracts"
      description="Manage pre-contracting files, carrier appointments, team visibility, and corporate paperwork."
      totalRecords={total}
      sections={attachCounts(CONTRACTS_SECTIONS, counts, CONTRACTS_TYPE_BY_HREF)}
      helpLinks={[
        { href: "/agent/learn/about-experior/getting-started/contracting-faq", label: "Contracting FAQ" },
        { href: "/agent/learn/departments/contracting", label: "Learn → Contracting" },
      ]}
    />
  );
}
