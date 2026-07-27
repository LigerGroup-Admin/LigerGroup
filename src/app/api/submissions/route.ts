import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { normaliseFormData, type SubmissionRecord } from "@/server/submissions/schema";
import { saveSubmission } from "@/server/submissions/repository";

const formAnchors: Record<string, string> = {
  cohort_interest: "apply",
  sponsor_pack: "sponsor-enquiry",
  discovery_call: "book",
  requirement: "requirement-form",
  one_force_download: "overview",
  diagnostic_call: "contact",
  contact: "contact",
};

function returnUrl(request: NextRequest, type: string, state: "submitted" | "error") {
  const fallback = new URL("/", request.url);
  const referrer = request.headers.get("referer");

  try {
    if (referrer) {
      const candidate = new URL(referrer);
      if (candidate.origin === fallback.origin) fallback.pathname = candidate.pathname;
    }
  } catch {
    // Use the safe same-origin fallback.
  }

  fallback.search = "";
  fallback.searchParams.set("form", state);
  fallback.hash = formAnchors[type] ?? "main-content";
  return fallback;
}

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const { parsed, entries } = normaliseFormData(formData);

  if (entries.website) {
    return NextResponse.redirect(returnUrl(request, entries.type, "submitted"), 303);
  }

  if (!parsed.success) {
    return NextResponse.redirect(returnUrl(request, entries.type, "error"), 303);
  }

  const referrer = request.headers.get("referer");
  let sourcePage: string | null = null;

  try {
    sourcePage = referrer ? new URL(referrer).pathname : null;
  } catch {
    sourcePage = null;
  }

  const record: SubmissionRecord = {
    ...parsed.data,
    id: crypto.randomUUID(),
    status: "new",
    payload: entries,
    sourcePage,
    referrer,
    userAgent: request.headers.get("user-agent"),
    createdAt: new Date().toISOString(),
  };

  try {
    await saveSubmission(record);
    return NextResponse.redirect(returnUrl(request, record.type, "submitted"), 303);
  } catch (error) {
    console.error("Unable to save form submission", error);
    return NextResponse.redirect(returnUrl(request, record.type, "error"), 303);
  }
}
