const BASE = "http://localhost:3001/api";

async function apiFetch(path, init = {}) {
  const res = await fetch(`${BASE}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...init,
  });
  const json = await res.json();
  if (!json.ok) throw new Error(json.error ?? "API error");
  return json.data ;
}

// ─── Products ─────────────────────────────────────────────────────────────────

export const api = {
  // Products
  getProducts:     ()                   => apiFetch("/products"),
  createProduct:   (b) =>
    apiFetch("/products", { method: "POST", body: JSON.stringify(b) }),
  updateProduct:   (id, b) =>
    apiFetch(`/products/${id}`, { method: "PUT", body: JSON.stringify(b) }),
  deleteProduct:   (id) =>
    apiFetch(`/products/${id}`, { method: "DELETE" }),

  // Inquiries
  getInquiries:    () => apiFetch("/inquiries"),
  createInquiry:   (b) =>
    apiFetch("/inquiries", { method: "POST", body: JSON.stringify(b) }),
  updateInquiryStatus: (id, status) =>
    apiFetch(`/inquiries/${id}/status`, { method: "PATCH", body: JSON.stringify({ status }) }),
  deleteInquiry:   (id) =>
    apiFetch(`/inquiries/${id}`, { method: "DELETE" }),

  // Import countries
  getImportCountries: () => apiFetch("/import-countries"),
  createImportCountry: (b) =>
    apiFetch("/import-countries", { method: "POST", body: JSON.stringify(b) }),
  updateImportCountry: (id, b) =>
    apiFetch(`/import-countries/${id}`, { method: "PUT", body: JSON.stringify(b) }),
  deleteImportCountry: (id) =>
    apiFetch(`/import-countries/${id}`, { method: "DELETE" }),

  // Export markets
  getExportMarkets: () => apiFetch("/export-markets"),
  createExportMarket: (b) =>
    apiFetch("/export-markets", { method: "POST", body: JSON.stringify(b) }),
  updateExportMarket: (id, b) =>
    apiFetch(`/export-markets/${id}`, { method: "PUT", body: JSON.stringify(b) }),
  deleteExportMarket: (id) =>
    apiFetch(`/export-markets/${id}`, { method: "DELETE" }),

  // Gallery
  getGallery:    () => apiFetch("/gallery"),
  createGallery: (b) =>
    apiFetch("/gallery", { method: "POST", body: JSON.stringify(b) }),
  updateGallery: (id, b) =>
    apiFetch(`/gallery/${id}`, { method: "PUT", body: JSON.stringify(b) }),
  deleteGallery: (id) =>
    apiFetch(`/gallery/${id}`, { method: "DELETE" }),

  // Certifications
  getCertifications:    () => apiFetch("/certifications"),
  createCertification:  (name) =>
    apiFetch("/certifications", { method: "POST", body: JSON.stringify({ name }) }),
  deleteCertification:  (id) =>
    apiFetch(`/certifications/${id}`, { method: "DELETE" }),

  // Quality steps
  getQualitySteps:  () => apiFetch("/quality-steps"),
  updateQualityStep:(id, b) =>
    apiFetch(`/quality-steps/${id}`, { method: "PUT", body: JSON.stringify(b) }),

  // Content
  getContent: () => apiFetch("/content"),
  saveContent: (updates) =>
    apiFetch("/content", { method: "PUT", body: JSON.stringify(updates) }),

  // Stats
  getStats: () => apiFetch("/stats"),
};

// ─── Types ────────────────────────────────────────────────────────────────────

