function H({ children }) {
  return <h3 className="font-heading text-lg font-semibold text-foreground">{children}</h3>;
}
function Row({ k, children }) {
  return (
    <div className="grid grid-cols-1 gap-1 border-t border-border/60 py-3 sm:grid-cols-[200px_1fr] sm:gap-4">
      <p className="text-sm font-semibold text-primary">{k}</p>
      <div className="text-sm leading-relaxed text-foreground/85">{children}</div>
    </div>
  );
}

export default function Readme() {
  return (
    <article className="space-y-8">
      <header>
        <p className="text-xs font-semibold uppercase tracking-wider text-primary">Deliverable 5 · Technical README</p>
        <h1 className="mt-1 font-heading text-3xl font-semibold text-foreground">Technical README</h1>
      </header>

      <section>
        <H>What the app does</H>
        <p className="mt-2 text-sm leading-relaxed text-foreground/85">
          Shelf is a Progressive Web App for discovering, saving, and reflecting on books. Users search a live catalog of millions of titles via the Open Library API, save books to three shelves (Want to Read, Reading, Finished), track reading progress, rate books on a five-star scale, and write auto-saving reflection notes — all backed by a persistent database.
        </p>
      </section>

      <section>
        <H>How to run or view the app</H>
        <div className="mt-2 space-y-1">
          <p className="text-sm leading-relaxed text-foreground/85">The app is deployed and viewable via its live preview link. To run locally:</p>
          <ol className="list-decimal space-y-1 pl-5 text-sm leading-relaxed text-foreground/85">
            <li>Install dependencies with <code className="rounded bg-muted px-1 text-xs">npm install</code>.</li>
            <li>Start the dev server with <code className="rounded bg-muted px-1 text-xs">npm run dev</code>.</li>
            <li>Open the local URL printed in the terminal (default <code className="rounded bg-muted px-1 text-xs">http://localhost:5173</code>).</li>
          </ol>
          <p className="text-sm leading-relaxed text-foreground/85">The app is fully responsive and can be installed as a PWA from a mobile or desktop browser via the install prompt.</p>
        </div>
      </section>

      <section>
        <H>Technical reference</H>
        <div className="mt-2">
          <Row k="API used">Open Library API — Search endpoint (<code className="text-xs">openlibrary.org/search.json</code>) for discovering titles, and the Works endpoint for book descriptions and subjects. Accessed through two serverless backend functions (<code className="text-xs">searchBooks</code>, <code className="text-xs">getBookDetails</code>) to keep API calls server-side and avoid browser CORS issues.</Row>
          <Row k="Database / storage">A persistent <code className="text-xs">Book</code> entity in the app's built-in database (Base44). Every saved book is a record holding shelf status, rating, progress, notes, and dates, created/updated/retrieved through the data layer.</Row>
          <Row k="Front-end framework">React with React Router for navigation, Tailwind CSS for styling, and Vite as the build tool.</Row>
          <Row k="Template / starter code">Built on the Base44 application scaffold, which provides the Vite + React + Tailwind project structure, authentication boilerplate, and shadcn/ui component library. No external PWA template was used.</Row>
          <Row k="What was customized">All pages (Home, Discover, Shelf, Book Detail, Documentation), the navigation layout, the Book data model, both backend functions, the warm "literary" design system (custom color tokens, Fraunces + Inter typography), reading-progress tracking, auto-saving notes, star-rating component, and the full documentation section were designed and written for this project.</Row>
        </div>
      </section>

      <section>
        <H>Known limitations & unfinished features</H>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-relaxed text-foreground/85">
          <li>As a public app without per-user authentication, the shared bookshelf is visible to everyone — a real version would scope data to individual users.</li>
          <li>The PWA manifest uses a placeholder icon; a dedicated app icon set has not yet been generated.</li>
          <li>Search results rely on the Open Library cover service, so titles without a registered cover show a styled placeholder.</li>
          <li>There is no offline caching beyond the browser default — a service worker could cache the shelf for offline reading.</li>
          <li>No sorting or filtering within the Discover search results.</li>
        </ul>
      </section>

      <section>
        <H>Credits</H>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-relaxed text-foreground/85">
          <li><strong>Book data & covers:</strong> Open Library and its open data contributors — <a href="https://openlibrary.org" className="text-primary underline">openlibrary.org</a></li>
          <li><strong>Typography:</strong> Fraunces and Inter via Google Fonts</li>
          <li><strong>UI components:</strong> shadcn/ui (Radix UI primitives)</li>
          <li><strong>Icons:</strong> lucide-react</li>
          <li><strong>Platform & scaffold:</strong> Base44 (database, serverless functions, build tooling)</li>
        </ul>
      </section>
    </article>
  );
}