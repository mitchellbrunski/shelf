function Field({ label, children }) {
  return (
    <div className="border-l-2 border-primary/30 pl-4">
      <p className="text-xs font-semibold uppercase tracking-wider text-primary">{label}</p>
      <div className="mt-1.5 text-sm leading-relaxed text-foreground/90">{children}</div>
    </div>
  );
}

export default function Proposal() {
  return (
    <article className="space-y-7">
      <header>
        <p className="text-xs font-semibold uppercase tracking-wider text-primary">Step One · For Instructor Approval</p>
        <h1 className="mt-1 font-heading text-3xl font-semibold text-foreground">Project Proposal</h1>
        <p className="mt-2 text-sm text-muted-foreground">A focused overview submitted before development began, defining scope, users, and tools.</p>
      </header>

      <div className="space-y-5">
        <Field label="1 · Project Title">
          <p className="font-medium">Shelf — A Personal Book Discovery & Reading Log</p>
        </Field>
        <Field label="2 · Brief Description">
          Shelf is a Progressive Web App that lets readers search a live database of millions of real books, save titles to organized reading shelves, track their reading progress, rate finished books, and write personal reflections. It combines a public book API with a persistent database so users can do something meaningful with the data they discover — not just view it.
        </Field>
        <Field label="3 · Target Users">
          Adult and student readers who regularly discover books but struggle to keep track of what they want to read, what they are currently reading, and what they thought of books they finished.
        </Field>
        <Field label="4 · User Problem or Need">
          Readers encounter book recommendations across many sources — friends, social media, articles — but lack a lightweight, focused tool to capture those titles, organize them, and build a meaningful reading habit. Existing tools are either too heavy (Goodreads) or too fragmented (browser bookmarks, notes apps).
        </Field>
        <Field label="5 · Main Tasks the App Supports">
          <ul className="list-disc space-y-1 pl-5">
            <li>Search real books by title, author, or topic</li>
            <li>Save books to a shelf (Want to Read / Reading / Finished)</li>
            <li>Track reading progress with a percentage slider</li>
            <li>Rate books on a five-star scale</li>
            <li>Write and save personal notes or reflections</li>
            <li>Review a dashboard of reading activity and stats</li>
          </ul>
        </Field>
        <Field label="6 · API or APIs">
          The Open Library API — specifically the Search endpoint (<code className="rounded bg-muted px-1 text-xs">/search.json</code>) for discovering titles and the Works endpoint for retrieving book descriptions and subjects. No API key is required.
        </Field>
        <Field label="7 · Database or Storage System">
          A persistent Book entity stored in the app's database (Base44's built-in database). Each saved book is a record with shelf status, rating, progress, notes, and dates — all created, updated, and retrieved through the data layer.
        </Field>
        <Field label="8 · Planned Development Tools">
          React, Tailwind CSS, React Router, Base44 backend-as-a-service (database + server functions), Vite build tooling, and the Open Library REST API.
        </Field>
        <Field label="9 · Expected Final Features">
          Book search with live cover art, three-tier shelf system, interactive star ratings, reading-progress tracking, auto-saving reflection notes, a reading-stats dashboard, shelf filtering and sorting, and a responsive mobile-first interface installable as a PWA.
        </Field>
        <Field label="10 · Reason This Project Is Appropriate for UX 440">
          The project demonstrates the full UX process the course expects: a clear user need, researched design decisions, a tested prototype, a responsive functioning PWA, real API integration, meaningful persistent data use, and accessibility consideration. The scope is realistic for an individual advanced student yet complete enough to show technical and design rigor.
        </Field>
      </div>
    </article>
  );
}