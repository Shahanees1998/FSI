"use client";

import ContractingDocumentsPageFrame from "@/components/contracts/ContractingDocumentsPageFrame";
import MyContractsCarrierTable from "@/components/contracts/MyContractsCarrierTable";

type MyContractsViewProps = {
    fundServDisplay: string | null;
};

export default function MyContractsView({ fundServDisplay }: MyContractsViewProps) {
    return (
        <ContractingDocumentsPageFrame
            active="contracting"
            headerAsideText={`Your FundServ code is: ${fundServDisplay ?? "—"}`}
            headerAsideClassName="text-red-600"
        >
            <h2 className="text-2xl font-bold text-900 m-0 mb-3">Contracting</h2>
            <MyContractsCarrierTable />
        </ContractingDocumentsPageFrame>
    );
}
