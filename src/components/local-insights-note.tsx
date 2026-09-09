import Image from "next/image";

/**
 * The Local Insights client testimonial card — shared between /force
 * ("Client note / Local Insights") and /remote ("More from our clients")
 * so both pages render the exact same component rather than duplicated markup.
 */
export function LocalInsightsNote({ className }: { className?: string }) {
  return (
    <figure className={`local-insights-note ${className ?? ""}`}>
      <div className="local-insights-note__logo-tile">
        <a href="https://www.localinsights.co.uk" target="_blank" rel="noreferrer">
          <Image
            src="/images/force/local-insights-logo.png"
            alt="Local Insights"
            width={160}
            height={22}
          />
        </a>
      </div>
      <div className="local-insights-note__body">
        <blockquote>
          “We can’t speak highly enough of our LigerRemote Virtual Assistant
          and her efficiency and skill set. A pleasure to work with, very
          quick to pick up our working habits and delivers quality
          consistently. The Liger Group have been brilliant, all round.
          Thanks to Femi and his team.”
        </blockquote>
        <div className="local-insights-note__attribution">
          <Image
            src="/images/force/benji-mackenzie-weller.png"
            alt="Benji Mackenzie Weller"
            width={44}
            height={44}
          />
          <figcaption>
            Benji Mackenzie Weller
            <em>
              Co-Founder &amp; Sales Director,{" "}
              <a
                href="https://www.localinsights.co.uk"
                target="_blank"
                rel="noreferrer"
              >
                Local Insights
              </a>
            </em>
          </figcaption>
        </div>
      </div>
    </figure>
  );
}
