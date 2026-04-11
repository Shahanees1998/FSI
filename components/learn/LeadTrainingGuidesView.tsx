const link = "text-blue-600 font-medium no-underline hover:underline";

const GUIDES: { title: string; description: string; pdfPath: string }[] = [
    {
        title: "Agent Do's & Dont's",
        description: "The ins and outs of being a good agent.",
        pdfPath: "/documents/lead-training/agent-dos-and-donts.pdf",
    },
    {
        title: "Activity Increases Sales",
        description: "Overview of how increased workload mathematically equates to more sales.",
        pdfPath: "/documents/lead-training/activity-increases-sales.pdf",
    },
    {
        title: "Voicemail Appointment Setting",
        description: "Tips for setting face-to-face appointments by leaving voicemails.",
        pdfPath: "/documents/lead-training/voicemail-appointment-setting.pdf",
    },
    {
        title: "Sales Structure",
        description:
            "Conversation flow, emotional questions, loaded questions, hypothetical questions, open-ended questions, and silence—key mechanics to structure a sale.",
        pdfPath: "/documents/lead-training/sales-structure.pdf",
    },
    {
        title: "Handling Objections",
        description: "Rebuttal scripts for common objections.",
        pdfPath: "/documents/lead-training/handling-objections.pdf",
    },
    {
        title: "Door Knocking",
        description: "Field sales door-knocking tips.",
        pdfPath: "/documents/lead-training/door-knocking.pdf",
    },
];

export default function LeadTrainingGuidesView() {
    return (
        <div className="surface-card border-round border-1 surface-border overflow-hidden">
            <div className="p-4 md:p-5 lg:p-6" style={{ maxWidth: "52rem" }}>
                <h1 className="text-2xl md:text-3xl font-bold text-900 m-0 mb-4">Lead Training Guides</h1>

                <div
                    className="border-round border-1 surface-border mb-5 overflow-hidden text-center py-6 px-4"
                    style={{
                        background: "linear-gradient(135deg, var(--surface-100) 0%, var(--surface-200) 45%, var(--surface-300) 100%)",
                    }}
                >
                    <div
                        className="text-900 font-bold line-height-1"
                        style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontSize: "clamp(1.75rem, 5vw, 2.75rem)", letterSpacing: "0.06em" }}
                    >
                        TRAINING
                    </div>
                    <div
                        className="text-yellow-600 italic mt-2"
                        style={{ fontFamily: "Georgia, serif", fontSize: "clamp(1.25rem, 4vw, 2rem)" }}
                    >
                        Guides
                    </div>
                </div>

                <ul className="list-none p-0 m-0">
                    {GUIDES.map((g) => (
                        <li key={g.pdfPath} className="mb-5 last:mb-0">
                            <a href={g.pdfPath} target="_blank" rel="noopener noreferrer" className={link}>
                                {g.title}
                            </a>
                            <p className="text-700 line-height-3 m-0 mt-1">{g.description}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
