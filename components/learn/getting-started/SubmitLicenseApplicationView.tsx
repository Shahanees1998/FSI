import { Divider } from "primereact/divider";

type SubmitLicenseApplicationViewProps = {
    /** External site for applying for a state license (e.g. NIPR or state DOI). */
    applicationUrl: string;
};

export default function SubmitLicenseApplicationView({ applicationUrl }: SubmitLicenseApplicationViewProps) {
    const href = applicationUrl.trim() || "https://www.nipr.com/";

    return (
        <div className="surface-card border-round border-1 surface-border overflow-hidden">
            <div className="p-4 md:p-5 lg:p-6">
                <h1 className="text-2xl md:text-3xl font-bold text-900 m-0">Submit Your License Application</h1>
                <Divider className="my-3" />

                <div
                    className="border-round-xl p-4 md:p-5 mb-4 text-center"
                    style={{
                        background: "#fbbf24",
                        boxShadow: "0 4px 14px rgba(251, 191, 36, 0.45)",
                    }}
                >
                    <p
                        className="m-0 text-white font-bold line-height-3"
                        style={{
                            fontSize: "clamp(1.1rem, 3.2vw, 1.65rem)",
                            letterSpacing: "0.06em",
                            textShadow: "0 1px 2px rgba(0,0,0,0.15)",
                        }}
                    >
                        SUBMIT YOUR LICENSE APPLICATION
                    </p>
                </div>

                <p className="text-orange-600 font-bold text-lg md:text-xl m-0 mb-3 line-height-3 text-center md:text-left">
                    CONGRATULATIONS! You have now passed your exam and are ready to submit your State License Application!
                </p>

                <p className="text-900 m-0 mb-4">Follow the instructions in the link below:</p>

                <p className="m-0 text-center md:text-left">
                    <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block font-bold no-underline hover:underline"
                        style={{
                            color: "#ea580c",
                            fontSize: "clamp(1rem, 2.5vw, 1.25rem)",
                            letterSpacing: "0.04em",
                        }}
                    >
                        APPLY FOR STATE LICENSE!
                    </a>
                </p>
            </div>
        </div>
    );
}
