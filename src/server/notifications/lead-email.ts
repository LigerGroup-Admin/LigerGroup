import { Resend } from "resend";
import type { SubmissionRecord } from "@/server/submissions/schema";
import { siteOrigins } from "@/lib/brands";

const typeLabels: Record<string, string> = {
  cohort_interest: "Cohort interest",
  sponsor_pack: "Sponsor pack",
  discovery_call: "Discovery call",
  requirement: "Requirement",
  one_force_download: "One Force overview",
  diagnostic_call: "Diagnostic call",
  contact: "Contact",
  "learn-conversation": "Qualifying conversation",
};

const siteLabels: Record<string, string> = {
  remote: "LigerRemote",
  force: "LigerForce",
  learn: "LigerLearn",
  group: "Liger Group",
};

const ADMIN_OWNER_EMAIL = "oooshinowo@gmail.com";
const DEFAULT_ADMIN_EMAIL = "hello@theliger.group";
const DEFAULT_SEND_DOMAIN = "theliger.group";

// Brands with their own verified Resend sending domain send (and notify)
// from their own address instead of the shared hello@theliger.group.
const brandSendDomains: Partial<Record<string, string>> = {
  force: "ligerforce.com",
};

// Sends from a verified domain, with the display name and address matching
// the brand the lead actually applied through where that brand has its own
// verified domain — otherwise falls back to the shared Liger Group address.
function brandFromAddress(site: string) {
  const siteLabel = siteLabels[site] ?? site;
  const domain = brandSendDomains[site] ?? DEFAULT_SEND_DOMAIN;
  return `${siteLabel} <hello@${domain}>`;
}

function adminRecipients(site: string) {
  const domain = brandSendDomains[site];
  return [ADMIN_OWNER_EMAIL, domain ? `hello@${domain}` : DEFAULT_ADMIN_EMAIL];
}

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
        from: brandFromAddress(record.site),
        to: adminRecipients(record.site),
        subject: `New lead: ${record.name} — ${siteLabel} (${typeLabel})`,
        html: `
          <h2 style="margin:0 0 12px;">New ${typeLabel.toLowerCase()} on ${siteLabel}</h2>
          <table style="border-collapse:collapse;font-family:sans-serif;font-size:14px;">
            <tr><td style="padding:4px 12px 4px 0;color:#666;">Name</td><td>${escapeHtml(record.name)}</td></tr>
            <tr><td style="padding:4px 12px 4px 0;color:#666;">Email</td><td>${escapeHtml(record.email)} <em>(unverified — awaiting confirmation)</em></td></tr>
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
  const origin = siteOrigins[record.site] ?? siteOrigins.group;
  const verifyUrl = `${origin}/api/verify-email?token=${record.verificationToken}`;

  try {
    await resend.emails.send(
      {
        from: brandFromAddress(record.site),
        to: record.email,
        subject: `Please confirm your email — ${siteLabel}`,
        html: `
          <p>Hi ${escapeHtml(record.name.split(/\s+/)[0] ?? record.name)},</p>
          <p>Thanks for reaching out to ${siteLabel}. We've received your submission — please confirm your email address so we know it's really you:</p>
          <p style="margin:24px 0;">
            <a href="${verifyUrl}" style="display:inline-block;padding:12px 20px;background:#1b1b1b;color:#fff;text-decoration:none;border-radius:4px;">
              Confirm my email
            </a>
          </p>
          <p>Once confirmed, someone from our team will be in touch shortly.</p>
          <p>— The ${siteLabel} Team</p>
        `,
      },
      { idempotencyKey: `lead-confirm/${record.id}` },
    );
  } catch (error) {
    console.error("Failed to send submitter confirmation email", error);
  }
}
