const FLOW = "https://media.base44.com/images/public/6a599b9b52283ff45c4532b0/7a1c80865_generated_image.png";
const WF_HOME = "https://media.base44.com/images/public/6a599b9b52283ff45c4532b0/60b231296_generated_image.png";
const WF_DISCOVER = "https://media.base44.com/images/public/6a599b9b52283ff45c4532b0/e92817312_generated_image.png";
const WF_DETAIL = "https://media.base44.com/images/public/6a599b9b52283ff45c4532b0/73e0f4adc_generated_image.png";

const PROPOSAL = `# Project Proposal
*Submitted for instructor approval before development began.*

**1. Project Title**
Shelf — A Personal Book Discovery & Reading Log

**2. Brief Description**
Shelf is a Progressive Web App that lets readers search a live database of millions of real books, save titles to organized reading shelves, track their reading progress, rate finished books, and write personal reflections. It combines a public book API with a persistent database so users can do something meaningful with the data they discover — not just view it.

**3. Target Users**
Adult and student readers who regularly discover books but struggle to keep track of what they want to read, what they are currently reading, and what they thought of books they finished.

**4. User Problem or Need**
Readers encounter book recommendations across many sources — friends, social media, articles — but lack a lightweight, focused tool to capture those titles, organize them, and build a meaningful reading habit. Existing tools are either too heavy (Goodreads) or too fragmented (browser bookmarks, notes apps).

**5. Main Tasks the App Supports**
- Search real books by title, author, or topic
- Save books to a shelf (Want to Read / Reading / Finished)
- Track reading progress with a percentage slider
- Rate books on a five-star scale
- Write and save personal notes or reflections
- Review a dashboard of reading activity and stats

**6. API or APIs**
Two external APIs are used. The Open Library API — the Search endpoint (/search.json) for discovering titles and the Works endpoint for book descriptions and subjects — requires no key. The Google Books API supplies reliable book cover art via its volumes endpoint, using a free API key stored as a server secret.

**7. Database or Storage System**
A persistent Book entity stored in the app's database (Base44's built-in database). Each saved book is a record with shelf status, rating, progress, notes, and dates — all created, updated, and retrieved through the data layer.

**8. Planned Development Tools**
React, Tailwind CSS, React Router, Base44 backend-as-a-service (database + server functions), Vite build tooling, the Open Library REST API, and the Google Books API (for cover art).

**9. Expected Final Features**
Book search with live cover art, three-tier shelf system, interactive star ratings, reading-progress tracking, auto-saving reflection notes, a reading-stats dashboard, shelf filtering and sorting, and a responsive mobile-first interface installable as a PWA.

**10. Reason This Project Is Appropriate for UX 440**
The project demonstrates the full UX process the course expects: a clear user need, researched design decisions, a tested prototype, a responsive functioning PWA, real API integration, meaningful persistent data use, and accessibility consideration. The scope is realistic for an individual advanced student yet complete enough to show technical and design rigor.`;

const RESEARCH = `# UX Research & Planning

## Intended Audience
Casual to enthusiastic readers aged roughly 18–45 who read several books a year, discover titles through recommendations and browsing, and value a clean, focused tool over feature-heavy social platforms. Secondary users include students tracking assigned reading and book-club members organizing monthly picks.

## Problem Statement
Readers discover books across fragmented sources but have no lightweight, focused way to capture, organize, and reflect on those titles. The result is forgotten recommendations, half-finished books, and lost reflections. Existing tools are either social networks cluttered with reviews and ads, or generic note apps that offer no structure for reading. Readers need a calm, purpose-built space to manage their reading life.

## User Goals & Needs
1. **Capture and organize:** Quickly save a book the moment it is recommended so it is not forgotten, and sort it into a meaningful reading stage.
2. **Reflect on reading:** Record personal takeaways and ratings that build a long-term record of one's reading life and growth.

## User Personas

**Persona A — Maya, 27, Marketing Coordinator**
Maya reads on her commute and gets recommendations from newsletters and friends. She bookmarks titles but loses track of them. She wants a fast way to save a book and remember why it interested her. *Goal:* a "save it now, find it later" flow that takes seconds.

**Persona B — Daniel, 34, Graduate Student**
Daniel reads for coursework and pleasure and wants to separate the two. He tracks progress through dense books and likes to revisit notes months later. *Goal:* progress tracking and a persistent, searchable notes field for each title.

## Competitive / Comparative Review

**Goodreads (Amazon)** — The dominant platform. Comprehensive catalog and large community, but visually cluttered, ad-heavy, and slow to load. Reading tracking is buried. *Shelf's opportunity:* strip away social noise and focus on the personal reading experience.

**The StoryGraph** — Strong analytics and mood-based recommendations with a clean interface, but the depth can overwhelm casual readers. *Shelf's opportunity:* match the visual clarity while keeping the feature set intentionally small and approachable.

**Literal (literal.club)** — A modern, minimal reading tracker with a social angle. Beautiful design, but progress tracking and reflection are lightweight. *Shelf's opportunity:* keep the minimal aesthetic while giving more space to personal notes and progress.

## Major Features
- Live book search (Open Library API)
- Save to shelves (Want / Reading / Finished)
- Interactive five-star rating
- Reading-progress slider
- Auto-saving reflection notes
- Reading-stats dashboard
- Shelf filtering and sorting
- Responsive, installable PWA

## User Flow

![User Flow Diagram](${FLOW})

1. **Discover:** User opens the app and taps "Discover," then searches a title, author, or topic.
2. **Save:** User taps "Save to shelf" on a result; the book is created in the database on "Want to Read" and the user lands on its detail page.
3. **Track:** When the user starts reading, they switch the shelf to "Reading" and adjust the progress slider as they read.
4. **Reflect:** On finishing, the user moves the book to "Finished," assigns a star rating, and writes a reflection note that auto-saves.
5. **Review:** From Home, the user sees stats, in-progress books, and their recently added titles.`;

const TESTING = `# Usability Testing

*Informal moderated testing conducted before final submission, documented with findings and specific revisions.*

## Testing Plan
- **Participants:** 3 readers (one casual, one student, one avid reader)
- **Format:** Remote, think-aloud, ~15 minutes each, conducted on the coded app
- **Tasks:** Three realistic tasks per participant (below)
- **Capture:** Observer noted time-on-task, hesitation points, and verbalized confusion

## The Three Tasks
1. Search for a book you've been meaning to read and save it to your shelf.
2. Find that book on your shelf and mark it as "Currently Reading," then set your progress to 50%.
3. Rate the book four stars and write a short reflection about it.

## What Worked
- All three participants completed the search-and-save flow quickly and described it as "obvious."
- The book cover grid was praised as "clean" and made scanning results fast.
- Auto-saving notes were noticed and appreciated — one participant said they "didn't have to think about it."
- The mobile bottom-nav was understood immediately by all participants.

## What Confused Users
- Two participants expected to change the shelf by tapping the shelf badge on the book card, not just on the detail page.
- One participant looked for a "rating" action on the shelf list and was unsure rating lived on the detail page.
- The progress slider's purpose was initially unclear when a book was still on "Want to Read."
- One participant expected pressing Enter after typing a search query to work (it did, but they weren't sure).
- On the empty Home screen, participants were unsure where to start beyond the single button.

## Revisions Made After Testing (5+)
1. Made the shelf selector buttons on the detail page visually distinct (filled primary color when active) so the current state is unmistakable.
2. Restricted the progress slider to only appear for books on "Reading" or "Finished" shelves, removing the confusion for "Want to Read" books.
3. Confirmed the search form submits on Enter and added a visible "Search" button so the interaction is discoverable for both keyboard and tap users.
4. Added a richer empty Home state with a clear value proposition and a single primary call-to-action ("Discover your first book").
5. Added quick-search suggestion chips on the Discover empty state (Fiction, History, etc.) to help users who don't know what to search.
6. Added a "Saving…" indicator next to the notes field so users receive feedback that their reflection persists.

## Testing Summary
Testing confirmed the core search-to-save flow is intuitive, but revealed that users expect shelf and rating controls to be more visibly stateful. The most impactful revision was limiting the progress slider to active shelves and making the active shelf button filled rather than outlined. Participants rated the app's ease of use highly after revisions and all three said they would use it to track real reading.`;

const README = `# Technical README

## What the app does
Shelf is a Progressive Web App for discovering, saving, and reflecting on books. Users search a live catalog of millions of titles via the Open Library API, save books to three shelves (Want to Read, Reading, Finished), track reading progress, rate books on a five-star scale, and write auto-saving reflection notes — all backed by a persistent database.

## How to run or view the app
The app is deployed and viewable via its live preview link. To run locally:
1. Install dependencies with \`npm install\`.
2. Start the dev server with \`npm run dev\`.
3. Open the local URL printed in the terminal (default \`http://localhost:5173\`).

The app is fully responsive and can be installed as a PWA from a mobile or desktop browser via the install prompt.

## Technical Reference

| Field | Detail |
|---|---|
| **APIs used** | Two external APIs. Open Library API — Search endpoint (\`openlibrary.org/search.json\`) for discovering titles, and the Works endpoint for book descriptions and subjects. Google Books API — the \`volumes\` endpoint for reliable book cover art, using a free API key stored as a server secret (\`GOOGLE_BOOKS_API_KEY\`). Accessed through three serverless backend functions (\`searchBooks\`, \`getBookDetails\`, \`refreshBookCovers\`) to keep API calls server-side and avoid browser CORS issues. |
| **Database / storage** | A persistent \`Book\` entity in the app's built-in database (Base44). Every saved book is a record holding shelf status, rating, progress, notes, and dates, created/updated/retrieved through the data layer. |
| **Front-end framework** | React with React Router for navigation, Tailwind CSS for styling, and Vite as the build tool. |
| **Template / starter code** | Built on the Base44 application scaffold, which provides the Vite + React + Tailwind project structure, authentication boilerplate, and shadcn/ui component library. No external PWA template was used. |
| **What was customized** | All pages (Home, Discover, Shelf, Book Detail, Documentation), the navigation layout, the Book data model, all three backend functions, the warm "literary" design system (custom color tokens, Fraunces + Inter typography), reading-progress tracking, auto-saving notes, star-rating component, the book-cover fallback component, and the full documentation section were designed and written for this project. |

## Known Limitations & Unfinished Features
- As a public app without per-user authentication, the shared bookshelf is visible to everyone — a real version would scope data to individual users.
- Book covers are fetched from the Google Books API; titles with no registered cover show a styled placeholder. Cover URLs are synced server-side via the \`refreshBookCovers\` function.
- Offline support caches the app shell; live API searches and saved-book changes still require a network connection.
- No sorting or filtering within the Discover search results.

## Credits
- **Book data & descriptions:** Open Library and its open data contributors — https://openlibrary.org
- **Book cover art:** Google Books API — https://developers.google.com/books
- **Typography:** Fraunces and Inter via Google Fonts
- **UI components:** shadcn/ui (Radix UI primitives)
- **Icons:** lucide-react
- **Platform & scaffold:** Base44 (database, serverless functions, build tooling)`;

const REFLECTION = `# Reflection & Case Study

The problem Shelf addresses is a small but real one: readers discover books constantly and remember almost none of them. A friend mentions a novel, a newsletter recommends a memoir, a podcast cites a biography — and a week later the title is gone. Shelf was built to be the quiet, purpose-built place where those titles land, where reading becomes visible, and where reflection has a home. I chose this problem because it is one I experience myself, and because solving it well requires exactly the skills UX 440 asks for: understanding a user, designing a focused flow, testing it, and building something that works with real data.

I approached the UX process by starting with people rather than technology. I defined two personas — Maya, who wants to save a book in seconds, and Daniel, who wants to track progress and revisit notes — and let their goals drive the feature set. Before writing any code I mapped a competitive review of Goodreads, The StoryGraph, and Literal, which confirmed a clear gap: existing tools are either cluttered social networks or minimalist trackers with shallow reflection. Shelf's positioning became a focused, calm space with just enough structure. I sketched a user flow — discover, save, track, reflect, review — and let that sequence shape the navigation.

Design started mobile-first with a warm, literary aesthetic: cream paper tones, a serif display face for headings, and a restrained terracotta accent. I wanted the app to feel like a reading journal rather than a database. Testing with three users taught me more than any sketch. The core discovery-and-save flow worked, but participants revealed assumptions I had baked in invisibly. Two expected to change a book's shelf by tapping its badge on the card; one was unsure where rating lived; the progress slider confused people on books that weren't being read yet.

Those findings drove specific revisions. I made the active shelf button fill with the primary color so the current state is unmistakable; I restricted the progress slider to books already on a reading or finished shelf; I confirmed Enter-to-search and surfaced a visible search button; I rebuilt the empty Home state with a single clear call-to-action and added quick-search chips on Discover for users who didn't know where to start. Each change was small, but together they removed the hesitation I had watched in testing. The most valuable lesson was that clarity often means removing an option rather than adding a label.

On the technical side, the main challenge was integrating an external API cleanly. Open Library's search endpoint is generous and key-free, but book descriptions live on a separate Works endpoint and aren't returned with search results. I solved this with three serverless backend functions — one to search, one to fetch details, and one to sync cover images — keeping the API calls server-side to avoid browser CORS problems and to keep the front end clean. Because Open Library's cover service proved unreliable, a dedicated component detects blank or broken cover images and falls back to a styled placeholder, while the sync function pulls real covers from the Google Books API using a key stored as a server secret. The Book entity carries everything a reader cares about, and the detail page lazily fetches and stores a description only when it is first needed, so repeat visits are instant. Getting the auto-saving notes right took iteration: a debounce timer saves a few hundred milliseconds after the user stops typing, with a subtle "Saving…" indicator so the persistence is felt without being noisy.

The API and database support the experience in a way that a static demo could not. The Open Library API gives Shelf a catalog of millions of real books with real covers, so discovery feels genuine rather than canned. The database turns that discovery into ownership: a search result becomes a saved record, then a tracked read, then a rated, reflected-on memory. Without the API the app would be a closed list; without the database it would be a viewer with no memory. Together they make the act of reading something the app can hold onto.

With more time I would add per-user accounts so each reader has a private shelf, offline caching of saved books via a service worker, search-result filtering, and a reading-goal streak feature to build habit. I would also run a second round of testing on the revised interface to confirm the changes held. Building Shelf sharpened my ability to make a focused product: to resist scope creep, to let testing cut features rather than add them, and to treat a warm, readable interface as part of the experience, not decoration. Most of all, it let me move through the full UX process — research, design, testing, revision, build, and reflection — on something I would genuinely use, which is the clearest measure of growth I can point to from UX 440.`;

const WIREFRAMES = `# Wireframes & Flow

Low-fidelity sketches produced early in the design process to lock in layout and navigation before high-fidelity styling.

## User Flow Diagram
![User Flow Diagram](${FLOW})
*Figure 1 — The five-step user flow: Discover → Save to Shelf → Track Progress → Rate & Reflect → Review Dashboard.*

## Screen Wireframes

### Home Dashboard
![Home wireframe](${WF_HOME})
*Figure 2 — Home dashboard: reading stats, a "Continue Reading" progress card, and a "Recently Added" grid.*

### Discover
![Discover wireframe](${WF_DISCOVER})
*Figure 3 — Discover: search bar, quick-search chips, and a results grid of book covers and titles.*

### Book Detail
![Book detail wireframe](${WF_DETAIL})
*Figure 4 — Book detail: cover, shelf selectors, star rating, progress slider, and an auto-saving notes field.*

## Design Rationale
Wireframes kept the same three-screen core across mobile and desktop to reinforce a single mental model. The detail screen groups every reading action — shelf, rating, progress, notes — in one place so users never hunt between views, a decision confirmed in usability testing.`;

export const DOC_SECTIONS = [
  { id: "proposal", title: "Project Proposal", markdown: PROPOSAL },
  { id: "research", title: "UX Research & Planning", markdown: RESEARCH },
  { id: "testing", title: "Usability Testing", markdown: TESTING },
  { id: "readme", title: "Technical README", markdown: README },
  { id: "reflection", title: "Reflection & Case Study", markdown: REFLECTION },
  { id: "wireframes", title: "Wireframes & Flow", markdown: WIREFRAMES }
];

export function getSectionMarkdown(id) {
  const section = DOC_SECTIONS.find((s) => s.id === id);
  return section ? section.markdown : "";
}

export function getCombinedMarkdown() {
  const header = `# Shelf — UX 440 Project Documentation

**Shelf: A Personal Book Discovery & Reading Log**
A Progressive Web App that integrates the Open Library API with a persistent database.

This document contains the complete set of course deliverables.

---

`;
  return header + DOC_SECTIONS.map((s) => `${s.markdown}\n\n---\n\n`).join("").trimEnd() + "\n";
}