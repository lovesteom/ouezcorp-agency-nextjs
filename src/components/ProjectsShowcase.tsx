"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react";

interface Project {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  image?: string;
  accent?: string;
}

interface ProjectsShowcaseProps {
  projects?: Project[];
}

const defaultProjects: Project[] = [
  {
    slug: "ecommerce-luxe",
    category: "E-commerce",
    title: "E-commerce Mode & Luxe",
    excerpt:
      "Migration WooCommerce Headless vers Next.js 15. Temps de chargement 8 s → 2,4 s. Taux de conversion +42 % dès le premier mois.",
    accent: "amber",
  },
  {
    slug: "corporate-multilingue",
    category: "Site Vitrine",
    title: "Site Corporate Multilingue",
    excerpt:
      "Architecture FR/EN/DE avec next-intl et WordPress WPML. Score Lighthouse 97/100. 3 langues déployées en 6 semaines.",
    accent: "blue",
  },
  {
    slug: "marketplace-b2b",
    category: "Application Web",
    title: "Marketplace B2B SaaS",
    excerpt:
      "Plateforme B2B avec auth multi-rôles NextAuth.js, tableau de bord acheteur et 1 200+ références produits synchronisées en temps réel.",
    accent: "violet",
  },
  {
    slug: "cabinet-conseil",
    category: "SEO & Performance",
    title: "Refonte Cabinet Conseil",
    excerpt:
      "Refonte complète avec blog headless, formulaires dynamiques et intégration CRM. Trafic organique +280 % en 4 mois post-lancement.",
    accent: "orange",
  },
  {
    slug: "startup-saas",
    category: "Interface SaaS",
    title: "Dashboard Startup SaaS",
    excerpt:
      "Design system complet Figma → Storybook, composants accessibles WCAG 2.1 AA et animations Framer Motion. Livré en 5 semaines.",
    accent: "pink",
  },
];

const accentConfig: Record<
  string,
  { bg: string; border: string; text: string; glow: string }
> = {
  amber: {
    bg: "bg-amber-400/10",
    border: "border-amber-400/20",
    text: "text-amber-400",
    glow: "shadow-amber-400/10",
  },
  blue: {
    bg: "bg-blue-400/10",
    border: "border-blue-400/20",
    text: "text-blue-400",
    glow: "shadow-blue-400/10",
  },
  violet: {
    bg: "bg-violet-400/10",
    border: "border-violet-400/20",
    text: "text-violet-400",
    glow: "shadow-violet-400/10",
  },
  orange: {
    bg: "bg-orange-400/10",
    border: "border-orange-400/20",
    text: "text-orange-400",
    glow: "shadow-orange-400/10",
  },
  pink: {
    bg: "bg-pink-400/10",
    border: "border-pink-400/20",
    text: "text-pink-400",
    glow: "shadow-pink-400/10",
  },
};

const quickLinks = [
  { label: "Voir tous les projets", href: "/realisations" },
  { label: "Demander un devis", href: "/contact" },
  { label: "Notre processus", href: "/services" },
  { label: "Stack technique", href: "/services" },
];

export default function ProjectsShowcase({
  projects = defaultProjects,
}: ProjectsShowcaseProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    scrollRef.current?.scrollBy({
      left: dir === "right" ? 360 : -360,
      behavior: "smooth",
    });
  };

  return (
    <section className="py-28 bg-(--bg-2) border-t border-(--border)">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 mb-10 flex items-end justify-between gap-4">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-widest text-(--accent) mb-3">
            Réalisations
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-(--fg)">
            Nos projets.{" "}
            <span className="text-(--fg-3) font-normal">
              Des résultats mesurables.
            </span>
          </h2>
        </div>
        {/* Contrôles */}
        <div className="hidden sm:flex gap-2 shrink-0">
          {(["left", "right"] as const).map((dir) => (
            <button
              key={dir}
              onClick={() => scroll(dir)}
              aria-label={dir === "left" ? "Précédent" : "Suivant"}
              className="w-10 h-10 rounded-full border border-(--border) bg-(--bg-card)
                flex items-center justify-center text-(--fg-2)
                hover:border-(--border-strong) hover:text-(--fg)
                transition-all duration-200"
            >
              {dir === "left" ? (
                <ChevronLeft size={17} />
              ) : (
                <ChevronRight size={17} />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Scroll horizontal */}
      <div className="relative">
        <div
          ref={scrollRef}
          className="flex gap-3 overflow-x-auto px-6 pb-4 snap-x snap-mandatory"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {projects.map((project) => {
            const accent =
              accentConfig[project.accent ?? "amber"] ?? accentConfig.amber;
            return (
              <Link
                key={project.slug}
                href={`/realisations/${project.slug}`}
                className={`card-interactive group snap-start shrink-0 w-72 md:w-80 rounded-2xl overflow-hidden flex flex-col`}
              >
                {/* Image ou placeholder */}
                {project.image ? (
                  <div className="relative h-44 overflow-hidden shrink-0">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div
                      className="absolute inset-0"
                      style={{
                        background:
                          "linear-gradient(to top, var(--bg-card) 0%, transparent 100%)",
                      }}
                    />
                  </div>
                ) : (
                  <div
                    className={`h-32 shrink-0 ${accent.bg} border-b ${accent.border} relative overflow-hidden`}
                  >
                    <div className="absolute inset-0 flex items-center justify-center opacity-20">
                      <div className="w-20 h-20 rounded-full border-2 border-current" />
                    </div>
                  </div>
                )}

                {/* Contenu */}
                <div className="p-6 flex flex-col grow">
                  <p
                    className={`text-[10px] font-bold tracking-widest uppercase mb-3 ${accent.text}`}
                  >
                    {project.category}
                  </p>
                  <h3
                    className="text-sm font-bold text-(--fg) leading-snug mb-3
                    group-hover:text-(--accent) transition-colors"
                  >
                    {project.title}
                  </h3>
                  <p className="text-xs text-(--fg-2) leading-relaxed line-clamp-3 grow">
                    {project.excerpt}
                  </p>
                  <div
                    className={`mt-4 inline-flex items-center gap-1 text-xs font-semibold ${accent.text}
                    opacity-0 group-hover:opacity-100 transition-opacity`}
                  >
                    Voir le projet <ArrowUpRight size={12} />
                  </div>
                </div>
              </Link>
            );
          })}

          {/* CTA card */}
          <Link
            href="/realisations"
            className="snap-start shrink-0 w-52 rounded-2xl bg-(--accent) hover:opacity-90
              flex flex-col items-center justify-center p-8 gap-4 text-center
              transition-all duration-200 hover:-translate-y-1"
          >
            <div className="w-11 h-11 rounded-full bg-black/15 flex items-center justify-center">
              <ArrowUpRight size={20} className="text-black" />
            </div>
            <p className="font-bold text-black text-sm leading-snug">
              Tous les projets
            </p>
          </Link>
        </div>
      </div>

      {/* Liens rapides */}
      <div className="max-w-7xl mx-auto px-6 mt-8">
        <div className="flex flex-wrap gap-2">
          {quickLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="px-4 py-2 text-xs font-medium text-(--fg-2) border border-(--border)
                rounded-full hover:border-(--border-strong) hover:text-(--fg)
                transition-all duration-150"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
