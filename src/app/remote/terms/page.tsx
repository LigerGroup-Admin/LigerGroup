import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { BrandMark } from "@/components/brand-mark";

export const metadata: Metadata = {
  title: "Terms & Conditions | LigerRemote",
  description: "The terms and conditions governing use of LigerRemote's website and virtual assistant services.",
};

const sections = [
  {
    heading: "1. Eligibility",
    body: "Users must be at least 18 years old with legal capacity to enter binding agreements.",
  },
  {
    heading: "2. Account Responsibilities",
    body: "You must maintain confidentiality of account credentials, report unauthorized access immediately, and remain accountable for all account activity.",
  },
  {
    heading: "3. Virtual Assistant Services",
    body: "LigerRemote provides hourly, retainer, and project-based support across administrative, customer support, sales, technical, creative, and executive domains. VAs are assigned based on requirements and skill fit. We do not guarantee specific outcomes or timelines. Expanded requirements may incur additional fees.",
  },
  {
    heading: "4. Payments & Non-Refundable Policy",
    body: "Payments process through third-party providers. All payments for VA services are non-refundable once completed, except where LigerRemote cancels service. Retainer plans provide monthly support, with unused hours rolling over only if explicitly stated. Hourly and project-based payments are final once processed and services confirmed.",
  },
  {
    heading: "5. Service Onboarding & Task Submission",
    body: "Clients must provide accurate task descriptions and required access via onboarding forms. Delays or changes due to missing information may incur extra fees.",
  },
  {
    heading: "6. Client Responsibilities",
    body: "Clients must provide clear instructions, required access, and communicate changes promptly. Missing information may delay delivery.",
  },
  {
    heading: "7. Liability",
    body: "LigerRemote is not liable for errors, delays, omissions, or unintended outcomes by VAs. Liability is limited to amounts paid for disputed services.",
  },
  {
    heading: "8. Project-Based Work",
    body: "One-off projects have defined deliverables, timelines, and pricing. Payments are non-refundable once confirmed.",
  },
  {
    heading: "9. Intellectual Property",
    body: "LigerRemote owns all website content. You may use content only for personal or internal business purposes. Redistribution requires written permission.",
  },
  {
    heading: "10. Cookies & Data Collection",
    body: "The site uses essential cookies (required) and optional cookies (analytics/personalization). Refer to the Privacy Policy for details.",
  },
  {
    heading: "11. Hyperlinking & External Content",
    body: "Approved organizations may link to LigerRemote without misrepresenting affiliation. The company is not responsible for external linked content.",
  },
  {
    heading: "12. Governing Law",
    body: "Nigerian law applies for African users; UK law applies internationally, unless otherwise required. Arbitration is preferred before other legal measures.",
  },
  {
    heading: "13. Disclaimer",
    body: "Services are provided ‘as-is’ without warranties. LigerRemote disclaims liability for VA errors, performance variations, misuse, and third-party tools. Limitations apply maximally per jurisdiction.",
  },
  {
    heading: "14. Amendments",
    body: "LigerRemote reserves rights to revise these Terms at any time. Continued use constitutes acceptance of updates.",
  },
];

export default function RemoteTermsPage() {
  return (
    <main id="main-content" className="remote-terms-page poster-page">
      <header>
        <BrandMark brand="remote" href="/remote" framed />
        <Link href="/remote">
          <ArrowLeft size={16} aria-hidden="true" />
          <span>Back to LigerRemote</span>
        </Link>
      </header>
      <section className="remote-terms-page__intro">
        <p className="series-label">Legal</p>
        <h1 className="poster-display">Terms &amp; Conditions</h1>
        <p>Effective date: December 1, 2024 · Last updated: November 1, 2025</p>
        <p>
          These Terms and Conditions govern your access to and use of
          LigerRemote&rsquo;s website and Virtual Assistant services. By
          visiting, creating an account, or purchasing services, you agree to
          these Terms. Discontinue use if you disagree.
        </p>
      </section>
      <div className="remote-terms-page__body">
        {sections.map((section) => (
          <section key={section.heading}>
            <h2>{section.heading}</h2>
            <p>{section.body}</p>
          </section>
        ))}
        <section>
          <h2>15. Contact Information</h2>
          <p>
            Business name: LigerRemote Limited
            <br />
            Address: No. 1, Orefamewo Street, Redworth Terraces, Off Kusenla
            Road, Lagos, Nigeria
            <br />
            Email: <a href="mailto:support@ligerremote.com">support@ligerremote.com</a>
            <br />
            Phone: <a href="tel:+2349073892803">+234 907 389 2803</a>
          </p>
        </section>
      </div>
    </main>
  );
}
