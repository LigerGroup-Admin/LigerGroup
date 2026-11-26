"use client";

import { useSearchParams } from "next/navigation";
import { ArrowRight, AlertCircle, CheckCircle2 } from "lucide-react";
import { SubmitButton } from "@/components/submit-button";

export function SponsorForm() {
  const searchParams = useSearchParams();
  const formState = searchParams.get("form") ?? undefined;

  if (formState === "submitted") {
    return (
      <div id="sponsor-enquiry" className="lead-form">
        <div className="form-status form-status--success" role="status">
          <CheckCircle2 size={22} aria-hidden="true" />
          <div>
            <strong>Sponsorship enquiry received.</strong>
            <p>
              Check your inbox for a confirmation email and click the link
              inside — once verified, a member of our team will follow up
              directly to discuss sponsorship.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form
      id="sponsor-enquiry"
      className="lead-form"
      action="/api/submissions"
      method="post"
    >
      {formState === "error" ? (
        <div className="form-status form-status--error" role="status">
          <AlertCircle size={22} aria-hidden="true" />
          <div>
            <strong>That did not go through.</strong>
            <p>Please check the required fields and try again. If the problem continues, contact us by email.</p>
          </div>
        </div>
      ) : null}
      <input type="hidden" name="site" value="remote" />
      <input type="hidden" name="type" value="sponsor_pack" />
      <label className="lead-form__hp" aria-hidden="true">
        Website
        <input name="website" tabIndex={-1} autoComplete="off" />
      </label>
      <div className="lead-form__split">
        <label>
          Full name
          <input name="name" autoComplete="name" required />
        </label>
        <label>
          Work email
          <input name="email" type="email" autoComplete="email" required />
        </label>
      </div>
      <div className="lead-form__split">
        <label>
          Organisation
          <input name="company" autoComplete="organization" required />
        </label>
        <label>
          Your role
          <input name="role" autoComplete="organization-title" required />
        </label>
      </div>
      <label>
        What kind of sponsorship are you exploring?
        <select name="sponsorship_interest" defaultValue="" required>
          <option value="" disabled>
            Select one
          </option>
          <option>Fund individual places</option>
          <option>Sponsor a full cohort</option>
          <option>CSR or foundation partnership</option>
          <option>Employer talent partnership</option>
          <option>Still exploring</option>
        </select>
      </label>
      <label>
        Anything we should know?
        <textarea name="message" placeholder="Optional context" />
      </label>
      <label className="lead-form__consent">
        <input type="checkbox" name="consent" required />
        <span>
          I agree that LigerRemote may send the sponsor pack and contact me
          about this request.
        </span>
      </label>
      <SubmitButton className="poster-button">
        Send me the sponsor pack
        <ArrowRight size={17} aria-hidden="true" />
      </SubmitButton>
    </form>
  );
}
