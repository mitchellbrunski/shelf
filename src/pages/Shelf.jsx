import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { Compass, Library, Loader2 } from "lucide-react";
import BookCard from "@/components/BookCard";

const TABS = [
  { key: "all", label: "All" },
  { key: "want_to_read", label: "Want to Read" },
  { key: "reading", label: "Reading" },
  { key: "finished", label: "Finished" }
];

const SORTS = [
  { key: "-created_date", label: "Recently added" },
  { key: "rating", label: "Top rated" },
  { key: "title", label: "Title A–Z" }
];

export default function Shelf() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState("all");
  const [sort, setSort] = useState("-created_date");

  useEffect(() => {
    let active = true;
    setLoading(true);
    base44.entities.Book.list(sort, 200)
      .then((data) => active && setBooks(data))
      .catch(() => active && setBooks([]))
      .finally(() => active && setLoading(false));
    return () => { active = false; };
  }, [sort]);

  const filtered = useMemo(() => {
    if (tab === "all") return books;
    return books.filter((b) => b.shelf === tab);
  }, [books, tab]);

  const counts = useMemo(() => ({
    all: books.length,
    want_to_read: books.filter((b) => b.shelf === "want_to_read").length,
    reading: books.filter((b) => b.shelf === "reading").length,
    finished: books.filter((b) => b.shelf === "finished").length
  }), [books]);

  return (
    <div className="fade-in">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl font-semibold text-foreground sm:text-3xl">My shelf</h1>
          <p className="mt-1 text-muted-foreground">Everything you've saved, rated, and read.</p>
        </div>
        <Link
          to="/discover"
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
        >
          <Compass className="h-4 w-4" /> Add books
        </Link>
      </div>

      {/* Tabs */}
      <div className="mb-4 flex gap-1 overflow-x-auto scrollbar-hide border-b border-border">
        {TABS.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`relative shrink-0 px-4 py-2.5 text-sm font-medium transition-colors ${
              tab === t.key ? "text-primary" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {t.label}
            <span className="ml-1.5 text-xs text-muted-foreground/70">{counts[t.key]}</span>
            {tab === t.key && <span className="absolute inset-x-0 -bottom-px h-0.5 bg-primary" />}
          </button>
        ))}
      </div>

      {/* Sort */}
      <div className="mb-5 flex items-center gap-2">
        <span className="text-xs text-muted-foreground">Sort by</span>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="rounded-lg border border-border bg-card px-3 py-1.5 text-xs font-medium text-foreground outline-none focus:border-primary"
        >
          {SORTS.map((s) => (
            <option key={s.key} value={s.key}>{s.label}</option>
          ))}
        </select>
      </div>

      {loading ? (
        <div className="flex h-48 items-center justify-center">
          <Loader2 className="h-7 w-7 animate-spin text-primary" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="flex h-64 flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-border bg-card/50 text-center">
          <Library className="h-10 w-10 text-muted-foreground/40" />
          <div>
            <p className="font-medium text-foreground">No books here yet</p>
            <p className="text-sm text-muted-foreground">Discover books to fill this shelf.</p>
          </div>
          <Link to="/discover" className="mt-1 inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">
            <Compass className="h-4 w-4" /> Discover books
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-x-4 gap-y-6 stagger sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {filtered.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      )}
    </div>
  );
}