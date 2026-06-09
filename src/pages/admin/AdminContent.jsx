import { useEffect, useState } from "react";
import { Save } from "lucide-react";
import { api } from "@/lib/api";
import { PageHeader, PrimaryBtn, Spinner } from "@/components/admin/AdminUI";

const SECTIONS = [
  { id: "home", label: "Home Page Content", fields: [
    { key: "home.hero_headline",  l: "Hero Headline",     t: "text" },
    { key: "home.hero_sub",       l: "Hero Subheadline",  t: "textarea" },
    { key: "home.cta_primary",    l: "Primary CTA",       t: "text" },
    { key: "home.cta_secondary",  l: "Secondary CTA",     t: "text" },
  ]},
  { id: "about", label: "About Us", fields: [
    { key: "about.mission", l: "Mission", t: "textarea" },
    { key: "about.vision",  l: "Vision",  t: "textarea" },
  ]},
  { id: "services", label: "Services Section", fields: [
    { key: "services.section_title", l: "Section Title",       t: "text" },
    { key: "services.section_desc",  l: "Section Description", t: "textarea" },
  ]},
  { id: "contact", label: "Contact Information", fields: [
    { key: "contact.address",   l: "Office Address", t: "text" },
    { key: "contact.phone",     l: "Phone",          t: "text" },
    { key: "contact.email",     l: "Email",          t: "text" },
    { key: "contact.whatsapp",  l: "WhatsApp",       t: "text" },
  ]},
];

export default function AdminContent() {
  const [content, setContent] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    api.getContent().then(setContent).finally(() => setLoading(false));
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      await api.saveContent(content);
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } finally { setSaving(false); }
  };

  if (loading) return <Spinner />;

  return (
    <div className="grid gap-6">
      <PageHeader title="Website content" description="Edit text content displayed on the public website.">
        <PrimaryBtn onClick={handleSave}>
          <Save className="h-4 w-4" /> {saving ? "Saving…" : saved ? "✓ Saved!" : "Save changes"}
        </PrimaryBtn>
      </PageHeader>

      <div className="grid gap-6">
        {SECTIONS.map(sec => (
          <div key={sec.id} className="rounded-2xl border border-border bg-card p-6">
            <h2 className="font-display text-lg font-bold">{sec.label}</h2>
            <div className="mt-5 grid gap-4">
              {sec.fields.map(f => (
                <div key={f.key}>
                  <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{f.l}</label>
                  {f.t === "textarea" ? (
                    <textarea rows={3} value={content[f.key] ?? ""}
                      onChange={e => setContent(c => ({ ...c, [f.key]: e.target.value }))}
                      className="mt-1.5 w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-brand" />
                  ) : (
                    <input value={content[f.key] ?? ""}
                      onChange={e => setContent(c => ({ ...c, [f.key]: e.target.value }))}
                      className="mt-1.5 w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-brand" />
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
