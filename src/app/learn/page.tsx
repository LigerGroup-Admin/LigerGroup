import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Award, Check, ExternalLink } from "lucide-react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { PosterScene } from "@/components/poster-scene";
import { LearnScene } from "@/components/scenes";

export const metadata: Metadata = {
  title: "LigerLearn | Corporate capability and leadership advisory",
  description:
    "Corporate capability, leadership advisory, executive coaching, and workforce transformation grounded in measurable business outcomes.",
};

const clients = [
  "Access Bank",
  "Coronation",
  "Dangote Group",
  "FirstBank",
  "Jumia",
  "Leadway Pensure",
  "May & Baker",
  "MTN",
];

const practices = [
  {
    number: "01",
    title: "Leadership development",
    body: "Build leaders who can translate strategy into behaviour, accountability, and performance.",
  },
  {
    number: "02",
    title: "Sales academies",
    body: "Strengthen commercial capability around the real decisions and conversations that drive revenue.",
  },
  {
    number: "03",
    title: "Customer experience",
    body: "Align service behaviours, leadership routines, and operating standards around customer value.",
  },
  {
    number: "04",
    title: "Strategy & culture",
    body: "Turn stated values and transformation priorities into the way teams actually work.",
  },
  {
    number: "05",
    title: "Executive coaching",
    body: "Confidential, context-aware support for leaders navigating complexity, transition, and growth.",
  },
  {
    number: "06",
    title: "Executive search",
    body: "Find senior talent with the judgement, sector fluency, and leadership range the mandate requires.",
  },
];

export default function LearnHomePage() {
  return (
    <div className="learn-page poster-page">
      <SiteHeader
        brand="learn"
        nav={[
          { label: "What we solve", href: "#work" },
          { label: "How we work", href: "#approach" },
          { label: "One Force", href: "/learn/one-force" },
          { label: "Leadership", href: "#leadership" },
        ]}
        cta={{ label: "Start a conversation", href: "#conversation" }}
      />

      <main id="main-content">
        <section className="learn-hero poster-sheet" aria-label="LigerLearn">
          <PosterScene className="learn-hero__scene">
            <LearnScene />
          </PosterScene>
          <div className="learn-hero__copy reveal">
            <p className="hero-chip">
              Series No. 03 · Corporate capability · Leadership advisory
            </p>
            <h1>
              We start with your
              <br />
              business problem.
            </h1>
            <p className="learn-hero__intro">
              LigerLearn works with Nigerian and African organisations to build
              the leadership, commercial capability, and workforce alignment
              their strategy demands. The programme follows from the problem.
            </p>
          </div>
        </section>

        <div className="caption-bar ink-field ink-field--1 learn-hero__caption">
          <p className="caption-bar__imperative">
            Performance before programmes.
          </p>
          <Link href="#work" className="poster-button poster-button--warm">
            Explore our work
            <ArrowRight size={17} aria-hidden="true" />
          </Link>
        </div>

        <section className="learn-trust" aria-label="Selected organisations">
          <p>Selected organisations our team has worked with</p>
          <div>
            {clients.map((client) => (
              <span key={client}>{client}</span>
            ))}
          </div>
        </section>

        <section className="learn-position ink-field ink-field--2">
          <p className="series-label">The standard we hold</p>
          <blockquote>
            If the intervention cannot connect to revenue, retention,
            performance, risk, or succession, it is not yet well designed.
          </blockquote>
          <p>
            Activity is not impact. We diagnose the performance context, design
            around the work, and agree how change will be observed before
            delivery begins.
          </p>
        </section>

        <section className="learn-practices" id="work">
          <p className="series-label">No. 01 · What we solve</p>
          <h2 className="poster-display">
            Capability for consequential moments.
          </h2>
          <div className="learn-practices__grid">
            {practices.map((practice) => (
              <article key={practice.number}>
                <span>{practice.number}</span>
                <h3>{practice.title}</h3>
                <p>{practice.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="learn-approach ink-field ink-field--1" id="approach">
          <div className="learn-approach__intro">
            <p className="series-label">No. 02 · How we work</p>
            <h2 className="poster-display">Rigour before theatre.</h2>
            <p>
              Our four-stage method keeps the intervention close to the business
              problem—and makes accountability visible throughout. Four
              switchbacks, one summit.
            </p>
          </div>
          <div className="learn-approach__steps">
            {[
              ["01", "Diagnose", "Clarify the performance gap and operating context."],
              ["02", "Design", "Build the right journey, practice, and reinforcement."],
              ["03", "Deliver", "Facilitate with senior practitioners and sector fluency."],
              ["04", "Drive impact", "Track application, behaviour, and agreed business signals."],
            ].map(([number, title, body]) => (
              <article key={number}>
                <span>{number}</span>
                <div>
                  <h3>{title}</h3>
                  <p>{body}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="learn-one-force">
          <div>
            <p className="series-label">One Force · Post-merger integration</p>
            <h2 className="poster-display">
              Two organisations have signed. Has the workforce joined?
            </h2>
          </div>
          <div>
            <p>
              A focused diagnostic and leadership intervention for insurance
              organisations navigating the human reality of a merger.
            </p>
            <Link href="/learn/one-force" className="poster-button">
              View the One Force overview
              <ArrowRight size={17} aria-hidden="true" />
            </Link>
          </div>
        </section>

        <section className="learn-leadership" id="leadership">
          <div className="duotone">
            <Image
              src="/images/learn/femi.jpg"
              alt="Obafemi Oshinowo, Founding Partner of LigerLearn"
              width={640}
              height={800}
            />
          </div>
          <div className="learn-leadership__copy">
            <p className="series-label">No. 03 · Leadership</p>
            <h2 className="poster-display">Obafemi Oshinowo</h2>
            <p className="learn-leadership__role">Founding Partner</p>
            <div className="learn-leadership__credentials">
              <span>
                <Award size={15} aria-hidden="true" /> FCIPD
              </span>
              <span>
                <Award size={15} aria-hidden="true" /> GPHR
              </span>
              <span>
                <Award size={15} aria-hidden="true" /> ICF-Certified Coach
              </span>
            </div>
            <p className="learn-leadership__bio">
              A senior HR and organisational development practitioner with
              extensive experience across talent, leadership, commercial
              capability, and executive coaching in African business contexts.
            </p>
            <a
              className="text-link"
              href="https://www.linkedin.com/in/obafemi-oshinowo/"
              target="_blank"
              rel="noreferrer"
            >
              Connect on LinkedIn
              <ExternalLink size={15} aria-hidden="true" />
            </a>
          </div>
        </section>

        <section
          className="learn-conversation ink-field ink-field--3"
          id="conversation"
        >
          <div>
            <p className="series-label">Start with the problem</p>
            <h2 className="poster-display">
              If performance is not where it needs to be, we would like to
              understand why.
            </h2>
          </div>
          <div>
            <div className="learn-conversation__list">
              {[
                "A clear, senior conversation",
                "No pre-packaged programme pitch",
                "A practical recommendation—even if it is not us",
              ].map((item) => (
                <p key={item}>
                  <Check size={16} aria-hidden="true" /> {item}
                </p>
              ))}
            </div>
            <a href="mailto:support@ligerlearn.org" className="poster-button">
              Start a conversation
              <ArrowRight size={17} aria-hidden="true" />
            </a>
          </div>
        </section>
      </main>

      <SiteFooter
        brand="learn"
        statement="Serious capability work begins with a serious business question."
        email="support@ligerlearn.org"
      />
    </div>
  );
}
