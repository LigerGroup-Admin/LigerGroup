import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { ArrowLeft, Check } from "lucide-react";
import { BrandMark } from "@/components/brand-mark";
import { SponsorForm } from "@/components/sponsor-form";
import { SiteFooter } from "@/components/site-footer";

export const metadata: Metadata = {
  title: "Sponsor a cohort | LigerRemote",
  description:
    "Request the LigerRemote sponsor pack and explore funding practical remote-work pathways for African professionals.",
};

export default function SponsorPage() {
  return (
    <main id="main-content" className="remote-sponsor-page poster-page">
      <header>
        <BrandMark brand="remote" href="/remote" framed />
        <Link href="/remote">
          <ArrowLeft size={16} aria-hidden="true" />
          <span>Back to LigerRemote</span>
        </Link>
      </header>
      <section className="remote-sponsor-page__grid">
        <div className="remote-sponsor-page__intro">
          <p className="series-label">Corporate and institutional sponsorship</p>
          <h1 className="poster-display">Fund a pathway, not just a place.</h1>
          <p>
            Sponsor cohort places for ambitious African professionals and receive
            a clear account of participation, completion, work-readiness, and
            the outcomes your support makes possible.
          </p>
          <div>
            {[
              "Cohort and individual sponsorship options",
              "Outcome reporting for CSR and workforce teams",
              "Opportunities for employee mentoring and exposure",
            ].map((item) => (
              <span key={item}>
                <Check size={15} aria-hidden="true" /> {item}
              </span>
            ))}
          </div>
        </div>
        <Suspense fallback={null}>
          <SponsorForm />
        </Suspense>
      </section>
      <SiteFooter
        brand="remote"
        statement="The talent was always here. We built the pathway."
        email="support@ligerremote.com"
        termsHref="/remote/terms"
        privacyHref="/remote/privacy"
      />
    </main>
  );
}
