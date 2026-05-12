import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, Search } from "lucide-react";
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

// ---------- Nav data (live routes only) ----------
type NavLink = { label: string; href: string; external?: boolean };
type NavGroup = { heading: string; links: NavLink[] };

const NAV_GROUPS: NavGroup[] = [
  {
    heading: "Shop",
    links: [
      { label: "All Products", href: "/shop" },
      { label: "Pleasure Collection", href: "/collections/pleasure-collection" },
      { label: "DOX-Compatible Products", href: "/collections/dox-compatible-products" },
      { label: "Discreet Storage", href: "/collections/discreet-storage" },
      { label: "Portable Storage", href: "/collections/portable-storage" },
      { label: "Bedroom Storage", href: "/collections/bedroom-storage" },
      { label: "Products for Couples", href: "/collections/products-for-couples" },
    ],
  },
  {
    heading: "Products",
    links: [
      { label: "Vellvii DOX", href: "/products/vellvii-dox" },
      { label: "Vellvii Lux", href: "/products/vellvii-lux" },
      { label: "Vellvii G-Vibe", href: "/products/vellvii-g-vibe" },
      { label: "Vellvii Evolve", href: "/products/vellvii-evolve" },
      { label: "Vellvii Pulse", href: "/products/vellvii-pulse" },
    ],
  },
  {
    heading: "Support",
    links: [
      { label: "Warranty", href: "/warranty" },
      { label: "Register Warranty", href: "/warranty/register" },
      { label: "Contact", href: "mailto:hello@vellvii.com", external: true },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Terms of Service", href: "/terms-of-service" },
    ],
  },
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
  const searchRef = useRef<HTMLInputElement>(null);
  const location = useLocation();

  useEffect(() => subscribe(setOpenState), []);

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

    // Focus search after mount
    const t = window.setTimeout(() => searchRef.current?.focus(), 50);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
      window.clearTimeout(t);
      // Return focus to last trigger
      _lastTrigger?.focus?.();
    };
  }, [open]);

  // Cleanup on unmount as a safety net
  useEffect(() => {
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const close = useCallback(() => setOpen(false), []);

  const filteredGroups = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return NAV_GROUPS;
    return NAV_GROUPS
      .map((g) => ({
        ...g,
        links: g.links.filter((l) => l.label.toLowerCase().includes(q)),
      }))
      .filter((g) => g.links.length > 0);
  }, [query]);

  const totalMatches = filteredGroups.reduce((n, g) => n + g.links.length, 0);

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

            {/* Nav groups */}
            <motion.nav
              className="flex-1 min-h-0 overflow-y-auto overscroll-contain px-5 sm:px-6 pb-6 pr-1"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.025, delayChildren: 0.05 } },
              }}
            >
              {totalMatches === 0 ? (
                <p className="font-montserrat text-sm text-light-secondary/80 py-4">
                  No results found.
                </p>
              ) : (
                <div className="space-y-8">
                  {filteredGroups.map((group) => (
                    <div key={group.heading}>
                      <h3 className="font-baskerville italic text-xs uppercase tracking-[0.2em] text-primary/80 mb-3">
                        {group.heading}
                      </h3>
                      <ul>
                        {group.links.map((link) => (
                          <motion.li
                            key={link.href + link.label}
                            variants={{
                              hidden: { opacity: 0, x: -8 },
                              visible: { opacity: 1, x: 0 },
                            }}
                          >
                            {link.external ? (
                              <a
                                href={link.href}
                                onClick={close}
                                className="block py-2.5 font-montserrat text-sm text-light-secondary hover:text-primary transition-colors border-l-2 border-transparent hover:border-primary/40 pl-3 -ml-3"
                              >
                                {link.label}
                              </a>
                            ) : (
                              <Link
                                to={link.href}
                                onClick={close}
                                className="block py-2.5 font-montserrat text-sm text-light-secondary hover:text-primary transition-colors border-l-2 border-transparent hover:border-primary/40 pl-3 -ml-3"
                              >
                                {link.label}
                              </Link>
                            )}
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
            </motion.nav>

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
