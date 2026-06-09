import { useEffect, useState } from "react";
import { Trash2, Filter, Search, Download, ChevronDown } from "lucide-react";
import { api } from "@/lib/api";
import {
  PageHeader, Card, IconBtn, StatusBadge, SecondaryBtn, Spinner, EmptyState,
} from "@/components/admin/AdminUI";

const STATUSES = ["All", "New", "Contacted", "Negotiating", "Closed"];

export default function AdminInquiries() {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const load = () => api.getInquiries().then(setInquiries).finally(() => setLoading(false));
  useEffect(() => { load(); }, []);

  const list = inquiries
    .filter(i => statusFilter === "All" || i.status === statusFilter)
    .filter(i =>
      [i.name, i.company, i.product, i.country].some(v =>
        v?.toLowerCase().includes(q.toLowerCase())
      )
    );

  const updateStatus = async (id, status) => {
    await api.updateInquiryStatus(id, status);
    load();
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this inquiry?")) return;
    await api.deleteInquiry(id);
    load();
  };

  // Status counts
  const counts = STATUSES.slice(1).reduce((acc, s) => {
    acc[s] = inquiries.filter(i => i.status === s).length;
    return acc;
  }, {});

  const TONE= {
    New: "bg-brand-soft text-brand",
    Contacted: "bg-[color-mix(in_oklab,var(--accent-orange)_15%,transparent)] text-accent-orange",
    Negotiating: "bg-blue-500/15 text-blue-600 dark:text-blue-400",
    Closed: "bg-muted text-muted-foreground",
  };

  return (
    <div className="grid gap-6">
      <PageHeader title="Product inquiries" description="CRM pipeline — track and respond to buyer inquiries.">
        <SecondaryBtn><Download className="h-4 w-4" /> Export to Excel</SecondaryBtn>
      </PageHeader>

      {/* Status summary cards */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {STATUSES.slice(1).map(s => (
          <button
            key={s}
            onClick={() => setStatusFilter(statusFilter === s ? "All" : s)}
            className={`rounded-2xl border p-5 text-left transition hover-lift ${
              statusFilter === s ? "border-brand shadow-elevated" : "border-border bg-card"
            }`}
          >
            <span className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-semibold ${TONE[s]}`}>{s}</span>
            <div className="mt-3 font-display text-2xl font-bold">{counts[s] ?? 0}</div>
            <div className="text-xs text-muted-foreground">inquiries</div>
          </button>
        ))}
      </div>

      <Card>
        {/* Filters bar */}
        <div className="flex flex-col gap-3 border-b border-border p-4 sm:flex-row sm:items-center">
          <div className="relative max-w-sm flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search company, contact..."
              className="w-full rounded-lg border border-border bg-background py-2 pl-10 pr-4 text-sm outline-none focus:ring-2 focus:ring-brand" />
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <Filter className="h-4 w-4 text-muted-foreground shrink-0" />
            {STATUSES.map(s => (
              <button key={s}
                onClick={() => setStatusFilter(s)}
                className={`rounded-full border px-3 py-1.5 text-xs font-medium transition ${
                  statusFilter === s ? "border-brand bg-brand-soft text-brand" : "border-border bg-background hover:bg-muted"
                }`}
              >{s}</button>
            ))}
          </div>
        </div>

        {/* Table */}
        {loading ? <Spinner /> : list.length === 0 ? <EmptyState message="No inquiries match your filters." /> : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left text-xs uppercase tracking-wider text-muted-foreground">
                  <th className="px-4 py-3">Company</th>
                  <th className="px-4 py-3">Contact</th>
                  <th className="px-4 py-3">Product</th>
                  <th className="px-4 py-3">Qty</th>
                  <th className="px-4 py-3">Country</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {list.map(r => (
                  <tr key={r.id} className="border-b border-border/50 last:border-0 hover:bg-muted/30">
                    <td className="px-4 py-3 font-medium">{r.company ?? "—"}</td>
                    <td className="px-4 py-3 text-muted-foreground">{r.name}</td>
                    <td className="px-4 py-3">{r.product ?? "—"}</td>
                    <td className="px-4 py-3 text-muted-foreground">{r.quantity ?? "—"}</td>
                    <td className="px-4 py-3 text-muted-foreground">{r.country ?? "—"}</td>
                    <td className="px-4 py-3">
                      {/* Inline status selector */}
                      <div className="relative group inline-block">
                        <button className="flex items-center gap-1">
                          <StatusBadge status={r.status} />
                          <ChevronDown className="h-3 w-3 text-muted-foreground" />
                        </button>
                        <div className="absolute left-0 top-full z-10 mt-1 hidden group-hover:block min-w-[140px] rounded-xl border border-border bg-card shadow-elevated p-1">
                          {["New","Contacted","Negotiating","Closed"].map(s => (
                            <button key={s} onClick={() => updateStatus(r.id, s)}
                              className="w-full rounded-lg px-3 py-1.5 text-left text-xs hover:bg-muted font-medium">
                              {s}
                            </button>
                          ))}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-xs text-muted-foreground">
                      {new Date(r.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex justify-end">
                        <IconBtn title="Delete" destructive onClick={() => handleDelete(r.id)}>
                          <Trash2 className="h-4 w-4" />
                        </IconBtn>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
}
