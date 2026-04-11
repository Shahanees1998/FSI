type WhatsNewSectionViewProps = {
    title: string;
};

/** Placeholder shell for What's New subpages until marketing drops in real content. */
export default function WhatsNewSectionView({ title }: WhatsNewSectionViewProps) {
    return (
        <div className="surface-card border-round border-1 surface-border overflow-hidden">
            <div className="p-4 md:p-5 lg:p-6" style={{ maxWidth: "52rem" }}>
                <h1 className="text-2xl md:text-3xl font-bold text-900 m-0 mb-3">{title}</h1>
                <p className="text-700 line-height-3 m-0">
                    This section is being set up in the portal. Check back soon, or contact head office if you need this
                    information right away.
                </p>
            </div>
        </div>
    );
}
