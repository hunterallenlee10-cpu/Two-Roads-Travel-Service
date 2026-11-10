import type { TripRequestPayload } from "@/lib/submit";

/** Server-only: turns a website lead into the email Michele receives. */

const ROAD_LABELS: Record<string, string> = { unwind: "Unwind", discover: "Discover", both: "A little of both" };

const esc = (v: unknown) =>
  String(v ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const clean = (v: unknown, max = 500) => (typeof v === "string" ? v.trim().slice(0, max) : "");
const list = (v: unknown) => (Array.isArray(v) ? v.filter((x) => typeof x === "string").map((x) => clean(x, 120)).filter(Boolean).slice(0, 30) : []);

export function buildLeadEmail(p: TripRequestPayload, siteUrl: string) {
  const a = p.answers ?? {};
  const isCallback = p.type === "callback";
  const name = clean(a.name, 120) || "Website visitor";
  const email = clean(a.email, 200);
  const phone = clean(a.phone, 40);
  const ref = clean(p.reference, 20);
  const when = new Date(p.submittedAt || Date.now()).toLocaleString("en-US", {
    timeZone: "America/New_York",
    dateStyle: "full",
    timeStyle: "short",
  });

  const contact: [string, string][] = [
    ["Name", name],
    ["Phone", phone],
    ["Email", email],
    ["Best time to call", clean(a.callTime, 40)],
  ];
  const trip: [string, string][] = isCallback
    ? []
    : [
        ["Started from", clean(a.interest, 160)],
        ["Road", ROAD_LABELS[clean(a.road, 20)] ?? ""],
        ["Traveling", clean(a.travelers, 120)],
        ["Drawn to", list(a.places).join(", ") || "Open"],
        ["When", clean(a.when, 60)],
        ["Trip length", clean(a.length, 60)],
        ["Budget per person", clean(a.budget, 60)],
        ["Would make it unforgettable", list(a.extras).join(", ")],
      ];
  const notes = isCallback ? "" : clean(a.notes, 3000);

  const row = ([k, v]: [string, string]) => {
    if (!v) return "";
    let value = esc(v);
    if (k === "Phone") value = `<a href="tel:${esc(v.replace(/[^\d+]/g, ""))}" style="color:#9a3f1d">${value}</a>`;
    if (k === "Email") value = `<a href="mailto:${esc(v)}" style="color:#9a3f1d">${value}</a>`;
    return `<tr><td style="padding:8px 16px 8px 0;color:#5b6b70;font-size:13px;vertical-align:top;white-space:nowrap">${esc(k)}</td><td style="padding:8px 0;color:#0e2a33;font-size:15px">${value}</td></tr>`;
  };
  const table = (rows: [string, string][]) => `<table role="presentation" cellpadding="0" cellspacing="0" style="border-collapse:collapse">${rows.map(row).join("")}</table>`;
  const heading = (t: string) => `<h2 style="margin:28px 0 8px;font-size:12px;letter-spacing:.12em;text-transform:uppercase;color:#9a3f1d">${t}</h2>`;

  const subject = isCallback ? `Call-back request: ${name} (${ref})` : `New trip request: ${name} (${ref})`;
  const intro = isCallback
    ? `${esc(name)} asked for a call back from the website.`
    : `${esc(name)} finished the Trip Matchmaker on the website.`;

  const html = `<div style="font-family:Helvetica,Arial,sans-serif;max-width:620px;margin:0 auto;padding:24px;color:#0e2a33">
<p style="margin:0;font-size:12px;letter-spacing:.12em;text-transform:uppercase;color:#5b6b70">Two Roads Travel Service website</p>
<h1 style="margin:8px 0 4px;font-size:24px;font-weight:normal">${esc(subject)}</h1>
<p style="margin:0 0 4px;font-size:15px">${intro}</p>
<p style="margin:0;font-size:13px;color:#5b6b70">${esc(when)} (Eastern) · Reference ${esc(ref)}</p>
${heading("Contact")}${table(contact)}
${trip.length ? heading("Their trip") + table(trip) : ""}
${notes ? heading("In their words") + `<p style="margin:0;font-size:15px;line-height:1.5;white-space:pre-wrap">${esc(notes)}</p>` : ""}
<p style="margin:32px 0 0;font-size:12px;color:#5b6b70">Sent from ${esc(siteUrl)}${esc(clean(p.page, 200))}.${email ? " Reply to this email to answer them directly." : ""} They were told you will reach out within one business day.</p>
</div>`;

  return { subject, html, replyTo: email };
}
