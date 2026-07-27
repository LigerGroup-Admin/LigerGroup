import { z } from "zod";

const allowedTypes = {
  remote: ["cohort_interest", "sponsor_pack", "contact"],
  force: ["discovery_call", "requirement", "contact"],
  learn: ["one_force_download", "diagnostic_call", "contact"],
  group: ["contact"],
} as const;

export const submissionSchema = z
  .object({
    site: z.enum(["group", "remote", "force", "learn"]),
    type: z.string().trim().min(2).max(64),
    name: z.string().trim().min(2).max(120),
    email: z.string().trim().toLowerCase().email().max(254),
    phone: z.string().trim().max(40).optional(),
    company: z.string().trim().max(160).optional(),
    consent: z.literal(true),
    website: z.string().max(0).optional(),
  })
  .superRefine((submission, context) => {
    const types = allowedTypes[submission.site] as readonly string[];
    if (!types.includes(submission.type)) {
      context.addIssue({
        code: "custom",
        path: ["type"],
        message: "This form type is not valid for the selected site.",
      });
    }
  });

export type SubmissionInput = z.infer<typeof submissionSchema>;

export type SubmissionRecord = SubmissionInput & {
  id: string;
  status: "new" | "in_progress" | "qualified" | "closed";
  payload: Record<string, string>;
  sourcePage: string | null;
  referrer: string | null;
  userAgent: string | null;
  createdAt: string;
};

export function normaliseFormData(formData: FormData) {
  const entries: Record<string, string> = {};

  for (const [key, value] of formData.entries()) {
    if (typeof value !== "string" || key.startsWith("$ACTION_")) continue;
    entries[key] = value.trim().slice(0, 5000);
  }

  const parsed = submissionSchema.safeParse({
    site: entries.site,
    type: entries.type,
    name: entries.name,
    email: entries.email,
    phone: entries.phone || undefined,
    company: entries.company || undefined,
    consent: entries.consent === "on" || entries.consent === "true",
    website: entries.website || undefined,
  });

  return { parsed, entries };
}
