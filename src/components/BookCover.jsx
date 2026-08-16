import { useEffect, useState } from "react";
import { BookOpen } from "lucide-react";

/**
 * Renders a book cover image with graceful fallback.
 * Open Library's cover service returns a 1x1 transparent gif (HTTP 200, not an
 * error) when a cover is missing, and occasionally fails entirely during
 * outages. We detect both cases (naturalWidth <= 1 and onError) and fall back
 * to a centered placeholder so the UI never shows a blank or broken box.
 */
export default function BookCover({
  coverUrl,
  title,
  imgClassName = "h-full w-full object-cover",
  iconClass = "h-8 w-8",
  titleClass = "text-xs",
  showTitle = true
}) {
  const [broken, setBroken] = useState(false);
  useEffect(() => { setBroken(false); }, [coverUrl]);

  if (!coverUrl || broken) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center gap-2 p-4 text-center">
        <BookOpen className={`${iconClass} text-muted-foreground/40`} />
        {showTitle && title && (
          <span className={`font-heading font-medium leading-snug text-muted-foreground/70 line-clamp-4 ${titleClass}`}>
            {title}
          </span>
        )}
      </div>
    );
  }

  return (
    <img
      src={coverUrl}
      alt={title ? `Cover of ${title}` : "Book cover"}
      loading="lazy"
      className={imgClassName}
      onLoad={(e) => {
        if (e.currentTarget.naturalWidth <= 1) setBroken(true);
      }}
      onError={() => setBroken(true)}
    />
  );
}