import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { useToast } from "@/components/ui/use-toast";
import { ArrowLeft, BookOpen, Calendar, CheckCircle2, Clock, Loader2, Trash2 } from "lucide-react";
import StarRating from "@/components/StarRating";
import ShelfBadge from "@/components/ShelfBadge";

const SHELVES = [
  { key: "want_to_read", label: "Want to Read", icon: Clock },
  { key: "reading", label: "Reading", icon: BookOpen },
  { key: "finished", label: "Finished", icon: CheckCircle2 }
];

export default function BookDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingDesc, setLoadingDesc] = useState(false);
  const [notes, setNotes] = useState("");
  const [savingNotes, setSavingNotes] = useState(false);
  const notesTimer = useRef(null);

  useEffect(() => {
    let active = true;
    setLoading(true);
    base44.entities.Book.get(id)
      .then(async (data) => {
        if (!active) return;
        setBook(data);
        setNotes(data.notes || "");
        if (!data.description && data.work_key) {
          setLoadingDesc(true);
          try {
            const res = await base44.functions.invoke("getBookDetails", { work_key: data.work_key });
            if (active && res.data?.description) {
              const updated = await base44.entities.Book.update(data.id, { description: res.data.description });
              setBook({ ...data, description: res.data.description, subjects: res.data.subjects || data.subjects });
            }
          } catch { /* description optional */ }
          finally { if (active) setLoadingDesc(false); }
        }
      })
      .catch(() => active && setBook(null))
      .finally(() => active && setLoading(false));
    return () => { active = false; };
  }, [id]);

  async function update(fields) {
    const updated = await base44.entities.Book.update(book.id, fields);
    setBook(updated);
  }

  async function handleShelfChange(shelf) {
    const fields = { shelf };
    const today = new Date().toISOString().slice(0, 10);
    if (shelf === "reading" && !book.started_date) fields.started_date = today;
    if (shelf === "finished") { fields.finished_date = today; fields.progress = 100; }
    if (shelf === "want_to_read") { fields.started_date = ""; fields.finished_date = ""; fields.progress = 0; }
    await update(fields);
  }

  function handleNotesChange(value) {
    setNotes(value);
    if (notesTimer.current) clearTimeout(notesTimer.current);
    setSavingNotes(true);
    notesTimer.current = setTimeout(async () => {
      await base44.entities.Book.update(book.id, { notes: value });
      setSavingNotes(false);
    }, 800);
  }

  async function handleDelete() {
    await base44.entities.Book.delete(book.id);
    toast({ title: "Book removed from shelf" });
    navigate("/shelf");
  }

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!book) {
    return (
      <div className="flex h-64 flex-col items-center justify-center gap-4 text-center">
        <BookOpen className="h-10 w-10 text-muted-foreground/40" />
        <p className="text-muted-foreground">This book could not be found.</p>
        <Link to="/shelf" className="text-sm font-medium text-primary hover:underline">Back to shelf</Link>
      </div>
    );
  }

  return (
    <div className="fade-in">
      <Link to="/shelf" className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
        <ArrowLeft className="h-4 w-4" /> Back to shelf
      </Link>

      <div className="grid gap-8 md:grid-cols-[220px_1fr] lg:grid-cols-[260px_1fr]">
        {/* Cover */}
        <div className="fade-in-up">
          <div className="aspect-[2/3] w-full max-w-[260px] overflow-hidden rounded-xl bg-muted shadow-lg ring-1 ring-border/60">
            {book.cover_url ? (
              <img src={book.cover_url} alt={`Cover of ${book.title}`} className="h-full w-full object-cover" />
            ) : (
              <div className="flex h-full flex-col items-center justify-center gap-2 p-4 text-center">
                <BookOpen className="h-10 w-10 text-muted-foreground/40" />
                <span className="font-heading text-sm font-medium text-muted-foreground/70">{book.title}</span>
              </div>
            )}
          </div>
          {book.shelf && (
            <div className="mt-3 flex justify-center">
              <ShelfBadge shelf={book.shelf} />
            </div>
          )}
        </div>

        {/* Details */}
        <div className="fade-in-up" style={{ animationDelay: "0.05s" }}>
          {book.published_year && (
            <p className="text-sm font-medium text-muted-foreground">{book.published_year}</p>
          )}
          <h1 className="mt-1 font-heading text-2xl font-semibold leading-tight text-foreground sm:text-3xl text-balance">
            {book.title}
          </h1>
          <p className="mt-1 text-lg text-muted-foreground">by {book.author}</p>

          {/* Rating */}
          <div className="mt-5">
            <p className="mb-1.5 text-xs font-medium uppercase tracking-wide text-muted-foreground">Your rating</p>
            <StarRating value={book.rating || 0} onChange={(r) => update({ rating: r })} size={28} />
          </div>

          {/* Shelf selector */}
          <div className="mt-6">
            <p className="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">Shelf</p>
            <div className="flex flex-wrap gap-2">
              {SHELVES.map((s) => {
                const active = book.shelf === s.key;
                const Icon = s.icon;
                return (
                  <button
                    key={s.key}
                    onClick={() => handleShelfChange(s.key)}
                    className={`inline-flex items-center gap-1.5 rounded-lg border px-3.5 py-2 text-sm font-medium transition-colors ${
                      active
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border bg-card text-foreground hover:bg-accent"
                    }`}
                  >
                    <Icon className="h-4 w-4" /> {s.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Progress (reading/finished) */}
          {(book.shelf === "reading" || book.shelf === "finished") && (
            <div className="mt-6">
              <div className="flex items-center justify-between">
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Reading progress</p>
                <span className="text-sm font-semibold text-foreground">{book.progress || 0}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                step="5"
                value={book.progress || 0}
                onChange={(e) => update({ progress: parseInt(e.target.value, 10) })}
                disabled={book.shelf === "finished"}
                className="mt-2 w-full accent-primary"
                aria-label="Reading progress"
              />
              {book.started_date && (
                <p className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Calendar className="h-3.5 w-3.5" /> Started {new Date(book.started_date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                  {book.finished_date && <> · Finished {new Date(book.finished_date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</>}
                </p>
              )}
            </div>
          )}

          {/* Description */}
          <div className="mt-8">
            <p className="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">About</p>
            {loadingDesc ? (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin" /> Loading description…
              </div>
            ) : book.description ? (
              <p className="text-sm leading-relaxed text-foreground/80 whitespace-pre-line">{book.description}</p>
            ) : (
              <p className="text-sm text-muted-foreground italic">No description available.</p>
            )}
          </div>

          {/* Subjects */}
          {book.subjects && book.subjects.length > 0 && (
            <div className="mt-6">
              <p className="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">Subjects</p>
              <div className="flex flex-wrap gap-1.5">
                {book.subjects.map((s, i) => (
                  <span key={i} className="rounded-full bg-accent px-2.5 py-1 text-xs text-accent-foreground">{s}</span>
                ))}
              </div>
            </div>
          )}

          {/* Notes */}
          <div className="mt-8">
            <div className="flex items-center justify-between">
              <p className="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">Your notes & reflections</p>
              {savingNotes && <span className="flex items-center gap-1 text-[11px] text-muted-foreground"><Loader2 className="h-3 w-3 animate-spin" /> Saving…</span>}
            </div>
            <textarea
              value={notes}
              onChange={(e) => handleNotesChange(e.target.value)}
              placeholder="Write your thoughts, favorite quotes, or takeaways…"
              rows={5}
              className="w-full rounded-xl border border-border bg-card p-4 text-sm leading-relaxed text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>

          {/* Delete */}
          <div className="mt-8 border-t border-border pt-6">
            <button
              onClick={handleDelete}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-destructive transition-opacity hover:opacity-70"
            >
              <Trash2 className="h-4 w-4" /> Remove from shelf
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}