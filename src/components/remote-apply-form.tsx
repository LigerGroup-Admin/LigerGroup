"use client";

import { useSearchParams } from "next/navigation";
import { ArrowRight, AlertCircle, CheckCircle2 } from "lucide-react";
import { SubmitButton } from "@/components/submit-button";

export function RemoteApplyForm() {
  const searchParams = useSearchParams();
  const formState = searchParams.get("form") ?? undefined;

  if (formState === "submitted") {
    return (
      <div className="lead-form">
        <div className="form-status form-status--success" role="status">
          <CheckCircle2 size={22} aria-hidden="true" />
          <div>
            <strong>You are on the list.</strong>
            <p>
              Check your inbox for a confirmation email and click the link
              inside — once verified, we&apos;ll send the next application
              step and cohort details.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form className="lead-form" action="/api/submissions" method="post">
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
      <input type="hidden" name="type" value="cohort_interest" />
      <label className="lead-form__hp" aria-hidden="true">
        Website
        <input name="website" tabIndex={-1} autoComplete="off" />
      </label>
      <label>
        Full name
        <input name="name" autoComplete="name" required placeholder="Your full name" />
      </label>
      <label>
        Email address
        <input
          name="email"
          type="email"
          autoComplete="email"
          required
          placeholder="you@example.com"
        />
      </label>
      <div className="lead-form__split">
        <label>
          Phone number
          <input
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder="+ Country code and number"
          />
        </label>
        <label>
          Current city
          <input name="city" autoComplete="address-level2" placeholder="e.g. Lagos" />
        </label>
      </div>
      <label>
        Where are you in your career?
        <select name="career_stage" required defaultValue="">
          <option value="" disabled>
            Select one
          </option>
          <option>Recent graduate</option>
          <option>Early-career professional</option>
          <option>Changing careers</option>
          <option>Already freelancing remotely</option>
        </select>
      </label>
      <label className="lead-form__consent">
        <input type="checkbox" name="consent" required />
        <span>
          I agree to receive information about this cohort and understand I
          can unsubscribe at any time.
        </span>
      </label>
      <SubmitButton className="poster-button">
        Continue my application
        <ArrowRight size={17} aria-hidden="true" />
      </SubmitButton>
    </form>
  );
}
