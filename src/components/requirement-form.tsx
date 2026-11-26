"use client";

import { useSearchParams } from "next/navigation";
import { ArrowRight, AlertCircle, CheckCircle2 } from "lucide-react";
import { SubmitButton } from "@/components/submit-button";

export function RequirementForm() {
  const searchParams = useSearchParams();
  const formState = searchParams.get("form") ?? undefined;

  if (formState === "submitted") {
    return (
      <div id="requirement-form" className="lead-form force-form">
        <div className="form-status form-status--success" role="status">
          <CheckCircle2 size={22} aria-hidden="true" />
          <div>
            <strong>Requirement received.</strong>
            <p>
              Check your inbox for a confirmation email and click the link
              inside — once verified, a member of the LigerForce team will
              review it and respond within one business day.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form
      id="requirement-form"
      className="lead-form force-form"
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
      <input type="hidden" name="site" value="force" />
      <input type="hidden" name="type" value="requirement" />
      <label className="lead-form__hp" aria-hidden="true">
        Website
        <input name="website" tabIndex={-1} autoComplete="off" />
      </label>
      <div className="lead-form__split">
        <label>
          Your name
          <input name="name" autoComplete="name" required />
        </label>
        <label>
          Work email
          <input name="email" type="email" autoComplete="email" required />
        </label>
      </div>
      <div className="lead-form__split">
        <label>
          Company
          <input name="company" autoComplete="organization" required />
        </label>
        <label>
          When do you need someone?
          <select name="timeline" defaultValue="" required>
            <option value="" disabled>
              Select
            </option>
            <option>As soon as possible</option>
            <option>Within 2–4 weeks</option>
            <option>Within 1–3 months</option>
            <option>Exploring for later</option>
          </select>
        </label>
      </div>
      <label>
        Role or area of support
        <input
          name="role"
          required
          placeholder="e.g. Executive Assistant, Customer Operations"
        />
      </label>
      <label>
        What should this person own or improve?
        <textarea
          name="requirement"
          required
          placeholder="Describe the work and the outcome you need."
        />
      </label>
      <label>
        Preferred working hours or overlap
        <input name="working_hours" placeholder="e.g. 09:00–17:00 UK time" />
      </label>
      <label className="lead-form__consent">
        <input type="checkbox" name="consent" required />
        <span>I agree that LigerForce may contact me about this requirement.</span>
      </label>
      <SubmitButton className="poster-button">
        Submit my requirement
        <ArrowRight size={17} aria-hidden="true" />
      </SubmitButton>
    </form>
  );
}
