import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check, Clock3, ShieldCheck } from "lucide-react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { FormStatus } from "@/components/form-status";
import { PosterScene } from "@/components/poster-scene";
import { ForceScene } from "@/components/scenes";

export const metadata: Metadata = {
  title: "LigerForce | Managed remote talent",
  description:
    "Vetted remote professionals with structured onboarding, performance support, and one accountable partner.",
};

const steps = [
  {
    number: "01",
    title: "Set the brief",
    body: "Tell us the work, the outcomes, and the way your team operates. We challenge ambiguity before it becomes a hiring problem.",
  },
  {
    number: "02",
    title: "Meet the right person",
    body: "We source from a trained talent pipeline, test for the role, and introduce a small number of credible matches.",
  },
  {
    number: "03",
    title: "Get managed delivery",
    body: "We support onboarding, performance, HR, and continuity. You direct the work; we protect the working relationship.",
  },
];

export default async function ForceHomePage({
  searchParams,
}: {
  searchParams: Promise<{ form?: string }>;
}) {
  const { form } = await searchParams;

  return (
    <div className="force-page poster-page">
      <SiteHeader
        brand="force"
        nav={[
          { label: "How it works", href: "#how" },
          { label: "Why managed", href: "#managed" },
          { label: "Case study", href: "#case-study" },
        ]}
        cta={{ label: "Book a 20-minute call", href: "#book" }}
      />

      <main id="main-content">
        <section className="force-hero poster-sheet" aria-label="LigerForce">
          <PosterScene className="force-hero__scene">
            <ForceScene />
          </PosterScene>
          <div className="force-hero__copy reveal">
            <p className="hero-chip">
              Series No. 02 · Remote talent without the uncertainty
            </p>
            <h1>
              Managed.
              <br />
              Vetted.
              <br />
              Accountable.
            </h1>
            <p className="force-hero__intro">
              You set the brief. We find, prepare, and manage the person—so
              adding remote capacity does not add another management problem.
            </p>
          </div>
        </section>

        <div className="caption-bar ink-field ink-field--deep force-hero__caption">
          <p className="caption-bar__imperative">
            Add capacity. Not complexity.
          </p>
          <Link href="#book" className="poster-button poster-button--warm">
            Book a 20-minute call
            <ArrowRight size={17} aria-hidden="true" />
          </Link>
        </div>

        <section className="force-facts" aria-label="Service facts">
          <div>
            <span>Typical introduction</span>
            <strong>5 business days</strong>
          </div>
          <div>
            <span>Management model</span>
            <strong>HR + performance + continuity</strong>
          </div>
          <div>
            <span>Your point of contact</span>
            <strong>One accountable partner</strong>
          </div>
        </section>

        <section className="force-how" id="how">
          <p className="series-label">No. 01 · A clearer way to hire remotely</p>
          <h2 className="poster-display">
            Not a marketplace. A managed relationship.
          </h2>
          <div className="force-how__steps">
            {steps.map((step) => (
              <article key={step.number}>
                <span>{step.number}</span>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="force-managed ink-field ink-field--2" id="managed">
          <div className="force-managed__statement">
            <p className="series-label">No. 02 · We know what you are thinking</p>
            <h2>
              “I have tried a remote freelancer before. It created more work,
              not less.”
            </h2>
          </div>
          <div className="force-managed__answers">
            <div>
              <span>01</span>
              <p>
                <strong>Quality is observed, not claimed.</strong> Talent is
                trained, assessed, and tested in real working conditions before
                a match is made.
              </p>
            </div>
            <div>
              <span>02</span>
              <p>
                <strong>You do not inherit the HR burden.</strong> We support
                onboarding, attendance, performance conversations, and
                continuity.
              </p>
            </div>
            <div>
              <span>03</span>
              <p>
                <strong>There is someone accountable.</strong> When something
                needs attention, you have a partner—not a platform ticket.
              </p>
            </div>
          </div>
        </section>

        <section className="force-case ink-field ink-field--1" id="case-study">
          <div className="force-case__label">
            <span>Case study / Local Insights</span>
            <span>Managed operations support</span>
          </div>
          <div className="force-case__content">
            <p className="series-label">No. 03 · The model in practice</p>
            <h2 className="poster-display">
              Dependable delivery capacity, without building another hiring
              function.
            </h2>
            <p>
              A closer look at how a clear brief, a role-specific match, and
              structured performance support create a more reliable remote
              working relationship.
            </p>
          </div>
          <div className="force-case__flow" aria-label="Case study journey">
            <div>
              <span>Brief</span>
              <strong>Define the outcome</strong>
            </div>
            <ArrowRight size={20} aria-hidden="true" />
            <div>
              <span>Match</span>
              <strong>Prove role fit</strong>
            </div>
            <ArrowRight size={20} aria-hidden="true" />
            <div>
              <span>Manage</span>
              <strong>Protect delivery</strong>
            </div>
          </div>
        </section>

        <section className="force-included">
          <p className="series-label">Built into every placement</p>
          <h2 className="poster-display">Less uncertainty. Fewer loose ends.</h2>
          <div className="force-included__list">
            {[
              "Role-specific vetting",
              "Structured onboarding",
              "Performance check-ins",
              "HR and attendance support",
              "Continuity planning",
              "One commercial relationship",
            ].map((item) => (
              <div key={item}>
                <Check size={16} aria-hidden="true" />
                {item}
              </div>
            ))}
          </div>
        </section>

        <section className="force-book" id="book">
          <div className="force-book__intro">
            <p className="series-label">No. 04 · One useful conversation</p>
            <h2 className="poster-display">Tell us where work is getting stuck.</h2>
            <p>
              In 20 minutes we will establish whether the LigerForce model fits
              the role you need. If it does not, we will say so.
            </p>
            <div>
              <span>
                <Clock3 size={16} aria-hidden="true" /> 20 minutes
              </span>
              <span>
                <ShieldCheck size={16} aria-hidden="true" /> No hard sell
              </span>
            </div>
          </div>
          <form className="lead-form force-form" action="/api/submissions" method="post">
            <FormStatus
              state={form}
              successTitle="Your request is with us."
              successMessage="We will email the most useful next step and available call times shortly."
            />
            <input type="hidden" name="site" value="force" />
            <input type="hidden" name="type" value="discovery_call" />
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
              </label>
            </div>
            <label>
              What kind of support do you need?
              <textarea
                name="requirement"
                required
                placeholder="A sentence or two is enough."
              />
            </label>
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
        </section>

        <section className="force-ready ink-field ink-field--3">
          <p>Already know exactly what you need?</p>
          <Link href="/force/requirement" className="poster-button">
            Submit a requirement
            <ArrowRight size={15} aria-hidden="true" />
          </Link>
        </section>
      </main>

      <SiteFooter
        brand="force"
        statement="Remote talent should create capacity—not complexity."
        email="hello@ligerforce.com"
      />
    </div>
  );
}
