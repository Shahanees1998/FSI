import { notFound } from "next/navigation";
import PortalContentForm from "@/components/portal/PortalContentForm";
import { getPortalContentById } from "@/lib/portalContentData";
import { requireCurrentUser } from "@/lib/serverAuth";

export default async function AdminPortalContentEditPage({ params }: { params: { id: string } }) {
  await requireCurrentUser("ADMIN");
  const content = await getPortalContentById(params.id);
  if (!content) notFound();

  return (
    <div className="surface-card border-round border-1 surface-border p-4">
      <h1 className="mt-0 mb-4">Edit portal content</h1>
      <PortalContentForm
        mode="edit"
        contentId={content.id}
        initial={{
          slug: content.slug,
          category: content.category,
          title: content.title,
          body: content.body || "",
          videoId: content.videoId || "",
          pdfUrl: content.pdfUrl || "",
          externalUrl: content.externalUrl || "",
          published: content.published,
        }}
      />
    </div>
  );
}
