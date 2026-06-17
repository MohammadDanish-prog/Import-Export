import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Public pages
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ProductsPage from "./pages/ProductsPage";
import MarketsPage from "./pages/MarketsPage";
import ServicesPage from "./pages/ServicesPage";
import QualityPage from "./pages/QualityPage";
import GalleryPage from "./pages/GalleryPage";
import ContactPage from "./pages/ContactPage";
import CostEstimatorPage from "./pages/CostEstimatorPage";
import InvestPage from "./pages/InvestPage";
import NotFoundPage from "./pages/NotFoundPage";

// Admin
import AdminLayout from "./components/admin/AdminLayout";
import AdminOverview from "./pages/admin/AdminOverview";
import AdminProducts from "./pages/admin/AdminProducts";
import AdminInquiries from "./pages/admin/AdminInquiries";
import AdminContent from "./pages/admin/AdminContent";
import AdminPlaceholder from "./pages/admin/AdminPlaceholder";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        {/* Public site */}
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/markets" element={<MarketsPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/quality" element={<QualityPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/cost-estimator" element={<CostEstimatorPage />} />
        <Route path="/invest" element={<InvestPage />} />
        <Route path="/contact" element={<ContactPage />} />

        {/* Admin panel */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminOverview />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="inquiries" element={<AdminInquiries />} />
          <Route path="content" element={<AdminContent />} />
          <Route path="imports" element={<AdminPlaceholder />} />
          <Route path="exports" element={<AdminPlaceholder />} />
          <Route path="gallery" element={<AdminPlaceholder />} />
          <Route path="certifications" element={<AdminPlaceholder />} />
          <Route path="settings" element={<AdminPlaceholder />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}
