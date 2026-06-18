"use client";

import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";
import { classNames } from "primereact/utils";
import { useEffect, useState } from "react";
import VisualNetworkLegendDialog from "@/components/team/VisualNetworkLegendDialog";
import { NetworkTreeNode } from "@/lib/agentNetworkData";

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

function toTreeNodeData(node: NetworkTreeNode): TreeNodeData {
    return {
        id: node.id,
        name: node.name,
        variant: node.variant,
        hasChildren: node.hasChildren,
    };
}

function TreeBranch({
    node,
    orientation,
    collapsed,
    onToggle,
}: {
    node: NetworkTreeNode;
    orientation: string;
    collapsed: Set<string>;
    onToggle: (id: string) => void;
}) {
    const isCollapsed = collapsed.has(node.id);
    const nodeData = toTreeNodeData(node);

    if (orientation === "horizontal") {
        return (
            <div className="flex align-items-center flex-wrap justify-content-center gap-0">
                <NetworkNode node={nodeData} onToggleCircle={() => onToggle(node.id)} />
                {!isCollapsed &&
                    node.children.map((child) => (
                        <div key={child.id} className="flex align-items-center">
                            <div className="mx-1 flex-shrink-0 surface-400" style={{ width: "3rem", height: "2px" }} />
                            <TreeBranch node={child} orientation={orientation} collapsed={collapsed} onToggle={onToggle} />
                        </div>
                    ))}
            </div>
        );
    }

    return (
        <div className="flex flex-column align-items-center gap-0">
            <NetworkNode node={nodeData} onToggleCircle={() => onToggle(node.id)} />
            {!isCollapsed &&
                node.children.map((child) => (
                    <div key={child.id} className="flex flex-column align-items-center">
                        <div className="surface-400 my-2" style={{ width: "2px", height: "2rem" }} />
                        <TreeBranch node={child} orientation={orientation} collapsed={collapsed} onToggle={onToggle} />
                    </div>
                ))}
        </div>
    );
}

export default function VisualNetworkView({ initialTree }: { initialTree?: NetworkTreeNode | null }) {
    const [orientation, setOrientation] = useState("horizontal");
    const [genDepth, setGenDepth] = useState("personal");
    const [level, setLevel] = useState("all");
    const [orderBy, setOrderBy] = useState("oldest");
    const [legendOpen, setLegendOpen] = useState(false);
    const [helpOpen, setHelpOpen] = useState(false);
    const [scale, setScale] = useState(1);
    const [collapsed, setCollapsed] = useState<Set<string>>(new Set());
    const [tree, setTree] = useState<NetworkTreeNode | null>(initialTree ?? null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setTree(initialTree ?? null);
    }, [initialTree]);

    const refreshTree = async () => {
        setLoading(true);
        try {
            const depth = genDepth === "team" ? 5 : level === "1" ? 1 : level === "2" ? 2 : 3;
            const response = await fetch(`/api/agent/team/network?depth=${depth}&order=${orderBy}`);
            const payload = await response.json();
            if (response.ok) {
                setTree(payload.tree);
                setCollapsed(new Set());
            }
        } finally {
            setLoading(false);
        }
    };

    const toggleNode = (id: string) => {
        setCollapsed((prev) => {
            const next = new Set(prev);
            if (next.has(id)) next.delete(id);
            else next.add(id);
            return next;
        });
    };

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
                    <strong>COLLAPSE</strong> / <strong>EXPAND</strong> to hide or show downlines.
                </p>
            </Dialog>

            <div className="surface-0 border-round shadow-1 p-3 md:p-4 mb-2">
                <div className="flex flex-wrap align-items-end gap-3 justify-content-between">
                    <div className="flex flex-wrap gap-3 align-items-end">
                        <div className="flex flex-column gap-1">
                            <label className="text-xs text-600 font-medium">Orientation</label>
                            <Dropdown value={orientation} options={ORIENTATION_OPTS} onChange={(e) => setOrientation(e.value)} className="w-full md:w-12rem" />
                        </div>
                        <div className="flex flex-column gap-1">
                            <label className="text-xs text-600 font-medium">Generation Depth</label>
                            <Dropdown value={genDepth} options={GEN_DEPTH_OPTS} onChange={(e) => setGenDepth(e.value)} className="w-full md:w-12rem" />
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
                        label={loading ? "Loading…" : "APPLY"}
                        className="font-bold border-none"
                        style={{ background: ACCENT, borderColor: ACCENT_BORDER, color: "#1a1a1a" }}
                        onClick={refreshTree}
                        disabled={loading}
                    />
                </div>
            </div>

            <div
                className="relative surface-50 border-round border-1 surface-border overflow-hidden flex flex-column"
                style={{ minHeight: "min(70vh, 520px)" }}
            >
                <div
                    className="flex-1 flex align-items-center justify-content-center p-6 pb-16"
                    style={{ transform: `scale(${scale})`, transformOrigin: "center center", transition: "transform 0.2s ease" }}
                >
                    {tree ? (
                        <TreeBranch node={tree} orientation={orientation} collapsed={collapsed} onToggle={toggleNode} />
                    ) : (
                        <p className="text-600 m-0">No network data available.</p>
                    )}
                </div>

                <div className="absolute bottom-0 left-0 right-0 flex justify-content-center pb-4 pt-2 pointer-events-none">
                    <div className="flex align-items-center gap-2 flex-wrap justify-content-center pointer-events-auto">
                        <Button type="button" icon="pi pi-plus" className="font-bold" style={{ background: ACCENT, borderColor: ACCENT_BORDER, color: "#1a1a1a", width: "2.5rem", height: "2.5rem" }} onClick={() => setScale((s) => Math.min(2, Math.round((s + 0.1) * 10) / 10))} aria-label="Zoom in" />
                        <Button type="button" icon="pi pi-minus" className="font-bold" style={{ background: ACCENT, borderColor: ACCENT_BORDER, color: "#1a1a1a", width: "2.5rem", height: "2.5rem" }} onClick={() => setScale((s) => Math.max(0.5, Math.round((s - 0.1) * 10) / 10))} aria-label="Zoom out" />
                        <Button type="button" label="COLLAPSE" className="font-bold px-3" style={{ background: ACCENT, borderColor: ACCENT_BORDER, color: "#1a1a1a" }} onClick={() => setCollapsed(new Set(tree ? collectIds(tree) : []))} />
                        <Button type="button" label="EXPAND" className="font-bold px-3" style={{ background: ACCENT, borderColor: ACCENT_BORDER, color: "#1a1a1a" }} onClick={() => setCollapsed(new Set())} />
                    </div>
                </div>
            </div>
        </div>
    );
}

function collectIds(node: NetworkTreeNode): string[] {
    return [node.id, ...node.children.flatMap(collectIds)];
}
