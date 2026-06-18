import { Link, Outlet, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  LayoutDashboard, Package, MessageSquare, Globe, Plane,
  Images, Award, FileText, Settings, Bell, Search,
  Moon, Sun, Leaf, Menu, X, ChevronRight,
} from "lucide-react";

const NAV = [
  { to: "/admin",              label: "Overview",         icon: LayoutDashboard, exact: true },
  { to: "/admin/products",     label: "Products",         icon: Package },
  { to: "/admin/inquiries",    label: "Inquiries",        icon: MessageSquare },
  { to: "/admin/imports",      label: "Import Markets",   icon: Globe },
  { to: "/admin/exports",      label: "Export Markets",   icon: Plane },
  { to: "/admin/gallery",      label: "Gallery",          icon: Images },
  { to: "/admin/certifications",label: "Certifications",  icon: Award },
  { to: "/admin/content",      label: "Website Content",  icon: FileText },
  { to: "/admin/settings",     label: "Settings",         icon: Settings },
];

export default function AdminLayout() {
  const { pathname } = useLocation();
  const [openMobile, setOpenMobile] = useState(false);
  const [dark, setDark] = useState(() =>
    typeof document !== "undefined" && document.documentElement.classList.contains("dark")
  );

  useEffect(() => { setOpenMobile(false); }, [pathname]);

  const toggleDark = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
  };

  // Current page label for breadcrumb
  const current = NAV.find(n => n.exact ? pathname === n.to : pathname.startsWith(n.to));

  return (
    <div className="min-h-screen bg-muted/30">
      {/* ── Sidebar ── */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 flex flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground transition-transform duration-300 lg:translate-x-0 ${
          openMobile ? "translate-x-0 shadow-2xl" : "-translate-x-full"
        }`}
      >
        {/* Logo */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-sidebar-border">
          <Link to="/" className="flex items-center gap-2.5">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-brand text-brand-foreground">
              <Leaf className="h-4 w-4" />
            </span>
            <span className="flex flex-col leading-tight">
              <span className="font-display text-sm font-bold">Trade Admin</span>
              <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
                Swapnil Dinesh
              </span>
            </span>
          </Link>
          <button
            onClick={() => setOpenMobile(false)}
            className="lg:hidden grid h-8 w-8 place-items-center rounded-lg hover:bg-sidebar-accent"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto p-3 space-y-0.5">
          {NAV.map((item) => {
            const active = item.exact ? pathname === item.to : pathname.startsWith(item.to);
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all ${
                  active
                    ? "bg-gradient-brand text-brand-foreground shadow-elevated"
                    : "text-sidebar-foreground/75 hover:bg-sidebar-accent hover:text-sidebar-foreground"
                }`}
              >
                <item.icon className="h-4 w-4 shrink-0" />
                {item.label}
                {active && <ChevronRight className="ml-auto h-3.5 w-3.5 opacity-60" />}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="border-t border-sidebar-border p-4">
          <Link
            to="/"
            className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition"
          >
            ← Back to website
          </Link>
        </div>
      </aside>

      {/* Mobile overlay */}
      {openMobile && (
        <div
          className="fixed inset-0 z-30 bg-ink/50 backdrop-blur-sm lg:hidden"
          onClick={() => setOpenMobile(false)}
        />
      )}

      {/* ── Main ── */}
      <div className="lg:pl-64 flex flex-col min-h-screen">
        {/* Top bar */}
        <header className="sticky top-0 z-20 flex items-center gap-3 border-b border-border bg-background/90 px-4 py-3 backdrop-blur md:px-6">
          <button
            onClick={() => setOpenMobile(true)}
            className="lg:hidden grid h-9 w-9 place-items-center rounded-xl border border-border hover:bg-muted"
          >
            <Menu className="h-4 w-4" />
          </button>

          {/* Breadcrumb */}
          <div className="hidden sm:flex items-center gap-1.5 text-sm text-muted-foreground">
            <span className="font-medium text-foreground">Admin</span>
            {current && current.to !== "/admin" && (
              <>
                <span>/</span>
                <span className="font-medium text-foreground">{current.label}</span>
              </>
            )}
          </div>

          <div className="relative flex-1 max-w-xs ml-auto sm:ml-0">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              placeholder="Search..."
              className="w-full rounded-xl border border-border bg-background py-2 pl-10 pr-4 text-sm outline-none focus:ring-2 focus:ring-brand"
            />
          </div>

          <div className="flex items-center gap-2 ml-auto">
            <button
              onClick={toggleDark}
              className="grid h-9 w-9 place-items-center rounded-xl border border-border hover:bg-muted transition"
            >
              {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
            <button className="relative grid h-9 w-9 place-items-center rounded-xl border border-border hover:bg-muted transition">
              <Bell className="h-4 w-4" />
              <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-accent-orange" />
            </button>
            <div className="grid h-9 w-9 place-items-center rounded-full bg-gradient-brand text-brand-foreground text-xs font-bold shadow-elevated">
              SD
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-4 md:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
