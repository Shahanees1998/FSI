"use client";

import { Dialog } from "primereact/dialog";

type Props = {
    visible: boolean;
    onHide: () => void;
};

export default function VisualNetworkLegendDialog({ visible, onHide }: Props) {
    const header = (
        <div className="flex align-items-center gap-2">
            <i className="pi pi-info-circle text-xl text-600" aria-hidden />
            <span className="text-900 font-medium text-lg">Visual Network Legend</span>
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
            style={{ width: "95vw", maxWidth: "32rem" }}
        >
            <div className="flex flex-column gap-3 text-sm text-700 line-height-3">
                <p className="m-0">
                    <span className="font-semibold text-800">Red node</span> — Upline / focus agent (root of the current view).
                </p>
                <p className="m-0">
                    <span className="font-semibold text-800">White with green border</span> — Downline agent in good standing for this
                    snapshot.
                </p>
                <p className="m-0">
                    <span className="font-semibold text-800">Link icon</span> — Opens relationship or profile details (where available).
                </p>
                <p className="m-0 text-600">
                    Colors may reflect recruiting status, document completeness, or filters applied above. Use <strong>Apply</strong> after
                    changing dropdowns to refresh the tree.
                </p>
            </div>
        </Dialog>
    );
}
