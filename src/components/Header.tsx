"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Menu, X, ArrowRight, Sun, Moon } from "lucide-react";

const navLinks = [
  { label: "Services", href: "/services" },
  { label: "Realisations", href: "/realisations" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

const announcementItems = [
  "47+ projets livres",
  "Score Lighthouse 95+",
  "Livraison en 4-8 semaines",
  "Code source livre",
];

function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return <div className="w-9 h-9 rounded-full" />;
  const isDark = theme === "dark";
  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Theme clair" : "Theme sombre"}
      className="w-9 h-9 flex items-center justify-center rounded-full border transition-all duration-200 border-(--border) bg-(--bg-card) hover:border-(--accent-border) hover:bg-(--accent-subtle) text-(--fg-2) hover:text-(--accent)"
    >
      {isDark ? <Sun size={15} /> : <Moon size={15} />}
    </button>
  );
}

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <div
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${scrolled ? "px-4 pt-3" : ""}`}
    >
      <div
        className={`hidden md:flex items-center justify-center gap-8 px-6 transition-all duration-300 overflow-hidden border-b border-(--border) bg-(--bg-2) ${scrolled ? "h-0 opacity-0 border-0 pointer-events-none" : "h-9 opacity-100"}`}
      >
        {announcementItems.map((item, i) => (
          <span
            key={item}
            className="flex items-center gap-2 text-[11px] text-(--fg-3) whitespace-nowrap"
          >
            {i > 0 && <span className="w-px h-3 bg-(--border)" />}
            <span className="w-1.5 h-1.5 rounded-full bg-(--accent) opacity-70" />
            {item}
          </span>
        ))}
      </div>

      <header
        style={{
          width: scrolled ? "min(76%, 980px)" : "100%",
          margin: "0 auto",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
        }}
        className={`w-full transition-all duration-300 bg-(--bg)/90 ${scrolled ? "rounded-2xl border border-(--border-strong) shadow-[0_8px_40px_rgba(0,0,0,0.15)]" : "border-b border-(--border)"}`}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-6 h-16 flex items-center justify-between relative">
          <Link href="/" className="flex items-center gap-2.5 group shrink-0">
            <div className="w-7 h-7 rounded-lg bg-(--accent) flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
              <span className="w-2 h-2 rounded-full bg-black" />
            </div>
            <span className="text-sm font-bold tracking-tight text-(--fg)">
              OuezCorp
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
            {navLinks.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`relative px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 ${isActive ? "text-(--fg) bg-(--bg-3) border border-(--border-strong)" : "text-(--fg-2) hover:text-(--fg) hover:bg-(--bg-3)"}`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-(--accent)" />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="hidden md:flex items-center gap-2 shrink-0">
            <ThemeToggle />
            <Link
              href="/contact"
              className="btn btn-primary text-sm px-5 py-2 gap-1.5"
            >
              Demarrer <ArrowRight size={14} />
            </Link>
          </div>

          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Menu"
              className="w-9 h-9 flex items-center justify-center rounded-full border border-(--border) bg-(--bg-card) text-(--fg-2) hover:text-(--fg) hover:border-(--border-strong) transition-all duration-200"
            >
              {isOpen ? <X size={17} /> : <Menu size={17} />}
            </button>
          </div>
        </div>

        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out border-t border-(--border) bg-(--bg-card) ${isOpen ? "max-h-105 opacity-100" : "max-h-0 opacity-0 pointer-events-none"}`}
        >
          <nav className="px-4 pt-3 pb-2 space-y-1">
            {navLinks.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center justify-between px-4 py-3 text-sm rounded-xl transition-all ${isActive ? "text-(--fg) bg-(--bg-3) font-semibold border border-(--border)" : "text-(--fg-2) hover:text-(--fg) hover:bg-(--bg-3)"}`}
                >
                  {item.label}
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-(--accent)" />
                  )}
                </Link>
              );
            })}
          </nav>
          <div className="px-4 pt-1 pb-4 grid grid-cols-2 gap-2">
            <Link
              href="/realisations"
              onClick={() => setIsOpen(false)}
              className="btn btn-secondary text-center py-3 text-sm"
            >
              Voir les projets
            </Link>
            <Link
              href="/contact"
              onClick={() => setIsOpen(false)}
              className="btn btn-primary text-center py-3 text-sm"
            >
              Demarrer
            </Link>
          </div>
        </div>
      </header>
    </div>
  );
}
