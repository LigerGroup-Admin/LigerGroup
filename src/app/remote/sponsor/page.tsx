import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { BrandMark } from "@/components/brand-mark";
import { FormStatus } from "@/components/form-status";

export const metadata: Metadata = {
  title: "Sponsor a cohort | LigerRemote",
  description:
    "Request the LigerRemote sponsor pack and explore funding practical remote-work pathways for African professionals.",
};

export default async function SponsorPage({
  searchParams,
}: {
  searchParams: Promise<{ form?: string }>;
}) {
  const { form } = await searchParams;

  return (
    <main id="main-content" className="remote-sponsor-page poster-page">
      <header>
        <BrandMark brand="remote" href="/remote" framed />
        <Link href="/remote">
          <ArrowLeft size={16} aria-hidden="true" />
          <span>Back to LigerRemote</span>
        </Link>
      </header>
      <section className="remote-sponsor-page__grid">
        <div className="remote-sponsor-page__intro">
          <p className="series-label">Corporate and institutional sponsorship</p>
          <h1 className="poster-display">Fund a pathway, not just a place.</h1>
          <p>
            Sponsor cohort places for ambitious African professionals and receive
            a clear account of participation, completion, work-readiness, and
            the outcomes your support makes possible.
          </p>
          <div>
            {[
              "Cohort and individual sponsorship options",
              "Outcome reporting for CSR and workforce teams",
              "Opportunities for employee mentoring and exposure",
            ].map((item) => (
              <span key={item}>
                <Check size={15} aria-hidden="true" /> {item}
              </span>
            ))}
          </div>
        </div>
        <form
          id="sponsor-enquiry"
          className="lead-form"
          action="/api/submissions"
          method="post"
        >
          <FormStatus
            state={form}
            successTitle="Sponsor pack requested."
            successMessage="We will send it to your work email and follow up with the right person for this conversation."
          />
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
          <button className="poster-button" type="submit">
            Send me the sponsor pack
            <ArrowRight size={17} aria-hidden="true" />
          </button>
        </form>
      </section>
    </main>
  );
}
