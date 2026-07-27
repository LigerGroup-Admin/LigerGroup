import { ArrowDown, ArrowUpRight } from "lucide-react";
import { BrandMark } from "@/components/brand-mark";
import { publicBrands } from "@/lib/brands";

export default function GroupHomePage() {
  return (
    <main id="main-content" className="group-page">
      <nav className="group-nav" aria-label="Liger Group navigation">
        <BrandMark brand="group" light framed />
        <div className="group-nav__meta">
          <span>Lagos · London · Global</span>
          <span>LG / 2026</span>
        </div>
      </nav>

      <section className="group-hero">
        <h1 className="reveal">
          Human potential,
          <br />
          made operational.
        </h1>
        <div className="group-hero__copy reveal reveal--2">
          <p>
            We build talent, deploy capability, and strengthen the organisations
            people make possible—from Africa to the world.
          </p>
          <div className="group-hero__count">
            <span>03</span>
            Choose the business you need
            <ArrowDown size={15} aria-hidden="true" />
          </div>
        </div>
      </section>

      <section className="group-businesses" aria-label="Liger Group businesses">
        {publicBrands.map((brand, index) => (
          <a
            key={brand.key}
            href={brand.path}
            className={`group-business reveal reveal--${index + 1}`}
            style={{ "--panel-accent": brand.accent } as React.CSSProperties}
          >
            <div className="group-business__top">
              <span className="group-business__number">0{index + 1}</span>
              <ArrowUpRight
                className="group-business__icon"
                size={22}
                strokeWidth={1.4}
                aria-hidden="true"
              />
            </div>
            <div>
              <h2>Liger{brand.shortName}</h2>
              <p>{brand.description}</p>
            </div>
          </a>
        ))}
      </section>

      <footer className="group-bottom">
        <span>Liger Group · One system, three distinct businesses</span>
        <span>Talent · Deployment · Capability</span>
      </footer>
    </main>
  );
}
