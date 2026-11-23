import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  const apiKey = process.env.RESEND_API_KEY;
  const recipient = process.env.CONTACT_EMAIL;
  const sender = process.env.RESEND_FROM_EMAIL;
  if (!apiKey || !recipient || !sender) {
    return NextResponse.json({ message: "The contact form is not configured yet. Please use the email link instead." }, { status: 503 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ message: "Please submit a valid message." }, { status: 400 });
  }
  if (!body || typeof body !== "object") {
    return NextResponse.json({ message: "Please submit a valid message." }, { status: 400 });
  }
  const values = body as Record<string, unknown>;
  const name = typeof values.name === "string" ? values.name.trim() : "";
  const email = typeof values.email === "string" ? values.email.trim() : "";
  const message = typeof values.message === "string" ? values.message.trim() : "";
  const website = typeof values.website === "string" ? values.website.trim() : "";
  if (website) return NextResponse.json({ message: "Please submit a valid message." }, { status: 400 });
  if (!name || name.length > 100 || /[\r\n]/.test(name) || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254 || !message || message.length > 5000) {
    return NextResponse.json({ message: "Check the name, email and message fields, then try again." }, { status: 400 });
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: sender,
      to: [recipient],
      reply_to: email,
      subject: `Portfolio enquiry from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    }),
  });
  if (!response.ok) {
    console.error("Contact email delivery failed", response.status);
    return NextResponse.json({ message: "The message could not be delivered. Please try again or use the email link." }, { status: 502 });
  }
  return NextResponse.json({ message: "Thank you. Your message has been sent." });
}
