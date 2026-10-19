import { listSubmissions } from "@/server/submissions/repository";
import type { SubmissionRecord } from "@/server/submissions/schema";

// Deduplicate by email — most recent submission per person becomes their
// contact record, since that's the freshest name/company/site we have.
export async function getContacts(): Promise<SubmissionRecord[]> {
  const submissions = await listSubmissions(1000);

  const byEmail = new Map<string, SubmissionRecord>();
  for (const submission of submissions) {
    const existing = byEmail.get(submission.email);
    if (!existing || new Date(submission.createdAt) > new Date(existing.createdAt)) {
      byEmail.set(submission.email, submission);
    }
  }

  return Array.from(byEmail.values()).sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );
}
