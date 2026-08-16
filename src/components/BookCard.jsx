import { Link } from "react-router-dom";
import BookCover from "@/components/BookCover";
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
        <BookCover
          coverUrl={cover}
          title={book.title}
          imgClassName="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
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