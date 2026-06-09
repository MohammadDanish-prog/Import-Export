import express from "express";
import cors from "cors";
import {
  connectDB,
  Product, ImportCountry, ExportMarket,
  Service, Gallery, Certification, QualityStep,
  Inquiry, SiteContent,
} from "./db.js";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({ origin: process.env.CORS_ORIGIN || "http://localhost:5173" }));
app.use(express.json());

// ─── Helpers ──────────────────────────────────────────────────────────────────
const ok  = (res, data)          => res.json({ ok: true, data });
const err = (res, msg, code=400) => res.status(code).json({ ok: false, error: msg });

// ─── Serialiser: convert Mongoose doc to plain object, _id → id ───────────────
const fmt = (doc) => {
  if (!doc) return null;
  const obj = doc.toObject ? doc.toObject() : doc;
  const { _id, __v, ...rest } = obj;
  return { id: _id.toString(), ...rest };
};
const fmtAll = (docs) => docs.map(fmt);

// ═══════════════════════════════════════════════════════════════════════════════
// PRODUCTS
// ═══════════════════════════════════════════════════════════════════════════════
app.get("/api/products", async (_req, res) => {
  try {
    const rows = await Product.find().sort({ category: 1, name: 1 });
    ok(res, fmtAll(rows));
  } catch (e) { err(res, e.message, 500); }
});

app.post("/api/products", async (req, res) => {
  try {
    const { name, category, origin, availability, emoji } = req.body;
    if (!name || !category || !origin || !availability || !emoji)
      return err(res, "Missing required fields");
    const doc = await Product.create({ name, category, origin, availability, emoji });
    ok(res, { id: doc._id.toString() });
  } catch (e) { err(res, e.message, 500); }
});

app.put("/api/products/:id", async (req, res) => {
  try {
    const { name, category, origin, availability, emoji, active } = req.body;
    await Product.findByIdAndUpdate(req.params.id,
      { name, category, origin, availability, emoji, active });
    ok(res, { updated: true });
  } catch (e) { err(res, e.message, 500); }
});

app.delete("/api/products/:id", async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    ok(res, { deleted: true });
  } catch (e) { err(res, e.message, 500); }
});

// ═══════════════════════════════════════════════════════════════════════════════
// INQUIRIES
// ═══════════════════════════════════════════════════════════════════════════════
app.get("/api/inquiries", async (_req, res) => {
  try {
    const rows = await Inquiry.find().sort({ createdAt: -1 });
    ok(res, fmtAll(rows));
  } catch (e) { err(res, e.message, 500); }
});

app.post("/api/inquiries", async (req, res) => {
  try {
    const { name, company, country, product, quantity, email, phone, message } = req.body;
    if (!name || !email) return err(res, "Name and email are required");
    const doc = await Inquiry.create({
      name, company, country, product, quantity, email, phone, message,
    });
    ok(res, { id: doc._id.toString() });
  } catch (e) { err(res, e.message, 500); }
});

app.patch("/api/inquiries/:id/status", async (req, res) => {
  try {
    const { status } = req.body;
    const valid = ["New","Contacted","Negotiating","Closed"];
    if (!valid.includes(status)) return err(res, "Invalid status");
    await Inquiry.findByIdAndUpdate(req.params.id, { status });
    ok(res, { updated: true });
  } catch (e) { err(res, e.message, 500); }
});

app.delete("/api/inquiries/:id", async (req, res) => {
  try {
    await Inquiry.findByIdAndDelete(req.params.id);
    ok(res, { deleted: true });
  } catch (e) { err(res, e.message, 500); }
});

// ═══════════════════════════════════════════════════════════════════════════════
// IMPORT COUNTRIES
// ═══════════════════════════════════════════════════════════════════════════════
app.get("/api/import-countries", async (_req, res) => {
  try {
    const rows = await ImportCountry.find().sort({ name: 1 });
    ok(res, fmtAll(rows));
  } catch (e) { err(res, e.message, 500); }
});

app.post("/api/import-countries", async (req, res) => {
  try {
    const { name, flag, flagCode, products } = req.body;
    if (!name || !flag) return err(res, "Missing required fields");
    const doc = await ImportCountry.create({ name, flag, flagCode, products });
    ok(res, { id: doc._id.toString() });
  } catch (e) { err(res, e.message, 500); }
});

app.put("/api/import-countries/:id", async (req, res) => {
  try {
    const { name, flag, flagCode, products } = req.body;
    await ImportCountry.findByIdAndUpdate(req.params.id, { name, flag, flagCode, products });
    ok(res, { updated: true });
  } catch (e) { err(res, e.message, 500); }
});

app.delete("/api/import-countries/:id", async (req, res) => {
  try {
    await ImportCountry.findByIdAndDelete(req.params.id);
    ok(res, { deleted: true });
  } catch (e) { err(res, e.message, 500); }
});

// ═══════════════════════════════════════════════════════════════════════════════
// EXPORT MARKETS
// ═══════════════════════════════════════════════════════════════════════════════
app.get("/api/export-markets", async (_req, res) => {
  try {
    const rows = await ExportMarket.find().sort({ region: 1, name: 1 });
    ok(res, fmtAll(rows));
  } catch (e) { err(res, e.message, 500); }
});

app.post("/api/export-markets", async (req, res) => {
  try {
    const { name, flag, flagCode, region } = req.body;
    if (!name || !flag || !region) return err(res, "Missing required fields");
    const doc = await ExportMarket.create({ name, flag, flagCode, region });
    ok(res, { id: doc._id.toString() });
  } catch (e) { err(res, e.message, 500); }
});

app.put("/api/export-markets/:id", async (req, res) => {
  try {
    const { name, flag, flagCode, region } = req.body;
    await ExportMarket.findByIdAndUpdate(req.params.id, { name, flag, flagCode, region });
    ok(res, { updated: true });
  } catch (e) { err(res, e.message, 500); }
});

app.delete("/api/export-markets/:id", async (req, res) => {
  try {
    await ExportMarket.findByIdAndDelete(req.params.id);
    ok(res, { deleted: true });
  } catch (e) { err(res, e.message, 500); }
});

// ═══════════════════════════════════════════════════════════════════════════════
// GALLERY
// ═══════════════════════════════════════════════════════════════════════════════
app.get("/api/gallery", async (_req, res) => {
  try {
    const rows = await Gallery.find().sort({ sort: 1, _id: 1 });
    ok(res, fmtAll(rows));
  } catch (e) { err(res, e.message, 500); }
});

app.post("/api/gallery", async (req, res) => {
  try {
    const { tag, emoji, grad, img } = req.body;
    const maxDoc = await Gallery.findOne().sort({ sort: -1 });
    const sort = maxDoc ? maxDoc.sort + 1 : 0;
    const doc = await Gallery.create({ tag, emoji, grad, img, sort });
    ok(res, { id: doc._id.toString() });
  } catch (e) { err(res, e.message, 500); }
});

app.put("/api/gallery/:id", async (req, res) => {
  try {
    const { tag, emoji, grad, img, sort } = req.body;
    await Gallery.findByIdAndUpdate(req.params.id, { tag, emoji, grad, img, sort });
    ok(res, { updated: true });
  } catch (e) { err(res, e.message, 500); }
});

app.delete("/api/gallery/:id", async (req, res) => {
  try {
    await Gallery.findByIdAndDelete(req.params.id);
    ok(res, { deleted: true });
  } catch (e) { err(res, e.message, 500); }
});

// ═══════════════════════════════════════════════════════════════════════════════
// CERTIFICATIONS
// ═══════════════════════════════════════════════════════════════════════════════
app.get("/api/certifications", async (_req, res) => {
  try {
    const rows = await Certification.find().sort({ sort: 1, _id: 1 });
    ok(res, fmtAll(rows));
  } catch (e) { err(res, e.message, 500); }
});

app.post("/api/certifications", async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return err(res, "Name is required");
    const maxDoc = await Certification.findOne().sort({ sort: -1 });
    const sort = maxDoc ? maxDoc.sort + 1 : 0;
    const doc = await Certification.create({ name, sort });
    ok(res, { id: doc._id.toString() });
  } catch (e) { err(res, e.message, 500); }
});

app.delete("/api/certifications/:id", async (req, res) => {
  try {
    await Certification.findByIdAndDelete(req.params.id);
    ok(res, { deleted: true });
  } catch (e) { err(res, e.message, 500); }
});

// ═══════════════════════════════════════════════════════════════════════════════
// QUALITY STEPS
// ═══════════════════════════════════════════════════════════════════════════════
app.get("/api/quality-steps", async (_req, res) => {
  try {
    const rows = await QualityStep.find().sort({ sort: 1, _id: 1 });
    ok(res, fmtAll(rows));
  } catch (e) { err(res, e.message, 500); }
});

app.put("/api/quality-steps/:id", async (req, res) => {
  try {
    const { title, desc } = req.body;
    await QualityStep.findByIdAndUpdate(req.params.id, { title, desc });
    ok(res, { updated: true });
  } catch (e) { err(res, e.message, 500); }
});

// ═══════════════════════════════════════════════════════════════════════════════
// SERVICES
// ═══════════════════════════════════════════════════════════════════════════════
app.get("/api/services", async (_req, res) => {
  try {
    const rows = await Service.find().sort({ sort: 1 });
    ok(res, fmtAll(rows));
  } catch (e) { err(res, e.message, 500); }
});

app.post("/api/services", async (req, res) => {
  try {
    const { title, desc, icon, sort } = req.body;
    if (!title || !desc || !icon) return err(res, "Missing required fields");
    const doc = await Service.create({ title, desc, icon, sort: sort ?? 0 });
    ok(res, { id: doc._id.toString() });
  } catch (e) { err(res, e.message, 500); }
});

app.put("/api/services/:id", async (req, res) => {
  try {
    const { title, desc, icon, sort } = req.body;
    await Service.findByIdAndUpdate(req.params.id, { title, desc, icon, sort });
    ok(res, { updated: true });
  } catch (e) { err(res, e.message, 500); }
});

app.delete("/api/services/:id", async (req, res) => {
  try {
    await Service.findByIdAndDelete(req.params.id);
    ok(res, { deleted: true });
  } catch (e) { err(res, e.message, 500); }
});

// ═══════════════════════════════════════════════════════════════════════════════
// SITE CONTENT
// ═══════════════════════════════════════════════════════════════════════════════
app.get("/api/content", async (_req, res) => {
  try {
    const rows = await SiteContent.find();
    const obj = Object.fromEntries(rows.map((r) => [r.key, r.value]));
    ok(res, obj);
  } catch (e) { err(res, e.message, 500); }
});

app.put("/api/content", async (req, res) => {
  try {
    const updates = req.body;
    const ops = Object.entries(updates).map(([key, value]) => ({
      updateOne: {
        filter: { key },
        update: { $set: { key, value } },
        upsert: true,
      },
    }));
    await SiteContent.bulkWrite(ops);
    ok(res, { saved: Object.keys(updates).length });
  } catch (e) { err(res, e.message, 500); }
});

// ═══════════════════════════════════════════════════════════════════════════════
// DASHBOARD STATS
// ═══════════════════════════════════════════════════════════════════════════════
app.get("/api/stats", async (_req, res) => {
  try {
    const [productCount, inquiryTotal, newInquiries, countriesCount, byStatusRaw] =
      await Promise.all([
        Product.countDocuments({ active: true }),
        Inquiry.countDocuments(),
        Inquiry.countDocuments({ status: "New" }),
        ImportCountry.countDocuments(),
        Inquiry.aggregate([
          { $group: { _id: "$status", count: { $sum: 1 } } },
          { $project: { _id: 0, status: "$_id", count: 1 } },
        ]),
      ]);
    ok(res, { productCount, inquiryTotal, newInquiries, countriesCount, byStatus: byStatusRaw });
  } catch (e) { err(res, e.message, 500); }
});

// ─── Start ────────────────────────────────────────────────────────────────────
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 API server running at http://localhost:${PORT}`);
  });
});
