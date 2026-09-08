import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, Clock3, ShieldCheck } from "lucide-react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { ScrollReveal } from "@/components/scroll-reveal";
import { ClientTrust } from "@/components/client-trust";
import { ForceBookingForm } from "@/components/force-booking-form";

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

const roles = [
  {
    slug: "va",
    title: "Virtual Assistant (VA)",
    description:
      "Inbox, calendar, travel, and admin management—freeing up your highest-value hours.",
  },
  {
    slug: "sdr",
    title: "Sales Development Rep (SDR)",
    description:
      "Outbound prospecting, lead qualification, and CRM discipline to keep your pipeline full.",
  },
  {
    slug: "support",
    title: "Customer Support Specialist",
    description:
      "Ticket resolution, live chat, and client communication with your tone and SOPs.",
  },
  {
    slug: "ea",
    title: "Executive Assistant (EA)",
    description:
      "High-trust support for founders and execs—scheduling, correspondence, and gatekeeping.",
  },
  {
    slug: "bookkeeping",
    title: "Bookkeeping & Admin Support",
    description:
      "Invoicing, reconciliation, and back-office admin, trained on your existing tools.",
  },
  {
    slug: "social",
    title: "Social Media / Content Coordinator",
    description:
      "Content scheduling, community management, and reporting across your channels.",
  },
];

const included = [
  "Role-specific vetting",
  "Structured onboarding",
  "Performance check-ins",
  "HR and attendance support",
  "Continuity planning",
  "One commercial relationship",
];

const trustPoints = [
  "Every placement includes a signed NDA and IP assignment agreement before day one.",
  "Candidates are ID-verified and reference-checked prior to placement.",
  "All work is conducted through secure, client-approved communication and file-sharing tools—never personal devices or unmanaged accounts.",
  "Our data handling practices are aligned with UK GDPR requirements for our UK-based clients.",
];

export default async function ForceHomePage({
  searchParams,
}: {
  searchParams: Promise<{ form?: string; role?: string }>;
}) {
  const { form, role } = await searchParams;

  return (
    <div className="force-page poster-page">
      <ScrollReveal />
      <SiteHeader
        brand="force"
        nav={[
          { label: "How it works", href: "#how" },
          { label: "Roles", href: "#roles" },
          { label: "Why managed", href: "#managed" },
          { label: "Client note", href: "#client-note" },
        ]}
        cta={{ label: "Book a 20-minute call", href: "#book" }}
      />

      <main id="main-content">
        <section className="force-hero poster-sheet" aria-label="LigerForce">
          <div className="force-hero__scene">
            <Image
              src="/images/force/hero.jpg"
              alt="Two business leaders shaking hands over a deal"
              fill
              priority
              sizes="100vw"
            />
          </div>
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
            <p className="force-hero__expansion">
              LigerForce is expanding its UK presence, with a UK-registered
              entity currently in progress—giving clients a local contracting
              point alongside our Lagos delivery team.
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

        <ClientTrust
          label="Part of the Liger Group, trusted by:"
          className="force-trust"
        />

        <section className="force-roles" id="roles">
          <p className="series-label">Roles we place</p>
          <h2 className="poster-display">
            Match the role to the work, not the other way round.
          </h2>
          <div className="force-roles__grid">
            {roles.map((item) => (
              <article key={item.slug}>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <Link
                  href={`/force?role=${item.slug}#book`}
                  className="force-roles__cta"
                >
                  Request this role
                  <ArrowRight size={14} aria-hidden="true" />
                </Link>
              </article>
            ))}
          </div>
        </section>

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

        <section className="force-note" id="client-note">
          <p className="force-note__eyebrow">Client note / Local Insights</p>
          <div className="force-note__card">
            <div className="force-note__logo-tile">
              <a
                href="https://www.localinsights.co.uk"
                target="_blank"
                rel="noreferrer"
              >
                <Image
                  src="/images/force/local-insights-logo.png"
                  alt="Local Insights"
                  width={160}
                  height={22}
                />
              </a>
            </div>
            <div className="force-note__body">
              <h2 className="poster-display">
                Dependable delivery capacity, without building another hiring
                function.
              </h2>
              <p className="force-note__lede">
                A closer look at how a clear brief, a role-specific match, and
                structured performance support create a more reliable remote
                working relationship.
              </p>
              <blockquote>
                “We can’t speak highly enough of our LigerRemote Virtual
                Assistant and her efficiency and skill set. A pleasure to work
                with, very quick to pick up our working habits and delivers
                quality consistently. The Liger Group have been brilliant, all
                round. Thanks to Femi and his team.”
              </blockquote>
              <figure className="force-note__attribution">
                <Image
                  src="/images/force/benji-mackenzie-weller.png"
                  alt="Benji Mackenzie Weller"
                  width={44}
                  height={44}
                />
                <figcaption>
                  Benji Mackenzie Weller
                  <em>
                    Co-Founder &amp; Sales Director,{" "}
                    <a
                      href="https://www.localinsights.co.uk"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Local Insights
                    </a>
                  </em>
                </figcaption>
              </figure>
            </div>
          </div>
        </section>

        <section className="force-included">
          <p className="series-label">Built into every placement</p>
          <h2 className="poster-display">Less uncertainty. Fewer loose ends.</h2>
          <div className="force-included__list">
            {included.map((item) => (
              <div key={item}>
                <Check size={16} aria-hidden="true" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="force-trust-security-wrap">
          <div className="force-trust-security">
            <div className="force-trust-security__header">
              <ShieldCheck size={22} aria-hidden="true" />
              <h2>Built on trust, not just talent</h2>
            </div>
            <div className="force-trust-security__grid">
              {trustPoints.map((point) => (
                <div key={point}>
                  <Check size={15} aria-hidden="true" />
                  <p>{point}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <p className="force-price-note">
          Pricing is structured by role and engagement scope—we’ll walk you
          through it on a 20-minute call, no obligation.
        </p>

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
          <ForceBookingForm formState={form} initialRole={role} />
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
