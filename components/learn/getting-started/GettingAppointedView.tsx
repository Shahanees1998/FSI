import Link from "next/link";

const contractSteps = (
    <>
        In the back office, open{" "}
        <Link href="/agent/contracts/my-contracts" className="text-orange-600 font-semibold no-underline hover:underline">
            Contracts
        </Link>
        , then <strong>My Contracts</strong>, and complete the application on the following screen.
    </>
);

export default function GettingAppointedView() {
    return (
        <div className="surface-card border-round border-1 surface-border overflow-hidden">
            <div className="p-4 md:p-5 lg:p-6">
                <h1 className="text-2xl md:text-3xl font-bold text-900 m-0 mb-4">Getting Appointed/Contracted</h1>

                <div
                    className="border-round-xl p-4 md:p-5 mb-4 text-center"
                    style={{
                        background: "linear-gradient(115deg, #ca8a04 0%, #eab308 45%, #fde047 100%)",
                        boxShadow: "0 8px 24px rgba(202, 138, 4, 0.28)",
                    }}
                >
                    <p
                        className="m-0 text-white font-bold line-height-3"
                        style={{
                            fontSize: "clamp(1.2rem, 3.5vw, 1.85rem)",
                            letterSpacing: "0.1em",
                        }}
                    >
                        GETTING APPOINTED
                    </p>
                </div>

                <p className="text-orange-600 font-bold text-lg md:text-xl m-0 mb-3 line-height-3">
                    CONGRATULATIONS, YOU ARE ALMOST AT THE FINISH LINE! At Experior we have many different product providers you can
                    offer to serve your clients. The steps below help you get appointed with four of our primary partners to get you
                    started.
                </p>

                <p className="text-700 line-height-3 m-0 mb-4">
                    Please complete the <strong>Foresters</strong>, <strong>AIG (Corebridge)</strong>, <strong>F&amp;G</strong>, and{" "}
                    <strong>Protective</strong> applications through your back office under{" "}
                    <Link href="/agent/contracts/my-contracts" className="text-blue-600 font-medium no-underline hover:underline">
                        My Contracts
                    </Link>
                    .
                </p>

                <div className="overflow-x-auto border-1 surface-border border-round-lg">
                    <table className="w-full border-collapse text-sm" style={{ minWidth: "520px" }}>
                        <thead>
                            <tr className="surface-100">
                                <th className="text-left border-1 surface-border p-3 md:p-4" style={{ width: "38%" }}>
                                    Company
                                </th>
                                <th className="text-left border-1 surface-border p-3 md:p-4">Contract</th>
                            </tr>
                        </thead>
                        <tbody className="text-700">
                            <tr className="align-top">
                                <td className="border-1 surface-border p-3 md:p-4">
                                    <div className="font-bold text-900 text-lg mb-2">F&amp;G</div>
                                    <div className="text-600 text-xs mb-2">Annuities &amp; Life</div>
                                    <p className="text-red-600 text-xs font-semibold m-0 line-height-3">
                                        * First piece of business must be submitted within 30 days to complete the contract.
                                    </p>
                                </td>
                                <td className="border-1 surface-border p-3 md:p-4">
                                    <p className="text-orange-600 font-medium line-height-3 m-0">
                                        Go to{" "}
                                        <Link href="/agent/contracts/my-contracts" className="text-orange-700 no-underline hover:underline">
                                            Contracts → My Contracts
                                        </Link>{" "}
                                        and complete the F&amp;G contract. Specify every state where you want appointment.
                                    </p>
                                </td>
                            </tr>
                            <tr className="align-top">
                                <td className="border-1 surface-border p-3 md:p-4">
                                    <div className="font-bold text-900 text-lg mb-1">Foresters Financial</div>
                                    <div className="text-600 text-xs">Primary partner</div>
                                </td>
                                <td className="border-1 surface-border p-3 md:p-4">
                                    <p className="text-orange-600 font-medium line-height-3 m-0">
                                        Under{" "}
                                        <Link href="/agent/contracts/my-contracts" className="text-orange-700 no-underline hover:underline">
                                            Contracts → My Contracts
                                        </Link>
                                        , complete the Foresters Financial contract and list each state where you need appointment.
                                    </p>
                                </td>
                            </tr>
                            <tr className="align-top">
                                <td className="border-1 surface-border p-3 md:p-4">
                                    <div className="font-bold text-900 text-lg mb-1">AIG</div>
                                    <div className="text-600 text-xs">Stand out with QOL · Corebridge</div>
                                </td>
                                <td className="border-1 surface-border p-3 md:p-4">
                                    <p className="text-orange-600 font-medium line-height-3 m-0">{contractSteps}</p>
                                </td>
                            </tr>
                            <tr className="align-top">
                                <td className="border-1 surface-border p-3 md:p-4">
                                    <div className="font-bold text-900 text-lg mb-1">Protective</div>
                                    <div className="text-600 text-xs">Primary partner</div>
                                </td>
                                <td className="border-1 surface-border p-3 md:p-4">
                                    <p className="text-orange-600 font-medium line-height-3 m-0">{contractSteps}</p>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
