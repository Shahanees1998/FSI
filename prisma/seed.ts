import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  await prisma.adminLog.deleteMany();
  await prisma.fcmToken.deleteMany();
  await prisma.notification.deleteMany();
  await prisma.ticketMessage.deleteMany();
  await prisma.ticket.deleteMany();
  await prisma.conversationMessage.deleteMany();
  await prisma.conversationParticipant.deleteMany();
  await prisma.conversation.deleteMany();
  await prisma.insurerStat.deleteMany();
  await prisma.commissionRecord.deleteMany();
  await prisma.announcement.deleteMany();
  await prisma.agentProfile.deleteMany();
  await prisma.carrierProfile.deleteMany();
  await prisma.systemSettings.deleteMany();
  await prisma.user.deleteMany();

  const hashedPassword = await bcrypt.hash("password123", 10);

  const admin = await prisma.user.create({
    data: {
      email: "admin@freedomshieldinsurance.com",
      password: hashedPassword,
      firstName: "FSI",
      lastName: "Administrator",
      phone: "5551000001",
      role: "ADMIN",
      status: "ACTIVE",
      jobTitle: "Operations Director",
      location: "Dallas, TX",
      timezone: "America/Chicago",
      emailVerified: true,
    },
  });

  const agentOne = await prisma.user.create({
    data: {
      email: "agent.sarah@fsi-demo.com",
      password: hashedPassword,
      firstName: "Sarah",
      lastName: "Miles",
      phone: "5551000002",
      role: "AGENT",
      status: "ACTIVE",
      jobTitle: "Senior Agent",
      location: "Houston, TX",
      timezone: "America/Chicago",
      emailVerified: true,
      agentProfile: {
        create: {
          agentCode: "AGT-1001",
          licenseNumber: "TX-AG-44591",
          agencyName: "Freedom Shield Insurance",
          city: "Houston",
          state: "TX",
          country: "USA",
          contractedAt: new Date("2024-02-15T00:00:00.000Z"),
        },
      },
    },
    include: {
      agentProfile: true,
    },
  });

  const agentTwo = await prisma.user.create({
    data: {
      email: "agent.daniel@fsi-demo.com",
      password: hashedPassword,
      firstName: "Daniel",
      lastName: "Reed",
      phone: "5551000003",
      role: "AGENT",
      status: "ACTIVE",
      jobTitle: "Field Agent",
      location: "Austin, TX",
      timezone: "America/Chicago",
      emailVerified: true,
      agentProfile: {
        create: {
          agentCode: "AGT-1002",
          licenseNumber: "TX-AG-55293",
          agencyName: "Freedom Shield Insurance",
          city: "Austin",
          state: "TX",
          country: "USA",
          contractedAt: new Date("2024-05-01T00:00:00.000Z"),
        },
      },
    },
    include: {
      agentProfile: true,
    },
  });

  const carrierOne = await prisma.user.create({
    data: {
      email: "carrier.liberty@fsi-demo.com",
      password: hashedPassword,
      firstName: "Liberty",
      lastName: "National",
      phone: "5551000004",
      role: "CARRIER",
      status: "ACTIVE",
      jobTitle: "Carrier Success Manager",
      location: "Chicago, IL",
      timezone: "America/Chicago",
      emailVerified: true,
      carrierProfile: {
        create: {
          carrierCode: "CAR-2001",
          carrierName: "Liberty National Insurance",
          contactEmail: "carrier.liberty@fsi-demo.com",
          contactPhone: "5551000004",
          website: "https://example.com/liberty-national",
          status: "ACTIVE",
        },
      },
    },
    include: {
      carrierProfile: true,
    },
  });

  const carrierTwo = await prisma.user.create({
    data: {
      email: "carrier.atlas@fsi-demo.com",
      password: hashedPassword,
      firstName: "Atlas",
      lastName: "Health",
      phone: "5551000005",
      role: "CARRIER",
      status: "ACTIVE",
      jobTitle: "Regional Carrier Manager",
      location: "Phoenix, AZ",
      timezone: "America/Phoenix",
      emailVerified: true,
      carrierProfile: {
        create: {
          carrierCode: "CAR-2002",
          carrierName: "Atlas Health Assurance",
          contactEmail: "carrier.atlas@fsi-demo.com",
          contactPhone: "5551000005",
          website: "https://example.com/atlas-health",
          status: "ACTIVE",
        },
      },
    },
    include: {
      carrierProfile: true,
    },
  });

  await prisma.agentProfile.update({
    where: { id: agentOne.agentProfile!.id },
    data: {
      preferredCarrierIds: [carrierOne.carrierProfile!.id, carrierTwo.carrierProfile!.id],
    },
  });

  await prisma.agentProfile.update({
    where: { id: agentTwo.agentProfile!.id },
    data: {
      preferredCarrierIds: [carrierOne.carrierProfile!.id],
    },
  });

  const conversation = await prisma.conversation.create({
    data: {
      subject: "Carrier onboarding updates",
      type: "GROUP",
      createdById: admin.id,
      lastMessageAt: new Date(),
      participants: {
        create: [{ userId: admin.id }, { userId: agentOne.id }, { userId: carrierOne.id }],
      },
    },
  });

  await prisma.conversationMessage.createMany({
    data: [
      {
        conversationId: conversation.id,
        senderId: admin.id,
        body: "Welcome to the new Freedom Shield carrier collaboration workspace.",
        messageType: "SYSTEM",
      },
      {
        conversationId: conversation.id,
        senderId: agentOne.id,
        body: "I have two pending policy submissions for Liberty National that need review.",
        messageType: "TEXT",
      },
      {
        conversationId: conversation.id,
        senderId: carrierOne.id,
        body: "Please send the case numbers and we will respond before end of day.",
        messageType: "TEXT",
      },
    ],
  });

  const ticketOne = await prisma.ticket.create({
    data: {
      requesterId: agentOne.id,
      assignedToId: admin.id,
      category: "COMMISSION",
      subject: "Missing March commission statement",
      description: "The March commission statement for Liberty National is not visible in my dashboard.",
      priority: "HIGH",
      status: "IN_PROGRESS",
    },
  });

  const ticketTwo = await prisma.ticket.create({
    data: {
      requesterId: carrierOne.id,
      assignedToId: admin.id,
      category: "CARRIER",
      subject: "Carrier profile update request",
      description: "Please update our escalation email and underwriting support contact details.",
      priority: "MEDIUM",
      status: "OPEN",
    },
  });

  await prisma.ticketMessage.createMany({
    data: [
      {
        ticketId: ticketOne.id,
        authorId: agentOne.id,
        body: "I can see February and April, but March is missing.",
      },
      {
        ticketId: ticketOne.id,
        authorId: admin.id,
        body: "We are reconciling the statement import with Liberty National now.",
      },
      {
        ticketId: ticketTwo.id,
        authorId: carrierOne.id,
        body: "New escalation email should be ops@libertynational-demo.com.",
      },
    ],
  });

  await prisma.commissionRecord.createMany({
    data: [
      {
        agentId: agentOne.id,
        carrierProfileId: carrierOne.carrierProfile!.id,
        policyNumber: "POL-10001",
        clientName: "Martha Lewis",
        productLine: "Final Expense",
        amount: 1480,
        status: "PAID",
        statementMonth: new Date("2026-02-01T00:00:00.000Z"),
        effectiveDate: new Date("2026-01-20T00:00:00.000Z"),
        paidAt: new Date("2026-02-28T00:00:00.000Z"),
        notes: "Paid with February carrier statement.",
        updatedById: admin.id,
      },
      {
        agentId: agentOne.id,
        carrierProfileId: carrierOne.carrierProfile!.id,
        policyNumber: "POL-10002",
        clientName: "James Walker",
        productLine: "Mortgage Protection",
        amount: 1125,
        status: "APPROVED",
        statementMonth: new Date("2026-03-01T00:00:00.000Z"),
        effectiveDate: new Date("2026-02-18T00:00:00.000Z"),
        notes: "Scheduled for next payout cycle.",
        updatedById: admin.id,
      },
      {
        agentId: agentTwo.id,
        carrierProfileId: carrierTwo.carrierProfile!.id,
        policyNumber: "POL-20001",
        clientName: "Alicia Brown",
        productLine: "Health Supplemental",
        amount: 890,
        status: "PENDING",
        statementMonth: new Date("2026-03-01T00:00:00.000Z"),
        effectiveDate: new Date("2026-02-24T00:00:00.000Z"),
        notes: "Awaiting carrier approval.",
        updatedById: admin.id,
      },
    ],
  });

  await prisma.insurerStat.createMany({
    data: [
      {
        carrierProfileId: carrierOne.carrierProfile!.id,
        metricMonth: new Date("2026-03-01T00:00:00.000Z"),
        activeAgents: 24,
        submittedPolicies: 62,
        issuedPolicies: 49,
        submittedPremium: 182500,
        issuedPremium: 149300,
        commissionsPaid: 41250,
        retentionRate: 91.2,
        notes: "Strong month driven by final expense policies.",
        updatedById: admin.id,
      },
      {
        carrierProfileId: carrierTwo.carrierProfile!.id,
        metricMonth: new Date("2026-03-01T00:00:00.000Z"),
        activeAgents: 16,
        submittedPolicies: 41,
        issuedPolicies: 30,
        submittedPremium: 133400,
        issuedPremium: 101250,
        commissionsPaid: 28750,
        retentionRate: 87.6,
        notes: "Pending underwriting volume still elevated.",
        updatedById: admin.id,
      },
    ],
  });

  await prisma.notification.createMany({
    data: [
      {
        userId: agentOne.id,
        title: "Commission statement ready",
        message: "Your Liberty National March statement has been uploaded for review.",
        type: "COMMISSION",
        link: "/agent/commissions",
      },
      {
        userId: agentOne.id,
        title: "Ticket updated",
        message: "FSI operations responded to your commission support ticket.",
        type: "TICKET",
        link: "/agent/tickets",
      },
      {
        userId: carrierOne.id,
        title: "New carrier conversation",
        message: "A new conversation was opened with FSI and an assigned agent.",
        type: "MESSAGE",
        link: "/carrier/messages",
      },
    ],
  });

  await prisma.announcement.create({
    data: {
      title: "Welcome to the FSI Portal MVP",
      content: "Use the portal to monitor commissions, collaborate with carriers, and manage support tickets in one place.",
      audience: "ALL",
      createdById: admin.id,
      publishedAt: new Date(),
    },
  });

  await prisma.systemSettings.create({
    data: {
      siteName: "Freedom Shield Insurance Portal",
      siteDescription: "Back-office workspace for agents, carriers, and FSI administrators.",
      supportEmail: "support@freedomshieldinsurance.com",
      supportPhone: "1-800-555-0147",
      commissionDisclaimer: "Commission data is provisional until final carrier statements are reconciled.",
      notificationsEnabled: true,
    },
  });

  await prisma.adminLog.createMany({
    data: [
      {
        adminId: admin.id,
        action: "USER_CREATED",
        entityType: "USER",
        entityId: agentOne.id,
        description: "Provisioned seed agent account for Sarah Miles.",
      },
      {
        adminId: admin.id,
        action: "COMMISSION_UPDATED",
        entityType: "COMMISSION_RECORD",
        description: "Seeded initial commission statement records for MVP dashboard.",
      },
    ],
  });

  console.log("FSI demo data seeded successfully.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
