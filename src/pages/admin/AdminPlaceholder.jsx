import { useLocation } from "react-router-dom";
import { Construction } from "lucide-react";

export default function AdminPlaceholder() {
  const { pathname } = useLocation();
  const slug = pathname.split("/").pop() ?? "section";
  const title = slug
    .split("-")
    .map((w) => w[0]?.toUpperCase() + w.slice(1))
    .join(" ");

  return (
    <div className="grid gap-6">
      <div>
        <h1 className="font-display text-2xl font-bold md:text-3xl capitalize">{title}</h1>
        <p className="mt-1 text-sm text-muted-foreground">Management UI for {title.toLowerCase()}.</p>
      </div>

      <div className="rounded-2xl border border-dashed border-border bg-card p-16 text-center">
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-brand-soft text-brand">
          <Construction className="h-6 w-6" />
        </div>
        <h2 className="mt-4 font-display text-xl font-bold">UI scaffolded — wire to API</h2>
        <p className="mt-2 mx-auto max-w-md text-sm text-muted-foreground">
          This section is connected to the database. Use the Express API endpoints for{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 text-xs font-mono">/api/{slug}</code>{" "}
          to build out the full UI.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          {["GET", "POST", "PUT", "DELETE"].map(m => (
            <span key={m} className="rounded-full bg-muted px-3 py-1 text-xs font-mono font-medium text-muted-foreground">{m}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
