// ─── Status Badge ─────────────────────────────────────────────────────────────
const STATUS_TONE = {
  New:         "bg-brand-soft text-brand",
  Contacted:   "bg-[color-mix(in_oklab,var(--accent-orange)_15%,transparent)] text-accent-orange",
  Negotiating: "bg-blue-500/15 text-blue-600 dark:text-blue-400",
  Closed:      "bg-muted text-muted-foreground",
};

export function StatusBadge({ status }) {
  return (
    <span className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-semibold ${STATUS_TONE[status] ?? "bg-muted"}`}>
      {status}
    </span>
  );
}

export function IconBtn({ children, destructive, onClick, title }) {
  return (
    <button
      title={title}
      onClick={onClick}
      className={`grid h-8 w-8 place-items-center rounded-lg border border-border transition hover:bg-muted ${
        destructive ? "text-destructive hover:bg-destructive/10 hover:border-destructive/30" : ""
      }`}
    >
      {children}
    </button>
  );
}

export function PageHeader({ title, description, children }) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between mb-6">
      <div>
        <h1 className="font-display text-2xl font-bold md:text-3xl">{title}</h1>
        {description && <p className="mt-1 text-sm text-muted-foreground">{description}</p>}
      </div>
      {children && <div className="flex flex-wrap gap-2">{children}</div>}
    </div>
  );
}

export function Card({ children, className = "" }) {
  return (
    <div className={`rounded-2xl border border-border bg-card ${className}`}>
      {children}
    </div>
  );
}

export function StatCard({ label, value, change, icon: Icon, tone = "brand" }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <div className="flex items-center justify-between">
        <div className={`grid h-10 w-10 place-items-center rounded-xl ${
          tone === "brand"
            ? "bg-brand-soft text-brand"
            : "bg-[color-mix(in_oklab,var(--accent-orange)_15%,transparent)] text-accent-orange"
        }`}>
          <Icon className="h-5 w-5" />
        </div>
        {change && (
          <span className="inline-flex items-center gap-1 rounded-full bg-brand-soft px-2 py-1 text-[10px] font-semibold text-brand">
            ↑ {change}
          </span>
        )}
      </div>
      <div className="mt-4 font-display text-3xl font-bold">{value}</div>
      <div className="text-xs uppercase tracking-wider text-muted-foreground">{label}</div>
    </div>
  );
}

export function EmptyState({ message = "No data found." }) {
  return <div className="py-20 text-center text-sm text-muted-foreground">{message}</div>;
}

export function Spinner() {
  return (
    <div className="flex justify-center py-16">
      <div className="h-8 w-8 rounded-full border-2 border-brand border-t-transparent animate-spin" />
    </div>
  );
}

export function PrimaryBtn({ children, onClick, type = "button" }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className="inline-flex items-center gap-2 rounded-xl bg-gradient-brand px-4 py-2 text-sm font-semibold text-brand-foreground shadow-elevated hover-lift"
    >
      {children}
    </button>
  );
}

export function SecondaryBtn({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center gap-2 rounded-xl border border-border bg-background px-4 py-2 text-sm font-medium hover:bg-muted transition"
    >
      {children}
    </button>
  );
}

export function Modal({ open, onClose, title, children }) {
  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-ink/60 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg rounded-3xl bg-card border border-border shadow-elevated p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-display text-xl font-bold">{title}</h2>
          <button
            onClick={onClose}
            className="grid h-8 w-8 place-items-center rounded-full border border-border hover:bg-muted"
          >
            ✕
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

export function Field({ label, required, children }) {
  return (
    <div>
      <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {label} {required && <span className="text-accent-orange">*</span>}
      </label>
      <div className="mt-1.5">{children}</div>
    </div>
  );
}

export const inputCls =
  "w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-brand";
