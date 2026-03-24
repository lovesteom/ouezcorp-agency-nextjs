"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X, ArrowRight } from "lucide-react";

const navLinks = [
  { label: "Services", href: "/services" },
  { label: "Réalisations", href: "/realisations" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

const announcementItems = [
  "47+ projets livrés",
  "Score Lighthouse 95+",
  "Livraison en 4–8 semaines",
  "Code source livré",
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        scrolled ? "px-4 pt-3" : ""
      }`}
    >
      {/* Barre d'annonce — masquée au scroll */}
      <div
        className={`hidden md:flex items-center justify-center gap-8 px-6 border-b border-[#1e1e1e] bg-[#0d0d0d] transition-all duration-300 overflow-hidden ${
          scrolled ? "h-0 opacity-0 border-0" : "h-9 opacity-100"
        }`}
      >
        {announcementItems.map((item, i) => (
          <span
            key={item}
            className="flex items-center gap-2 text-[11px] text-white/60 whitespace-nowrap"
          >
            {i > 0 && <span className="w-1 h-1 rounded-full bg-[#333]" />}
            <span className="w-1 h-1 rounded-full bg-amber-400/60" />
            {item}
          </span>
        ))}
      </div>

      {/* Header principal */}
      <header
        className={`w-full transition-all duration-300 ${
          scrolled
            ? "rounded-2xl border border-black/8 shadow-[0_8px_32px_rgba(0,0,0,0.10)]"
            : "border-b border-[#1e1e1e]"
        }`}
        style={{
          width: scrolled ? "calc(70% - 32px)" : "70%",
          margin: "0 auto",
          backgroundColor: scrolled
            ? "rgb(255 255 255 / 19%)"
            : "rgba(11,11,11,0.97)",
          backdropFilter: "blur(18px)",
          WebkitBackdropFilter: "blur(18px)",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between relative">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group shrink-0">
            <div
              className={`w-7 h-7 rounded-lg flex items-center justify-center transition-colors ${
                scrolled
                  ? "bg-[#111] group-hover:bg-[#333]"
                  : "bg-amber-400 group-hover:bg-amber-300"
              }`}
            >
              <span
                className={`w-2 h-2 rounded-full transition-colors ${
                  scrolled ? "bg-amber-400" : "bg-black"
                }`}
              />
            </div>
            <span
              className={`text-sm font-bold tracking-tight transition-colors ${
                scrolled ? "text-[#111]" : "text-white"
              }`}
            >
              OuezCorp
            </span>
          </Link>

          {/* Nav desktop — centrée en absolu */}
          <nav className="hidden md:flex items-center gap-0 absolute left-1/2 -translate-x-1/2">
            {navLinks.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`relative px-5 py-2 text-sm font-medium transition-colors group ${
                    scrolled
                      ? isActive
                        ? "text-[#111]"
                        : "text-white hover:text-[#111]"
                      : isActive
                        ? "text-white"
                        : "text-white/75 hover:text-white"
                  }`}
                >
                  {item.label}
                  <span
                    className={`absolute bottom-0 left-5 right-5 h-px transition-transform duration-200 origin-left ${
                      scrolled ? "bg-[#111]" : "bg-amber-400"
                    } ${
                      isActive
                        ? "scale-x-100"
                        : "scale-x-0 group-hover:scale-x-100"
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          {/* CTAs desktop */}
          <div className="hidden md:flex items-center gap-2 shrink-0">
            {/* Lien secondaire */}
            <Link
              href="/realisations"
              className={`px-4 py-2 text-sm font-medium rounded-full transition-all ${
                scrolled
                  ? "text-white hover:text-[#111]"
                  : "text-white border border-[#2e2e2e] hover:border-white/30 hover:text-white"
              }`}
            >
              Voir les projets
            </Link>
            {/* CTA principal */}
            <Link
              href="/contact"
              className={`inline-flex items-center gap-1.5 px-4 py-2 font-semibold rounded-full transition-all text-sm ${
                scrolled
                  ? "bg-[#111] hover:bg-[#333] text-white"
                  : "bg-amber-400 hover:bg-amber-300 text-black"
              }`}
            >
              Démarrer
              <ArrowRight size={14} />
            </Link>
          </div>

          {/* Burger mobile */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`md:hidden transition-colors ${
              scrolled
                ? "text-gray-600 hover:text-[#111]"
                : "text-white hover:text-white/80"
            }`}
            aria-label="Menu"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div
            className={`md:hidden border-t ${
              scrolled
                ? "border-[#ececec] bg-white"
                : "border-[#1e1e1e] bg-[#0d0d0d]"
            }`}
          >
            <div className="px-4 py-3 space-y-0.5">
              {navLinks.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={`flex items-center justify-between px-4 py-3 text-sm rounded-xl transition-all ${
                      scrolled
                        ? isActive
                          ? "text-[#111] bg-black/5"
                          : "text-gray-500 hover:text-[#111] hover:bg-black/4"
                        : isActive
                          ? "text-white bg-white/6"
                          : "text-white/75 hover:text-white hover:bg-white/4"
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                    {isActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                    )}
                  </Link>
                );
              })}
            </div>
            <div className="px-4 pb-4 pt-1 grid grid-cols-2 gap-2">
              <Link
                href="/realisations"
                className={`text-center py-3 text-sm font-medium rounded-full transition-all ${
                  scrolled
                    ? "text-gray-600 border border-[#d0d0d0] hover:border-[#999] hover:text-[#111]"
                    : "text-white border border-[#2e2e2e] hover:border-white/30"
                }`}
                onClick={() => setIsOpen(false)}
              >
                Voir les projets
              </Link>
              <Link
                href="/contact"
                className={`text-center py-3 font-bold rounded-full text-sm transition-all ${
                  scrolled
                    ? "bg-[#111] hover:bg-[#333] text-white"
                    : "bg-amber-400 hover:bg-amber-300 text-black"
                }`}
                onClick={() => setIsOpen(false)}
              >
                Démarrer →
              </Link>
            </div>
          </div>
        )}
      </header>
    </div>
  );
}
