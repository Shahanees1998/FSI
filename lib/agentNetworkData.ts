import { prisma } from "@/lib/prisma";

export type NetworkTreeNode = {
  id: string;
  name: string;
  agentCode: string;
  variant: "root" | "child";
  hasChildren: boolean;
  children: NetworkTreeNode[];
};

export async function getAgentNetworkTreeForUser(
  userId: string,
  options?: { depth?: number; order?: "oldest" | "newest" }
) {
  const profile = await prisma.agentProfile.findUnique({
    where: { userId },
    include: {
      user: { select: { firstName: true, lastName: true } },
    },
  });

  if (!profile) return null;

  const maxDepth = options?.depth ?? 3;
  const order = options?.order ?? "oldest";

  async function buildNode(agentProfileId: string, depth: number, variant: "root" | "child"): Promise<NetworkTreeNode> {
    const agentProfile = await prisma.agentProfile.findUnique({
      where: { id: agentProfileId },
      include: { user: { select: { firstName: true, lastName: true } } },
    });

    if (!agentProfile) {
      return {
        id: agentProfileId,
        name: "Unknown",
        agentCode: "",
        variant,
        hasChildren: false,
        children: [],
      };
    }

    const recruits = await prisma.agentProfile.findMany({
      where: { recruiterProfileId: agentProfileId },
      include: { user: { select: { firstName: true, lastName: true } } },
      orderBy: { createdAt: order === "newest" ? "desc" : "asc" },
    });

    const children =
      depth < maxDepth
        ? await Promise.all(
            recruits.map((recruit) => buildNode(recruit.id, depth + 1, "child"))
          )
        : [];

    return {
      id: agentProfile.id,
      name: `${agentProfile.user.firstName} ${agentProfile.user.lastName}`,
      agentCode: agentProfile.agentCode,
      variant,
      hasChildren: recruits.length > 0,
      children,
    };
  }

  return buildNode(profile.id, 0, "root");
}

export async function listRecruiterOptions() {
  const agents = await prisma.agentProfile.findMany({
    include: { user: { select: { firstName: true, lastName: true, status: true } } },
    orderBy: { agentCode: "asc" },
  });

  return agents
    .filter((a) => a.user.status === "ACTIVE")
    .map((a) => ({
      label: `${a.user.firstName} ${a.user.lastName} (FS Code: ${a.fundServCode || a.agentCode})`,
      value: a.id,
      agentCode: a.agentCode,
    }));
}

/** Direct recruit user IDs for rollup / team production views. */
export async function getDownlineUserIdsForAgent(userId: string) {
  const profile = await prisma.agentProfile.findUnique({
    where: { userId },
    select: { id: true },
  });
  if (!profile) return [];

  const recruits = await prisma.agentProfile.findMany({
    where: { recruiterProfileId: profile.id },
    select: { userId: true },
  });
  return recruits.map((recruit) => recruit.userId);
}

export async function getAgentDisplayName(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { firstName: true, lastName: true, email: true },
  });
  if (!user) return "Agent";
  const name = [user.firstName, user.lastName].filter(Boolean).join(" ").trim();
  return name || user.email.split("@")[0] || "Agent";
}
