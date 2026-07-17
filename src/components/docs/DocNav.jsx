const ITEMS = [
  { id: "proposal", label: "Project Proposal", desc: "One-page overview for instructor approval" },
  { id: "research", label: "UX Research & Planning", desc: "Audience, problem, personas, competitive review, user flow" },
  { id: "testing", label: "Usability Testing", desc: "Test plan, results, and revisions" },
  { id: "readme", label: "Technical README", desc: "How it works, tools, API, credits" },
  { id: "reflection", label: "Reflection & Case Study", desc: "Process, learning, and growth" }
];

export default function DocNav({ active, onSelect }) {
  return (
    <nav aria-label="Documentation sections" className="space-y-1">
      {ITEMS.map((item) => (
        <button
          key={item.id}
          onClick={() => onSelect(item.id)}
          className={`w-full rounded-lg px-3.5 py-3 text-left transition-colors ${
            active === item.id
              ? "bg-primary text-primary-foreground shadow-sm"
              : "hover:bg-accent text-foreground"
          }`}
        >
          <span className="block text-sm font-semibold">{item.label}</span>
          <span className={`block text-xs ${active === item.id ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
            {item.desc}
          </span>
        </button>
      ))}
    </nav>
  );
}