import React, { useState } from "react";
import { FileDown } from "lucide-react";
import { jsPDF } from "jspdf";
import { getCombinedMarkdown } from "@/lib/docsContent";

function stripInline(md) {
  return md
    .replace(/`([^`]+)`/g, "$1")
    .replace(/!\[([^\]]*)\]\([^)]+\)/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/\*([^*]+)\*/g, "$1");
}

export default function DocsPdfButton() {
  const [busy, setBusy] = useState(false);

  const handleDownload = () => {
    setBusy(true);
    try {
      const md = getCombinedMarkdown();
      const doc = new jsPDF({ unit: "pt", format: "letter" });
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      const margin = 56;
      const maxWidth = pageWidth - margin * 2;
      let y = margin;

      const ensure = (h) => {
        if (y + h > pageHeight - margin) {
          doc.addPage();
          y = margin;
        }
      };
      const writeWrapped = (text, size, style, lineGap) => {
        doc.setFont("helvetica", style);
        doc.setFontSize(size);
        const wrapped = doc.splitTextToSize(text, maxWidth);
        wrapped.forEach((l) => {
          ensure(lineGap);
          doc.text(l, margin, y);
          y += lineGap;
        });
      };

      const lines = md.split("\n");
      for (const raw of lines) {
        const line = raw.replace(/\s+$/, "");
        const trimmed = line.trim();

        if (trimmed.startsWith("# ")) {
          y += 8;
          writeWrapped(stripInline(trimmed.replace(/^# /, "")), 20, "bold", 24);
          y += 6;
        } else if (trimmed.startsWith("## ")) {
          y += 8;
          writeWrapped(stripInline(trimmed.replace(/^## /, "")), 15, "bold", 19);
          y += 3;
        } else if (trimmed.startsWith("### ")) {
          y += 5;
          writeWrapped(stripInline(trimmed.replace(/^### /, "")), 12, "bold", 16);
          y += 2;
        } else if (/^\|[-:\s|]+\|?$/.test(trimmed)) {
          continue;
        } else if (trimmed.startsWith("|")) {
          const cells = trimmed.replace(/^\|/, "").replace(/\|$/, "").split("|").map((c) => c.trim());
          writeWrapped(cells.join("    "), 10, "normal", 13);
        } else if (/^\s*[-*]\s/.test(line)) {
          writeWrapped("•  " + stripInline(line.replace(/^\s*[-*]\s/, "")), 11, "normal", 14);
        } else if (/^\s*\d+\.\s/.test(line)) {
          writeWrapped(stripInline(line), 11, "normal", 14);
        } else if (trimmed === "") {
          y += 7;
        } else if (trimmed === "---") {
          ensure(10);
          doc.setDrawColor(210);
          doc.line(margin, y, pageWidth - margin, y);
          y += 12;
        } else {
          writeWrapped(stripInline(line), 11, "normal", 14);
        }
        doc.setFont("helvetica", "normal");
        doc.setFontSize(11);
      }

      doc.save("Shelf-Documentation.pdf");
    } finally {
      setBusy(false);
    }
  };

  return (
    <button
      onClick={handleDownload}
      disabled={busy}
      className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent disabled:opacity-60"
    >
      <FileDown className="h-4 w-4" />
      {busy ? "Generating…" : "Documentation (PDF)"}
    </button>
  );
}