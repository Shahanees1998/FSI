import CompaniesManager, { CompanyListItem } from "@/components/portal/CompaniesManager";
import { listCompanies } from "@/lib/portalData";
import { SearchParamRecord } from "@/lib/portalPagination";
import { requireCurrentUser } from "@/lib/serverAuth";

export default async function AdminCompaniesPage({
  searchParams = {},
}: {
  searchParams?: SearchParamRecord;
}) {
  await requireCurrentUser("ADMIN");
  const result = await listCompanies(searchParams);
  const initialCompanies = JSON.parse(JSON.stringify(result.data)) as CompanyListItem[];

  return (
    <CompaniesManager
      initialCompanies={initialCompanies}
      pathname="/admin/companies"
      searchParams={searchParams}
      pagination={result.pagination}
      filters={{
        q: typeof searchParams.q === "string" ? searchParams.q : undefined,
        state: typeof searchParams.state === "string" ? searchParams.state : undefined,
        country: typeof searchParams.country === "string" ? searchParams.country : undefined,
        department: typeof searchParams.department === "string" ? searchParams.department : undefined,
      }}
    />
  );
}
