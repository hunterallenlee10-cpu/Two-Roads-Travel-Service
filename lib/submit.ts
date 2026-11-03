import type { TripAnswers } from "@/data/matchmaker";

export type TripRequestPayload = {
  type: "trip-request" | "callback";
  submittedAt: string;
  reference: string;
  answers: Partial<TripAnswers>;
  page: string;
};

/**
 * The single place every lead leaves the site.
 *
 * TODO: wire this to a webhook (n8n, Zapier, Make, a CRM form endpoint) when the client is ready.
 * Example:
 *   await fetch(process.env.NEXT_PUBLIC_TRIP_WEBHOOK_URL!, {
 *     method: "POST",
 *     headers: { "Content-Type": "application/json" },
 *     body: JSON.stringify(payload),
 *   });
 * Until then it logs the payload and resolves, so the success state can be shown.
 */
export async function submitTripRequest(payload: TripRequestPayload): Promise<{ ok: boolean }> {
  if (process.env.NODE_ENV !== "production") {
    console.info("[Two Roads] trip request (not sent, no webhook yet)", payload);
  }
  await new Promise((resolve) => setTimeout(resolve, 650));
  return { ok: true };
}

export function makeReference() {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let out = "";
  for (let i = 0; i < 5; i++) out += alphabet[Math.floor(Math.random() * alphabet.length)];
  return `TR-${out}`;
}
