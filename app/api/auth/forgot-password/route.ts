import crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendPasswordResetEmail } from "@/lib/emailService";

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();
    if (!email) {
      return NextResponse.json({ error: "Email is required." }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { email: String(email).trim().toLowerCase() },
      select: { id: true, email: true, firstName: true },
    });

    if (!user) {
      return NextResponse.json({
        success: true,
        message: "If an account exists for that email, a reset link has been sent.",
      });
    }

    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetTokenExpiry = new Date(Date.now() + 60 * 60 * 1000);

    await prisma.user.update({
      where: { id: user.id },
      data: { resetToken, resetTokenExpiry },
    });

    try {
      await sendPasswordResetEmail(user.email, resetToken, user.firstName);
    } catch (error) {
      console.error("Password reset email failed:", error);
    }

    return NextResponse.json({
      success: true,
      message: "If an account exists for that email, a reset link has been sent.",
    });
  } catch {
    return NextResponse.json({ error: "Unable to process request." }, { status: 500 });
  }
}
