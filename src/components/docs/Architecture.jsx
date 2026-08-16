function H({ children }) {
  return <h3 className="font-heading text-lg font-semibold text-foreground">{children}</h3>;
}
function Sub({ children }) {
  return <h4 className="mt-4 font-heading text-sm font-semibold text-foreground/90">{children}</h4>;
}
function Mono({ children }) {
  return <code className="rounded bg-muted px-1 py-0.5 text-xs">{children}</code>;
}
function Row({ k, children }) {
  return (
    <div className="grid grid-cols-1 gap-1 border-t border-border/60 py-3 sm:grid-cols-[200px_1fr] sm:gap-4">
      <p className="text-sm font-semibold text-primary">{k}</p>
      <div className="text-sm leading-relaxed text-foreground/85">{children}</div>
    </div>
  );
}
function FieldRow({ name, type, note }) {
  return (
    <div className="grid grid-cols-[1fr_110px_1.4fr] gap-3 border-t border-border/50 py-2 text-sm">
      <code className="text-xs text-foreground">{name}</code>
      <span className="text-xs text-muted-foreground">{type}</span>
      <span className="text-xs leading-relaxed text-foreground/75">{note}</span>
    </div>
  );
}

export default function Architecture() {
  return (
    <article className="space-y-8">
      <header>
        <p className="text-xs font-semibold uppercase tracking-wider text-primary">Deliverable 5b · Technical Architecture</p>
        <h1 className="mt-1 font-heading text-3xl font-semibold text-foreground">Technical Architecture</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          A complete reference for the Shelf stack, external APIs, serverless functions, data model, and how the pieces fit together.
        </p>
      </header>

      <section>
        <H>Overview</H>
        <p className="mt-2 text-sm leading-relaxed text-foreground/85">
          Shelf is a Progressive Web App for discovering, saving, and reflecting on books. A user searches a live catalog of
          millions of real titles, saves books to one of three shelves (Want to Read, Reading, Finished), tracks reading progress,
          rates finished books on a five-star scale, and writes auto-saving reflection notes. Discovery is powered by the
          Open Library API; reliable cover art is supplied by the Google Books API. All book data is persisted in a hosted
          database through the Base44 backend-as-a-service platform.
        </p>
      </section>

      <section>
        <H>Technology stack</H>
        <div className="mt-2">
          <Row k="Front-end framework">React 18 with React Router for client-side navigation, Tailwind CSS for styling, and Vite as the build tool.</Row>
          <Row k="UI components">shadcn/ui — accessible components built on Radix UI primitives — plus custom-built components for book covers, star ratings, shelf badges, and the reading dashboard.</Row>
          <Row k="Charts">Recharts, used for the reading-progress and genre-distribution bar charts on the Home dashboard.</Row>
          <Row k="Icons">lucide-react.</Row>
          <Row k="Typography">Fraunces (serif display & headings) and Inter (body) loaded from Google Fonts.</Row>
          <Row k="Back-end platform">Base44 backend-as-a-service — hosted database, serverless functions, managed authentication, file storage, and build/hosting tooling.</Row>
          <Row k="PWA">A web manifest (<Mono>public/manifest.json</Mono>) and service worker (<Mono>public/sw.js</Mono>) make the app installable and cache the app shell.</Row>
        </div>
      </section>

      <section>
        <H>External APIs</H>
        <p className="mt-2 text-sm leading-relaxed text-foreground/85">
          Shelf integrates two external REST APIs. Both are called server-side from backend functions to avoid browser CORS
          issues and to keep the front end clean.
        </p>

        <Sub>1. Open Library API</Sub>
        <div className="mt-1">
          <Row k="Base URL"><Mono>https://openlibrary.org</Mono></Row>
          <Row k="Search endpoint"><Mono>/search.json?q=…&page=…&fields=…</Mono> — discovers titles by title, author, or topic. Returns paginated results including cover IDs, OLIDs, and work keys. No API key required.</Row>
          <Row k="Works endpoint"><Mono>/works/{`{work_key}`}.json</Mono> — fetches a book's full description and subject list. Queried lazily the first time a user opens a book's detail page.</Row>
          <Row k="Used by"><Mono>searchBooks</Mono> and <Mono>getBookDetails</Mono> functions.</Row>
        </div>

        <Sub>2. Google Books API</Sub>
        <div className="mt-1">
          <Row k="Base URL"><Mono>https://www.googleapis.com/books/v1</Mono></Row>
          <Row k="Volumes endpoint"><Mono>/volumes?q=…&maxResults=1&key=…</Mono> — returns high-quality book cover images (<Mono>imageLinks.thumbnail</Mono>). Requires a free API key stored as the server secret <Mono>GOOGLE_BOOKS_API_KEY</Mono>.</Row>
          <Row k="Why it's used">Open Library's own cover service proved unreliable (blank and 1×1 placeholder images). Google Books provides dependable cover art as a fallback source.</Row>
          <Row k="Used by"><Mono>refreshBookCovers</Mono> function.</Row>
        </div>
      </section>

      <section>
        <H>Serverless backend functions</H>
        <p className="mt-2 text-sm leading-relaxed text-foreground/85">
          Three serverless functions run on the Base44 runtime. Each is an HTTP handler that uses the SDK's service-role client
          to read and write the <Mono>Book</Mono> entity.
        </p>
        <div className="mt-2">
          <Row k={<Mono>searchBooks</Mono>}>Queries the Open Library Search endpoint, normalizes results into the app's book shape (title, author, cover URL, OLID, work key, subjects), and returns paginated metadata. The Discover page calls this on every search.</Row>
          <Row k={<Mono>getBookDetails</Mono>}>Given a book's work key, fetches the Open Library Works endpoint for the full description and subject list, then persists them onto the saved Book record so repeat visits are instant. The Book Detail page calls this on first open.</Row>
          <Row k={<Mono>refreshBookCovers</Mono>}>Iterates every Book record, queries the Google Books API with a multi-step search fallback (intitle+inauthor → title+author → title alone), upgrades the returned image to HTTPS and a crisper zoom level, and writes the cover URL back to the record. Re-run any time to fill in missing covers.</Row>
        </div>
      </section>

      <section>
        <H>Data model — the Book entity</H>
        <p className="mt-2 text-sm leading-relaxed text-foreground/85">
          All saved books are records of a single <Mono>Book</Mono> entity. Below are its custom fields (every record also
          has built-in <Mono>id</Mono>, <Mono>created_date</Mono>, <Mono>updated_date</Mono>, and <Mono>created_by_id</Mono>).
        </p>
        <div className="mt-3 rounded-lg border border-border/60 bg-card px-4 py-2">
          <div className="grid grid-cols-[1fr_110px_1.4fr] gap-3 border-b border-border/60 pb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            <span>Field</span>
            <span>Type</span>
            <span>Description</span>
          </div>
          <FieldRow name="title" type="string (required)" note="The book's title." />
          <FieldRow name="author" type="string" note="Primary author." />
          <FieldRow name="cover_url" type="string" note="Cover image URL (sourced from Google Books)." />
          <FieldRow name="olid" type="string" note="Open Library cover/edition ID." />
          <FieldRow name="work_key" type="string" note="Open Library work key, e.g. /works/OL12345W." />
          <FieldRow name="description" type="string" note="Synopsis fetched from the Works endpoint." />
          <FieldRow name="published_year" type="number" note="Year of publication." />
          <FieldRow name="subjects" type="array<string>" note="Genre/subject tags, used by the genre chart." />
          <FieldRow name="shelf" type="enum" note="want_to_read · reading · finished (default want_to_read)." />
          <FieldRow name="rating" type="number 0–5" note="User's star rating (default 0)." />
          <FieldRow name="progress" type="number 0–100" note="Reading progress percentage (default 0)." />
          <FieldRow name="notes" type="string" note="Personal reflection, auto-saved." />
          <FieldRow name="started_date" type="date" note="When the user began reading." />
          <FieldRow name="finished_date" type="date" note="When the user finished." />
        </div>
      </section>

      <section>
        <H>Front-end architecture</H>
        <div className="mt-2">
          <Row k="Pages">Home (stats + reading dashboard + recent), Discover (live search), Shelf (filter/sort), Book Detail (shelf, rating, progress, notes), and Documentation.</Row>
          <Row k="Layout">A shared <Mono>Layout</Mono> component provides a sticky header with desktop nav and a mobile bottom navigation bar; nested routes render via <Mono>&lt;Outlet /&gt;</Mono>.</Row>
          <Row k="Book covers">A <Mono>BookCover</Mono> component renders cover images and detects blank/broken images, falling back to a styled placeholder so the grid never shows gaps.</Row>
          <Row k="Reading dashboard">A <Mono>ReadingCharts</Mono> component renders two Recharts bar charts — reading progress per in-progress book, and book distribution by genre.</Row>
          <Row k="Design system">Color and typography tokens live in <Mono>src/index.css</Mono> and are mapped to Tailwind classes in <Mono>tailwind.config.js</Mono>, including dedicated shelf-color tokens.</Row>
        </div>
      </section>

      <section>
        <H>PWA & offline behavior</H>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-relaxed text-foreground/85">
          <li>A web manifest (<Mono>manifest.json</Mono>) defines the app name, theme color, display mode, and icons, making Shelf installable on mobile and desktop.</li>
          <li>A service worker (<Mono>sw.js</Mono>) caches the app shell so the interface loads without a network.</li>
          <li>Live API searches and saved-book changes still require a network connection; the backend runtime is hosted and not exportable for fully offline self-hosting.</li>
        </ul>
      </section>

      <section>
        <H>How to run locally</H>
        <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm leading-relaxed text-foreground/85">
          <li>Install dependencies with <Mono>npm install</Mono>.</li>
          <li>Configure the Base44 environment variables (see <Mono>LOCAL_SETUP.md</Mono>).</li>
          <li>Start the dev server with <Mono>npm run dev</Mono> and open the printed local URL.</li>
          <li>The <Mono>GOOGLE_BOOKS_API_KEY</Mono> server secret must be set for the cover-sync function to work.</li>
        </ol>
      </section>

      <section>
        <H>Known limitations</H>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-relaxed text-foreground/85">
          <li>The shared bookshelf is visible across the app; a production version would scope data per user with row-level security.</li>
          <li>Cover art depends on the Google Books API; titles with no registered cover show a styled placeholder.</li>
          <li>The backend runtime (database and functions) is hosted and cannot be exported for fully offline self-hosting.</li>
          <li>There is no sorting or filtering within Discover search results.</li>
        </ul>
      </section>
    </article>
  );
}