import { ArrowDown, ArrowRight } from "lucide-react";
import { Alfa_Slab_One, Marcellus, Staatliches } from "next/font/google";
import { BrandMark } from "@/components/brand-mark";
import { PosterScene } from "@/components/poster-scene";
import {
  ForceScene,
  GroupScene,
  LearnScene,
  RemoteScene,
} from "@/components/scenes";

const staatliches = Staatliches({ weight: "400", subsets: ["latin"], display: "swap" });
const alfaSlab = Alfa_Slab_One({ weight: "400", subsets: ["latin"], display: "swap" });
const marcellus = Marcellus({ weight: "400", subsets: ["latin"], display: "swap" });

const series = [
  {
    key: "remote",
    name: "LigerRemote",
    path: "/remote",
    series: "Series No. 01 — For African professionals",
    description:
      "Practical training, supervised experience, and a credible pathway into global remote work.",
    imperative: "Go remote",
    displayClass: staatliches.className,
    scene: RemoteScene,
    vars: {
      "--poster-ink": "#122840",
      "--poster-accent": "#e39b2d",
      "--poster-accent-deep": "#1f4d92",
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
    displayClass: alfaSlab.className,
    scene: ForceScene,
    vars: {
      "--poster-ink": "#1f2b26",
      "--poster-accent": "#b5482f",
      "--poster-accent-deep": "#2f5241",
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
    displayClass: marcellus.className,
    scene: LearnScene,
    vars: {
      "--poster-ink": "#2a1730",
      "--poster-accent": "#b98a3c",
      "--poster-accent-deep": "#6e2639",
    },
  },
] as const;

export default function GroupHomePage() {
  return (
    <main id="main-content" className="group-page poster-page">
      <section className="group-hero poster-sheet">
        <PosterScene className="group-hero__scene">
          <GroupScene />
        </PosterScene>
        <nav className="group-nav" aria-label="Liger Group navigation">
          <BrandMark brand="group" framed />
          <div className="group-nav__meta">
            <span>Lagos · London · Global</span>
            <span>Est. Series of Three</span>
          </div>
        </nav>
        <div className="group-hero__copy reveal">
          <p className="hero-chip">The Liger Group series</p>
          <h1>
            Human potential,
            <br />
            made operational.
          </h1>
          <p className="group-hero__intro">
            We build talent, deploy capability, and strengthen the organisations
            people make possible—from Africa to the world.
          </p>
        </div>
      </section>

      <div className="caption-bar ink-field ink-field--2 group-caption">
        <a href="#businesses" className="caption-bar__imperative group-caption__link">
          Choose your business
        </a>
        <span className="group-caption__count">
          <span>03</span>
          Three posters, one group
          <ArrowDown size={15} aria-hidden="true" />
        </span>
      </div>

      <section
        id="businesses"
        className="group-series"
        aria-label="Liger Group businesses"
      >
        {series.map((poster, index) => {
          const Scene = poster.scene;
          return (
            <a
              key={poster.key}
              href={poster.path}
              className={`group-poster reveal reveal--${index + 1}`}
              style={poster.vars as React.CSSProperties}
            >
              <div className="group-poster__scene">
                <Scene />
              </div>
              <div className="group-poster__body">
                <span className="group-poster__series">{poster.series}</span>
                <h2 className={poster.displayClass}>{poster.name}</h2>
                <p>{poster.description}</p>
                <span className="group-poster__imperative">
                  {poster.imperative}
                  <ArrowRight size={15} aria-hidden="true" />
                </span>
              </div>
            </a>
          );
        })}
      </section>

      <footer className="group-bottom">
        <span>Liger Group · One system, three distinct businesses</span>
        <span>Talent · Deployment · Capability</span>
      </footer>
    </main>
  );
}
