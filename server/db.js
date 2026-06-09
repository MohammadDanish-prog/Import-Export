import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/swapnil_dinesh";

export async function connectDB() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ MongoDB connected:", mongoose.connection.host);
  } catch (err) {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  }
}

// ─── Schemas ──────────────────────────────────────────────────────────────────

const productSchema = new mongoose.Schema({
  name:         { type: String, required: true },
  category:     { type: String, required: true, enum: ["Fruits", "Vegetables"] },
  origin:       { type: [String], required: true },
  availability: { type: String, required: true, enum: ["Year-round", "Seasonal"] },
  emoji:        { type: String, required: true },
  active:       { type: Boolean, default: true },
}, { timestamps: true });

const importCountrySchema = new mongoose.Schema({
  name:     { type: String, required: true, unique: true },
  flag:     { type: String, required: true },
  flagCode: { type: String, default: "" },
  products: { type: String, default: "" },
});

const exportMarketSchema = new mongoose.Schema({
  name:     { type: String, required: true, unique: true },
  flag:     { type: String, required: true },
  flagCode: { type: String, default: "" },
  region:   { type: String, required: true },
});

const serviceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  desc:  { type: String, required: true },
  icon:  { type: String, required: true },
  sort:  { type: Number, default: 0 },
});

const gallerySchema = new mongoose.Schema({
  tag:   { type: String, required: true },
  emoji: { type: String, required: true },
  grad:  { type: String, required: true },
  img:   { type: String, default: "" },
  sort:  { type: Number, default: 0 },
});

const certificationSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  sort: { type: Number, default: 0 },
});

const qualityStepSchema = new mongoose.Schema({
  title: { type: String, required: true },
  desc:  { type: String, required: true },
  sort:  { type: Number, default: 0 },
});

const inquirySchema = new mongoose.Schema({
  name:    { type: String, required: true },
  company: { type: String, default: "" },
  country: { type: String, default: "" },
  product: { type: String, default: "" },
  quantity:{ type: String, default: "" },
  email:   { type: String, required: true },
  phone:   { type: String, default: "" },
  message: { type: String, default: "" },
  status:  { type: String, default: "New", enum: ["New","Contacted","Negotiating","Closed"] },
}, { timestamps: true });

const siteContentSchema = new mongoose.Schema({
  key:   { type: String, required: true, unique: true },
  value: { type: String, required: true },
}, { timestamps: true });

// ─── Models ───────────────────────────────────────────────────────────────────

export const Product       = mongoose.model("Product",       productSchema);
export const ImportCountry = mongoose.model("ImportCountry", importCountrySchema);
export const ExportMarket  = mongoose.model("ExportMarket",  exportMarketSchema);
export const Service       = mongoose.model("Service",       serviceSchema);
export const Gallery       = mongoose.model("Gallery",       gallerySchema);
export const Certification = mongoose.model("Certification", certificationSchema);
export const QualityStep   = mongoose.model("QualityStep",   qualityStepSchema);
export const Inquiry       = mongoose.model("Inquiry",       inquirySchema);
export const SiteContent   = mongoose.model("SiteContent",   siteContentSchema);
