import Link from "next/link";
import { PortalContent } from "@prisma/client";

export default function PortalContentView({
  content,
  backHref,
  backLabel,
}: {
  content: PortalContent;
  backHref?: string;
  backLabel?: string;
}) {
  const metadata = content.metadata as Record<string, string> | null;

  return (
    <div className="surface-card border-round border-1 surface-border overflow-hidden">
      <div className="p-4 md:p-5 lg:p-6" style={{ maxWidth: "52rem" }}>
        {backHref ? (
          <p className="m-0 mb-2">
            <Link href={backHref} className="text-blue-600 font-medium no-underline hover:underline text-sm">
              ← {backLabel || "Back"}
            </Link>
          </p>
        ) : null}
        <h1 className="text-2xl md:text-3xl font-bold text-900 m-0 mb-3">{content.title}</h1>
        {content.body ? (
          <div className="text-700 line-height-3 m-0 mb-4 whitespace-pre-wrap">{content.body}</div>
        ) : null}
        {content.videoId ? (
          <div className="mb-4">
            <div className="relative w-full border-round overflow-hidden" style={{ paddingTop: "56.25%" }}>
              <iframe
                className="absolute top-0 left-0 w-full h-full border-none"
                src={`https://www.youtube.com/embed/${content.videoId}`}
                title={content.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        ) : null}
        {content.pdfUrl ? (
          <p className="m-0 mb-2">
            <a href={content.pdfUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 font-medium">
              Download PDF
            </a>
          </p>
        ) : null}
        {content.externalUrl ? (
          <p className="m-0">
            <a href={content.externalUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 font-medium">
              Open external resource
            </a>
          </p>
        ) : null}
        {metadata?.note ? <p className="text-600 text-sm mt-4 mb-0">{metadata.note}</p> : null}
        {Array.isArray(metadata?.documents) ? (
          <ul className="m-0 mt-4 p-0 list-none flex flex-column gap-2">
            {(metadata.documents as Array<{ title: string; pdfUrl: string }>).map((doc) => (
              <li key={doc.pdfUrl}>
                <a href={doc.pdfUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 font-medium">
                  {doc.title}
                </a>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </div>
  );
}
