import dotenv from "dotenv";
dotenv.config();

import {
  connectDB,
  Product, ImportCountry, ExportMarket,
  Service, Gallery, Certification, QualityStep,
  Inquiry, SiteContent,
} from "./db.js";

async function seed() {
  await connectDB();
  console.log("🌱 Seeding MongoDB...\n");

  // ─── Products ─────────────────────────────────────────────────────────────
  const PRODUCTS = [
    { name: "Banana",      category: "Fruits",     origin: ["India","Ecuador","Philippines"], availability: "Year-round", emoji: "🍌" },
    { name: "Apple",       category: "Fruits",     origin: ["USA","Poland","Italy"],          availability: "Year-round", emoji: "🍎" },
    { name: "Orange",      category: "Fruits",     origin: ["Egypt","South Africa"],          availability: "Seasonal",   emoji: "🍊" },
    { name: "Mandarin",    category: "Fruits",     origin: ["Spain","Egypt"],                 availability: "Seasonal",   emoji: "🍊" },
    { name: "Lemon",       category: "Fruits",     origin: ["Turkey","Egypt"],                availability: "Year-round", emoji: "🍋" },
    { name: "Grapes",      category: "Fruits",     origin: ["India","South Africa"],          availability: "Seasonal",   emoji: "🍇" },
    { name: "Mango",       category: "Fruits",     origin: ["India","Pakistan"],              availability: "Seasonal",   emoji: "🥭" },
    { name: "Pomegranate", category: "Fruits",     origin: ["Turkey","India"],                availability: "Seasonal",   emoji: "🍎" },
    { name: "Pineapple",   category: "Fruits",     origin: ["Philippines"],                   availability: "Year-round", emoji: "🍍" },
    { name: "Kiwi",        category: "Fruits",     origin: ["Italy","New Zealand"],           availability: "Seasonal",   emoji: "🥝" },
    { name: "Avocado",     category: "Fruits",     origin: ["Kenya","Peru"],                  availability: "Year-round", emoji: "🥑" },
    { name: "Watermelon",  category: "Fruits",     origin: ["Egypt","Iran"],                  availability: "Seasonal",   emoji: "🍉" },
    { name: "Melon",       category: "Fruits",     origin: ["Spain","Iran"],                  availability: "Seasonal",   emoji: "🍈" },
    { name: "Pear",        category: "Fruits",     origin: ["Italy","China"],                 availability: "Seasonal",   emoji: "🍐" },
    { name: "Strawberry",  category: "Fruits",     origin: ["Egypt","Spain"],                 availability: "Seasonal",   emoji: "🍓" },
    { name: "Onion",       category: "Vegetables", origin: ["India","Netherlands"],           availability: "Year-round", emoji: "🧅" },
    { name: "Potato",      category: "Vegetables", origin: ["India","Pakistan"],              availability: "Year-round", emoji: "🥔" },
    { name: "Tomato",      category: "Vegetables", origin: ["Turkey","Spain"],                availability: "Year-round", emoji: "🍅" },
    { name: "Garlic",      category: "Vegetables", origin: ["China","India"],                 availability: "Year-round", emoji: "🧄" },
    { name: "Ginger",      category: "Vegetables", origin: ["China","India"],                 availability: "Year-round", emoji: "🫚" },
    { name: "Carrot",      category: "Vegetables", origin: ["Netherlands","China"],           availability: "Year-round", emoji: "🥕" },
    { name: "Cabbage",     category: "Vegetables", origin: ["India","China"],                 availability: "Year-round", emoji: "🥬" },
    { name: "Lettuce",     category: "Vegetables", origin: ["Netherlands","Spain"],           availability: "Year-round", emoji: "🥬" },
    { name: "Capsicum",    category: "Vegetables", origin: ["Spain","Turkey"],                availability: "Year-round", emoji: "🫑" },
    { name: "Cucumber",    category: "Vegetables", origin: ["India","Turkey"],                availability: "Year-round", emoji: "🥒" },
    { name: "Cauliflower", category: "Vegetables", origin: ["India"],                         availability: "Seasonal",   emoji: "🥦" },
    { name: "Broccoli",    category: "Vegetables", origin: ["Spain","Italy"],                 availability: "Year-round", emoji: "🥦" },
    { name: "Eggplant",    category: "Vegetables", origin: ["India","Turkey"],                availability: "Year-round", emoji: "🍆" },
    { name: "Green Chili", category: "Vegetables", origin: ["India","Pakistan"],              availability: "Year-round", emoji: "🌶️" },
    { name: "Okra",        category: "Vegetables", origin: ["India","Egypt"],                 availability: "Seasonal",   emoji: "🌿" },
  ];
  await Product.deleteMany({});
  await Product.insertMany(PRODUCTS);
  console.log(`  ✓ ${PRODUCTS.length} products`);

  // ─── Import Countries ──────────────────────────────────────────────────────
  const IMPORTS = [
    { name: "India",        flag: "🇮🇳", flagCode: "in", products: "Mango, Onion, Banana, Grapes" },
    { name: "Egypt",        flag: "🇪🇬", flagCode: "eg", products: "Orange, Strawberry, Watermelon" },
    { name: "Turkey",       flag: "🇹🇷", flagCode: "tr", products: "Lemon, Pomegranate, Tomato" },
    { name: "China",        flag: "🇨🇳", flagCode: "cn", products: "Garlic, Ginger, Pear" },
    { name: "South Africa", flag: "🇿🇦", flagCode: "za", products: "Orange, Grapes" },
    { name: "Pakistan",     flag: "🇵🇰", flagCode: "pk", products: "Mango, Potato, Chili" },
    { name: "Netherlands",  flag: "🇳🇱", flagCode: "nl", products: "Onion, Carrot, Lettuce" },
    { name: "Italy",        flag: "🇮🇹", flagCode: "it", products: "Apple, Kiwi, Broccoli" },
    { name: "Spain",        flag: "🇪🇸", flagCode: "es", products: "Mandarin, Melon, Capsicum" },
    { name: "Poland",       flag: "🇵🇱", flagCode: "pl", products: "Apple" },
  ];
  await ImportCountry.deleteMany({});
  await ImportCountry.insertMany(IMPORTS);
  console.log(`  ✓ ${IMPORTS.length} import countries`);

  // ─── Export Markets ────────────────────────────────────────────────────────
  const EXPORTS = [
    { name: "United Arab Emirates", flag: "🇦🇪", flagCode: "ae", region: "GCC" },
    { name: "Saudi Arabia",         flag: "🇸🇦", flagCode: "sa", region: "GCC" },
    { name: "Oman",                 flag: "🇴🇲", flagCode: "om", region: "GCC" },
    { name: "Qatar",                flag: "🇶🇦", flagCode: "qa", region: "GCC" },
    { name: "Bahrain",              flag: "🇧🇭", flagCode: "bh", region: "GCC" },
    { name: "Kuwait",               flag: "🇰🇼", flagCode: "kw", region: "GCC" },
    { name: "Africa",               flag: "🌍",  flagCode: "",   region: "Continental" },
    { name: "Europe",               flag: "🇪🇺", flagCode: "eu", region: "Continental" },
    { name: "South Asia",           flag: "🌏",  flagCode: "",   region: "Continental" },
  ];
  await ExportMarket.deleteMany({});
  await ExportMarket.insertMany(EXPORTS);
  console.log(`  ✓ ${EXPORTS.length} export markets`);

  // ─── Services ─────────────────────────────────────────────────────────────
  const SERVICES = [
    { title: "Import Services",       desc: "Reliable sourcing and import operations from 15+ origin countries.",             icon: "Ship",       sort: 1 },
    { title: "Export Services",       desc: "Door-to-port export across the GCC, Africa, Europe and South Asia.",             icon: "Plane",      sort: 2 },
    { title: "Wholesale Supply",      desc: "Bulk supply for supermarkets, hotels, restaurants and retail chains.",           icon: "Warehouse",  sort: 3 },
    { title: "Cold Chain Logistics",  desc: "Temperature-controlled storage and reefer transport end-to-end.",                icon: "Snowflake",  sort: 4 },
    { title: "Documentation Support", desc: "Complete trade documentation, COO, phytosanitary and invoicing.",               icon: "FileText",   sort: 5 },
    { title: "Customs Clearance",     desc: "Expedited UAE customs and re-export clearance services.",                       icon: "ShieldCheck",sort: 6 },
    { title: "Product Sourcing",      desc: "Bespoke sourcing for specialty produce, varieties and grades.",                  icon: "Search",     sort: 7 },
    { title: "Packaging Solutions",   desc: "Custom packaging, private label and branded carton printing.",                  icon: "Package",    sort: 8 },
  ];
  await Service.deleteMany({});
  await Service.insertMany(SERVICES);
  console.log(`  ✓ ${SERVICES.length} services`);

  // ─── Gallery ──────────────────────────────────────────────────────────────
  const GALLERY = [
    { tag: "Fresh Produce",   emoji: "🍓", grad: "from-rose-500/30 to-orange-500/30",    img: "https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=600&auto=format&fit=crop",  sort: 1 },
    { tag: "Warehouses",      emoji: "🏭", grad: "from-slate-500/30 to-emerald-500/30",  img: "https://images.unsplash.com/photo-1553413077-190dd305871c?w=600&auto=format&fit=crop",  sort: 2 },
    { tag: "Packaging",       emoji: "📦", grad: "from-amber-500/30 to-emerald-500/30",  img: "https://images.unsplash.com/photo-1607349913338-fca6f7fc42d0?w=600&auto=format&fit=crop",  sort: 3 },
    { tag: "Shipping",        emoji: "🚢", grad: "from-blue-500/30 to-cyan-500/30",      img: "https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?w=600&auto=format&fit=crop",  sort: 4 },
    { tag: "Cold Storage",    emoji: "❄️", grad: "from-cyan-500/30 to-blue-500/30",      img: "https://images.unsplash.com/photo-1565591452267-5a8e86e70b23?w=600&auto=format&fit=crop",  sort: 5 },
    { tag: "Inspection",      emoji: "🔍", grad: "from-emerald-500/30 to-lime-500/30",   img: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=600&auto=format&fit=crop",  sort: 6 },
    { tag: "Tropical Fruits", emoji: "🥭", grad: "from-orange-500/30 to-yellow-500/30",  img: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600&auto=format&fit=crop",  sort: 7 },
    { tag: "Vegetables",      emoji: "🥬", grad: "from-emerald-500/30 to-green-500/30",  img: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&auto=format&fit=crop",  sort: 8 },
    { tag: "Logistics Hub",   emoji: "🛬", grad: "from-indigo-500/30 to-emerald-500/30", img: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&auto=format&fit=crop",  sort: 9 },
  ];
  await Gallery.deleteMany({});
  await Gallery.insertMany(GALLERY);
  console.log(`  ✓ ${GALLERY.length} gallery items`);

  // ─── Certifications ────────────────────────────────────────────────────────
  const CERTS = ["HACCP","ISO 22000","Food Safety Standards","GlobalG.A.P.","Halal"];
  await Certification.deleteMany({});
  await Certification.insertMany(CERTS.map((name, sort) => ({ name, sort })));
  console.log(`  ✓ ${CERTS.length} certifications`);

  // ─── Quality Steps ─────────────────────────────────────────────────────────
  const STEPS = [
    { title: "Supplier Selection",     desc: "Audited and pre-qualified grower partnerships across origin countries.",  sort: 0 },
    { title: "Product Inspection",     desc: "On-site inspection at source for grade, size, color and firmness.",       sort: 1 },
    { title: "Quality Testing",        desc: "Lab testing for pesticide residues, ripeness and food safety.",           sort: 2 },
    { title: "Packaging Verification", desc: "Verified packaging integrity, labeling and traceability codes.",         sort: 3 },
    { title: "Logistics Monitoring",   desc: "Real-time temperature and humidity tracking during transit.",             sort: 4 },
    { title: "Final Delivery",         desc: "Last-mile verification with consignee acceptance and feedback.",          sort: 5 },
  ];
  await QualityStep.deleteMany({});
  await QualityStep.insertMany(STEPS);
  console.log(`  ✓ ${STEPS.length} quality steps`);

  // ─── Sample Inquiries ──────────────────────────────────────────────────────
  const SAMPLE_INQUIRIES = [
    { name: "Khalid Al Rashid", company: "Al Madina Hyper",   country: "UAE",          product: "Banana",       quantity: "1x40ft",     email: "khalid@almadina.ae",  phone: "+971501111111", message: "Need weekly supply.",  status: "New" },
    { name: "Anita Menon",      company: "Lulu Group",        country: "Saudi Arabia", product: "Apple (Italy)", quantity: "2x40ft",     email: "anita@lulu.com",      phone: "+971502222222", message: "Seasonal order.",      status: "Contacted" },
    { name: "Marc Dubois",      company: "Carrefour",         country: "Qatar",        product: "Tomato",        quantity: "1x20ft",     email: "marc@carrefour.qa",   phone: "+97450333333",  message: "Trial shipment.",      status: "Negotiating" },
    { name: "Sara Hassan",      company: "Spinneys",          country: "Bahrain",      product: "Avocado",       quantity: "500 cartons",email: "sara@spinneys.bh",    phone: "+97333344444",  message: "Looking for Kenya.",   status: "New" },
    { name: "James Patel",      company: "Kibsons",           country: "UAE",          product: "Strawberry",    quantity: "300 cartons",email: "james@kibsons.ae",    phone: "+971505555555", message: "Egypt preferred.",     status: "Closed" },
    { name: "Omar Fadel",       company: "Tamimi Markets",    country: "Saudi Arabia", product: "Onion",         quantity: "3x40ft",     email: "omar@tamimi.sa",      phone: "+966551111111", message: "India origin only.",   status: "Contacted" },
    { name: "Priya Nair",       company: "Choithrams",        country: "UAE",          product: "Mango",         quantity: "1x40ft",     email: "priya@choithrams.ae", phone: "+971506666666", message: "Alphonso or Kesar.",   status: "Negotiating" },
    { name: "Hassan Ali",       company: "Mafco",             country: "Oman",         product: "Garlic",        quantity: "10 tons",    email: "hassan@mafco.om",     phone: "+96891111111",  message: "China or India.",      status: "New" },
  ];
  await Inquiry.deleteMany({});
  await Inquiry.insertMany(SAMPLE_INQUIRIES);
  console.log(`  ✓ ${SAMPLE_INQUIRIES.length} sample inquiries`);

  // ─── Site Content ──────────────────────────────────────────────────────────
  const CONTENT = {
    "home.hero_headline":    "Global Fresh Produce Trading Excellence",
    "home.hero_sub":         "Supplying premium fruits and vegetables worldwide through trusted sourcing, strict quality assurance and efficient logistics — from Dubai to over 15 countries.",
    "home.cta_primary":      "Request Quote",
    "home.cta_secondary":    "Explore Products",
    "about.mission":         "Deliver fresh produce globally with reliability and quality — empowering food businesses with consistent supply, transparent pricing and dependable logistics.",
    "about.vision":          "Become a trusted international leader in fresh produce trading — recognized for integrity, quality assurance and operational excellence on every shipment.",
    "services.section_title":"End-to-end fresh produce trade",
    "services.section_desc": "From orchard to destination — sourcing, quality, logistics, and clearance under one roof.",
    "contact.address":       "Deira, Dubai, United Arab Emirates",
    "contact.phone":         "+971 4 000 0000",
    "contact.email":         "trade@swapnildinesh.ae",
    "contact.whatsapp":      "+971 50 000 0000",
  };
  await SiteContent.deleteMany({});
  await SiteContent.insertMany(Object.entries(CONTENT).map(([key, value]) => ({ key, value })));
  console.log(`  ✓ ${Object.keys(CONTENT).length} content keys`);

  console.log("\n✅ Seed complete!");
  process.exit(0);
}

seed().catch((e) => {
  console.error("Seed failed:", e);
  process.exit(1);
});
