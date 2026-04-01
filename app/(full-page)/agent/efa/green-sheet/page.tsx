import { requireCurrentUser } from "@/lib/serverAuth";
import Image from "next/image";
import Link from "next/link";

const SHEETS_LINK =
    process.env.NEXT_PUBLIC_GREEN_SHEET_URL ??
    "https://docs.google.com/spreadsheets/d/1placeholder/copy";

export default async function AgentGreenSheetPage() {
    await requireCurrentUser("AGENT");

    return (
        <div className="surface-card border-round border-1 surface-border p-4 md:p-5 max-w-4xl">
            <h1 className="text-3xl md:text-4xl font-normal text-900 m-0 pb-3 border-bottom-1 surface-border">
                Greensheet (Simplified Needs Analysis)
            </h1>

            <div className="mt-4 mb-4">
                <Link
                    href={SHEETS_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary font-normal text-lg no-underline hover:underline"
                >
                    Greensheet (Simplified Needs Analysis) Google Sheets Link
                </Link>
            </div>

            <p className="text-900 line-height-3 m-0 mb-5 text-base">
                Please note, when you click on the document link above you must then click the{" "}
                <strong>blue button</strong> that says <strong>&quot;Make a Copy&quot;</strong> to download a version to
                edit.
            </p>

            <div className="flex flex-column align-items-start gap-2">
                <Image
                    src="/images/green-sheet-make-copy-guide.jpg"
                    alt="Google Sheets: Copy document dialog — click the blue Make a copy button"
                    width={1024}
                    height={427}
                    className="border-1 surface-border border-round w-full max-w-full h-auto"
                    sizes="(max-width: 900px) 100vw, 864px"
                    priority
                />
            </div>
        </div>
    );
}
