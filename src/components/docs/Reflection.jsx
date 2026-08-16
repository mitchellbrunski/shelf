export default function Reflection() {
  return (
    <article className="space-y-7">
      <header>
        <p className="text-xs font-semibold uppercase tracking-wider text-primary">Deliverable 6 · Case Study</p>
        <h1 className="mt-1 font-heading text-3xl font-semibold text-foreground">Final Reflection & Case Study</h1>
      </header>

      <div className="space-y-5 text-[15px] leading-relaxed text-foreground/85">
        <p>
          The problem Shelf addresses is a small but real one: readers discover books constantly and remember almost none of them. A friend mentions a novel, a newsletter recommends a memoir, a podcast cites a biography — and a week later the title is gone. Shelf was built to be the quiet, purpose-built place where those titles land, where reading becomes visible, and where reflection has a home. I chose this problem because it is one I experience myself, and because solving it well requires exactly the skills UX 440 asks for: understanding a user, designing a focused flow, testing it, and building something that works with real data.
        </p>

        <p>
          I approached the UX process by starting with people rather than technology. I defined two personas — Maya, who wants to save a book in seconds, and Daniel, who wants to track progress and revisit notes — and let their goals drive the feature set. Before writing any code I mapped a competitive review of Goodreads, The StoryGraph, and Literal, which confirmed a clear gap: existing tools are either cluttered social networks or minimalist trackers with shallow reflection. Shelf's positioning became a focused, calm space with just enough structure. I sketched a user flow — discover, save, track, reflect, review — and let that sequence shape the navigation.
        </p>

        <p>
          Design started mobile-first with a warm, literary aesthetic: cream paper tones, a serif display face for headings, and a restrained terracotta accent. I wanted the app to feel like a reading journal rather than a database. Testing with three users taught me more than any sketch. The core discovery-and-save flow worked, but participants revealed assumptions I had baked in invisibly. Two expected to change a book's shelf by tapping its badge on the card; one was unsure where rating lived; the progress slider confused people on books that weren't being read yet.
        </p>

        <p>
          Those findings drove specific revisions. I made the active shelf button fill with the primary color so the current state is unmistakable; I restricted the progress slider to books already on a reading or finished shelf; I confirmed Enter-to-search and surfaced a visible search button; I rebuilt the empty Home state with a single clear call-to-action and added quick-search chips on Discover for users who didn't know where to start. Each change was small, but together they removed the hesitation I had watched in testing. The most valuable lesson was that clarity often means removing an option rather than adding a label.
        </p>

        <p>
          On the technical side, the main challenge was integrating an external API cleanly. Open Library's search endpoint is generous and key-free, but book descriptions live on a separate Works endpoint and aren't returned with search results. I solved this with three serverless backend functions — one to search, one to fetch details, and one to sync cover images — keeping the API calls server-side to avoid browser CORS problems and to keep the front end clean. Because Open Library's cover service proved unreliable, a dedicated component detects blank or broken cover images and falls back to a styled placeholder, while the sync function pulls real covers from the Google Books API using a key stored as a server secret. The Book entity carries everything a reader cares about, and the detail page lazily fetches and stores a description only when it is first needed, so repeat visits are instant. Getting the auto-saving notes right took iteration: a debounce timer saves a few hundred milliseconds after the user stops typing, with a subtle "Saving…" indicator so the persistence is felt without being noisy.
        </p>

        <p>
          The API and database support the experience in a way that a static demo could not. The Open Library API gives Shelf a catalog of millions of real books with real covers, so discovery feels genuine rather than canned. The database turns that discovery into ownership: a search result becomes a saved record, then a tracked read, then a rated, reflected-on memory. Without the API the app would be a closed list; without the database it would be a viewer with no memory. Together they make the act of reading something the app can hold onto.
        </p>

        <p>
          With more time I would add per-user accounts so each reader has a private shelf, a service worker for offline access to saved books, search-result filtering, and a reading-goal streak feature to build habit. I would also run a second round of testing on the revised interface to confirm the changes held. Building Shelf sharpened my ability to make a focused product: to resist scope creep, to let testing cut features rather than add them, and to treat a warm, readable interface as part of the experience, not decoration. Most of all, it let me move through the full UX process — research, design, testing, revision, build, and reflection — on something I would genuinely use, which is the clearest measure of growth I can point to from UX 440.
        </p>
      </div>
    </article>
  );
}