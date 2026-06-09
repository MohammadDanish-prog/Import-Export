import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, Eye, Search, Download } from "lucide-react";
import { api } from "@/lib/api";
import {
  PageHeader, Card, IconBtn, Modal, Field, inputCls,
  PrimaryBtn, SecondaryBtn, Spinner, EmptyState,
} from "@/components/admin/AdminUI";

const EMPTY= {
  name: "", category: "Fruits", origin: [], availability: "Year-round", emoji: "",
};

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState("All");
  const [modal, setModal] = useState(null);
  const [selected, setSelected] = useState(null);
  const [form, setForm] = useState(EMPTY);
  const [saving, setSaving] = useState(false);

  const load = () => api.getProducts().then(setProducts).finally(() => setLoading(false));
  useEffect(() => { load(); }, []);

  const list = products
    .filter(p => filter === "All" || p.category === filter)
    .filter(p => p.name.toLowerCase().includes(q.toLowerCase()));

  const openAdd = () => { setForm(EMPTY); setModal("add"); };
  const openEdit = (p) => {
    setSelected(p);
    setForm({ name: p.name, category: p.category, origin: p.origin, availability: p.availability, emoji: p.emoji });
    setModal("edit");
  };
  const openView = (p) => { setSelected(p); setModal("view"); };

  const handleSave = async () => {
    if (!form.name || !form.emoji) return;
    setSaving(true);
    try {
      if (modal === "add") {
        await api.createProduct(form);
      } else if (modal === "edit" && selected) {
        await api.updateProduct(selected.id, { ...form, active: selected.active });
      }
      await load();
      setModal(null);
    } finally { setSaving(false); }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this product?")) return;
    await api.deleteProduct(id);
    load();
  };

  return (
    <div className="grid gap-6">
      <PageHeader title="Products" description={`Manage your product catalog — ${products.length} active SKUs.`}>
        <SecondaryBtn><Download className="h-4 w-4" /> Export</SecondaryBtn>
        <PrimaryBtn onClick={openAdd}><Plus className="h-4 w-4" /> Add Product</PrimaryBtn>
      </PageHeader>

      <Card>
        {/* Filters */}
        <div className="flex flex-col gap-3 border-b border-border p-4 sm:flex-row sm:items-center">
          <div className="relative max-w-sm flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search products..."
              className="w-full rounded-lg border border-border bg-background py-2 pl-10 pr-4 text-sm outline-none focus:ring-2 focus:ring-brand" />
          </div>
          <select value={filter} onChange={e => setFilter(e.target.value)}
            className="rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none">
            <option>All</option>
            <option>Fruits</option>
            <option>Vegetables</option>
          </select>
        </div>

        {/* Table */}
        {loading ? <Spinner /> : list.length === 0 ? <EmptyState /> : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left text-xs uppercase tracking-wider text-muted-foreground">
                  <th className="px-4 py-3">Emoji</th>
                  <th className="px-4 py-3">Product</th>
                  <th className="px-4 py-3">Category</th>
                  <th className="px-4 py-3">Origin</th>
                  <th className="px-4 py-3">Availability</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {list.map(p => (
                  <tr key={p.id} className="border-b border-border/50 last:border-0 hover:bg-muted/30">
                    <td className="px-4 py-3">
                      <div className="grid h-10 w-10 place-items-center rounded-lg bg-brand-soft text-2xl">{p.emoji}</div>
                    </td>
                    <td className="px-4 py-3 font-medium">{p.name}</td>
                    <td className="px-4 py-3">
                      <span className="rounded-full bg-muted px-2.5 py-1 text-xs">{p.category}</span>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{p.origin.join(", ")}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-semibold ${
                        p.availability === "Year-round" ? "bg-brand-soft text-brand" : "bg-muted text-muted-foreground"
                      }`}>{p.availability}</span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex justify-end gap-1">
                        <IconBtn title="View" onClick={() => openView(p)}><Eye className="h-4 w-4" /></IconBtn>
                        <IconBtn title="Edit" onClick={() => openEdit(p)}><Pencil className="h-4 w-4" /></IconBtn>
                        <IconBtn title="Delete" destructive onClick={() => handleDelete(p.id)}><Trash2 className="h-4 w-4" /></IconBtn>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      {/* Add / Edit Modal */}
      <Modal open={modal === "add" || modal === "edit"} onClose={() => setModal(null)}
        title={modal === "add" ? "Add Product" : "Edit Product"}>
        <div className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Field label="Name" required>
              <input className={inputCls} value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
            </Field>
            <Field label="Emoji" required>
              <input className={inputCls} value={form.emoji} onChange={e => setForm(f => ({ ...f, emoji: e.target.value }))} />
            </Field>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Category">
              <select className={inputCls} value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}>
                <option>Fruits</option>
                <option>Vegetables</option>
              </select>
            </Field>
            <Field label="Availability">
              <select className={inputCls} value={form.availability} onChange={e => setForm(f => ({ ...f, availability: e.target.value }))}>
                <option>Year-round</option>
                <option>Seasonal</option>
              </select>
            </Field>
          </div>
          <Field label="Origin (comma-separated countries)">
            <input className={inputCls}
              value={form.origin.join(", ")}
              onChange={e => setForm(f => ({ ...f, origin: e.target.value.split(",").map(s => s.trim()).filter(Boolean) }))} />
          </Field>
          <div className="flex justify-end gap-2 pt-2">
            <SecondaryBtn onClick={() => setModal(null)}>Cancel</SecondaryBtn>
            <PrimaryBtn onClick={handleSave}>{saving ? "Saving…" : "Save Product"}</PrimaryBtn>
          </div>
        </div>
      </Modal>

      {/* View Modal */}
      <Modal open={modal === "view"} onClose={() => setModal(null)} title="Product Details">
        {selected && (
          <div className="grid gap-3">
            <div className="flex items-center gap-4">
              <div className="grid h-16 w-16 place-items-center rounded-2xl bg-brand-soft text-5xl">{selected.emoji}</div>
              <div>
                <div className="font-display text-2xl font-bold">{selected.name}</div>
                <div className="text-sm text-muted-foreground">{selected.category}</div>
              </div>
            </div>
            <dl className="grid gap-2 rounded-xl bg-muted/40 p-4 text-sm">
              <div className="flex justify-between"><dt className="text-muted-foreground">Origin</dt><dd className="font-medium">{selected.origin.join(" · ")}</dd></div>
              <div className="flex justify-between"><dt className="text-muted-foreground">Availability</dt><dd className="font-medium">{selected.availability}</dd></div>
              <div className="flex justify-between"><dt className="text-muted-foreground">Status</dt><dd>{selected.active ? "Active" : "Inactive"}</dd></div>
            </dl>
          </div>
        )}
      </Modal>
    </div>
  );
}
