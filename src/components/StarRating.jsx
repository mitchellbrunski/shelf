import React, { useState } from "react";
import { Star } from "lucide-react";

export default function StarRating({ value = 0, onChange, size = 20, readonly = false }) {
  const [hover, setHover] = useState(0);
  const display = hover || value;

  return (
    <div className="flex items-center gap-0.5" role="radiogroup" aria-label="Rating">
      {[1, 2, 3, 4, 5].map((star) => {
        const filled = star <= display;
        const isActive = star <= value;
        return (
          <button
            key={star}
            type="button"
            role="radio"
            aria-checked={isActive}
            aria-label={`${star} star${star > 1 ? "s" : ""}`}
            disabled={readonly}
            onClick={() => !readonly && onChange?.(star === value ? 0 : star)}
            onMouseEnter={() => !readonly && setHover(star)}
            onMouseLeave={() => !readonly && setHover(0)}
            className={`transition-transform ${readonly ? "cursor-default" : "hover:scale-110 cursor-pointer active:scale-90"}`}
          >
            <Star
              size={size}
              className={filled ? "fill-amber-400 text-amber-400" : "fill-transparent text-muted-foreground/30"}
              strokeWidth={1.5}
            />
          </button>
        );
      })}
    </div>
  );
}