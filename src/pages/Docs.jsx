import React, { useState } from "react";
import DocNav from "@/components/docs/DocNav";
import Proposal from "@/components/docs/Proposal";
import Research from "@/components/docs/Research";
import Testing from "@/components/docs/Testing";
import Readme from "@/components/docs/Readme";
import Reflection from "@/components/docs/Reflection";
import Wireframes from "@/components/docs/Wireframes";
import DownloadButton from "@/components/docs/DownloadButton";
import { getCombinedMarkdown, getSectionMarkdown } from "@/lib/docsContent";

const SECTIONS = {
  proposal: { label: "Project Proposal", Component: Proposal },
  research: { label: "UX Research & Planning", Component: Research },
  testing: { label: "Usability Testing", Component: Testing },
  readme: { label: "Technical README", Component: Readme },
  reflection: { label: "Reflection & Case Study", Component: Reflection },
  wireframes: { label: "Wireframes & Flow", Component: Wireframes }
};

export default function Docs() {
  const [active, setActive] = useState("proposal");
  const { Component } = SECTIONS[active];

  return (
    <div className="fade-in">
      <header className="mb-6">
        <p className="text-xs font-semibold uppercase tracking-wider text-primary">Documentation</p>
        <h1 className="mt-1 font-heading text-2xl font-semibold text-foreground sm:text-3xl">
          Project Documentation
        </h1>
        <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
          The complete UX 440 deliverable set: the instructor-approved proposal, research and planning,
          usability testing, technical README, and a reflective case study.
        </p>
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <DownloadButton
            label="Download all documentation (.md)"
            filename="Shelf-Documentation.md"
            content={getCombinedMarkdown()}
          />
          <DownloadButton
            label={`Download this section (.md)`}
            filename={`Shelf-${active}.md`}
            content={getSectionMarkdown(active)}
          />
        </div>
      </header>

      <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <DocNav active={active} onSelect={setActive} />
        </aside>
        <div key={active} className="fade-in min-w-0 max-w-3xl pb-8">
          <Component />
        </div>
      </div>
    </div>
  );
}