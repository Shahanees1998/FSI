import { NextRequest, NextResponse } from "next/server";
import { saveContactMessage } from "@/lib/dynamodb";

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: NextRequest) {
  try {
    const { name, email, message } = await request.json();

    const trimmedName = typeof name === "string" ? name.trim() : "";
    const trimmedEmail = typeof email === "string" ? email.trim() : "";
    const trimmedMessage = typeof message === "string" ? message.trim() : "";

    if (!trimmedName) {
      return NextResponse.json({ message: "Name is required." }, { status: 400 });
    }

    if (!trimmedEmail) {
      return NextResponse.json({ message: "Email is required." }, { status: 400 });
    }

    if (!isValidEmail(trimmedEmail)) {
      return NextResponse.json({ message: "Please enter a valid email address." }, { status: 400 });
    }

    if (!trimmedMessage) {
      return NextResponse.json({ message: "Message is required." }, { status: 400 });
    }

    await saveContactMessage({
      name: trimmedName,
      email: trimmedEmail,
      message: trimmedMessage,
    });

    return NextResponse.json({
      message: "Thank you! Your message has been received. We'll get back to you soon.",
    });
  } catch (error) {
    console.error("Support contact save error:", error);
    return NextResponse.json(
      { message: "Unable to save your message. Please try again later." },
      { status: 500 }
    );
  }
}
