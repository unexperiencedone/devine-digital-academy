import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, email } = body;

    // Server-side validation
    if (!name || !phone || !email) {
      return NextResponse.json(
        { error: "Name, Phone, and Email are required fields." },
        { status: 400 }
      );
    }

    const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
    
    if (webhookUrl) {
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          phone,
          email,
          timestamp: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        console.error("Failed to forward lead to Google Sheets webhook:", response.statusText);
      }
    } else {
      console.warn("GOOGLE_SHEETS_WEBHOOK_URL environment variable is not defined. Lead printed locally:", { name, phone, email });
    }

    // Return success to the client so that the checkout flow is never blocked
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Error processing serverless lead submission:", err);
    // Graceful fallback to avoid blocking the checkout redirection in the frontend
    return NextResponse.json({ success: true });
  }
}
