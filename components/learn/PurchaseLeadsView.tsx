import { Divider } from "primereact/divider";

const link = "text-blue-600 font-medium no-underline hover:underline";

type PurchaseLeadsViewProps = {
    /** Optional YouTube ID for Caboom launch webinar embed */
    caboomWebinarVideoId?: string | null;
    /** Optional direct link to webinar recording (Drive, YouTube watch URL, etc.) */
    caboomWebinarRecordingUrl?: string | null;
};

function WebinarBlock({
    videoId,
    recordingUrl,
    label,
}: {
    videoId?: string | null;
    recordingUrl?: string | null;
    label: string;
}) {
    const id = videoId?.trim();
    if (id) {
        return (
            <div
                className="relative w-full overflow-hidden border-round border-1 surface-border bg-black my-3"
                style={{ paddingBottom: "56.25%", maxWidth: "640px" }}
            >
                <iframe
                    title={label}
                    src={`https://www.youtube.com/embed/${id}`}
                    className="absolute top-0 left-0 w-full h-full border-none"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                />
            </div>
        );
    }
    const href = recordingUrl?.trim();
    if (href) {
        return (
            <p className="m-0 mt-2">
                <a href={href} target="_blank" rel="noopener noreferrer" className={link}>
                    {label}
                </a>
            </p>
        );
    }
    return (
        <p className="text-600 text-sm line-height-3 m-0 mt-2">
            Webinar recording: use the link on the CABOOM Experior page above, or ask head office for the latest recording link.
        </p>
    );
}

export default function PurchaseLeadsView({ caboomWebinarVideoId, caboomWebinarRecordingUrl }: PurchaseLeadsViewProps) {
    return (
        <div className="surface-card border-round border-1 surface-border overflow-hidden">
            <div className="p-4 md:p-5 lg:p-6" style={{ maxWidth: "52rem" }}>
                <h1 className="text-2xl md:text-3xl font-bold text-900 m-0 mb-3">Purchase Leads</h1>

                <p className="text-700 line-height-3 m-0 mb-4 surface-50 border-round-lg p-4 border-1 surface-border">
                    Please note: these are <strong>independent third-party referral lead companies</strong>, and Experior is{" "}
                    <strong>not directly affiliated</strong> with them and does <strong>not</strong> receive any monetary benefit
                    from leads purchased through them. If you have feedback on a leads program, let head office know.
                </p>

                <section className="mb-4">
                    <h2 className="text-xl font-semibold text-orange-600 mt-0 mb-2">CABOOM Leads</h2>
                    <p className="text-700 line-height-3 m-0 mb-2">
                        Lead generation partner delivering real-time, phone, and SMS–verified insurance prospects—including final
                        expense, life, annuity, retirement, home, and health. Leads can be delivered into your CRM. Experior-focused
                        programs may offer exclusive discounts and dedicated Experior lead packages.
                    </p>
                    <p className="text-700 m-0 mb-2">
                        <a href="https://caboomleads.com/pages/experior" target="_blank" rel="noopener noreferrer" className={link}>
                            CABOOM Leads — Experior agent page
                        </a>
                    </p>
                    <p className="text-700 text-sm m-0 mb-1">Launch webinar recording</p>
                    <WebinarBlock
                        videoId={caboomWebinarVideoId}
                        recordingUrl={caboomWebinarRecordingUrl}
                        label="CLICK HERE — Launch webinar recording"
                    />
                </section>

                <Divider className="my-4" />

                <section className="mb-4">
                    <h2 className="text-xl font-semibold text-orange-600 mt-0 mb-2">Just Rates</h2>
                    <p className="text-600 text-sm font-semibold m-0 mb-2">just ·</p>
                    <p className="text-700 m-0 mb-2">
                        <a
                            href="https://justrates.agentleadplatform.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={link}
                        >
                            https://justrates.agentleadplatform.com
                        </a>
                    </p>
                    <p className="text-700 line-height-3 m-0 mb-3">
                        Built around the leads they generate, with a focus on high-intent prospects to help agents grow a full
                        insurance practice.
                    </p>
                    <p className="text-700 m-0">
                        <strong>Contact:</strong> Christian Teixera —{" "}
                        <a href="mailto:christian@justrates.co" className={link}>
                            christian@justrates.co
                        </a>
                    </p>
                </section>

                <Divider className="my-4" />

                <section className="mb-0">
                    <h2 className="text-xl font-semibold text-orange-600 mt-0 mb-2">Hyprr Live Transfers</h2>
                    <p className="text-700 font-medium m-0 mb-2">Final expense, Medicare, and homeowner live leads</p>
                    <p className="text-700 m-0 mb-3">
                        <a href="https://hyprrlivetransfers.com/" target="_blank" rel="noopener noreferrer" className={link}>
                            https://hyprrlivetransfers.com/
                        </a>
                    </p>
                    <p className="text-700 line-height-3 m-0 mb-3">
                        Pre-qualified, real-time telephone transfers in many U.S. states. No long-term contracts—order on an
                        order-by-order basis. Includes a short quality buffer (about <strong>1 minute 45 seconds</strong>) to confirm
                        the conversation fits your business before you are billed. Ask Hyprr for current performance metrics and
                        state availability.
                    </p>
                    <p className="text-700 line-height-3 m-0 mb-3">
                        <strong>Typical start:</strong> minimum live-transfer order (often <strong>20</strong> to begin), then
                        pay-per-billable transfer. Example pricing discussed in program materials: <strong>$50</strong> per Medicare
                        live transfer and <strong>$55</strong> per final expense (with minimums); platform access may be billed
                        separately (e.g. <strong>$50/month</strong>)—confirm current rates on Hyprr&apos;s site before you buy.
                    </p>
                    <p className="text-700 line-height-3 m-0 mb-3">
                        <strong>Monthly meeting:</strong> Fridays <strong>11:00 a.m.–12:00 p.m. PT</strong> (America/Vancouver).{" "}
                        <a href="https://meet.google.com/szn-otje-iuq" target="_blank" rel="noopener noreferrer" className={link}>
                            Google Meet — join link
                        </a>
                    </p>
                    <p className="text-700 m-0">
                        <strong>Contact:</strong> Darrin Wong —{" "}
                        <a href="mailto:dwong@hyprr.ca" className={link}>
                            dwong@hyprr.ca
                        </a>
                    </p>
                </section>
            </div>
        </div>
    );
}
