import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { ArrowLeft, Clock3 } from "lucide-react";
import { BrandMark } from "@/components/brand-mark";
import { RequirementForm } from "@/components/requirement-form";
import { SiteFooter } from "@/components/site-footer";

export const metadata: Metadata = {
  title: "Submit a requirement | LigerForce",
  description:
    "Tell LigerForce what role or support you need and receive a response within one business day.",
};

export default function RequirementPage() {
  return (
    <main id="main-content" className="force-requirement poster-page">
      <header>
        <BrandMark brand="force" href="/force" framed />
        <Link href="/force">
          <ArrowLeft size={16} aria-hidden="true" />
          <span>Back to LigerForce</span>
        </Link>
      </header>
      <section className="force-requirement__grid">
        <div className="force-requirement__intro">
          <p className="series-label">For ready-to-move founders</p>
          <h1 className="poster-display">Tell us what good support looks like.</h1>
          <p>
            Share the role, the outcome, and the working pattern. We will review
            it and respond with the most useful next step.
          </p>
          <span>
            <Clock3 size={16} aria-hidden="true" /> Response within one business day
          </span>
        </div>
        <Suspense fallback={null}>
          <RequirementForm />
        </Suspense>
      </section>
      <SiteFooter
        brand="force"
        statement="Remote talent should create capacity—not complexity."
        email="support@ligerremote.com"
      />
    </main>
  );
}
