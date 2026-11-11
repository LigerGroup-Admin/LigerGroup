import type { SubmissionRecord } from "@/server/submissions/schema";

export type SubmissionFilters = {
  site: string;
  status: string;
  range: string;
  q: string;
};

export function parseSubmissionFilters(raw: {
  site?: string;
  status?: string;
  range?: string;
  q?: string;
}): SubmissionFilters {
  return {
    site: ["remote", "force", "learn"].includes(raw.site ?? "") ? raw.site! : "all",
    status: ["new", "in_progress", "qualified", "closed"].includes(raw.status ?? "")
      ? raw.status!
      : "all",
    range: ["7d", "30d", "90d", "all"].includes(raw.range ?? "") ? raw.range! : "all",
    q: (raw.q ?? "").trim().toLowerCase(),
  };
}

export function matchesSubmissionFilters(row: SubmissionRecord, filters: SubmissionFilters) {
  if (filters.range !== "all") {
    const days = filters.range === "7d" ? 7 : filters.range === "90d" ? 90 : 30;
    if (new Date(row.createdAt).getTime() < Date.now() - days * 24 * 60 * 60 * 1000) return false;
  }
  if (filters.site !== "all" && row.site !== filters.site) return false;
  if (filters.status !== "all" && row.status !== filters.status) return false;
  if (filters.q) {
    const haystack = `${row.name} ${row.email} ${row.company ?? ""}`.toLowerCase();
    if (!haystack.includes(filters.q)) return false;
  }
  return true;
}
