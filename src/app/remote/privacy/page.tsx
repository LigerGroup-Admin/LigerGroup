import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { BrandMark } from "@/components/brand-mark";

export const metadata: Metadata = {
  title: "Privacy Policy | LigerRemote",
  description: "How LigerRemote collects, uses, and protects your personal data.",
};

const sections = [
  {
    heading: "1. Data Collection",
    body: "LigerRemote gathers personal information including names, emails, and billing details, plus automatically collected data like IP addresses and browsing behaviour through cookies and analytics tools.",
  },
  {
    heading: "2. Data Usage",
    body: "We process information to match clients with Virtual Assistants, deliver services, process payments, communicate updates, and prevent fraud.",
  },
  {
    heading: "3. Data Sharing",
    body: "We do not sell or rent your personal data. Third-party sharing occurs only with payment processors, email platforms, and analytics services when necessary.",
  },
  {
    heading: "4. User Rights",
    body: "Under GDPR and NDPR regulations, you may access, update, delete, or restrict your data. Contact support@ligerremote.com to exercise these rights.",
  },
  {
    heading: "5. Refund Policy",
    body: "All payments for VA services, coaching, and training programmes are non-refundable once purchased, except where LigerRemote cancels the service.",
  },
  {
    heading: "6. Acceptable Use",
    body: "Prohibited activities include harassment, fraudulent information submission, malware uploads, and unauthorized account access.",
  },
];

export default function RemotePrivacyPage() {
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
        <h1 className="poster-display">Privacy Policy</h1>
        <p>Effective date: December 1, 2024 · Last updated: November 1, 2025</p>
        <p>
          This policy explains what personal data LigerRemote collects, how
          we use it, and the rights you have over it.
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
          <h2>7. Contact Details</h2>
          <p>
            Email: <a href="mailto:support@ligerremote.com">support@ligerremote.com</a>
            <br />
            Phone: <a href="tel:+2349073892803">+234 907 389 2803</a>
            <br />
            Address: No. 1, Orefamewo Street, Redworth Terraces, Lagos, Nigeria
          </p>
        </section>
      </div>
    </main>
  );
}
