import { Link } from "react-router-dom";
import { BookOpen } from "lucide-react";
import ShelfBadge from "@/components/ShelfBadge";
import StarRating from "@/components/StarRating";

export default function BookCard({ book, to, footer }) {
  const cover = book.cover_url;
  const link = to || (book.id ? `/book/${book.id}` : "#");

  return (
    <Link
      to={link}
      className="group flex flex-col fade-in-up"
    >
      <div className="relative aspect-[2/3] w-full overflow-hidden rounded-lg bg-muted shadow-sm ring-1 ring-border/60 transition-all duration-300 group-hover:shadow-lg group-hover:ring-primary/30 group-hover:-translate-y-1">
        {cover ? (
          <img
            src={cover}
            alt={`Cover of ${book.title}`}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-2 p-4 text-center">
            <BookOpen className="h-8 w-8 text-muted-foreground/40" />
            <span className="font-heading text-xs font-medium leading-snug text-muted-foreground/70 line-clamp-4">
              {book.title}
            </span>
          </div>
        )}
        {book.shelf && (
          <div className="absolute left-2 top-2">
            <ShelfBadge shelf={book.shelf} size="xs" />
          </div>
        )}
      </div>
      <div className="mt-2.5 px-0.5">
        <h3 className="font-heading text-sm font-semibold leading-snug text-foreground line-clamp-2 transition-colors group-hover:text-primary">
          {book.title}
        </h3>
        <p className="mt-0.5 text-xs text-muted-foreground line-clamp-1">{book.author}</p>
        {typeof book.rating === "number" && book.rating > 0 && (
          <div className="mt-1">
            <StarRating value={book.rating} readonly size={12} />
          </div>
        )}
        {footer}
      </div>
    </Link>
  );
}