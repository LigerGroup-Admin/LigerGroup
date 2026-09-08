"use client";

import { useEffect, useState } from "react";
import { AlertCircle, ArrowRight, CheckCircle2 } from "lucide-react";
import {
  FORCE_ROLE_OPTIONS,
  FORCE_ROLE_OTHER_SLUG,
  forceRoleLabel,
} from "@/lib/force-roles";

const STORAGE_KEY = "force_last_role_label";

function ForceFormStatus({ formState }: { formState?: string }) {
  const [lastRoleLabel, setLastRoleLabel] = useState<string | null>(null);

  useEffect(() => {
    if (formState !== "submitted") return;
    try {
      setLastRoleLabel(window.sessionStorage.getItem(STORAGE_KEY));
    } catch {
      // Storage may be unavailable (private browsing); fall back to generic copy.
    }
  }, [formState]);

  if (formState !== "submitted" && formState !== "error") return null;

  const success = formState === "submitted";

  return (
    <div
      className={`form-status form-status--${success ? "success" : "error"}`}
      role="status"
    >
      {success ? (
        <CheckCircle2 size={22} aria-hidden="true" />
      ) : (
        <AlertCircle size={22} aria-hidden="true" />
      )}
      <div>
        <strong>{success ? "Your request is with us." : "That did not go through."}</strong>
        <p>
          {success
            ? lastRoleLabel
              ? `Thanks — we've received your ${lastRoleLabel} requirement and will be in touch within 1 business day to discuss fit and next steps.`
              : "We will be in touch within 1 business day to discuss fit and next steps."
            : "Please check the required fields and try again. If the problem continues, contact us by email."}
        </p>
      </div>
    </div>
  );
}

export function ForceBookingForm({
  formState,
  initialRole,
}: {
  formState?: string;
  initialRole?: string;
}) {
  const validInitialRole =
    initialRole &&
    (initialRole === FORCE_ROLE_OTHER_SLUG || forceRoleLabel(initialRole))
      ? initialRole
      : "";
  const [role, setRole] = useState(validInitialRole);

  useEffect(() => {
    const label = forceRoleLabel(role);
    if (!label) return;
    try {
      window.sessionStorage.setItem(STORAGE_KEY, label);
    } catch {
      // Ignore storage failures; success message just falls back to generic copy.
    }
  }, [role]);

  return (
    <form className="lead-form force-form" action="/api/submissions" method="post">
      <ForceFormStatus formState={formState} />
      <input type="hidden" name="site" value="force" />
      <input type="hidden" name="type" value="discovery_call" />
      <input type="hidden" name="requirement_role_label" value={forceRoleLabel(role) ?? ""} />
      <label className="lead-form__hp" aria-hidden="true">
        Website
        <input name="website" tabIndex={-1} autoComplete="off" />
      </label>
      <label>
        Your name
        <input name="name" autoComplete="name" required placeholder="Full name" />
      </label>
      <label>
        Work email
        <input
          name="email"
          type="email"
          autoComplete="email"
          required
          placeholder="you@company.com"
        />
      </label>
      <div className="lead-form__split">
        <label>
          Company
          <input name="company" autoComplete="organization" required />
        </label>
        <label>
          Team size
          <select name="team_size" defaultValue="">
            <option value="" disabled>
              Select
            </option>
            <option>1–10</option>
            <option>11–50</option>
            <option>51–200</option>
            <option>201+</option>
          </select>
          <span className="force-form__microcopy">
            This helps us match you with the right onboarding process for your team size.
          </span>
        </label>
      </div>
      <label>
        What kind of support do you need?
        <select
          name="requirement_role"
          required
          value={role}
          onChange={(event) => setRole(event.target.value)}
        >
          <option value="" disabled>
            Select a role
          </option>
          {FORCE_ROLE_OPTIONS.map((option) => (
            <option key={option.slug} value={option.slug}>
              {option.label}
            </option>
          ))}
          <option value={FORCE_ROLE_OTHER_SLUG}>Other</option>
        </select>
      </label>
      {role === FORCE_ROLE_OTHER_SLUG ? (
        <label>
          Tell us the role
          <input name="requirement_other" required placeholder="A sentence or two is enough." />
        </label>
      ) : null}
      <label className="lead-form__consent">
        <input type="checkbox" name="consent" required />
        <span>
          I agree that LigerForce may contact me about this requirement.
        </span>
      </label>
      <button className="poster-button" type="submit">
        Book my 20-minute call
        <ArrowRight size={17} aria-hidden="true" />
      </button>
    </form>
  );
}
