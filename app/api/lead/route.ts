import { SITE } from "@/data/site";
import { buildLeadEmail } from "@/lib/lead-email";
import type { TripRequestPayload } from "@/lib/submit";

/**
 * Receives Trip Matchmaker and call-back requests and forwards them to the n8n workflow
 * "Two Roads: Website leads to Michele", which emails mshannon@tworoadstravelservice.com.
 * The webhook URL and key live only on the server (Vercel env: LEAD_WEBHOOK_URL, LEAD_WEBHOOK_SECRET).
 */
const EMAIL = /^[^\s@<>"',;]+@[^\s@<>"',;]+\.[^\s@<>"',;]{2,}$/;

export async function POST(request: Request) {
  const url = process.env.LEAD_WEBHOOK_URL;
  const secret = process.env.LEAD_WEBHOOK_SECRET;
  if (!url || !secret) {
    console.error("[lead] LEAD_WEBHOOK_URL or LEAD_WEBHOOK_SECRET is not set");
    return Response.json({ ok: false }, { status: 503 });
  }

  let payload: TripRequestPayload & { website?: string };
  try {
    const text = await request.text();
    if (text.length > 20_000) return Response.json({ ok: false }, { status: 413 });
    payload = JSON.parse(text);
  } catch {
    return Response.json({ ok: false }, { status: 400 });
  }

  // Honeypot: people never see this field, bots often fill it. Pretend it worked.
  if (payload.website) return Response.json({ ok: true });

  const a = payload.answers ?? {};
  const name = typeof a.name === "string" ? a.name.trim() : "";
  const digits = typeof a.phone === "string" ? a.phone.replace(/\D/g, "") : "";
  if (!["trip-request", "callback"].includes(payload.type) || !name || digits.length < 10) {
    return Response.json({ ok: false }, { status: 400 });
  }

  const { subject, html, replyTo } = buildLeadEmail(payload, SITE.url);
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-two-roads-key": secret },
      body: JSON.stringify({ subject, html, replyTo: EMAIL.test(replyTo) ? replyTo : "", reference: payload.reference, type: payload.type }),
      signal: AbortSignal.timeout(15_000),
    });
    if (!res.ok) {
      console.error(`[lead] webhook answered ${res.status} for ${payload.reference}`);
      return Response.json({ ok: false }, { status: 502 });
    }
  } catch (err) {
    console.error(`[lead] webhook failed for ${payload.reference}`, err);
    return Response.json({ ok: false }, { status: 502 });
  }
  return Response.json({ ok: true });
}
