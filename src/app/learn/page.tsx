import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Award, Check, ExternalLink } from "lucide-react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

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
    <div className="learn-page">
      <SiteHeader
        brand="learn"
        light
        nav={[
          { label: "What we solve", href: "#work" },
          { label: "How we work", href: "#approach" },
          { label: "One Force", href: "/learn/one-force" },
          { label: "Leadership", href: "#leadership" },
        ]}
      />

      <main id="main-content">
        <section className="learn-hero">
          <div className="learn-hero__copy reveal">
            <p className="eyebrow">Corporate capability · Leadership advisory</p>
            <h1>
              We start with your business problem.
              <br />
              The programme follows from that.
            </h1>
            <p>
              LigerLearn works with Nigerian and African organisations to build
              the leadership, commercial capability, and workforce alignment
              their strategy demands.
            </p>
            <div>
              <Link href="#work" className="text-link">
                Explore our work
                <ArrowRight size={15} aria-hidden="true" />
              </Link>
              <span>Performance before programmes.</span>
            </div>
          </div>
          <div className="learn-hero__image reveal reveal--2">
            <Image
              src="/images/learn/boardroom.jpg"
              alt="Senior professionals collaborating in a boardroom"
              fill
              priority
              sizes="(max-width: 900px) 100vw, 45vw"
            />
            <div>
              <span>LigerLearn / Lagos</span>
              <span>Capability that moves with the business</span>
            </div>
          </div>
        </section>

        <section className="learn-trust" aria-label="Selected organisations">
          <p>Selected organisations our team has worked with</p>
          <div>
            {clients.map((client) => (
              <span key={client}>{client}</span>
            ))}
          </div>
        </section>

        <section className="learn-position">
          <p className="eyebrow">The standard we hold</p>
          <blockquote className="display-type">
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
          <div className="learn-section-heading">
            <p className="eyebrow">What we solve</p>
            <h2 className="display-type">Capability for consequential moments.</h2>
          </div>
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

        <section className="learn-approach" id="approach">
          <div className="learn-approach__intro">
            <p className="eyebrow">How we work</p>
            <h2 className="display-type">Rigour before theatre.</h2>
            <p>
              Our four-stage method keeps the intervention close to the business
              problem—and makes accountability visible throughout.
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
          <div className="learn-one-force__index">OF / 01</div>
          <div>
            <p className="eyebrow">One Force · Post-merger integration</p>
            <h2 className="display-type">
              Two organisations have signed. Has the workforce joined?
            </h2>
          </div>
          <div>
            <p>
              A focused diagnostic and leadership intervention for insurance
              organisations navigating the human reality of a merger.
            </p>
            <Link href="/learn/one-force" className="button button--light">
              View the One Force overview
              <ArrowRight size={17} aria-hidden="true" />
            </Link>
          </div>
        </section>

        <section className="learn-leadership" id="leadership">
          <div className="learn-leadership__image">
            <Image
              src="/images/learn/femi.jpg"
              alt="Obafemi Oshinowo, Founding Partner of LigerLearn"
              fill
              sizes="(max-width: 800px) 92vw, 38vw"
            />
          </div>
          <div className="learn-leadership__copy">
            <p className="eyebrow">Leadership</p>
            <h2 className="display-type">Obafemi Oshinowo</h2>
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

        <section className="learn-conversation">
          <div>
            <p className="eyebrow">Start with the problem</p>
            <h2 className="display-type">
              If performance is not where it needs to be, we would like to
              understand why.
            </h2>
          </div>
          <div>
            {[
              "A clear, senior conversation",
              "No pre-packaged programme pitch",
              "A practical recommendation—even if it is not us",
            ].map((item) => (
              <p key={item}>
                <Check size={16} aria-hidden="true" /> {item}
              </p>
            ))}
            <a href="mailto:support@ligerlearn.org" className="button button--learn">
              Start a conversation
              <ArrowRight size={17} aria-hidden="true" />
            </a>
          </div>
        </section>
      </main>

      <SiteFooter
        brand="learn"
        light
        statement="Serious capability work begins with a serious business question."
        email="support@ligerlearn.org"
      />
    </div>
  );
}
