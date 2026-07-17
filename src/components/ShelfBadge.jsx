const CONFIG = {
  want_to_read: { label: "Want to Read", color: "hsl(var(--shelf-want))" },
  reading: { label: "Reading", color: "hsl(var(--shelf-reading))" },
  finished: { label: "Finished", color: "hsl(var(--shelf-finished))" }
};

export default function ShelfBadge({ shelf, size = "sm" }) {
  const config = CONFIG[shelf];
  if (!config) return null;
  const sizes = size === "xs" ? "text-[10px] px-2 py-0.5" : "text-xs px-2.5 py-1";

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full font-medium text-white ${sizes}`}
      style={{ backgroundColor: config.color }}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-white/80" />
      {config.label}
    </span>
  );
}