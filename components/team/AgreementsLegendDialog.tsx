"use client";

import { Dialog } from "primereact/dialog";

type Props = {
    visible: boolean;
    onHide: () => void;
};

export default function AgreementsLegendDialog({ visible, onHide }: Props) {
    const header = (
        <div className="flex align-items-center gap-2">
            <span
                className="inline-flex align-items-center justify-content-center border-1 surface-border border-round text-600 text-sm font-semibold flex-shrink-0"
                style={{ width: "1.75rem", height: "1.75rem" }}
                aria-hidden
            >
                ?
            </span>
            <span className="text-900 font-medium text-lg">Agreements&apos; Legend</span>
        </div>
    );

    return (
        <Dialog
            header={header}
            visible={visible}
            onHide={onHide}
            modal
            dismissableMask
            blockScroll
            className="agreements-legend-dialog"
            style={{ width: "95vw", maxWidth: "36rem" }}
        >
            <div className="flex flex-column gap-4 text-sm text-700 line-height-3">
                <section>
                    <h2 className="text-base font-semibold text-800 m-0 mb-2">Agent Markers</h2>
                    <ul className="m-0 pl-0 list-none flex flex-column gap-2">
                        <li className="flex align-items-start gap-2">
                            <span
                                className="flex-shrink-0 border-round-sm mt-1"
                                style={{ width: "0.85rem", height: "0.85rem", background: "#fce7f3", border: "1px solid #fbcfe8" }}
                                aria-hidden
                            />
                            <span>
                                - E&amp;O, license, residence license or banking information has not been updated in agent profile.
                            </span>
                        </li>
                        <li className="flex align-items-start gap-2">
                            <span
                                className="flex-shrink-0 border-round-sm mt-1"
                                style={{ width: "0.85rem", height: "0.85rem", background: "#dcfce7", border: "1px solid #bbf7d0" }}
                                aria-hidden
                            />
                            <span>- The agent has all their documents up-to-date.</span>
                        </li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-base font-semibold text-800 m-0 mb-2">Send AOA Link Markers</h2>
                    <ul className="m-0 pl-0 list-none flex flex-column gap-2">
                        <li className="flex align-items-start gap-2">
                            <i className="pi pi-send text-red-500 mt-1 flex-shrink-0" aria-hidden />
                            <span>- A request to update the agent&apos;s AOA was sent more than two days ago.</span>
                        </li>
                        <li className="flex align-items-start gap-2">
                            <i className="pi pi-send text-green-600 mt-1 flex-shrink-0" aria-hidden />
                            <span>- A request to update the agent&apos;s AOA was sent less than two days ago.</span>
                        </li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-base font-semibold text-800 m-0 mb-2">Documents</h2>
                    <p className="m-0 mb-2">
                        <span className="font-bold text-800">Licensed</span>
                        {" "}
                        - includes Active Agents and Free Agents who have License or Marks in Approved Status and Active / Awaiting Payment
                        Subscription with no more than 5 Subscription Debts.
                    </p>
                    <p className="m-0">
                        <span className="font-bold text-800">Unlicensed</span>
                        {" "}
                        - includes Active Agents and Free Agents who don&apos;t have any valid License or Marks or have an Active / Awaiting
                        Payment Subscription with more than 5 Subscription Debts.
                    </p>
                </section>

                <section>
                    <h2 className="text-base font-semibold text-800 m-0 mb-2">Document Markers</h2>
                    <ul className="m-0 pl-0 list-none flex flex-column gap-2">
                        <li className="flex align-items-start gap-2">
                            <span
                                className="flex-shrink-0 border-circle mt-1"
                                style={{ width: "0.75rem", height: "0.75rem", background: "#facc15", border: "1px solid #eab308" }}
                                aria-hidden
                            />
                            <span>- Agent&apos;s residence license is declined.</span>
                        </li>
                        <li className="flex align-items-start gap-2">
                            <span
                                className="flex-shrink-0 border-circle mt-1"
                                style={{ width: "0.75rem", height: "0.75rem", background: "#d4a574", border: "1px solid #16a34a" }}
                                aria-hidden
                            />
                            <span>- Agent&apos;s document is approved.</span>
                        </li>
                        <li className="flex align-items-start gap-2">
                            <span
                                className="flex-shrink-0 border-circle mt-1"
                                style={{ width: "0.75rem", height: "0.75rem", background: "#ef4444", border: "1px solid #dc2626" }}
                                aria-hidden
                            />
                            <span>- Agent&apos;s document is declined.</span>
                        </li>
                    </ul>
                </section>
            </div>
        </Dialog>
    );
}
