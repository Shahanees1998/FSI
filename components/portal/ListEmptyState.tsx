"use client";

/**
 * Centered empty state for directory / queue lists (agents, carriers, tickets).
 */
export default function ListEmptyState({
    iconClass,
    title,
    body,
    secondary,
}: {
    iconClass: string;
    title: string;
    body: string;
    secondary?: string;
}) {
    return (
        <div
            className="surface-ground border-1 surface-border border-round border-dashed p-5 md:p-6 text-center"
            role="status"
            aria-live="polite"
        >
            <i className={`${iconClass} text-4xl text-400 block mb-3`} aria-hidden />
            <h4 className="mt-0 mb-2 text-xl font-semibold text-900">{title}</h4>
            <p className="m-0 text-600 line-height-3 mx-auto" style={{ maxWidth: "32rem" }}>
                {body}
            </p>
            {secondary ? (
                <p className="mt-3 mb-0 text-600 text-sm line-height-3 mx-auto" style={{ maxWidth: "28rem" }}>
                    {secondary}
                </p>
            ) : null}
        </div>
    );
}
