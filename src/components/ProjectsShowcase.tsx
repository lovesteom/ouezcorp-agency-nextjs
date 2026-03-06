"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight, ArrowUpRight } from "lucide-react";

interface Project {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  image?: string;
  accent?: string; // couleur d'accentuation optionnelle
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
    accent: "lime",
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

const accentMap: Record<string, string> = {
  lime: "from-amber-400/25 to-amber-400/5 border-amber-400/20 text-amber-400",
  blue: "from-blue-400/25 to-blue-400/5 border-blue-400/20 text-blue-400",
  violet:
    "from-violet-400/25 to-violet-400/5 border-violet-400/20 text-violet-400",
  orange:
    "from-orange-400/25 to-orange-400/5 border-orange-400/20 text-orange-400",
  pink: "from-pink-400/25 to-pink-400/5 border-pink-400/20 text-pink-400",
};

const quickLinks = [
  { label: "Voir tous les projets", href: "/realisations" },
  { label: "Demander un devis", href: "/contact" },
  { label: "Notre processus", href: "/services" },
  { label: "Stack technique", href: "/services" },
  { label: "Nos témoignages", href: "/contact" },
];

export default function ProjectsShowcase({
  projects = defaultProjects,
}: ProjectsShowcaseProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: 370, behavior: "smooth" });
  };

  return (
    <section className="py-32 bg-[#0e0e0e] border-t border-[#222222]">
      {/* En-tête façon Apple */}
      <div className="max-w-7xl mx-auto px-6 mb-10">
        <h2 className="text-2xl md:text-3xl font-bold text-white">
          Nos réalisations.{" "}
          <span className="text-gray-400 font-normal">
            Des projets livrés avec soin, et des résultats mesurables.
          </span>
        </h2>
      </div>

      {/* Défilement horizontal */}
      <div className="relative">
        <div
          ref={scrollRef}
          className="flex gap-3 overflow-x-auto px-6 pb-4 snap-x snap-mandatory"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {projects.map((project) => {
            const accent =
              accentMap[project.accent ?? "lime"] ?? accentMap.lime;
            const [gradientClass, , borderClass, categoryColorClass] =
              accent.split(" ");

            return (
              <Link
                key={project.slug}
                href={`/realisations/${project.slug}`}
                className="group snap-start shrink-0 w-72.5 md:w-82.5 rounded-3xl overflow-hidden bg-[#161616] border border-[#2a2a2a] hover:border-white/20 transition-all duration-300 hover:-translate-y-1 flex flex-col"
              >
                {/* Contenu */}
                <div className="p-7 flex flex-col grow">
                  <p
                    className={`text-[10px] font-bold tracking-widest uppercase mb-3 ${categoryColorClass}`}
                  >
                    {project.category}
                  </p>
                  <h3 className="text-[1.05rem] font-bold text-white leading-snug mb-3 group-hover:opacity-80 transition-opacity">
                    {project.title}
                  </h3>
                  <p className="text-sm text-gray-300 leading-relaxed line-clamp-3 grow">
                    {project.excerpt}
                  </p>
                  <div
                    className={`mt-5 inline-flex items-center gap-1 text-xs font-semibold ${categoryColorClass} opacity-0 group-hover:opacity-100 transition-opacity`}
                  >
                    Voir le projet
                    <ArrowUpRight
                      size={13}
                      className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                    />
                  </div>
                </div>

                {/* Illustration en bas de la carte */}
                {project.image ? (
                  <div className="relative h-44 overflow-hidden">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-[#161616]/60 to-transparent" />
                  </div>
                ) : (
                  <div
                    className={`h-36 bg-linear-to-br ${gradientClass} border-t ${borderClass}`}
                  />
                )}
              </Link>
            );
          })}

          {/* Carte CTA */}
          <Link
            href="/realisations"
            className="snap-start shrink-0 w-55 rounded-3xl overflow-hidden bg-amber-400 hover:bg-amber-300 transition-colors flex flex-col items-center justify-center p-8 gap-4 text-center"
          >
            <div className="w-12 h-12 rounded-full bg-black/15 flex items-center justify-center">
              <ArrowUpRight size={22} className="text-black" />
            </div>
            <p className="font-bold text-black text-sm leading-snug">
              Voir tous
              <br />
              les projets
            </p>
          </Link>
        </div>

        {/* Bouton de défilement */}
        <button
          onClick={scrollRight}
          aria-label="Défiler vers la droite"
          className="absolute right-6 top-[45%] -translate-y-1/2 w-11 h-11 bg-[#2a2a2a] hover:bg-[#3a3a3a] border border-[#3d3d3d] rounded-full flex items-center justify-center transition-colors shadow-xl"
        >
          <ChevronRight size={18} className="text-white" />
        </button>
      </div>

      {/* Liens rapides */}
      <div className="max-w-7xl mx-auto px-6 mt-10">
        <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-4">
          Liens rapides
        </p>
        <div className="flex flex-wrap gap-2">
          {quickLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="px-5 py-2 text-xs font-medium text-gray-300 border border-[#2a2a2a] rounded-full hover:border-white/30 hover:text-white transition-all"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
