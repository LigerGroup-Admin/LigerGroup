import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { BrandMark } from "@/components/brand-mark";

export const metadata: Metadata = {
  title: "Privacy Policy & Terms | Liger Group",
  description:
    "How the Liger Group collects, uses, and protects personal data submitted through LigerForce and LigerRemote, and the terms governing use of our sites.",
};

const privacySections = [
  {
    heading: "What we collect",
    body: "Through LigerForce forms (booking a call, submitting a requirement): your name, work email, phone number where given, company name, team size, and the role or support you're enquiring about. Through LigerRemote forms (cohort applications, sponsor pack requests): your name, email, phone number, city, career stage, and, for sponsors, your organisation and role. If you email us directly, we hold whatever you send us.",
  },
  {
    heading: "Why we collect it",
    body: "To respond to your enquiry, match you with the right role or cohort, process a booking or sponsorship request, and follow up about next steps. We don't use it for anything beyond the purpose you gave it to us for.",
  },
  {
    heading: "How long we keep it",
    body: "We keep enquiry and application data for as long as we need it to respond to you — generally no longer than 24 months from your last contact with us, unless a working relationship begins, in which case we retain relevant records for the duration of that relationship plus a reasonable period afterward for accounting and legal purposes.",
  },
  {
    heading: "We don't sell your data",
    body: "We do not sell or rent personal data to third parties. We share data only with the service providers who help us operate — for example, hosting and email delivery — and only to the extent needed for them to provide that service.",
  },
  {
    heading: "Your rights",
    body: "You can ask us to access, correct, or delete the personal data we hold about you at any time. Reach out using the contact details below and we'll action it promptly.",
  },
];

const termsSections = [
  {
    heading: "Acceptance",
    body: "By using a Liger Group website or submitting a form to LigerForce, LigerRemote, or LigerLearn, you agree to these terms. If you don't agree, please don't submit a form or use the site.",
  },
  {
    heading: "No guaranteed outcomes",
    body: "Submitting an enquiry, application, or requirement does not guarantee a placement, cohort spot, engagement, or specific outcome. We assess every enquiry on its merits and will tell you honestly if something isn't a fit.",
  },
  {
    heading: "Intellectual property",
    body: "Liger Group owns the content on our websites. You may view and use it for your own personal or internal business reference; redistribution or republishing requires our written permission.",
  },
  {
    heading: "Liability",
    body: "Our sites and the information on them are provided as-is. To the fullest extent permitted by law, Liger Group is not liable for indirect or consequential loss arising from your use of the site.",
  },
  {
    heading: "Changes to these terms",
    body: "We may update this page from time to time. The version live on the site at the time you use it is the one that applies.",
  },
];

export default function PrivacyPage() {
  return (
    <main id="main-content" className="group-page poster-page legal-page">
      <header className="legal-page__header">
        <BrandMark brand="group" href="/" framed />
        <Link href="/">
          <ArrowLeft size={16} aria-hidden="true" />
          <span>Back to Liger Group</span>
        </Link>
      </header>

      <section id="privacy" className="legal-page__intro">
        <p className="series-label">Legal</p>
        <h1 className="poster-display">Privacy Policy &amp; Terms</h1>
        <p>
          This page explains what personal data the Liger Group collects
          through our websites and forms — LigerForce and LigerRemote — why we
          collect it, how long we keep it, and the terms governing use of our
          sites. It applies across ligergroup.com, LigerForce, LigerRemote,
          and LigerLearn.
        </p>
      </section>

      <div className="legal-page__body">
        <h2 className="legal-page__group-heading">Privacy Policy</h2>
        {privacySections.map((section) => (
          <section key={section.heading}>
            <h3>{section.heading}</h3>
            <p>{section.body}</p>
          </section>
        ))}

        <h2 id="terms" className="legal-page__group-heading">
          Terms &amp; Conditions
        </h2>
        {termsSections.map((section) => (
          <section key={section.heading}>
            <h3>{section.heading}</h3>
            <p>{section.body}</p>
          </section>
        ))}

        <section>
          <h3>Contact</h3>
          <p>
            For data requests, or any question about this page, email{" "}
            <a href="mailto:hello@theliger.group">hello@theliger.group</a>.
          </p>
        </section>
      </div>
    </main>
  );
}
