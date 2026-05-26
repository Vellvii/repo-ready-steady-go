import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, Search, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

// ---------- Module-level open state (single global drawer) ----------
type Listener = (open: boolean) => void;
const listeners = new Set<Listener>();
let _open = false;
let _lastTrigger: HTMLElement | null = null;

const setOpen = (open: boolean, trigger?: HTMLElement | null) => {
  if (open && trigger) _lastTrigger = trigger;
  _open = open;
  listeners.forEach((l) => l(open));
};

const subscribe = (l: Listener) => {
  listeners.add(l);
  return () => {
    listeners.delete(l);
  };
};

// ---------- Nav data ----------
type NavLink = { label: string; href: string; external?: boolean };
type NavItem =
  | { kind: "link"; label: string; href: string; external?: boolean }
  // `href` makes the parent label itself a link; the chevron toggles the submenu.
  | { kind: "group"; label: string; href?: string; links: NavLink[] };

const NAV_ITEMS: NavItem[] = [
  { kind: "link", label: "Home", href: "/" },
  {
    kind: "group",
    label: "Shop",
    href: "/shop",
    links: [
      { label: "Available Now", href: "/shop?filter=available" },
      { label: "Vellvii Lux", href: "/products/vellvii-lux" },
      { label: "Storage Solutions", href: "/collections/storage-solutions" },
      { label: "DOX-Compatible", href: "/collections/dox-compatible-products" },
      { label: "Coming Soon", href: "/shop?filter=coming-soon" },
    ],
  },
  {
    kind: "group",
    label: "Guides",
    href: "/guides",
    links: [
      { label: "Care Guide", href: "/guides/how-to-care-for-your-vellvii-products" },
      { label: "Warranty", href: "/warranty" },
      { label: "Discreet Shipping", href: "/guides/discreet-storage-for-intimate-wellness-products" },
      { label: "Product Compatibility", href: "/guides/how-the-vellvii-dox-docking-system-works" },
      { label: "FAQs", href: "/guides" },
    ],
  },
  {
    kind: "group",
    label: "About",
    links: [
      { label: "Our Story", href: "/socials" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    kind: "group",
    label: "Support",
    links: [
      { label: "Cart", href: "/cart" },
      { label: "Warranty", href: "/warranty" },
      { label: "Register Warranty", href: "/warranty/register" },
      { label: "Discreet Shipping", href: "/guides/discreet-storage-for-intimate-wellness-products" },
      { label: "Care Guide", href: "/guides/how-to-care-for-your-vellvii-products" },
      { label: "FAQs", href: "/guides" },
      { label: "Contact", href: "/contact" },
    ],
  },
  { kind: "link", label: "Socials", href: "/socials" },
];

// ---------- Trigger button ----------
export const NavMenuButton = ({ className }: { className?: string }) => {
  const ref = useRef<HTMLButtonElement>(null);
  return (
    <button
      ref={ref}
      type="button"
      aria-label="Open navigation menu"
      onClick={() => setOpen(true, ref.current)}
      className={cn(
        "inline-flex items-center justify-center h-10 w-10 rounded-md text-light-primary hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40",
        className
      )}
    >
      <Menu className="h-5 w-5" strokeWidth={1.5} />
    </button>
  );
};

// ---------- Drawer ----------
export const LuxuryNavDrawer = () => {
  const [open, setOpenState] = useState(_open);
  const [query, setQuery] = useState("");
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const searchRef = useRef<HTMLInputElement>(null);
  const location = useLocation();

  useEffect(() => subscribe(setOpenState), []);

  // Auto-expand the group containing the active route when drawer opens
  useEffect(() => {
    if (!open) return;
    const next: Record<string, boolean> = {};
    NAV_ITEMS.forEach((item) => {
      if (item.kind === "group") {
        const active = item.links.some((l) => location.pathname.startsWith(l.href));
        if (active) next[item.label] = true;
      }
    });
    setExpanded((prev) => ({ ...prev, ...next }));
  }, [open, location.pathname]);

  // Close on route change
  useEffect(() => {
    if (_open) setOpen(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  // Body scroll lock + Escape + focus management
  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);

    const t = window.setTimeout(() => searchRef.current?.focus(), 50);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
      window.clearTimeout(t);
      _lastTrigger?.focus?.();
    };
  }, [open]);

  useEffect(() => {
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const close = useCallback(() => setOpen(false), []);

  // Search filtering: when querying, auto-expand groups that have matches
  const q = query.trim().toLowerCase();
  const filteredItems = useMemo(() => {
    if (!q) return NAV_ITEMS;
    const out: NavItem[] = [];
    for (const item of NAV_ITEMS) {
      if (item.kind === "link") {
        if (item.label.toLowerCase().includes(q)) out.push(item);
      } else {
        const links = item.links.filter((l) => l.label.toLowerCase().includes(q));
        if (links.length) out.push({ ...item, links });
      }
    }
    return out;
  }, [q]);

  const totalMatches = filteredItems.reduce(
    (n, i) => n + (i.kind === "link" ? 1 : i.links.length),
    0
  );

  const toggle = (label: string) =>
    setExpanded((prev) => ({ ...prev, [label]: !prev[label] }));

  const linkClass =
    "block py-2.5 font-montserrat text-sm text-light-secondary hover:text-primary transition-colors border-l-2 border-transparent hover:border-primary/40 pl-3 -ml-3";

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="nav-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={close}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[1100]"
            aria-hidden
          />
          <motion.aside
            key="nav-panel"
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed left-0 top-0 h-full h-[100dvh] w-[88vw] max-w-[420px] bg-background border-r border-white/10 z-[1110] flex flex-col overflow-hidden shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 sm:px-6 pt-5 pb-4">
              <img
                src="/uploads/Vellvii-full-logo-transparent.png"
                alt="Vellvii"
                className="h-8 w-auto"
              />
              <button
                type="button"
                onClick={close}
                aria-label="Close navigation menu"
                className="inline-flex items-center justify-center h-9 w-9 rounded-md text-light-primary hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
              >
                <X className="h-5 w-5" strokeWidth={1.5} />
              </button>
            </div>

            {/* Tagline */}
            <div className="px-5 sm:px-6 pb-5">
              <span className="font-baskerville italic text-[0.7rem] tracking-[0.32em] uppercase text-primary/70">
                The Art of &lsquo;O&rsquo;
              </span>
            </div>

            <div className="border-t border-white/10" />

            {/* Search */}
            <div className="px-5 sm:px-6 py-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-light-secondary" strokeWidth={1.5} />
                <input
                  ref={searchRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search Vellvii"
                  aria-label="Search navigation"
                  className="w-full h-10 pl-9 pr-9 bg-white/5 border border-white/10 focus:border-primary/40 rounded-md font-montserrat text-base sm:text-sm text-light-primary placeholder:text-light-secondary/70 focus:outline-none transition-colors"
                />
                {query && (
                  <button
                    type="button"
                    onClick={() => setQuery("")}
                    aria-label="Clear search"
                    className="absolute right-2 top-1/2 -translate-y-1/2 h-7 w-7 inline-flex items-center justify-center rounded text-light-secondary hover:text-primary"
                  >
                    <X className="h-4 w-4" strokeWidth={1.5} />
                  </button>
                )}
              </div>
            </div>

            {/* Nav */}
            <nav
              data-lenis-prevent
              data-lenis-prevent-wheel
              data-lenis-prevent-touch
              className="flex-1 min-h-0 overflow-y-auto overscroll-contain touch-pan-y px-5 sm:px-6 pb-6 pr-1 scrollbar-luxury"
              style={{ WebkitOverflowScrolling: "touch" }}
            >
              {totalMatches === 0 ? (
                <p className="font-montserrat text-sm text-light-secondary/80 py-4">
                  No results found.
                </p>
              ) : (
                <ul className="space-y-1">
                  {filteredItems.map((item) => {
                    if (item.kind === "link") {
                      return (
                        <li key={item.href + item.label}>
                          <Link
                            to={item.href}
                            onClick={close}
                            className="block py-3 font-baskerville italic text-sm uppercase tracking-[0.18em] text-light-primary hover:text-primary transition-colors"
                          >
                            {item.label}
                          </Link>
                        </li>
                      );
                    }

                    const isOpen = !!q || !!expanded[item.label];
                    const parentClass =
                      "flex-1 text-left py-3 font-baskerville italic text-sm uppercase tracking-[0.18em] text-light-primary hover:text-primary transition-colors";
                    return (
                      <li key={item.label} className="border-b border-white/5 last:border-b-0">
                        <div className="flex items-center gap-1">
                          {item.href ? (
                            <Link to={item.href} onClick={close} className={parentClass}>
                              {item.label}
                            </Link>
                          ) : (
                            <button
                              type="button"
                              onClick={() => toggle(item.label)}
                              className={parentClass}
                            >
                              {item.label}
                            </button>
                          )}
                          <button
                            type="button"
                            onClick={() => toggle(item.label)}
                            aria-expanded={isOpen}
                            aria-label={`${isOpen ? "Collapse" : "Expand"} ${item.label}`}
                            className="h-9 w-9 inline-flex items-center justify-center rounded-md text-primary/70 hover:text-primary hover:bg-white/5 transition-colors"
                          >
                            <motion.span
                              animate={{ rotate: isOpen ? 180 : 0 }}
                              transition={{ duration: 0.2 }}
                            >
                              <ChevronDown className="h-4 w-4" strokeWidth={1.5} />
                            </motion.span>
                          </button>
                        </div>
                        <AnimatePresence initial={false}>
                          {isOpen && (
                            <motion.div
                              key="content"
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                              className="overflow-hidden"
                            >
                              <ul className="pl-3 pb-2">
                                {item.links.map((link) => (
                                  <li key={link.href + link.label}>
                                    {link.external ? (
                                      <a href={link.href} onClick={close} className={linkClass}>
                                        {link.label}
                                      </a>
                                    ) : (
                                      <Link to={link.href} onClick={close} className={linkClass}>
                                        {link.label}
                                      </Link>
                                    )}
                                  </li>
                                ))}
                              </ul>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </li>
                    );
                  })}
                </ul>
              )}
            </nav>

            {/* Footer */}
            <div className="border-t border-white/10 px-5 sm:px-6 py-4 space-y-1.5">
              <a
                href="mailto:hello@vellvii.com"
                onClick={close}
                className="block font-montserrat text-xs text-light-secondary hover:text-primary transition-colors"
              >
                hello@vellvii.com
              </a>
              <p className="font-montserrat text-[0.65rem] tracking-wider uppercase text-light-secondary/60">
                © 2026 Vellvii
              </p>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};

export default LuxuryNavDrawer;
