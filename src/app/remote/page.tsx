import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Check,
  ChevronDown,
  Clock3,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { FormStatus } from "@/components/form-status";

export const metadata: Metadata = {
  title: "LigerRemote | Build a career the world can hire",
  description:
    "Practical remote-work training, supervised experience, and a credible pathway into global opportunities for African professionals.",
};

const programme = [
  {
    number: "01",
    title: "Train",
    detail:
      "Build the communication, digital workflow, and client-readiness skills global teams expect.",
    meta: "4-week accelerator",
  },
  {
    number: "02",
    title: "Test",
    detail:
      "Deliver real tasks in a supervised business environment—not classroom simulations.",
    meta: "4-week internship",
  },
  {
    number: "03",
    title: "Deploy",
    detail:
      "Graduate with evidence of how you work and access to vetted employer opportunities.",
    meta: "Talent network",
  },
];

export default async function RemoteHomePage({
  searchParams,
}: {
  searchParams: Promise<{ form?: string }>;
}) {
  const { form } = await searchParams;

  return (
    <div className="remote-page">
      <SiteHeader
        brand="remote"
        nav={[
          { label: "The accelerator", href: "#programme" },
          { label: "Graduate stories", href: "#stories" },
          { label: "For sponsors", href: "#sponsors" },
          { label: "FAQs", href: "#faqs" },
        ]}
        cta={{ label: "Apply now", href: "#apply" }}
        announcement={
          <span>
            Next cohort · Limited places
            <Link href="#apply">Join the waitlist</Link>
          </span>
        }
      />

      <main id="main-content">
        <section className="remote-hero">
          <div className="remote-hero__copy reveal">
            <p className="eyebrow">Built for African professionals</p>
            <h1>
              Turn what you know into a remote career the world can hire.
            </h1>
            <p className="remote-hero__intro">
              A practical accelerator, supervised work experience, and a
              credible route into global teams—built around how remote work
              actually happens.
            </p>
            <div className="remote-hero__actions">
              <Link href="#apply" className="button button--remote">
                Apply for the next cohort
                <ArrowRight size={17} aria-hidden="true" />
              </Link>
              <Link href="#programme" className="text-link">
                See the full journey
              </Link>
            </div>
            <div className="remote-hero__proof" aria-label="Programme features">
              <span>
                <Clock3 size={15} aria-hidden="true" /> 4-week accelerator
              </span>
              <span>
                <ShieldCheck size={15} aria-hidden="true" /> Supervised experience
              </span>
            </div>
          </div>

          <div className="remote-hero__visual reveal reveal--2">
            <div className="remote-hero__image">
              <Image
                src="/images/remote/hero.jpg"
                alt="A professional working confidently at her laptop"
                fill
                priority
                sizes="(max-width: 900px) 92vw, 44vw"
              />
            </div>
            <div className="remote-hero__note">
              <Sparkles size={17} aria-hidden="true" />
              <span>
                Not another online course.
                <strong>A work-readiness system.</strong>
              </span>
            </div>
            <span className="remote-hero__caption">Lagos · Remote · Global</span>
          </div>
        </section>

        <section className="remote-fit" id="fit">
          <div className="remote-section-heading">
            <p className="eyebrow">This is for you if</p>
            <h2 className="display-type">
              You have ability. What you need is a credible bridge.
            </h2>
          </div>
          <div className="remote-fit__list">
            {[
              "You are early in your career or ready to pivot into remote work.",
              "You can do the work, but struggle to prove it to global employers.",
              "You want structure, honest feedback, and real accountability.",
              "You are ready to practise in real working conditions—not just watch videos.",
            ].map((item) => (
              <div key={item}>
                <Check size={18} strokeWidth={2} aria-hidden="true" />
                <p>{item}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="remote-programme" id="programme">
          <div className="remote-programme__intro">
            <p className="eyebrow">How the pathway works</p>
            <h2 className="display-type">From potential to proof.</h2>
            <p>
              The programme is deliberately practical. Every stage gives you
              evidence that you can communicate, execute, and deliver inside a
              distributed team.
            </p>
          </div>
          <div className="remote-programme__steps">
            {programme.map((step) => (
              <article key={step.number}>
                <div className="remote-programme__number">{step.number}</div>
                <div>
                  <p className="remote-programme__meta">{step.meta}</p>
                  <h3>{step.title}</h3>
                  <p>{step.detail}</p>
                </div>
              </article>
            ))}
          </div>
          <Link href="#apply" className="button button--remote">
            Apply for the next cohort
            <ArrowRight size={17} aria-hidden="true" />
          </Link>
        </section>

        <section className="remote-stories" id="stories">
          <div className="remote-stories__heading">
            <p className="eyebrow">Graduate stories</p>
            <h2 className="display-type">Confidence, backed by capability.</h2>
          </div>
          <div className="remote-stories__grid">
            <article className="remote-story remote-story--lead">
              <Image
                src="/images/remote/joy.jpeg"
                alt="Joy Agbadu, LigerRemote graduate"
                width={400}
                height={400}
              />
              <div>
                <blockquote>
                  “The programme pushed me outside my comfort zone and changed
                  how I position my experience.”
                </blockquote>
                <p>Joy Agbadu</p>
                <span>Project Manager · LigerRemote graduate</span>
              </div>
            </article>
            <article className="remote-story">
              <Image
                src="/images/remote/omolola.jpeg"
                alt="Omolola Akinola, LigerRemote graduate"
                width={400}
                height={400}
              />
              <div>
                <blockquote>
                  “I left with clearer direction, stronger confidence, and a
                  practical understanding of remote work.”
                </blockquote>
                <p>Omolola Akinola</p>
                <span>Service Delivery Expert · LigerRemote graduate</span>
              </div>
            </article>
          </div>
        </section>

        <section className="remote-sponsor" id="sponsors">
          <div>
            <p className="eyebrow">For employers and institutions</p>
            <h2 className="display-type">Sponsor the next wave of global talent.</h2>
          </div>
          <div>
            <p>
              Fund cohort places, create meaningful workforce impact, and get a
              clear view of the outcomes your sponsorship makes possible.
            </p>
            <Link href="/remote/sponsor" className="button button--light">
              Request the sponsor pack
              <ArrowRight size={17} aria-hidden="true" />
            </Link>
          </div>
        </section>

        <section className="remote-apply" id="apply">
          <div className="remote-apply__intro">
            <p className="eyebrow">Start here</p>
            <h2 className="display-type">Your next chapter could be remote.</h2>
            <p>
              Tell us a little about yourself. We will send the full application
              and next cohort details to your inbox.
            </p>
            <div className="remote-apply__meta">
              <span>01 · Takes under 3 minutes</span>
              <span>02 · No payment required</span>
              <span>03 · Your answers stay private</span>
            </div>
          </div>
          <form className="lead-form" action="/api/submissions" method="post">
            <FormStatus
              state={form}
              successTitle="You are on the list."
              successMessage="Check your inbox for the next application step and cohort details."
            />
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
                <input name="phone" type="tel" autoComplete="tel" placeholder="+234" />
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
            <button className="button button--remote" type="submit">
              Continue my application
              <ArrowRight size={17} aria-hidden="true" />
            </button>
          </form>
        </section>

        <section className="remote-faq" id="faqs">
          <div>
            <p className="eyebrow">Good questions</p>
            <h2 className="display-type">Before you apply.</h2>
          </div>
          <div>
            {[
              {
                q: "Do I need previous remote-work experience?",
                a: "No. The accelerator is designed to turn your existing professional ability into remote-ready proof.",
              },
              {
                q: "Is this only for virtual assistants?",
                a: "The foundation is remote work readiness. Available pathways and role specialisms vary by cohort.",
              },
              {
                q: "Does completing the programme guarantee a role?",
                a: "No honest programme can guarantee employment. We prepare, test, and introduce proven talent to relevant opportunities.",
              },
            ].map((item) => (
              <details key={item.q}>
                <summary>
                  {item.q}
                  <ChevronDown size={18} aria-hidden="true" />
                </summary>
                <p>{item.a}</p>
              </details>
            ))}
          </div>
        </section>
      </main>

      <SiteFooter
        brand="remote"
        statement="The talent was always here. We built the pathway."
        email="support@ligerremote.com"
      />
    </div>
  );
}
