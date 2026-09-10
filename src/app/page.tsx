import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { BrandMark } from "@/components/brand-mark";
import { ScrollReveal } from "@/components/scroll-reveal";
import { ClientTrust } from "@/components/client-trust";
import { socialLinksByBrand } from "@/lib/brands";
import {
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  TelegramIcon,
  XIcon,
} from "@/components/social-icons";

const socialIcons = {
  instagram: InstagramIcon,
  linkedin: LinkedinIcon,
  x: XIcon,
  facebook: FacebookIcon,
  telegram: TelegramIcon,
};

const series = [
  {
    key: "remote",
    name: "LigerRemote",
    path: "/remote",
    series: "Series No. 01 — For African professionals",
    description:
      "Practical training, supervised experience, and a credible pathway into global remote work.",
    imperative: "Go remote",
    heroImage: "/images/remote/hero.jpg",
    heroAlt: "A LigerRemote professional working remotely from a laptop",
    vars: {
      "--poster-ink": "#122840",
      "--poster-accent": "#e39b2d",
      "--poster-accent-deep": "#467e6b",
    },
  },
  {
    key: "force",
    name: "LigerForce",
    path: "/force",
    series: "Series No. 02 — For UK & US growth businesses",
    description:
      "Vetted, managed remote professionals without the hiring uncertainty or management overhead.",
    imperative: "Add capacity",
    heroImage: "/images/force/hero.jpg",
    heroAlt: "Two business leaders shaking hands over a deal",
    vars: {
      "--poster-ink": "#1f2b26",
      "--poster-accent": "#b5482f",
      "--poster-accent-deep": "#0097b2",
    },
  },
  {
    key: "learn",
    name: "LigerLearn",
    path: "/learn",
    series: "Series No. 03 — For leaders & organisations",
    description:
      "Corporate capability, leadership advisory, and executive search grounded in business outcomes.",
    imperative: "Raise the standard",
    heroImage: "/images/learn/boardroom.jpg",
    heroAlt: "A leadership team celebrating a win together",
    vars: {
      "--poster-ink": "#2a1730",
      "--poster-accent": "#b98a3c",
      "--poster-accent-deep": "#902f2f",
    },
  },
] as const;

export default function GroupHomePage() {
  return (
    <main id="main-content" className="group-page poster-page">
      <ScrollReveal />
      <section className="group-hero poster-sheet ink-field ink-field--1">
        <nav className="group-nav" aria-label="Liger Group navigation">
          <BrandMark brand="group" framed />
          <div className="group-nav__meta">
            <span>Lagos · Africa · Global</span>
            <span>Est. Series of Three</span>
          </div>
        </nav>
        <div className="group-hero__badge" aria-hidden="true">
          <Image
            src="/images/group/liger-group-badge-circle.png"
            alt=""
            width={600}
            height={600}
            priority
          />
        </div>
        <div className="group-hero__copy reveal">
          <p className="hero-chip">The Liger Group series</p>
          <h1>
            Human potential,
            <br />
            made possible.
          </h1>
          <p className="group-hero__intro">
            We build talent, deploy capability, and strengthen the organisations
            people make possible—from Africa to the world.
          </p>
        </div>
      </section>

      <div className="caption-bar ink-field ink-field--2 group-caption">
        <a href="#businesses" className="caption-bar__imperative group-caption__link">
          Three businesses, one group
        </a>
      </div>

      <section
        id="businesses"
        className="group-series"
        aria-label="Liger Group businesses"
      >
        {series.map((poster, index) => (
            <a
              key={poster.key}
              href={poster.path}
              aria-label={poster.name}
              className={`group-poster reveal reveal--${index + 1}`}
              style={poster.vars as React.CSSProperties}
            >
              <div className="group-poster__scene">
                <Image
                  src={poster.heroImage}
                  alt={poster.heroAlt}
                  fill
                  sizes="(min-width: 900px) 33vw, 100vw"
                />
              </div>
              <div className="group-poster__body">
                <span className="group-poster__series">{poster.series}</span>
                <BrandMark brand={poster.key} static />
                <p>{poster.description}</p>
                <span className="group-poster__imperative">
                  {poster.imperative}
                  <ArrowRight size={15} aria-hidden="true" />
                </span>
              </div>
            </a>
          ))}
      </section>

      <ClientTrust
        label="Our leadership has supported and facilitated capability and leadership programmes for organisations including:"
        className="group-trust"
      />

      <footer className="group-bottom">
        <span>Liger Group · One system, three distinct businesses</span>
        <span>Talent · Deployment · Capability</span>
        <div className="group-bottom__social">
          {socialLinksByBrand.group.map((item) => {
            const Icon = socialIcons[item.icon];
            return item.href ? (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                aria-label={item.label}
              >
                <Icon size={16} />
              </a>
            ) : (
              <span key={item.label} aria-label={`${item.label} — coming soon`}>
                <Icon size={16} />
              </span>
            );
          })}
        </div>
        <div className="group-bottom__links">
          <a href="mailto:hello@theliger.group">hello@theliger.group</a>
          <Link href="/privacy">Privacy</Link>
          <Link href="/privacy#terms">Terms</Link>
        </div>
      </footer>
    </main>
  );
}
