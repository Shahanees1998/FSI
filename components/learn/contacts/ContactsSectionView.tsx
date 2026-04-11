type ContactsSectionViewProps = {
    title: string;
};

/** Placeholder shell for Contacts subpages until head office adds directory content. */
export default function ContactsSectionView({ title }: ContactsSectionViewProps) {
    return (
        <div className="surface-card border-round border-1 surface-border overflow-hidden">
            <div className="p-4 md:p-5 lg:p-6" style={{ maxWidth: "52rem" }}>
                <h1 className="text-2xl md:text-3xl font-bold text-900 m-0 mb-3">{title}</h1>
                <p className="text-700 line-height-3 m-0">
                    Contact listings for this section are being added to the portal. Check back soon, or reach out to head office
                    for phone numbers and addresses in the meantime.
                </p>
            </div>
        </div>
    );
}
