import Link from "next/link";

export type HubSection = {
  href: string;
  title: string;
  description: string;
  icon: string;
  count?: number;
};

export default function PortalHubView({
  title,
  description,
  sections,
  helpLinks,
  totalRecords,
}: {
  title: string;
  description: string;
  sections: HubSection[];
  helpLinks?: { href: string; label: string }[];
  totalRecords?: number;
}) {
  const link = "text-blue-600 font-medium no-underline hover:underline";

  return (
    <div className="surface-card border-round border-1 surface-border overflow-hidden">
      <div className="p-4 md:p-5 lg:p-6" style={{ maxWidth: "56rem" }}>
        <h1 className="text-2xl md:text-3xl font-bold text-900 m-0 mb-2">{title}</h1>
        <p className="text-700 line-height-3 m-0 mb-2">{description}</p>
        {typeof totalRecords === "number" ? (
          <p className="text-600 text-sm m-0 mb-5">{totalRecords} total records across sections</p>
        ) : (
          <div className="mb-5" />
        )}

        <div className="grid">
          {sections.map((s) => (
            <div key={s.href} className="col-12 md:col-6 mb-3">
              <Link
                href={s.href}
                className="block h-full no-underline text-900 border-1 surface-border border-round-lg p-4 surface-ground hover:surface-hover transition-duration-150 shadow-1"
              >
                <div className="flex align-items-start gap-3">
                  <span
                    className="inline-flex align-items-center justify-content-center border-round flex-shrink-0 text-900"
                    style={{ width: "2.5rem", height: "2.5rem", background: "#fef3c7" }}
                    aria-hidden
                  >
                    <i className={`${s.icon} text-lg`} />
                  </span>
                  <div>
                    <div className="flex align-items-center gap-2 flex-wrap">
                      <h2 className="text-lg font-semibold m-0">{s.title}</h2>
                      {typeof s.count === "number" ? (
                        <span className="text-xs font-semibold px-2 py-1 border-round" style={{ background: "#e0f2fe", color: "#0369a1" }}>
                          {s.count} records
                        </span>
                      ) : null}
                    </div>
                    <p className="text-600 text-sm line-height-3 m-0 mt-2">{s.description}</p>
                    <span className={`${link} text-sm inline-block mt-2`}>Open →</span>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {helpLinks && helpLinks.length > 0 ? (
          <section className="mt-5 pt-4 border-top-1 surface-border">
            <h2 className="text-lg font-semibold text-900 m-0 mb-2">Training &amp; help</h2>
            <ul className="m-0 pl-4 text-700 line-height-3 flex flex-column gap-2">
              {helpLinks.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={link}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ) : null}
      </div>
    </div>
  );
}
