const FLOW = "https://media.base44.com/images/public/6a599b9b52283ff45c4532b0/7a1c80865_generated_image.png";
const WF_HOME = "https://media.base44.com/images/public/6a599b9b52283ff45c4532b0/60b231296_generated_image.png";
const WF_DISCOVER = "https://media.base44.com/images/public/6a599b9b52283ff45c4532b0/e92817312_generated_image.png";
const WF_DETAIL = "https://media.base44.com/images/public/6a599b9b52283ff45c4532b0/73e0f4adc_generated_image.png";

function Figure({ src, alt, caption }) {
  return (
    <figure className="space-y-2">
      <div className="overflow-hidden rounded-xl border border-border/60 bg-card p-3">
        <img src={src} alt={alt} loading="lazy" className="w-full rounded-lg" />
      </div>
      <figcaption className="text-xs leading-relaxed text-muted-foreground">{caption}</figcaption>
    </figure>
  );
}

export default function Wireframes() {
  return (
    <article className="space-y-8">
      <header>
        <p className="text-xs font-semibold uppercase tracking-wider text-primary">Design Artifacts</p>
        <h1 className="mt-1 font-heading text-3xl font-semibold text-foreground">Wireframes & Flow</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Low-fidelity sketches produced early in the design process to lock in layout and navigation before high-fidelity styling.
        </p>
      </header>

      <section className="space-y-3">
        <h3 className="font-heading text-lg font-semibold text-foreground">User Flow Diagram</h3>
        <p className="text-sm leading-relaxed text-foreground/85">
          The core path a reader follows through the app, from discovering a title to reviewing their reading life on the dashboard.
        </p>
        <Figure
          src={FLOW}
          alt="User flow diagram showing five steps: Discover, Save to Shelf, Track Progress, Rate and Reflect, Review Dashboard"
          caption="Figure 1 — The five-step user flow: Discover → Save to Shelf → Track Progress → Rate & Reflect → Review Dashboard."
        />
      </section>

      <section className="space-y-3">
        <h3 className="font-heading text-lg font-semibold text-foreground">Screen Wireframes</h3>
        <div className="grid gap-5 sm:grid-cols-2">
          <Figure
            src={WF_HOME}
            alt="Low-fidelity wireframe of the Home dashboard screen"
            caption="Figure 2 — Home dashboard: reading stats, a 'Continue Reading' progress card, and a 'Recently Added' grid."
          />
          <Figure
            src={WF_DISCOVER}
            alt="Low-fidelity wireframe of the Discover search screen"
            caption="Figure 3 — Discover: search bar, quick-search chips, and a results grid of book covers and titles."
          />
          <Figure
            src={WF_DETAIL}
            alt="Low-fidelity wireframe of the Book Detail screen"
            caption="Figure 4 — Book detail: cover, shelf selectors, star rating, progress slider, and an auto-saving notes field."
          />
          <div className="rounded-xl border border-dashed border-border bg-accent/40 p-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-primary">Design rationale</p>
            <p className="mt-2 text-sm leading-relaxed text-foreground/80">
              Wireframes kept the same three-screen core across mobile and desktop to reinforce a single mental model. The detail screen groups every reading action — shelf, rating, progress, notes — in one place so users never hunt between views, a decision confirmed in usability testing.
            </p>
          </div>
        </div>
      </section>
    </article>
  );
}