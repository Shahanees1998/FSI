import { Divider } from "primereact/divider";

type UpcomingMeetingsViewProps = {
    /** Google Calendar (or other) embed URL, e.g. `https://calendar.google.com/calendar/embed?src=...` */
    embedUrl?: string | null;
};

/**
 * Learn → Experior Schedule → Upcoming Meetings: heading, divider, and embedded calendar area.
 */
export default function UpcomingMeetingsView({ embedUrl }: UpcomingMeetingsViewProps) {
    const src = embedUrl?.trim() ?? "";

    return (
        <div className="surface-card border-round border-1 surface-border p-4 md:p-5">
            <h1 className="text-2xl md:text-3xl font-bold text-900 m-0">Upcoming Meetings</h1>
            <Divider className="my-3" />

            <div
                className="border-round-xl overflow-hidden w-full flex align-items-center justify-content-center"
                style={{
                    minHeight: "min(72vh, 720px)",
                    background: "#e8e9eb",
                }}
            >
                {src ? (
                    <iframe
                        title="Upcoming meetings calendar"
                        src={src}
                        className="w-full border-none"
                        style={{ minHeight: "min(72vh, 720px)", height: "72vh", maxHeight: 900 }}
                        allowFullScreen
                    />
                ) : (
                    <div
                        className="flex flex-column align-items-center justify-content-center text-center px-4 py-6"
                        style={{ maxWidth: "28rem" }}
                    >
                        <span
                            className="inline-flex align-items-center justify-content-center border-round surface-0 mb-3"
                            style={{
                                width: "4.5rem",
                                height: "4.5rem",
                                boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
                            }}
                            aria-hidden
                        >
                            <i className="pi pi-calendar text-400" style={{ fontSize: "2rem", opacity: 0.45 }} />
                        </span>
                        <p className="text-700 m-0 mb-2 font-medium">Meeting calendar</p>
                        <p className="text-600 text-sm m-0 line-height-3">
                            Your team&apos;s schedule will display here once a calendar is connected.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
