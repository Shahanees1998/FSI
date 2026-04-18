import Link from "next/link";
import AgentCommissionsDemoSection from "@/components/commissions/AgentCommissionsDemoSection";
import PaginationControls from "@/components/portal/PaginationControls";
import { listCommissionsForUser } from "@/lib/portalData";
import { SearchParamRecord } from "@/lib/portalPagination";
import { requireCurrentUser } from "@/lib/serverAuth";

export default async function AgentCommissionsPage({
    searchParams = {},
}: {
    searchParams?: SearchParamRecord;
}) {
    const user = await requireCurrentUser("AGENT");
    const result = await listCommissionsForUser(
        { role: user.role, userId: user.id },
        searchParams
    );

    const total = result.totals.total;

    return (
        <div className="flex flex-column gap-4">
        <div className="surface-card border-round border-1 surface-border p-4">
            <div className="flex justify-content-between align-items-start mb-4">
                <div>
                    <h1 className="mt-0 mb-2">Commission Tracker</h1>
                    <p className="text-600 m-0">Monitor statement history and commission totals by carrier.</p>
                </div>
                <form className="flex flex-column lg:flex-row gap-2" action="/agent/commissions">
                    <input
                        className="p-inputtext p-component"
                        name="q"
                        placeholder="Search client, policy, carrier..."
                        defaultValue={typeof searchParams.q === "string" ? searchParams.q : ""}
                    />
                    <select
                        className="p-inputtext p-component"
                        name="status"
                        defaultValue={typeof searchParams.status === "string" ? searchParams.status : ""}
                    >
                        <option value="">All statuses</option>
                        <option value="PENDING">Pending</option>
                        <option value="APPROVED">Approved</option>
                        <option value="PAID">Paid</option>
                        <option value="REJECTED">Rejected</option>
                    </select>
                    <button className="p-button p-component" type="submit">
                        Apply
                    </button>
                </form>
                <div className="text-right">
                    <div className="text-600 text-sm">Lifetime total</div>
                    <div className="text-2xl font-semibold">${total.toFixed(2)}</div>
                </div>
            </div>
            <div className="grid">
                {result.data.map((commission) => (
                    <div key={commission.id} className="col-12">
                        <div className="border-1 surface-border border-round p-3">
                            <div className="flex justify-content-between gap-3">
                                <div>
                                    <div className="font-semibold">{commission.clientName}</div>
                                    <div className="text-600 text-sm mt-1">
                                        {commission.carrierProfile.carrierName} | {commission.productLine}
                                    </div>
                                    <div className="text-600 text-sm mt-1">
                                        Policy {commission.policyNumber} | {commission.status}
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="font-semibold">${commission.amount.toFixed(2)}</div>
                                    <div className="text-600 text-sm">
                                        {new Date(commission.statementMonth).toLocaleDateString()}
                                    </div>
                                    <div className="mt-2">
                                        <Link href={`/agent/commissions/${commission.id}`}>View details</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {result.data.length === 0 && <p className="text-600 mb-0">No commission records found.</p>}
            <PaginationControls pathname="/agent/commissions" searchParams={searchParams} pagination={result.pagination} />
        </div>
        <AgentCommissionsDemoSection />
        </div>
    );
}
