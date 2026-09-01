import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Check,
  ChevronDown,
  Clock3,
  ShieldCheck,
} from "lucide-react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { FormStatus } from "@/components/form-status";
import { PosterScene } from "@/components/poster-scene";
import { RemoteScene } from "@/components/scenes";
import { VideoTestimonial } from "@/components/video-testimonial";

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
    <div className="remote-page poster-page">
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
        <section className="remote-hero poster-sheet" aria-label="LigerRemote">
          <PosterScene className="remote-hero__scene">
            <RemoteScene />
          </PosterScene>
          <div className="remote-hero__copy reveal">
            <p className="hero-chip">
              Series No. 01 · Built for African professionals
            </p>
            <h1>
              Turn what you know
              <br />
              into a career
              <br />
              that travels.
            </h1>
            <p className="remote-hero__intro">
              A practical accelerator, supervised work experience, and a
              credible route into global teams—built around how remote work
              actually happens.
            </p>
          </div>
        </section>

        <div className="caption-bar ink-field ink-field--1 remote-hero__caption">
          <p className="caption-bar__imperative">Go remote. Start in Lagos.</p>
          <Link href="#apply" className="poster-button poster-button--warm">
            Apply for the next cohort
            <ArrowRight size={17} aria-hidden="true" />
          </Link>
        </div>

        <section className="remote-facts" aria-label="Programme facts">
          <div>
            <span>
              <Clock3 size={14} aria-hidden="true" /> The training
            </span>
            <strong>4-week accelerator</strong>
          </div>
          <div>
            <span>
              <ShieldCheck size={14} aria-hidden="true" /> The proof
            </span>
            <strong>Supervised real work</strong>
          </div>
          <div>
            <span>
              <Check size={14} aria-hidden="true" /> The cost to apply
            </span>
            <strong>No payment required</strong>
          </div>
        </section>

        <section className="remote-fit" id="fit">
          <div>
            <p className="series-label">No. 01 · Is this you</p>
            <h2 className="poster-display remote-fit__h2">
              You have ability. What you need is a credible bridge.
            </h2>
            <p className="remote-fit__lede">
              The accelerator is built for people who can already do the
              work—and need the proof, structure, and route to show it.
            </p>
          </div>
          <div className="remote-fit__list">
            {[
              "You are early in your career or ready to pivot into remote work.",
              "You can do the work, but struggle to prove it to global employers.",
              "You want structure, honest feedback, and real accountability.",
              "You are ready to practise in real working conditions—not just watch videos.",
            ].map((item) => (
              <div key={item}>
                <Check size={20} strokeWidth={2.4} aria-hidden="true" />
                <p>{item}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="remote-programme ink-field ink-field--1" id="programme">
          <div className="remote-programme__intro">
            <div>
              <p className="series-label">No. 02 · How the pathway works</p>
              <h2 className="poster-display">From potential to proof.</h2>
            </div>
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
          <div className="remote-programme__cta">
            <Link href="#apply" className="poster-button poster-button--warm">
              Apply for the next cohort
              <ArrowRight size={17} aria-hidden="true" />
            </Link>
          </div>
        </section>

        <section className="remote-stories" id="stories">
          <div className="remote-stories__heading">
            <div>
              <p className="series-label">No. 03 · Graduate stories</p>
              <h2 className="poster-display">
                Confidence, backed by capability.
              </h2>
            </div>
          </div>
          <div className="remote-stories__grid">
            <article className="remote-story">
              <div className="duotone">
                <Image
                  src="/images/remote/joy.jpeg"
                  alt="Joy Agbadu, LigerRemote graduate"
                  width={400}
                  height={400}
                />
              </div>
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
              <VideoTestimonial
                src="/videos/remote/wonder-hagan-testimonial.mp4"
                ariaLabel="Wonder Hagan, LigerRemote graduate, video testimonial with captions"
                className="duotone remote-story__video"
              />
              <div>
                <p>Wonder Hagan</p>
                <span>LigerRemote graduate, placed at a UK client</span>
              </div>
            </article>
            <article className="remote-story">
              <VideoTestimonial
                src="/videos/remote/ruth-adjetey-testimonial.mp4"
                ariaLabel="Ruth Adjetey, LigerRemote graduate, video testimonial with captions"
                className="duotone remote-story__video"
              />
              <div>
                <p>Ruth Adjetey</p>
                <span>LigerRemote graduate, placed at a US client</span>
              </div>
            </article>
          </div>
        </section>

        <section className="remote-sponsor ink-field ink-field--3" id="sponsors">
          <div>
            <p className="series-label">For employers and institutions</p>
            <h2 className="poster-display">
              Sponsor the next wave of global talent.
            </h2>
          </div>
          <div>
            <p>
              Fund cohort places, create meaningful workforce impact, and get a
              clear view of the outcomes your sponsorship makes possible.
            </p>
            <Link href="/remote/sponsor" className="poster-button poster-button--stock">
              Request the sponsor pack
              <ArrowRight size={17} aria-hidden="true" />
            </Link>
          </div>
        </section>

        <section className="remote-apply" id="apply">
          <div className="remote-apply__intro">
            <p className="series-label">No. 04 · Start here</p>
            <h2 className="poster-display">Your next chapter could be remote.</h2>
            <p>
              Tell us a little about yourself. We will send the full application
              and next cohort details to your inbox.
            </p>
            <div className="remote-apply__meta">
              <span>Takes under 3 minutes</span>
              <span>No payment required</span>
              <span>Your answers stay private</span>
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
            <button className="poster-button" type="submit">
              Continue my application
              <ArrowRight size={17} aria-hidden="true" />
            </button>
          </form>
        </section>

        <section className="remote-faq" id="faqs">
          <div>
            <p className="series-label">No. 05 · Good questions</p>
            <h2 className="poster-display">Before you apply.</h2>
          </div>
          <div className="poster-faq">
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
