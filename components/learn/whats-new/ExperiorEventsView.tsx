type ExperiorEventsViewProps = {
    /** Public Eventcombo organizer or listing URL (embed + “open in new tab”). */
    eventsPageUrl: string | null;
};

export default function ExperiorEventsView({ eventsPageUrl }: ExperiorEventsViewProps) {
    const url = eventsPageUrl?.trim() ?? "";

    return (
        <div className="surface-card border-round border-1 surface-border overflow-hidden">
            <div className="p-4 md:p-5 border-bottom-1 surface-border">
                <h1 className="text-2xl md:text-3xl font-bold text-900 m-0 mb-2">Experior Events</h1>
                <p className="text-700 line-height-3 m-0">
                    Browse upcoming Experior-hosted sessions and partner events. Use filters on the calendar to narrow by date,
                    price, and category.
                </p>
            </div>

            {url ? (
                <div className="flex flex-column gap-3 p-3 md:p-4">
                    <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
                        <p className="text-600 text-sm m-0">Powered by Eventcombo. If the calendar does not load below, open it in a new window.</p>
                        <a
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 font-medium no-underline hover:underline text-sm white-space-nowrap"
                        >
                            Open in new window
                        </a>
                    </div>
                    <div
                        className="w-full overflow-hidden border-1 surface-border border-round bg-white"
                        style={{ minHeight: "75vh" }}
                    >
                        <iframe
                            title="Experior events on Eventcombo"
                            src={url}
                            className="w-full h-full border-none block"
                            style={{ minHeight: "75vh" }}
                            allow="clipboard-write; fullscreen"
                            referrerPolicy="strict-origin-when-cross-origin"
                        />
                    </div>
                </div>
            ) : (
                <div className="p-4 md:p-5 lg:p-6" style={{ maxWidth: "40rem" }}>
                    <p className="text-700 line-height-3 m-0 mb-3">
                        The Experior Eventcombo listing URL is not configured yet. Add{" "}
                        <code className="text-sm white-space-nowrap">NEXT_PUBLIC_EXPERIOR_EVENTS_URL</code> to your environment
                        (full https URL to the public Eventcombo page for Experior events), then redeploy.
                    </p>
                </div>
            )}
        </div>
    );
}
