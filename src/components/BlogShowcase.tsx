"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight, ArrowUpRight, Clock } from "lucide-react";

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

const categoryStyles: Record<
  string,
  { text: string; bg: string; border: string }
> = {
  "Next.js": {
    text: "text-amber-400",
    bg: "bg-amber-400/10",
    border: "border-amber-400/20",
  },
  SEO: {
    text: "text-sky-400",
    bg: "bg-sky-400/10",
    border: "border-sky-400/20",
  },
  "E-commerce": {
    text: "text-orange-400",
    bg: "bg-orange-400/10",
    border: "border-orange-400/20",
  },
  CSS: {
    text: "text-violet-400",
    bg: "bg-violet-400/10",
    border: "border-violet-400/20",
  },
  Auth: {
    text: "text-pink-400",
    bg: "bg-pink-400/10",
    border: "border-pink-400/20",
  },
  TypeScript: {
    text: "text-blue-400",
    bg: "bg-blue-400/10",
    border: "border-blue-400/20",
  },
  Performance: {
    text: "text-emerald-400",
    bg: "bg-emerald-400/10",
    border: "border-emerald-400/20",
  },
};

const quickLinks = [
  { label: "Tous les articles", href: "/blog" },
  { label: "Next.js", href: "/blog" },
  { label: "SEO Technique", href: "/blog" },
  { label: "Performance Web", href: "/blog" },
];

export default function BlogShowcase({
  posts = defaultPosts,
}: BlogShowcaseProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    scrollRef.current?.scrollBy({
      left: dir === "right" ? 360 : -360,
      behavior: "smooth",
    });
  };

  return (
    <section className="py-28 bg-(--bg) border-t border-(--border)">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 mb-10 flex items-end justify-between gap-4">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-widest text-(--accent) mb-3">
            Blog
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-(--fg)">
            Insights &amp; Tutoriels.{" "}
            <span className="text-(--fg-3) font-normal">
              Expertise technique partagée.
            </span>
          </h2>
        </div>
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
          {posts.map((post) => {
            const cat =
              categoryStyles[post.category] ?? categoryStyles["Next.js"];
            return (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="card-interactive group snap-start shrink-0 w-72 md:w-80 rounded-2xl overflow-hidden flex flex-col"
              >
                {/* Image */}
                {post.image ? (
                  <div className="relative h-44 overflow-hidden shrink-0">
                    <Image
                      src={post.image}
                      alt={post.title}
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
                  <div className={`h-1.5 w-full ${cat.bg}`} />
                )}

                {/* Contenu */}
                <div className="p-6 flex flex-col grow">
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className={`inline-flex px-2.5 py-1 text-[10px] font-bold tracking-widest uppercase
                      border rounded-full ${cat.text} ${cat.bg} ${cat.border}`}
                    >
                      {post.category}
                    </span>
                    {post.readTime && (
                      <span className="flex items-center gap-1 text-[10px] text-(--fg-3)">
                        <Clock size={10} /> {post.readTime}
                      </span>
                    )}
                  </div>

                  <h3
                    className="text-sm font-bold text-(--fg) leading-snug mb-3
                    group-hover:text-(--accent) transition-colors grow"
                  >
                    {post.title}
                  </h3>
                  <p className="text-xs text-(--fg-2) leading-relaxed line-clamp-2 mb-4">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-(--border)">
                    {post.date && (
                      <span className="text-[10px] text-(--fg-3)">
                        {post.date}
                      </span>
                    )}
                    <div
                      className={`inline-flex items-center gap-1 text-xs font-semibold ${cat.text}
                      opacity-0 group-hover:opacity-100 transition-opacity ml-auto`}
                    >
                      Lire l&apos;article <ArrowUpRight size={12} />
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}

          {/* CTA card */}
          <Link
            href="/blog"
            className="card-interactive group snap-start shrink-0 w-52 rounded-2xl
              flex flex-col items-center justify-center p-8 gap-4 text-center
              hover:border-(--accent-border) transition-all duration-200 hover:-translate-y-1"
          >
            <div
              className="w-11 h-11 rounded-full bg-(--accent-subtle) border border-(--accent-border)
              flex items-center justify-center group-hover:bg-(--accent-subtle) transition-colors"
            >
              <ArrowUpRight size={18} className="text-(--accent)" />
            </div>
            <p className="font-bold text-(--fg) text-sm leading-snug">
              Tous les articles
            </p>
          </Link>
        </div>
      </div>

      {/* Thématiques */}
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
