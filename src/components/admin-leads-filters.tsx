"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import { AdminDateRangeSelect } from "@/components/admin-date-range-select";

export function AdminLeadsFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const site = searchParams.get("site") ?? "all";
  const status = searchParams.get("status") ?? "all";

  function updateParam(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value === "all" || value === "") {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    params.delete("page");
    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="admin-toolbar">
      <label>
        <Search size={15} aria-hidden="true" />
        <input
          placeholder="Search name, email, or company"
          defaultValue={searchParams.get("q") ?? ""}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              updateParam("q", event.currentTarget.value.trim());
            }
          }}
        />
      </label>
      <div>
        <select
          aria-label="Filter by site"
          value={site}
          onChange={(event) => updateParam("site", event.target.value)}
        >
          <option value="all">All sites</option>
          <option value="remote">LigerRemote</option>
          <option value="force">LigerForce</option>
          <option value="learn">LigerLearn</option>
        </select>
        <select
          aria-label="Filter by status"
          value={status}
          onChange={(event) => updateParam("status", event.target.value)}
        >
          <option value="all">All statuses</option>
          <option value="new">New</option>
          <option value="in_progress">In progress</option>
          <option value="qualified">Qualified</option>
          <option value="closed">Closed</option>
        </select>
        <AdminDateRangeSelect />
      </div>
    </div>
  );
}
