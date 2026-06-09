import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  AreaChart, Area, BarChart, Bar,
  XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
} from "recharts";
import { Package, MessageSquare, Globe2, TrendingUp, ArrowUpRight } from "lucide-react";
import { api } from "@/lib/api";
import { Spinner } from "@/components/admin/AdminUI";

const SHIPMENT_DATA = [
  { m: "Jan", v: 32 }, { m: "Feb", v: 41 }, { m: "Mar", v: 38 },
  { m: "Apr", v: 55 }, { m: "May", v: 62 }, { m: "Jun", v: 71 },
  { m: "Jul", v: 68 }, { m: "Aug", v: 79 }, { m: "Sep", v: 84 },
  { m: "Oct", v: 92 }, { m: "Nov", v: 88 }, { m: "Dec", v: 105 },
];

const CATEGORY_DATA = [
  { c: "Fruits", v: 58 }, { c: "Vegetables", v: 42 },
  { c: "Citrus",  v: 31 }, { c: "Tropical",   v: 26 }, { c: "Leafy", v: 18 },
];

export default function AdminOverview() {
  const [stats, setStats] = useState(null);
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([api.getStats(), api.getInquiries()])
      .then(([s, inq]) => { setStats(s); setInquiries(inq.slice(0, 6)); })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Spinner />;

  const STAT_CARDS = [
    { label: "Active Products",    value: stats?.productCount  ?? "—", icon: Package,      tone: "brand"   },
    { label: "New Inquiries",      value: stats?.newInquiries  ?? "—", icon: MessageSquare, tone: "orange" },
    { label: "Countries Served",   value: stats?.countriesCount ?? "—", icon: Globe2,       tone: "brand"   },
    { label: "Total Inquiries",    value: stats?.inquiryTotal  ?? "—", icon: TrendingUp,    tone: "orange" },
  ];

  return (
    <div className="grid gap-6">
      <div>
        <h1 className="font-display text-2xl font-bold md:text-3xl">Dashboard overview</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Operations snapshot — trade activity and inquiries at a glance.
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {STAT_CARDS.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            className="rounded-2xl border border-border bg-card p-5"
          >
            <div className="flex items-center justify-between">
              <div className={`grid h-10 w-10 place-items-center rounded-xl ${
                s.tone === "brand"
                  ? "bg-brand-soft text-brand"
                  : "bg-[color-mix(in_oklab,var(--accent-orange)_15%,transparent)] text-accent-orange"
              }`}>
                <s.icon className="h-5 w-5" />
              </div>
              <span className="inline-flex items-center gap-1 rounded-full bg-brand-soft px-2 py-1 text-[10px] font-semibold text-brand">
                <ArrowUpRight className="h-3 w-3" /> Live
              </span>
            </div>
            <div className="mt-4 font-display text-3xl font-bold">{s.value}</div>
            <div className="text-xs uppercase tracking-wider text-muted-foreground">{s.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-2xl border border-border bg-card p-5 lg:col-span-2">
          <div className="flex items-center justify-between mb-1">
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Shipments</div>
              <div className="font-display text-xl font-bold">Volume — last 12 months</div>
            </div>
            <TrendingUp className="h-5 w-5 text-brand" />
          </div>
          <div className="mt-6 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={SHIPMENT_DATA}>
                <defs>
                  <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#16A34A" stopOpacity={0.5} />
                    <stop offset="100%" stopColor="#16A34A" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="currentColor" opacity={0.1} />
                <XAxis dataKey="m" stroke="currentColor" fontSize={11} opacity={0.5} />
                <YAxis stroke="currentColor" fontSize={11} opacity={0.5} />
                <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 12 }} />
                <Area type="monotone" dataKey="v" stroke="#16A34A" strokeWidth={2} fill="url(#grad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5">
          <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">By category</div>
          <div className="font-display text-xl font-bold">Top SKUs</div>
          <div className="mt-6 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={CATEGORY_DATA}>
                <XAxis dataKey="c" stroke="currentColor" fontSize={11} opacity={0.5} />
                <YAxis stroke="currentColor" fontSize={11} opacity={0.5} />
                <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 12 }} />
                <Bar dataKey="v" fill="#F97316" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Inquiry pipeline status */}
      {stats?.byStatus && (
        <div className="grid gap-3 sm:grid-cols-4">
          {["New","Contacted","Negotiating","Closed"].map((s) => {
            const found = stats.byStatus.find(b => b.status === s);
            const TONE = {
              New: "bg-brand-soft text-brand",
              Contacted: "bg-[color-mix(in_oklab,var(--accent-orange)_15%,transparent)] text-accent-orange",
              Negotiating: "bg-blue-500/15 text-blue-600 dark:text-blue-400",
              Closed: "bg-muted text-muted-foreground",
            };
            return (
              <div key={s} className="rounded-2xl border border-border bg-card p-5">
                <span className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-semibold ${TONE[s]}`}>{s}</span>
                <div className="mt-3 font-display text-2xl font-bold">{found?.count ?? 0}</div>
                <div className="text-xs text-muted-foreground">inquiries</div>
              </div>
            );
          })}
        </div>
      )}

      {/* Recent inquiries table */}
      <div className="rounded-2xl border border-border bg-card p-5">
        <div className="font-display text-xl font-bold mb-4">Recent inquiries</div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs uppercase tracking-wider text-muted-foreground border-b border-border">
                <th className="py-3 pr-4">Company</th>
                <th className="py-3 pr-4">Product</th>
                <th className="py-3 pr-4">Quantity</th>
                <th className="py-3 pr-4">Country</th>
                <th className="py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {inquiries.map((r) => (
                <tr key={r.id} className="border-b border-border/50 last:border-0">
                  <td className="py-3 pr-4 font-medium">{r.company ?? r.name}</td>
                  <td className="py-3 pr-4">{r.product ?? "—"}</td>
                  <td className="py-3 pr-4 text-muted-foreground">{r.quantity ?? "—"}</td>
                  <td className="py-3 pr-4 text-muted-foreground">{r.country ?? "—"}</td>
                  <td className="py-3">
                    <span className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-semibold ${
                      { New: "bg-brand-soft text-brand", Contacted: "bg-[color-mix(in_oklab,var(--accent-orange)_15%,transparent)] text-accent-orange",
                        Negotiating: "bg-blue-500/15 text-blue-600", Closed: "bg-muted text-muted-foreground" }[r.status]
                    }`}>{r.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
