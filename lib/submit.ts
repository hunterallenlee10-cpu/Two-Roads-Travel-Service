import type { TripAnswers } from "@/data/matchmaker";

export type TripRequestPayload = {
  type: "trip-request" | "callback";
  submittedAt: string;
  reference: string;
  answers: Partial<TripAnswers>;
  page: string;
  /** Honeypot value. Empty for real visitors. */
  website?: string;
};

/**
 * The single place every lead leaves the site.
 * Posts to /api/lead, which emails Michele through the n8n workflow. Returns ok: false if it did not go through,
 * so the form can ask the visitor to call instead.
 */
export async function submitTripRequest(payload: TripRequestPayload): Promise<{ ok: boolean }> {
  try {
    const res = await fetch("/api/lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    return { ok: res.ok };
  } catch {
    return { ok: false };
  }
}

export function makeReference() {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let out = "";
  for (let i = 0; i < 5; i++) out += alphabet[Math.floor(Math.random() * alphabet.length)];
  return `TR-${out}`;
}
