function H({ children }) {
  return <h3 className="font-heading text-lg font-semibold text-foreground">{children}</h3>;
}

function Card({ title, children }) {
  return (
    <div className="rounded-xl border border-border/60 bg-card p-5">
      <p className="text-xs font-semibold uppercase tracking-wider text-primary">{title}</p>
      <div className="mt-2 text-sm leading-relaxed text-foreground/85">{children}</div>
    </div>
  );
}

export default function Research() {
  return (
    <article className="space-y-8">
      <header>
        <p className="text-xs font-semibold uppercase tracking-wider text-primary">Section 1 · Deliverable</p>
        <h1 className="mt-1 font-heading text-3xl font-semibold text-foreground">UX Research & Planning</h1>
      </header>

      <section className="space-y-2">
        <H>Intended Audience</H>
        <p className="text-sm leading-relaxed text-foreground/85">
          Casual to enthusiastic readers aged roughly 18–45 who read several books a year, discover titles through recommendations and browsing, and value a clean, focused tool over feature-heavy social platforms. Secondary users include students tracking assigned reading and book-club members organizing monthly picks.
        </p>
      </section>

      <section className="space-y-2">
        <H>Problem Statement</H>
        <p className="text-sm leading-relaxed text-foreground/85">
          Readers discover books across fragmented sources but have no lightweight, focused way to capture, organize, and reflect on those titles. The result is forgotten recommendations, half-finished books, and lost reflections. Existing tools are either social networks cluttered with reviews and ads, or generic note apps that offer no structure for reading. Readers need a calm, purpose-built space to manage their reading life.
        </p>
      </section>

      <section className="space-y-2">
        <H>User Goals & Needs</H>
        <ol className="list-decimal space-y-1.5 pl-5 text-sm leading-relaxed text-foreground/85">
          <li><strong>Capture and organize:</strong> Quickly save a book the moment it is recommended so it is not forgotten, and sort it into a meaningful reading stage.</li>
          <li><strong>Reflect on reading:</strong> Record personal takeaways and ratings that build a long-term record of one's reading life and growth.</li>
        </ol>
      </section>

      <section className="space-y-3">
        <H>User Personas</H>
        <div className="grid gap-3 sm:grid-cols-2">
          <Card title="Persona A — Maya, 27, Marketing Coordinator">
            Maya reads on her commute and gets recommendations from newsletters and friends. She bookmarks titles but loses track of them. She wants a fast way to save a book and remember why it interested her. <em>Goal:</em> a "save it now, find it later" flow that takes seconds.
          </Card>
          <Card title="Persona B — Daniel, 34, Graduate Student">
            Daniel reads for coursework and pleasure and wants to separate the two. He tracks progress through dense books and likes to revisit notes months later. <em>Goal:</em> progress tracking and a persistent, searchable notes field for each title.
          </Card>
        </div>
      </section>

      <section className="space-y-3">
        <H>Competitive / Comparative Review</H>
        <div className="space-y-3">
          <Card title="Goodreads (Amazon)">
            The dominant platform. Comprehensive catalog and large community, but visually cluttered, ad-heavy, and slow to load. Reading tracking is buried. <strong>Shelf's opportunity:</strong> strip away social noise and focus on the personal reading experience.
          </Card>
          <Card title="The StoryGraph">
            Strong analytics and mood-based recommendations with a clean interface, but the depth can overwhelm casual readers. <strong>Shelf's opportunity:</strong> match the visual clarity while keeping the feature set intentionally small and approachable.
          </Card>
          <Card title="Literal (literal.club)">
            A modern, minimal reading tracker with a social angle. Beautiful design, but progress tracking and reflection are lightweight. <strong>Shelf's opportunity:</strong> keep the minimal aesthetic while giving more space to personal notes and progress.
          </Card>
        </div>
      </section>

      <section className="space-y-2">
        <H>Major Features</H>
        <ul className="grid grid-cols-1 gap-1.5 pl-5 text-sm text-foreground/85 sm:grid-cols-2">
          <li>Live book search (Open Library API)</li>
          <li>Save to shelves (Want / Reading / Finished)</li>
          <li>Interactive five-star rating</li>
          <li>Reading-progress slider</li>
          <li>Auto-saving reflection notes</li>
          <li>Reading-stats dashboard</li>
          <li>Shelf filtering and sorting</li>
          <li>Responsive, installable PWA</li>
        </ul>
      </section>

      <section className="space-y-3">
        <H>User Flow</H>
        <div className="rounded-xl border border-border/60 bg-card p-5">
          <ol className="list-decimal space-y-2 pl-5 text-sm leading-relaxed text-foreground/85">
            <li><strong>Discover:</strong> User opens the app and taps "Discover," then searches a title, author, or topic.</li>
            <li><strong>Save:</strong> User taps "Save to shelf" on a result; the book is created in the database on "Want to Read" and the user lands on its detail page.</li>
            <li><strong>Track:</strong> When the user starts reading, they switch the shelf to "Reading" and adjust the progress slider as they read.</li>
            <li><strong>Reflect:</strong> On finishing, the user moves the book to "Finished," assigns a star rating, and writes a reflection note that auto-saves.</li>
            <li><strong>Review:</strong> From Home, the user sees stats, in-progress books, and their recently added titles.</li>
          </ol>
        </div>
      </section>
    </article>
  );
}