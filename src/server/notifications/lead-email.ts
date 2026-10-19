import { Resend } from "resend";
import type { SubmissionRecord } from "@/server/submissions/schema";

const typeLabels: Record<string, string> = {
  cohort_interest: "Cohort interest",
  sponsor_pack: "Sponsor pack",
  discovery_call: "Discovery call",
  requirement: "Requirement",
  one_force_download: "One Force overview",
  diagnostic_call: "Diagnostic call",
  contact: "Contact",
};

const siteLabels: Record<string, string> = {
  remote: "LigerRemote",
  force: "LigerForce",
  learn: "LigerLearn",
  group: "Liger Group",
};

const ADMIN_EMAILS = ["oooshinowo@gmail.com", "hello@theliger.group"];
const FROM_ADDRESS = "Liger Group <hello@theliger.group>";

function getResend() {
  const key = process.env.RESEND_API_KEY;
  if (!key) return null;
  return new Resend(key);
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// Best-effort notifications — a failed send must never block the actual
// form submission, which has already been saved by this point.
export async function notifyAdminsOfNewLead(record: SubmissionRecord) {
  const resend = getResend();
  if (!resend) return;

  const siteLabel = siteLabels[record.site] ?? record.site;
  const typeLabel = typeLabels[record.type] ?? record.type;
  const payloadRows = Object.entries(record.payload)
    .filter(([key]) => !["site", "type", "name", "email", "phone", "company", "consent", "website"].includes(key))
    .map(([key, value]) => `<tr><td style="padding:4px 12px 4px 0;color:#666;">${escapeHtml(key)}</td><td>${escapeHtml(value)}</td></tr>`)
    .join("");

  try {
    await resend.emails.send(
      {
        from: FROM_ADDRESS,
        to: ADMIN_EMAILS,
        subject: `New lead: ${record.name} — ${siteLabel} (${typeLabel})`,
        html: `
          <h2 style="margin:0 0 12px;">New ${typeLabel.toLowerCase()} on ${siteLabel}</h2>
          <table style="border-collapse:collapse;font-family:sans-serif;font-size:14px;">
            <tr><td style="padding:4px 12px 4px 0;color:#666;">Name</td><td>${escapeHtml(record.name)}</td></tr>
            <tr><td style="padding:4px 12px 4px 0;color:#666;">Email</td><td>${escapeHtml(record.email)}</td></tr>
            ${record.phone ? `<tr><td style="padding:4px 12px 4px 0;color:#666;">Phone</td><td>${escapeHtml(record.phone)}</td></tr>` : ""}
            ${record.company ? `<tr><td style="padding:4px 12px 4px 0;color:#666;">Company</td><td>${escapeHtml(record.company)}</td></tr>` : ""}
            ${payloadRows}
          </table>
          <p style="margin-top:16px;">
            <a href="https://theliger.group/admin/leads">View in the admin dashboard</a>
          </p>
        `,
      },
      { idempotencyKey: `lead-notify/${record.id}` },
    );
  } catch (error) {
    console.error("Failed to send admin lead notification email", error);
  }
}

export async function sendSubmitterConfirmation(record: SubmissionRecord) {
  const resend = getResend();
  if (!resend) return;

  const siteLabel = siteLabels[record.site] ?? record.site;

  try {
    await resend.emails.send(
      {
        from: FROM_ADDRESS,
        to: record.email,
        subject: `We've received your submission — ${siteLabel}`,
        html: `
          <p>Hi ${escapeHtml(record.name.split(/\s+/)[0] ?? record.name)},</p>
          <p>Thanks for reaching out to ${siteLabel}. We've received your submission and someone from our team will be in touch shortly.</p>
          <p>— The Liger Group</p>
        `,
      },
      { idempotencyKey: `lead-confirm/${record.id}` },
    );
  } catch (error) {
    console.error("Failed to send submitter confirmation email", error);
  }
}
