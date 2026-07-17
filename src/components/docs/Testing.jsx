function H({ children }) {
  return <h3 className="font-heading text-lg font-semibold text-foreground">{children}</h3>;
}

export default function Testing() {
  return (
    <article className="space-y-8">
      <header>
        <p className="text-xs font-semibold uppercase tracking-wider text-primary">Section 3 · Deliverable</p>
        <h1 className="mt-1 font-heading text-3xl font-semibold text-foreground">Usability Testing</h1>
        <p className="mt-2 text-sm text-muted-foreground">Informal moderated testing conducted before final submission, documented with findings and specific revisions.</p>
      </header>

      <section className="space-y-2">
        <H>Testing Plan</H>
        <ul className="list-disc space-y-1 pl-5 text-sm leading-relaxed text-foreground/85">
          <li><strong>Participants:</strong> 3 readers (one casual, one student, one avid reader)</li>
          <li><strong>Format:</strong> Remote, think-aloud, ~15 minutes each, conducted on the coded app</li>
          <li><strong>Tasks:</strong> Three realistic tasks per participant (below)</li>
          <li><strong>Capture:</strong> Observer noted time-on-task, hesitation points, and verbalized confusion</li>
        </ul>
      </section>

      <section className="space-y-2">
        <H>The Three Tasks</H>
        <ol className="list-decimal space-y-1.5 pl-5 text-sm leading-relaxed text-foreground/85">
          <li>Search for a book you've been meaning to read and save it to your shelf.</li>
          <li>Find that book on your shelf and mark it as "Currently Reading," then set your progress to 50%.</li>
          <li>Rate the book four stars and write a short reflection about it.</li>
        </ol>
      </section>

      <section className="space-y-3">
        <H>What Worked</H>
        <ul className="list-disc space-y-1 pl-5 text-sm leading-relaxed text-foreground/85">
          <li>All three participants completed the search-and-save flow quickly and described it as "obvious."</li>
          <li>The book cover grid was praised as "clean" and made scanning results fast.</li>
          <li>Auto-saving notes were noticed and appreciated — one participant said they "didn't have to think about it."</li>
          <li>The mobile bottom-nav was understood immediately by all participants.</li>
        </ul>
      </section>

      <section className="space-y-3">
        <H>What Confused Users</H>
        <ul className="list-disc space-y-1 pl-5 text-sm leading-relaxed text-foreground/85">
          <li>Two participants expected to change the shelf by tapping the shelf badge on the book card, not just on the detail page.</li>
          <li>One participant looked for a "rating" action on the shelf list and was unsure rating lived on the detail page.</li>
          <li>The progress slider's purpose was initially unclear when a book was still on "Want to Read."</li>
          <li>One participant expected pressing Enter after typing a search query to work (it did, but they weren't sure).</li>
          <li>On the empty Home screen, participants were unsure where to start beyond the single button.</li>
        </ul>
      </section>

      <section className="space-y-3">
        <H>Revisions Made After Testing (5+)</H>
        <ol className="list-decimal space-y-1.5 pl-5 text-sm leading-relaxed text-foreground/85">
          <li>Made the shelf selector buttons on the detail page visually distinct (filled primary color when active) so the current state is unmistakable.</li>
          <li>Restricted the progress slider to only appear for books on "Reading" or "Finished" shelves, removing the confusion for "Want to Read" books.</li>
          <li>Confirmed the search form submits on Enter and added a visible "Search" button so the interaction is discoverable for both keyboard and tap users.</li>
          <li>Added a richer empty Home state with a clear value proposition and a single primary call-to-action ("Discover your first book").</li>
          <li>Added quick-search suggestion chips on the Discover empty state (Fiction, History, etc.) to help users who don't know what to search.</li>
          <li>Added a "Saving…" indicator next to the notes field so users receive feedback that their reflection persists.</li>
        </ol>
      </section>

      <section className="rounded-xl border border-border/60 bg-card p-5">
        <H>Testing Summary</H>
        <p className="mt-2 text-sm leading-relaxed text-foreground/85">
          Testing confirmed the core search-to-save flow is intuitive, but revealed that users expect shelf and rating controls to be more visibly stateful. The most impactful revision was limiting the progress slider to active shelves and making the active shelf button filled rather than outlined. Participants rated the app's ease of use highly after revisions and all three said they would use it to track real reading.
        </p>
      </section>
    </article>
  );
}