"use client";

import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";
import { classNames } from "primereact/utils";
import { useState } from "react";
import VisualNetworkLegendDialog from "@/components/team/VisualNetworkLegendDialog";

const ACCENT = "#ffb800";
const ACCENT_BORDER = "#e6a800";

const ORIENTATION_OPTS = [
    { label: "Horizontal", value: "horizontal" },
    { label: "Vertical", value: "vertical" },
];

const GEN_DEPTH_OPTS = [
    { label: "Personal", value: "personal" },
    { label: "Team", value: "team" },
];

const LEVEL_OPTS = [
    { label: "All Levels", value: "all" },
    { label: "Level 1", value: "1" },
    { label: "Level 2", value: "2" },
];

const ORDER_OPTS = [
    { label: "Oldest", value: "oldest" },
    { label: "Newest", value: "newest" },
];

type TreeNodeData = {
    id: string;
    name: string;
    variant: "root" | "child";
    hasChildren: boolean;
};

const DEMO_TREE: { root: TreeNodeData; child: TreeNodeData } = {
    root: { id: "1", name: "Jo Cleine Spinola", variant: "root", hasChildren: true },
    child: { id: "2", name: "Carlos Gomez", variant: "child", hasChildren: false },
};

function NetworkNode({ node, onToggleCircle }: { node: TreeNodeData; onToggleCircle?: () => void }) {
    const isRoot = node.variant === "root";

    return (
        <div
            className={classNames(
                "relative border-round-lg px-4 py-3 shadow-1 flex align-items-center gap-2 min-w-max",
                isRoot ? "text-white" : "bg-white text-900"
            )}
            style={
                isRoot
                    ? { background: "#dc2626", minWidth: "11rem" }
                    : { border: "2px solid #d4a574", minWidth: "11rem" }
            }
        >
            {node.hasChildren && (
                <span
                    className={classNames(
                        "flex-shrink-0 border-circle border-2 cursor-pointer",
                        isRoot ? "border-white" : "border-green-600"
                    )}
                    style={{ width: "0.65rem", height: "0.65rem", boxShadow: isRoot ? "0 0 0 1px rgba(255,255,255,0.5)" : "none" }}
                    title="Click to fold or unfold downlines"
                    role="button"
                    tabIndex={0}
                    aria-label="Toggle downlines"
                    onClick={(e) => {
                        e.stopPropagation();
                        onToggleCircle?.();
                    }}
                    onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            onToggleCircle?.();
                        }
                    }}
                />
            )}
            <button
                type="button"
                className={classNames(
                    "bg-transparent border-none p-0 m-0 text-left cursor-pointer font-semibold",
                    isRoot ? "text-white" : "text-900"
                )}
            >
                {node.name}
            </button>
            <i
                className={classNames("pi pi-link absolute text-sm", isRoot ? "text-white" : "text-500")}
                style={{ bottom: "0.35rem", right: "0.5rem" }}
                aria-hidden
            />
        </div>
    );
}

export default function VisualNetworkView() {
    const [orientation, setOrientation] = useState("horizontal");
    const [genDepth, setGenDepth] = useState("personal");
    const [level, setLevel] = useState("all");
    const [orderBy, setOrderBy] = useState("oldest");
    const [legendOpen, setLegendOpen] = useState(false);
    const [helpOpen, setHelpOpen] = useState(false);
    const [scale, setScale] = useState(1);
    const [treeExpanded, setTreeExpanded] = useState(true);

    const showChild = treeExpanded;

    return (
        <div className="visual-network-view flex flex-column gap-0 p-3 md:p-4 surface-ground">
            <VisualNetworkLegendDialog visible={legendOpen} onHide={() => setLegendOpen(false)} />

            <Dialog
                header="Visual Network Help"
                visible={helpOpen}
                onHide={() => setHelpOpen(false)}
                style={{ width: "min(420px, 95vw)" }}
                modal
                dismissableMask
                blockScroll
            >
                <p className="m-0 text-sm text-700 line-height-3">
                    Use the filters at the top and click <strong>APPLY</strong> to refresh the tree. Zoom with + and −, or use{" "}
                    <strong>COLLAPSE</strong> / <strong>EXPAND</strong> to hide or show downlines. Click <strong>Legend</strong> for node color
                    meanings.
                </p>
            </Dialog>

            <div className="surface-0 border-round shadow-1 p-3 md:p-4 mb-2">
                <div className="flex flex-wrap align-items-end gap-3 justify-content-between">
                    <div className="flex flex-wrap gap-3 align-items-end">
                        <div className="flex flex-column gap-1">
                            <label className="text-xs text-600 font-medium">Orientation</label>
                            <Dropdown
                                value={orientation}
                                options={ORIENTATION_OPTS}
                                onChange={(e) => setOrientation(e.value)}
                                className="w-full md:w-12rem"
                                style={{ minWidth: "10rem" }}
                            />
                        </div>
                        <div className="flex flex-column gap-1">
                            <label className="text-xs text-600 font-medium">Generation Depth</label>
                            <Dropdown
                                value={genDepth}
                                options={GEN_DEPTH_OPTS}
                                onChange={(e) => setGenDepth(e.value)}
                                className="w-full md:w-12rem"
                                style={{ minWidth: "10rem" }}
                            />
                        </div>
                        <div className="flex flex-column gap-1">
                            <label className="text-xs text-600 font-medium">Level</label>
                            <Dropdown value={level} options={LEVEL_OPTS} onChange={(e) => setLevel(e.value)} className="w-full md:w-12rem" />
                        </div>
                        <div className="flex flex-column gap-1">
                            <label className="text-xs text-600 font-medium">Order by</label>
                            <Dropdown value={orderBy} options={ORDER_OPTS} onChange={(e) => setOrderBy(e.value)} className="w-full md:w-12rem" />
                        </div>
                    </div>
                    <Button
                        type="button"
                        label="APPLY"
                        className="font-bold border-none"
                        style={{ background: ACCENT, borderColor: ACCENT_BORDER, color: "#1a1a1a" }}
                        onClick={() => {}}
                    />
                </div>
            </div>

            <div className="flex flex-wrap align-items-start justify-content-between gap-2 px-1 py-2">
                <p className="flex-1 text-center text-600 text-sm m-0 line-height-3 px-2" style={{ maxWidth: "100%" }}>
                    <i className="pi pi-info-circle mr-1" style={{ verticalAlign: "middle" }} aria-hidden />
                    To unfold Tree and see the Agent&apos;s downlines, click once on the circle near Agent Name. To see Profile Image of the
                    Agent, click on the Agent Name.
                </p>
                <button
                    type="button"
                    className="flex flex-column align-items-center gap-0 bg-transparent border-none cursor-pointer p-1 text-primary"
                    onClick={() => setLegendOpen(true)}
                >
                    <i className="pi pi-info-circle text-lg" aria-hidden />
                    <span className="text-xs font-semibold">Legend</span>
                </button>
            </div>

            <div
                className="relative surface-50 border-round border-1 surface-border overflow-hidden flex flex-column"
                style={{ minHeight: "min(70vh, 520px)" }}
            >
                <div
                    className="flex-1 flex align-items-center justify-content-center p-6 pb-16"
                    style={{
                        transform: `scale(${scale})`,
                        transformOrigin: "center center",
                        transition: "transform 0.2s ease",
                    }}
                >
                    {orientation === "horizontal" ? (
                        <div className="flex align-items-center flex-wrap justify-content-center gap-0">
                            <NetworkNode node={DEMO_TREE.root} onToggleCircle={() => setTreeExpanded((v) => !v)} />
                            {showChild && (
                                <>
                                    <div className="mx-1 flex-shrink-0 surface-400" style={{ width: "3rem", height: "2px" }} />
                                    <NetworkNode node={DEMO_TREE.child} />
                                </>
                            )}
                        </div>
                    ) : (
                        <div className="flex flex-column align-items-center gap-0">
                            <NetworkNode node={DEMO_TREE.root} onToggleCircle={() => setTreeExpanded((v) => !v)} />
                            {showChild && (
                                <>
                                    <div className="surface-400 my-2" style={{ width: "2px", height: "2rem" }} />
                                    <NetworkNode node={DEMO_TREE.child} />
                                </>
                            )}
                        </div>
                    )}
                </div>

                <div className="absolute bottom-0 left-0 right-0 flex justify-content-center pb-4 pt-2 pointer-events-none">
                    <div
                        className="flex align-items-center gap-2 flex-wrap justify-content-center pointer-events-auto"
                        style={{ gap: "0.5rem" }}
                    >
                        <Button
                            type="button"
                            icon="pi pi-plus"
                            className="font-bold"
                            style={{ background: ACCENT, borderColor: ACCENT_BORDER, color: "#1a1a1a", width: "2.5rem", height: "2.5rem" }}
                            onClick={() => setScale((s) => Math.min(2, Math.round((s + 0.1) * 10) / 10))}
                            aria-label="Zoom in"
                        />
                        <Button
                            type="button"
                            icon="pi pi-minus"
                            className="font-bold"
                            style={{ background: ACCENT, borderColor: ACCENT_BORDER, color: "#1a1a1a", width: "2.5rem", height: "2.5rem" }}
                            onClick={() => setScale((s) => Math.max(0.5, Math.round((s - 0.1) * 10) / 10))}
                            aria-label="Zoom out"
                        />
                        <Button
                            type="button"
                            label="COLLAPSE"
                            className="font-bold px-3"
                            style={{ background: ACCENT, borderColor: ACCENT_BORDER, color: "#1a1a1a" }}
                            onClick={() => setTreeExpanded(false)}
                        />
                        <Button
                            type="button"
                            label="EXPAND"
                            className="font-bold px-3"
                            style={{ background: ACCENT, borderColor: ACCENT_BORDER, color: "#1a1a1a" }}
                            onClick={() => setTreeExpanded(true)}
                        />
                    </div>
                </div>

                <Button
                    type="button"
                    label="?"
                    rounded
                    className="absolute shadow-4 border-none text-xl"
                    style={{
                        bottom: "1rem",
                        right: "1rem",
                        width: "2.75rem",
                        height: "2.75rem",
                        background: ACCENT,
                        borderColor: ACCENT_BORDER,
                        color: "#1a1a1a",
                        fontWeight: 700,
                    }}
                    onClick={() => setHelpOpen(true)}
                    aria-label="Help"
                />
            </div>

            <style jsx global>{`
                .visual-network-view .p-dropdown {
                    min-width: 10rem;
                }
            `}</style>
        </div>
    );
}
