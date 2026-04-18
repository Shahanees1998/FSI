import sgMail from "@sendgrid/mail";
import { APP_NAME } from "@/lib/appBranding";

if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
}

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

export async function sendEmail(options: EmailOptions): Promise<void> {
  if (!process.env.SENDGRID_API_KEY) {
    console.warn("SENDGRID_API_KEY is not configured. Skipping email send.");
    return;
  }

  await sgMail.send({
    to: options.to,
    from: {
      email:
        process.env.SENDGRID_FROM_EMAIL ||
        process.env.FROM_EMAIL ||
        "noreply@jsinvestment.com",
      name: process.env.SENDGRID_FROM_NAME || APP_NAME,
    },
    subject: options.subject,
    text: options.text || options.html.replace(/<[^>]*>/g, ""),
    html: options.html,
  });
}

export async function sendPasswordResetEmail(
  email: string,
  resetToken: string,
  firstName?: string
): Promise<void> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  const resetUrl = `${baseUrl}/auth/reset-password?token=${resetToken}`;

  await sendEmail({
    to: email,
    subject: `Reset your ${APP_NAME} password`,
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #1f2937; max-width: 600px; margin: 0 auto; padding: 24px;">
        <h1 style="margin-top: 0;">${APP_NAME}</h1>
        <p>Hello ${firstName || "there"},</p>
        <p>We received a request to reset your portal password. Use the secure link below to continue.</p>
        <p style="margin: 24px 0;">
          <a href="${resetUrl}" style="background: #1d4ed8; color: #ffffff; padding: 12px 20px; border-radius: 6px; text-decoration: none;">
            Reset Password
          </a>
        </p>
        <p>If the button does not open, copy and paste this link into your browser:</p>
        <p>${resetUrl}</p>
        <p>This link expires in 1 hour. If you did not request this change, you can ignore this email.</p>
      </div>
    `,
  });
}
