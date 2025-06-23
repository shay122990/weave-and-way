import { NextResponse } from "next/server";
import nodemailer from "nodemailer"

export async function POST(req: Request) {
  const { name, email, message } = await req.json();

  console.log("Received message:", { name, email, message });

  if (!name || !email || !message) {
    console.log("Missing fields");
    return NextResponse.json(
      { success: false, error: "Missing required fields." },
      { status: 400 }
    );
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const sendResult = await transporter.sendMail({
      from: `"${name}" <${email}>`,
      to: process.env.SMTP_USER,
      subject: `Message from ${name} via Weave & Way`,
      text: message,
    });

    console.log("Email send result:", sendResult);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Nodemailer error:", err);
    return NextResponse.json(
      { success: false, error: "Failed to send email." },
      { status: 500 }
    );
  }
}
