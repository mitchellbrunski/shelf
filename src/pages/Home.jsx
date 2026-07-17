import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { BookOpen, CheckCircle2, Compass, Layers, Star } from "lucide-react";
import BookCard from "@/components/BookCard";
import ShelfBadge from "@/components/ShelfBadge";

export default function Home() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    base44.entities.Book.list("-created_date", 50)
      .then((data) => active && setBooks(data))
      .catch(() => active && setBooks([]))
      .finally(() => active && setLoading(false));
    return () => { active = false; };
  }, []);

  const reading = books.filter((b) => b.shelf === "reading");
  const finished = books.filter((b) => b.shelf === "finished");
  const rated = books.filter((b) => b.rating > 0);
  const avgRating = rated.length
    ? (rated.reduce((s, b) => s + b.rating, 0) / rated.length).toFixed(1)
    : "—";
  const recent = books.slice(0, 8);

  const stats = [
    { label: "On Your Shelf", value: books.length, icon: Layers, tint: "text-primary" },
    { label: "Reading Now", value: reading.length, icon: BookOpen, tint: "text-shelf-reading" },
    { label: "Finished", value: finished.length, icon: CheckCircle2, tint: "text-shelf-finished" },
    { label: "Avg. Rating", value: avgRating, icon: Star, tint: "text-amber-500" }
  ];

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-border border-t-primary" />
      </div>
    );
  }

  if (books.length === 0) {
    return (
      <div className="fade-in">
        <section className="rounded-2xl bg-gradient-to-br from-accent to-secondary/60 p-8 sm:p-12">
          <p className="text-sm font-medium uppercase tracking-wider text-primary">Welcome to Shelf</p>
          <h1 className="mt-2 font-heading text-3xl font-semibold leading-tight text-foreground sm:text-4xl text-balance">
            Your personal reading companion.
          </h1>
          <p className="mt-3 max-w-lg text-muted-foreground text-balance">
            Search the Open Library — millions of real books — save the ones that catch your eye,
            organize them into shelves, and track every page you turn.
          </p>
          <Link
            to="/discover"
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            <Compass className="h-4 w-4" />
            Discover your first book
          </Link>
        </section>
      </div>
    );
  }

  return (
    <div className="fade-in space-y-10">
      <section>
        <h1 className="font-heading text-2xl font-semibold text-foreground sm:text-3xl">
          Your reading world
        </h1>
        <p className="mt-1 text-muted-foreground">Track, rate, and reflect on the books in your life.</p>
      </section>

      {/* Stats */}
      <section className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="rounded-xl border border-border/60 bg-card p-4 sm:p-5">
              <Icon className={`h-5 w-5 ${s.tint}`} />
              <p className="mt-3 font-heading text-2xl font-semibold text-foreground sm:text-3xl">{s.value}</p>
              <p className="text-xs text-muted-foreground sm:text-sm">{s.label}</p>
            </div>
          );
        })}
      </section>

      {/* Currently reading */}
      {reading.length > 0 && (
        <section>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-heading text-lg font-semibold text-foreground">Continue reading</h2>
            <Link to="/shelf" className="text-sm font-medium text-primary hover:underline">View shelf</Link>
          </div>
          <div className="space-y-3">
            {reading.slice(0, 3).map((book) => (
              <Link
                key={book.id}
                to={`/book/${book.id}`}
                className="flex items-center gap-4 rounded-xl border border-border/60 bg-card p-3 transition-all hover:shadow-md hover:border-primary/30"
              >
                <div className="h-16 w-12 shrink-0 overflow-hidden rounded bg-muted">
                  {book.cover_url ? (
                    <img src={book.cover_url} alt="" className="h-full w-full object-cover" />
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      <BookOpen className="h-4 w-4 text-muted-foreground/40" />
                    </div>
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-heading text-sm font-semibold text-foreground line-clamp-1">{book.title}</h3>
                  <p className="text-xs text-muted-foreground line-clamp-1">{book.author}</p>
                  <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full rounded-full bg-shelf-reading transition-all"
                      style={{ width: `${book.progress || 0}%` }}
                    />
                  </div>
                </div>
                <span className="shrink-0 text-sm font-semibold text-shelf-reading">{book.progress || 0}%</span>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Recently added */}
      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-heading text-lg font-semibold text-foreground">Recently added</h2>
          <Link to="/discover" className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline">
            <Compass className="h-4 w-4" /> Find more
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-x-4 gap-y-6 stagger sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {recent.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </section>
    </div>
  );
}