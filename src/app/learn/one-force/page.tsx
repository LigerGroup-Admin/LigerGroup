import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { BrandMark } from "@/components/brand-mark";
import { FormStatus } from "@/components/form-status";

export const metadata: Metadata = {
  title: "One Force | Post-merger workforce integration",
  description:
    "A focused diagnostic and leadership intervention for insurance organisations navigating the human reality of a merger.",
};

export default async function OneForcePage({
  searchParams,
}: {
  searchParams: Promise<{ form?: string }>;
}) {
  const { form } = await searchParams;

  return (
    <main id="main-content" className="one-force-page">
      <header>
        <BrandMark brand="learn" light href="/learn" framed />
        <Link href="/learn">
          <ArrowLeft size={16} aria-hidden="true" /> Back to LigerLearn
        </Link>
      </header>

      <section className="one-force-hero">
        <p className="eyebrow">One Force · Post-merger integration</p>
        <h1 className="display-type">
          A merger does not create one workforce. Leadership does.
        </h1>
        <p>
          One Force helps insurance leadership teams diagnose and address the
          cultural, behavioural, and performance friction that persists after
          the transaction closes.
        </p>
        <a href="#overview" className="button button--light">
          Get the One Force overview
          <ArrowRight size={17} aria-hidden="true" />
        </a>
      </section>

      <section className="one-force-problem">
        <p className="eyebrow">The integration gap</p>
        <h2 className="display-type">
          The structure changes on paper. The organisation changes in behaviour.
        </h2>
        <div>
          <p>
            Teams carry inherited loyalties, habits, status signals, and ways of
            working into the new organisation. If these remain unnamed, they
            surface as slow decisions, fractured trust, duplicated effort, and
            inconsistent customer experience.
          </p>
          <p>
            One Force gives the executive team a shared view of the human
            integration risk—and a practical route from diagnosis to aligned
            leadership action.
          </p>
        </div>
      </section>

      <section className="one-force-signals">
        <div>
          <p className="eyebrow">What we examine</p>
          <h2 className="display-type">Four signals of one operating force.</h2>
        </div>
        <div>
          {[
            ["01", "Leadership alignment", "Do leaders tell the same story and reinforce the same priorities?"],
            ["02", "Decision clarity", "Are authority, escalation, and accountability understood across legacy lines?"],
            ["03", "Behavioural integration", "Do everyday routines support the new strategy—or protect the old organisations?"],
            ["04", "Performance confidence", "Can people see what success now requires and how their contribution is judged?"],
          ].map(([number, title, body]) => (
            <article key={number}>
              <span>{number}</span>
              <h3>{title}</h3>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="one-force-overview" id="overview">
        <div>
          <p className="eyebrow">The executive overview</p>
          <h2 className="display-type">Take the framework into your next leadership conversation.</h2>
          <p>
            Request the One Force overview. Femi will follow up personally within
            two business days if the context is a fit.
          </p>
          <div>
            <span>
              <Check size={15} aria-hidden="true" /> Diagnostic questions
            </span>
            <span>
              <Check size={15} aria-hidden="true" /> Intervention structure
            </span>
            <span>
              <Check size={15} aria-hidden="true" /> Leadership outcomes
            </span>
          </div>
        </div>
        <form className="lead-form one-force-form" action="/api/submissions" method="post">
          <FormStatus
            state={form}
            successTitle="The overview is on its way."
            successMessage="Please check your work inbox. Femi will follow up personally when the context is a fit."
          />
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
          <button type="submit" className="button button--learn">
            Send me the overview
            <ArrowRight size={17} aria-hidden="true" />
          </button>
        </form>
      </section>
    </main>
  );
}
