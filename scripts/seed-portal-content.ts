import dotenv from "dotenv";

dotenv.config();

import { PrismaClient } from "@prisma/client";
import { buildPortalContentSeedData } from "../lib/portalContentSeeds";

const prisma = new PrismaClient();

const POPUP_SEED = {
  slug: "development/pop-ups",
  category: "POPUP" as const,
  title: "Welcome to the portal",
  body: "New commission reporting and team recruiting tools are now live in your agent workspace.",
  published: true,
  publishedAt: new Date(),
  metadata: { popupCategory: "Announcement" },
};

async function main() {
  const admin = await prisma.user.findFirst({
    where: { role: "ADMIN", status: "ACTIVE", isDeleted: false },
    orderBy: { createdAt: "asc" },
  });

  if (!admin) {
    throw new Error("No active admin user found. Run npm run prisma:seed first.");
  }

  const rows = [...buildPortalContentSeedData(admin.id), { ...POPUP_SEED, createdById: admin.id }];
  let created = 0;
  let updated = 0;

  for (const row of rows) {
    const existing = await prisma.portalContent.findUnique({
      where: { slug: row.slug },
    });

    const data = {
      slug: row.slug,
      category: row.category,
      title: row.title,
      body: row.body ?? null,
      videoId: "videoId" in row ? (row.videoId ?? null) : null,
      pdfUrl: "pdfUrl" in row ? (row.pdfUrl ?? null) : null,
      externalUrl: "externalUrl" in row ? (row.externalUrl ?? null) : null,
      metadata: ("metadata" in row ? row.metadata : {}) as object,
      published: row.published,
      publishedAt: row.publishedAt ?? null,
      createdById: admin.id,
    };

    if (existing) {
      await prisma.portalContent.update({
        where: { slug: row.slug },
        data: {
          category: data.category,
          title: data.title,
          body: data.body,
          videoId: data.videoId,
          pdfUrl: data.pdfUrl,
          externalUrl: data.externalUrl,
          metadata: data.metadata,
          published: data.published,
          publishedAt: data.published ? data.publishedAt ?? new Date() : null,
        },
      });
      updated += 1;
    } else {
      await prisma.portalContent.create({ data });
      created += 1;
    }
  }

  console.log(`Portal content seeded: ${created} created, ${updated} updated (${rows.length} total).`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
