"use client";

import { useSearchParams } from "next/navigation";
import { ArrowRight, AlertCircle, CheckCircle2 } from "lucide-react";
import { SubmitButton } from "@/components/submit-button";

export function OneForceForm() {
  const searchParams = useSearchParams();
  const formState = searchParams.get("form") ?? undefined;

  if (formState === "submitted") {
    return (
      <div className="lead-form one-force-form">
        <div className="form-status form-status--success" role="status">
          <CheckCircle2 size={22} aria-hidden="true" />
          <div>
            <strong>Almost there — confirm your email.</strong>
            <p>
              Check your work inbox for a confirmation email and click the link
              inside — once verified, we&apos;ll send the overview and our team
              will follow up when the context is a fit.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form className="lead-form one-force-form" action="/api/submissions" method="post">
      {formState === "error" ? (
        <div className="form-status form-status--error" role="status">
          <AlertCircle size={22} aria-hidden="true" />
          <div>
            <strong>That did not go through.</strong>
            <p>Please check the required fields and try again. If the problem continues, contact us by email.</p>
          </div>
        </div>
      ) : null}
      <input type="hidden" name="site" value="learn" />
      <input type="hidden" name="type" value="one_force_download" />
      <label className="lead-form__hp" aria-hidden="true">
        Website
        <input name="website" tabIndex={-1} autoComplete="off" />
      </label>
      <label>
        Full name
        <input name="name" autoComplete="name" required />
      </label>
      <label>
        Work email
        <input name="email" type="email" autoComplete="email" required />
      </label>
      <div className="lead-form__split">
        <label>
          Organisation
          <input name="company" autoComplete="organization" required />
        </label>
        <label>
          Role
          <input name="role" autoComplete="organization-title" required />
        </label>
      </div>
      <label>
        Where are you in the merger journey?
        <select name="merger_stage" defaultValue="" required>
          <option value="" disabled>
            Select one
          </option>
          <option>Pre-close planning</option>
          <option>0–6 months post-close</option>
          <option>6–18 months post-close</option>
          <option>Longer-term integration challenge</option>
        </select>
      </label>
      <label className="lead-form__consent">
        <input type="checkbox" name="consent" required />
        <span>
          I agree that LigerLearn may email the overview and contact me about
          this request.
        </span>
      </label>
      <SubmitButton className="poster-button">
        Send me the overview
        <ArrowRight size={17} aria-hidden="true" />
      </SubmitButton>
    </form>
  );
}
