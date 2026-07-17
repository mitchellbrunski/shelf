import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { BookOpen, Loader2, Plus, Search as SearchIcon, SearchX } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export default function Discover() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [page, setPage] = useState(1);
  const [searched, setSearched] = useState(false);
  const [savingId, setSavingId] = useState(null);

  async function handleSearch(e, nextPage = 1, append = false) {
    e?.preventDefault();
    const q = query.trim();
    if (!q) return;
    setLoading(true);
    try {
      const res = await base44.functions.invoke("searchBooks", { query: q, page: nextPage });
      const data = res.data;
      setResults(append ? [...results, ...data.books] : data.books);
      setHasMore(data.has_more);
      setPage(nextPage);
      setSearched(true);
    } catch (err) {
      toast({ title: "Search failed", description: "Please try again in a moment.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  }

  async function handleSave(book) {
    setSavingId(book.work_key);
    try {
      const created = await base44.entities.Book.create({
        title: book.title,
        author: book.author,
        cover_url: book.cover_url || "",
        olid: book.olid || "",
        work_key: book.work_key || "",
        published_year: book.published_year || null,
        subjects: book.subjects || [],
        shelf: "want_to_read",
        rating: 0,
        progress: 0,
        notes: ""
      });
      toast({ title: "Added to shelf", description: `"${book.title}" saved to Want to Read.` });
      navigate(`/book/${created.id}`);
    } catch (err) {
      toast({ title: "Could not save book", variant: "destructive" });
    } finally {
      setSavingId(null);
    }
  }

  return (
    <div className="fade-in">
      <div className="mb-6">
        <h1 className="font-heading text-2xl font-semibold text-foreground sm:text-3xl">Discover books</h1>
        <p className="mt-1 text-muted-foreground">Search millions of titles from the Open Library.</p>
      </div>

      {/* Search bar */}
      <form onSubmit={(e) => handleSearch(e, 1, false)} className="relative">
        <SearchIcon className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by title, author, or topic…"
          aria-label="Search for books"
          className="w-full rounded-xl border border-border bg-card py-3.5 pl-12 pr-32 text-sm shadow-sm outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-primary focus:ring-2 focus:ring-primary/20"
        />
        <button
          type="submit"
          disabled={loading || !query.trim()}
          className="absolute right-2 top-1/2 -translate-y-1/2 inline-flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <SearchIcon className="h-4 w-4" />}
          Search
        </button>
      </form>

      {/* States */}
      {loading && results.length === 0 && (
        <div className="flex h-64 flex-col items-center justify-center gap-3 text-muted-foreground">
          <Loader2 className="h-7 w-7 animate-spin text-primary" />
          <p className="text-sm">Searching the library…</p>
        </div>
      )}

      {!loading && searched && results.length === 0 && (
        <div className="flex h-64 flex-col items-center justify-center gap-3 text-center">
          <SearchX className="h-10 w-10 text-muted-foreground/40" />
          <div>
            <p className="font-medium text-foreground">No books found</p>
            <p className="text-sm text-muted-foreground">Try a different title, author, or topic.</p>
          </div>
        </div>
      )}

      {!searched && !loading && (
        <div className="mt-10 flex flex-col items-center gap-4 rounded-2xl border border-dashed border-border bg-card/50 px-6 py-16 text-center">
          <BookOpen className="h-12 w-12 text-primary/40" />
          <div>
            <p className="font-heading text-lg font-semibold text-foreground">What will you read next?</p>
            <p className="mt-1 text-sm text-muted-foreground">Search above to find and save your next book.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-2 pt-2">
            {["Fiction", "Self-help", "History", "Science fiction", "Biography", "Mystery"].map((tag) => (
              <button
                key={tag}
                onClick={() => { setQuery(tag); }}
                className="rounded-full border border-border bg-background px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Results */}
      {results.length > 0 && (
        <>
          <p className="mt-6 text-sm text-muted-foreground">
            {results.length} result{results.length !== 1 ? "s" : ""}{searched ? ` for "${query}"` : ""}
          </p>
          <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-6 stagger sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {results.map((book) => (
              <div key={book.work_key} className="group flex flex-col fade-in-up">
                <div className="relative aspect-[2/3] w-full overflow-hidden rounded-lg bg-muted shadow-sm ring-1 ring-border/60 transition-all duration-300 group-hover:shadow-lg group-hover:-translate-y-1">
                  {book.cover_url ? (
                    <img src={book.cover_url} alt={`Cover of ${book.title}`} loading="lazy" className="h-full w-full object-cover" />
                  ) : (
                    <div className="flex h-full w-full flex-col items-center justify-center gap-2 p-4 text-center">
                      <BookOpen className="h-8 w-8 text-muted-foreground/40" />
                      <span className="font-heading text-xs font-medium leading-snug text-muted-foreground/70 line-clamp-4">{book.title}</span>
                    </div>
                  )}
                  <button
                    onClick={() => handleSave(book)}
                    disabled={savingId === book.work_key}
                    className="absolute inset-x-2 bottom-2 inline-flex items-center justify-center gap-1.5 rounded-lg bg-primary/95 py-2 text-xs font-medium text-primary-foreground opacity-0 backdrop-blur transition-all duration-300 hover:bg-primary group-hover:opacity-100 disabled:opacity-70"
                  >
                    {savingId === book.work_key ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Plus className="h-3.5 w-3.5" />}
                    Save to shelf
                  </button>
                </div>
                <h3 className="mt-2.5 px-0.5 font-heading text-sm font-semibold leading-snug text-foreground line-clamp-2">{book.title}</h3>
                <p className="mt-0.5 px-0.5 text-xs text-muted-foreground line-clamp-1">{book.author}</p>
                {book.published_year && <p className="px-0.5 text-[11px] text-muted-foreground/70">{book.published_year}</p>}
              </div>
            ))}
          </div>

          {hasMore && (
            <div className="mt-8 flex justify-center">
              <button
                onClick={(e) => handleSearch(e, page + 1, true)}
                disabled={loading}
                className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-accent disabled:opacity-50"
              >
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                Load more
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}