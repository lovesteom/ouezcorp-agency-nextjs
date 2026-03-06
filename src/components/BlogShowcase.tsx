"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight, ArrowUpRight, Clock } from "lucide-react";

interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  image?: string;
  date?: string;
  readTime?: string;
}

interface BlogShowcaseProps {
  posts?: BlogPost[];
}

const defaultPosts: BlogPost[] = [
  {
    slug: "architecture-headless-wordpress",
    category: "Next.js",
    title: "Architecture Headless : pourquoi découpler WordPress ?",
    excerpt:
      "Les avantages concrets d'une architecture découplée pour la performance, le SEO et l'expérience développeur en 2025.",
    date: "12 fév. 2026",
    readTime: "8 min",
  },
  {
    slug: "core-web-vitals-2025",
    category: "SEO",
    title: "Core Web Vitals 2025 : les métriques qui comptent vraiment",
    excerpt:
      "LCP, INP, CLS — comment les optimiser concrètement dans un projet Next.js 15 avec App Router.",
    date: "28 jan. 2026",
    readTime: "6 min",
  },
  {
    slug: "woocommerce-headless-vs-shopify",
    category: "E-commerce",
    title: "WooCommerce Headless vs Shopify : lequel choisir ?",
    excerpt:
      "Comparatif technique et business pour choisir la bonne plateforme selon votre contexte et vos objectifs.",
    date: "10 jan. 2026",
    readTime: "10 min",
  },
  {
    slug: "tailwind-css-v4-nouveautes",
    category: "CSS",
    title: "Tailwind CSS v4 : tout ce qui change pour vos projets",
    excerpt:
      "Lightning CSS, nouvelles APIs, classes utilitaires revisitées — le guide complet de migration depuis v3.",
    date: "03 jan. 2026",
    readTime: "7 min",
  },
  {
    slug: "nextauth-v5-guide",
    category: "Auth",
    title: "NextAuth v5 : authentification moderne avec Next.js 15",
    excerpt:
      "Sessions Edge, JWT, OAuth providers et middleware — mise en place complète avec App Router et Server Actions.",
    date: "20 déc. 2025",
    readTime: "12 min",
  },
];

const categoryColorMap: Record<string, string> = {
  "Next.js": "text-amber-400",
  SEO: "text-sky-400",
  "E-commerce": "text-orange-400",
  CSS: "text-violet-400",
  Auth: "text-pink-400",
  TypeScript: "text-blue-400",
  Performance: "text-emerald-400",
};

const categoryBgMap: Record<string, string> = {
  "Next.js": "bg-amber-400/10 border-amber-400/20",
  SEO: "bg-sky-400/10 border-sky-400/20",
  "E-commerce": "bg-orange-400/10 border-orange-400/20",
  CSS: "bg-violet-400/10 border-violet-400/20",
  Auth: "bg-pink-400/10 border-pink-400/20",
  TypeScript: "bg-blue-400/10 border-blue-400/20",
  Performance: "bg-emerald-400/10 border-emerald-400/20",
};

const quickLinks = [
  { label: "Tous les articles", href: "/blog" },
  { label: "Next.js", href: "/blog" },
  { label: "SEO Technique", href: "/blog" },
  { label: "E-commerce", href: "/blog" },
  { label: "Performance Web", href: "/blog" },
];

export default function BlogShowcase({
  posts = defaultPosts,
}: BlogShowcaseProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: 370, behavior: "smooth" });
  };

  return (
    <section className="py-32 bg-[#0b0b0b] border-t border-[#222222]">
      {/* En-tête façon Apple */}
      <div className="max-w-7xl mx-auto px-6 mb-10">
        <h2 className="text-2xl md:text-3xl font-bold text-white">
          Le blog.{" "}
          <span className="text-gray-400 font-normal">
            Insights techniques, tutoriels et retours d&apos;expérience.
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
          {posts.map((post) => {
            const categoryColor =
              categoryColorMap[post.category] ?? "text-amber-400";
            const categoryBg =
              categoryBgMap[post.category] ??
              "bg-amber-400/10 border-amber-400/20";

            return (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group snap-start shrink-0 w-72.5 md:w-82.5 rounded-3xl overflow-hidden bg-[#161616] border border-[#2a2a2a] hover:border-white/20 transition-all duration-300 hover:-translate-y-1 flex flex-col"
              >
                {/* Image */}
                {post.image ? (
                  <div className="relative h-44 overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-[#161616]/70 to-transparent" />
                  </div>
                ) : (
                  <div className="h-2 w-full bg-linear-to-r from-[#222] to-[#1a1a1a]" />
                )}

                {/* Contenu */}
                <div className="p-7 flex flex-col grow">
                  {/* Meta */}
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className={`inline-block px-2.5 py-1 text-[10px] font-bold tracking-widest uppercase border rounded-full ${categoryColor} ${categoryBg}`}
                    >
                      {post.category}
                    </span>
                    {post.readTime && (
                      <span className="flex items-center gap-1 text-[10px] text-gray-500 font-medium">
                        <Clock size={10} />
                        {post.readTime}
                      </span>
                    )}
                  </div>

                  <h3 className="text-[0.95rem] font-bold text-white leading-snug mb-3 group-hover:opacity-80 transition-opacity grow">
                    {post.title}
                  </h3>

                  <p className="text-sm text-gray-400 leading-relaxed line-clamp-2 mb-4">
                    {post.excerpt}
                  </p>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-[#232323]">
                    {post.date && (
                      <span className="text-[10px] text-gray-500">
                        {post.date}
                      </span>
                    )}
                    <div
                      className={`inline-flex items-center gap-1 text-xs font-semibold ${categoryColor} opacity-0 group-hover:opacity-100 transition-opacity ml-auto`}
                    >
                      Lire l&apos;article
                      <ArrowUpRight
                        size={13}
                        className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                      />
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}

          {/* Carte CTA */}
          <Link
            href="/blog"
            className="snap-start shrink-0 w-55 rounded-3xl overflow-hidden bg-[#161616] border border-[#2a2a2a] hover:border-amber-400/40 hover:bg-[#1a1a1a] transition-all flex flex-col items-center justify-center p-8 gap-4 text-center group"
          >
            <div className="w-12 h-12 rounded-full bg-amber-400/10 border border-amber-400/20 flex items-center justify-center group-hover:bg-amber-400/20 transition-colors">
              <ArrowUpRight size={20} className="text-amber-400" />
            </div>
            <p className="font-bold text-white text-sm leading-snug">
              Tous les
              <br />
              articles
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
          Thématiques
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
