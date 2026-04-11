type EventCalendarViewProps = {
    /** Public embed URL for the full event calendar (e.g. Google Calendar embed). */
    embedUrl?: string | null;
};

/**
 * Learn → Experior Schedule → Event Calendar: header strip + white body for embedded calendar.
 */
export default function EventCalendarView({ embedUrl }: EventCalendarViewProps) {
    const src = embedUrl?.trim() ?? "";

    return (
        <div className="surface-card border-round border-1 surface-border overflow-hidden">
            <header
                className="surface-0 px-4 py-3 md:px-5 md:py-4"
                style={{
                    borderBottom: "1px solid var(--surface-border, #e5e7eb)",
                    boxShadow: "0 2px 8px rgba(15, 23, 42, 0.06)",
                }}
            >
                <h1 className="text-2xl md:text-3xl font-bold text-900 m-0">Event Calendar</h1>
            </header>

            <div
                className="surface-0 w-full"
                style={{ minHeight: "min(75vh, 760px)" }}
            >
                {src ? (
                    <iframe
                        title="Event calendar"
                        src={src}
                        className="w-full border-none block"
                        style={{ minHeight: "min(75vh, 760px)", height: "75vh", maxHeight: 920 }}
                        allowFullScreen
                    />
                ) : (
                    <div
                        className="flex flex-column align-items-center justify-content-center text-center px-4 py-8 h-full"
                        style={{ minHeight: "min(75vh, 760px)" }}
                    >
                        <i
                            className="pi pi-calendar text-300 mb-3"
                            style={{ fontSize: "2.75rem", opacity: 0.35 }}
                            aria-hidden
                        />
                        <p className="text-600 text-sm m-0 line-height-3" style={{ maxWidth: "24rem" }}>
                            Event listings will appear here when a calendar embed is configured.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
