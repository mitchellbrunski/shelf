import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";
import { BookOpen, PieChart as PieIcon } from "lucide-react";

const AXIS_COLOR = "hsl(var(--muted-foreground))";
const FOREGROUND_COLOR = "hsl(var(--foreground))";

function truncate(label) {
  return label && label.length > 18 ? label.slice(0, 17) + "…" : label;
}

function EmptyChart({ message }) {
  return (
    <div className="flex h-72 w-full items-center justify-center rounded-lg border border-dashed border-border/70 bg-muted/30 px-6 text-center">
      <p className="text-sm text-muted-foreground">{message}</p>
    </div>
  );
}

function ProgressChart({ books }) {
  const data = books
    .filter((b) => b.shelf === "reading")
    .map((b) => ({ name: truncate(b.title), value: b.progress || 0 }))
    .sort((a, b) => b.value - a.value);

  if (data.length === 0) {
    return <EmptyChart message="No books currently being read. Start one to track progress." />;
  }

  return (
    <div className="h-72 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} layout="vertical" margin={{ left: 8, right: 16, top: 8, bottom: 8 }}>
          <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 11, fill: AXIS_COLOR }} unit="%" />
          <YAxis
            type="category"
            dataKey="name"
            width={120}
            tick={{ fontSize: 11, fill: FOREGROUND_COLOR }}
          />
          <Tooltip
            cursor={{ fill: "hsl(var(--accent))" }}
            contentStyle={{
              fontSize: 12,
              borderRadius: 8,
              border: "1px solid hsl(var(--border))",
              background: "hsl(var(--popover))",
              color: "hsl(var(--popover-foreground))"
            }}
            formatter={(v) => [`${v}%`, "Progress"]}
          />
          <Bar dataKey="value" radius={[0, 4, 4, 0]} fill="hsl(var(--shelf-reading))" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

function GenreChart({ books }) {
  const counts = {};
  books.forEach((b) => {
    (b.subjects || []).forEach((s) => {
      const key = (s || "").trim();
      if (key) counts[key] = (counts[key] || 0) + 1;
    });
  });
  const data = Object.entries(counts)
    .map(([name, value]) => ({ name: truncate(name), value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 8);

  if (data.length === 0) {
    return <EmptyChart message="Add subjects to your books to see genre distribution." />;
  }

  return (
    <div className="h-72 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} layout="vertical" margin={{ left: 8, right: 16, top: 8, bottom: 8 }}>
          <XAxis type="number" tick={{ fontSize: 11, fill: AXIS_COLOR }} allowDecimals={false} />
          <YAxis
            type="category"
            dataKey="name"
            width={120}
            tick={{ fontSize: 11, fill: FOREGROUND_COLOR }}
          />
          <Tooltip
            cursor={{ fill: "hsl(var(--accent))" }}
            contentStyle={{
              fontSize: 12,
              borderRadius: 8,
              border: "1px solid hsl(var(--border))",
              background: "hsl(var(--popover))",
              color: "hsl(var(--popover-foreground))"
            }}
            formatter={(v) => [v, "Books"]}
          />
          <Bar dataKey="value" radius={[0, 4, 4, 0]} fill="hsl(var(--primary))" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default function ReadingCharts({ books }) {
  return (
    <section>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-heading text-lg font-semibold text-foreground">Reading dashboard</h2>
        <span className="text-xs text-muted-foreground">
          Based on {books.length} {books.length === 1 ? "book" : "books"}
        </span>
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-xl border border-border/60 bg-card p-4 sm:p-5">
          <div className="mb-3 flex items-center gap-2">
            <BookOpen className="h-4 w-4 text-shelf-reading" />
            <h3 className="font-heading text-sm font-semibold text-foreground">Reading progress</h3>
          </div>
          <ProgressChart books={books} />
        </div>
        <div className="rounded-xl border border-border/60 bg-card p-4 sm:p-5">
          <div className="mb-3 flex items-center gap-2">
            <PieIcon className="h-4 w-4 text-primary" />
            <h3 className="font-heading text-sm font-semibold text-foreground">Books by genre</h3>
          </div>
          <GenreChart books={books} />
        </div>
      </div>
    </section>
  );
}