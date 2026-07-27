import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Clock3 } from "lucide-react";
import { BrandMark } from "@/components/brand-mark";
import { FormStatus } from "@/components/form-status";

export const metadata: Metadata = {
  title: "Submit a requirement | LigerForce",
  description:
    "Tell LigerForce what role or support you need and receive a response within one business day.",
};

export default async function RequirementPage({
  searchParams,
}: {
  searchParams: Promise<{ form?: string }>;
}) {
  const { form } = await searchParams;

  return (
    <main id="main-content" className="force-requirement">
      <header>
        <BrandMark brand="force" href="/force" framed />
        <Link href="/force">
          <ArrowLeft size={16} aria-hidden="true" /> Back to LigerForce
        </Link>
      </header>
      <section>
        <div className="force-requirement__intro">
          <p className="eyebrow">For ready-to-move founders</p>
          <h1>Tell us what good support looks like.</h1>
          <p>
            Share the role, the outcome, and the working pattern. We will review
            it and respond with the most useful next step.
          </p>
          <span>
            <Clock3 size={16} aria-hidden="true" /> Response within one business day
          </span>
        </div>
        <form
          id="requirement-form"
          className="lead-form force-form"
          action="/api/submissions"
          method="post"
        >
          <FormStatus
            state={form}
            successTitle="Requirement received."
            successMessage="A member of the LigerForce team will review it and respond within one business day."
          />
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
          <button className="button button--force" type="submit">
            Submit my requirement
            <ArrowRight size={17} aria-hidden="true" />
          </button>
        </form>
      </section>
    </main>
  );
}
