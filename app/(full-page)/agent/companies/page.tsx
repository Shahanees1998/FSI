import AgentCompaniesDemoSection from "@/components/companies/AgentCompaniesDemoSection";
import CompaniesManager, { CompanyListItem } from "@/components/portal/CompaniesManager";
import { listCompanies } from "@/lib/portalData";
import { SearchParamRecord } from "@/lib/portalPagination";
import { requireCurrentUser } from "@/lib/serverAuth";

export default async function AgentCompaniesPage({
  searchParams = {},
}: {
  searchParams?: SearchParamRecord;
}) {
  await requireCurrentUser("AGENT");
  const result = await listCompanies(searchParams);
  const initialCompanies = JSON.parse(JSON.stringify(result.data)) as CompanyListItem[];

  return (
    <div className="flex flex-column gap-4">
      <CompaniesManager
        variant="agent"
        initialCompanies={initialCompanies}
        pathname="/agent/companies"
        searchParams={searchParams}
        pagination={result.pagination}
        filters={{
          q: typeof searchParams.q === "string" ? searchParams.q : undefined,
          state: typeof searchParams.state === "string" ? searchParams.state : undefined,
          country: typeof searchParams.country === "string" ? searchParams.country : undefined,
          department: typeof searchParams.department === "string" ? searchParams.department : undefined,
        }}
      />
      <AgentCompaniesDemoSection />
    </div>
  );
}
