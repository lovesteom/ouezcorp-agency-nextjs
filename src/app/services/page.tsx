import { getAllServices } from "@/lib/api";
import Link from "next/link";
import { Metadata } from "next";
import {
  Code2,
  ShoppingCart,
  Search,
  Globe,
  Palette,
  Zap,
  ArrowUpRight,
  Timer,
  BarChart3,
  Shield,
  Layers,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Nos Services â€” OuezCorp",
  description:
    "DÃ©veloppement Headless Next.js & WordPress, e-commerce sur mesure, SEO technique, UI/UX Design. Livraison en 4 Ã  8 semaines, score Lighthouse > 95.",
};

export const revalidate = 60;

const iconMap = [Code2, ShoppingCart, Search, Globe, Palette, Zap];

const fallbackServices = [
  {
    slug: "headless",
    title: "DÃ©veloppement Headless",
    excerpt:
      "Architecture dÃ©couplÃ©e Next.js 15 (App Router) + WordPress via WPGraphQL. Server Components, ISR, Edge Rendering. Chargement < 1Â s, score Lighthouse > 95 garanti.",
    tags: ["Next.js 15", "WordPress", "WPGraphQL", "TypeScript"],
  },
  {
    slug: "ecommerce",
    title: "E-commerce sur mesure",
    excerpt:
      "Boutiques haute performance avec WooCommerce Headless ou Shopify Storefront API. Panier optimiste, Stripe, stocks temps rÃ©el. Taux de conversion +28Â % en moyenne.",
    tags: ["WooCommerce", "Shopify", "Stripe", "Next.js"],
  },
  {
    slug: "seo",
    title: "SEO Technique",
    excerpt:
      "Audit Core Web Vitals, structured data Schema.org, sitemap dynamique, hreflang, Next/Image optimisÃ©. Rapport mensuel des positions et actions correctives inclus.",
    tags: ["Core Web Vitals", "Schema.org", "GA4", "Search Console"],
  },
  {
    slug: "international",
    title: "Sites Multilingues",
    excerpt:
      "Internationalisation avec next-intl, routing par locale, traductions WPML/Polylang, hreflang configurÃ©. Compatible 20+ langues, SEO local inclus.",
    tags: ["next-intl", "WPML", "i18next", "hreflang"],
  },
  {
    slug: "design",
    title: "UI/UX Design",
    excerpt:
      "Design System Figma â†’ Storybook, composants accessibles WCAG 2.1 AA, animations Framer Motion. Prototype validÃ© avec vous avant le moindre dÃ©veloppement.",
    tags: ["Figma", "Storybook", "Framer Motion", "WCAG 2.1"],
  },
];

const processSteps = [
  {
    number: "01",
    title: "DÃ©couverte",
    description:
      "Audit de l'existant, benchmark concurrentiel, dÃ©finition des KPIs. LivrableÂ : cahier des charges technique. DurÃ©eÂ : 3â€“5 jours ouvrÃ©s.",
  },
  {
    number: "02",
    title: "Architecture & Design",
    description:
      "Choix du stack, wireframes fonctionnels, Design System Figma complet. Chaque Ã©cran est validÃ© avec vous avant le moindre code.",
  },
  {
    number: "03",
    title: "DÃ©veloppement",
    description:
      "Sprints bi-hebdomadaires, tests E2E Playwright, CI/CD GitHub Actions. AccÃ¨s Ã  l'environnement de staging dÃ¨s la premiÃ¨re semaine.",
  },
  {
    number: "04",
    title: "DÃ©ploiement & Suivi",
    description:
      "Mise en production Vercel ou serveur dÃ©diÃ©, monitoring Sentry, rapport mensuel des mÃ©triques de trafic et de performance.",
  },
];

const techStack = [
  "Next.js 15",
  "React 19",
  "TypeScript 5",
  "Tailwind CSS v4",
  "WordPress 6",
  "WPGraphQL",
  "Vercel Edge",
  "Prisma ORM",
  "Stripe API",
  "Framer Motion",
  "Playwright",
  "Sentry",
];

const advantages = [
  { icon: Timer, label: "Livraison en 4 Ã  8 semaines" },
  { icon: BarChart3, label: "ROI mesurable dÃ¨s le 1er mois" },
  { icon: Shield, label: "Code source livrÃ© & documentÃ©" },
  { icon: Layers, label: "Architecture scalable long terme" },
];

export default async function ServicesPage() {
  const services = (await getAllServices()) || [];
  const isFallback = services.length === 0;
  const items = isFallback ? fallbackServices : services;

  return (
    <div className="bg-(--bg) min-h-screen pt-28">
      {/* Hero */}
      <section className="py-32 border-b border-(--border)">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-amber-400 text-xs font-bold uppercase tracking-widest mb-6">
            Nos Expertises
          </p>
          <div className="grid md:grid-cols-2 gap-12 items-end mb-16">
            <h1 className="text-5xl md:text-7xl font-bold text-(--fg) tracking-tight leading-[0.92]">
              Des solutions
              <br />
              web taillÃ©es
              <br />
              pour performer.
            </h1>
            <div>
              <p className="text-(--fg-2) text-lg leading-relaxed max-w-md mb-10">
                Nous n&apos;essayons pas de tout faire. Nous excellons dans
                l&apos;architecture Headless, l&apos;e-commerce haute
                performance et le SEO technique â€” lÃ  oÃ¹ l&apos;expertise
                fait vraiment la diffÃ©rence.
              </p>
              <div className="grid grid-cols-3 gap-6 pt-8 border-t border-(--border)">
                {[
                  { value: "< 1 s", label: "Chargement moyen" },
                  { value: "95+", label: "Score Lighthouse" },
                  { value: "8 sem.", label: "DÃ©lai de livraison" },
                ].map((stat) => (
                  <div key={stat.label}>
                    <div className="text-2xl font-bold text-(--fg)">
                      {stat.value}
                    </div>
                    <div className="text-xs text-(--fg-2) mt-0.5">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* Avantages */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {advantages.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-3 px-4 py-3 bg-(--bg-card) border border-(--border) rounded-xl"
              >
                <Icon size={15} className="text-amber-400 shrink-0" />
                <span className="text-xs text-(--fg-2) font-medium">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {items.map((service: any, index: number) => {
              const Icon = iconMap[index % iconMap.length];
              const tags = isFallback
                ? service.tags
                : fallbackServices[index]?.tags || [];
              return (
                <div
                  key={service.slug}
                  className="group p-8 bg-(--bg-card) border border-(--border) rounded-2xl hover:border-(--accent-border) transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_12px_40px_rgba(251,191,36,0.08)] flex flex-col"
                >
                  <div className="w-10 h-10 mb-6 flex items-center justify-center rounded-xl bg-amber-400/10 text-amber-400">
                    <Icon size={19} />
                  </div>
                  <h3 className="text-base font-bold text-(--fg) mb-3 group-hover:text-amber-400 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-(--fg-2) text-sm leading-relaxed mb-5 grow">
                    {service.excerpt?.replace(/<[^>]*>/g, "") ||
                      service.description}
                  </p>
                  {tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {tags.map((tag: string) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 text-[10px] font-semibold text-(--fg-2) bg-(--bg) border border-(--border) rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                  {!isFallback && (
                    <Link
                      href={`/services/${service.slug}`}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-(--fg-2) group-hover:text-amber-400 transition-colors"
                    >
                      En savoir plus <ArrowUpRight size={13} />
                    </Link>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Notre Processus */}
      <section className="py-24 bg-(--bg-2) border-t border-(--border)">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-14">
            <p className="text-amber-400 text-xs font-bold uppercase tracking-widest mb-4">
              MÃ©thodologie
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-(--fg) tracking-tight leading-tight">
              Comment nous
              <br />
              travaillons.
            </h2>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {processSteps.map((step) => (
              <div key={step.number}>
                <div className="flex items-center gap-3 mb-5">
                  <span className="text-xs font-bold text-amber-400 tabular-nums">
                    {step.number}
                  </span>
                  <div className="h-px flex-1 bg-(--border)" />
                </div>
                <h3 className="text-(--fg) font-bold text-base mb-3">
                  {step.title}
                </h3>
                <p className="text-(--fg-2) text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stack Technique */}
      <section className="py-20 border-t border-(--border)">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-start gap-12">
            <div className="shrink-0 md:w-56">
              <p className="text-amber-400 text-xs font-bold uppercase tracking-widest mb-3">
                Stack Technique
              </p>
              <h2 className="text-2xl font-bold text-(--fg) leading-tight">
                Technologies
                <br />
                maÃ®trisÃ©es.
              </h2>
            </div>
            <div className="flex flex-wrap gap-2.5">
              {techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-4 py-2 text-xs font-semibold text-(--fg-2) bg-(--bg-card) border border-(--border) rounded-full hover:border-(--accent-border) hover:text-(--fg) transition-colors"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA B2B Premium */}
      <section className="py-24 border-t border-(--border)">
        <div className="max-w-7xl mx-auto px-6">
          <div className="group relative overflow-hidden bg-(--bg-card) border border-(--border) hover:border-(--accent-border) rounded-3xl transition-all duration-300 hover:shadow-[0_12px_40px_rgba(251,191,36,0.08)] p-12 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-amber-400/10 rounded-full blur-[100px] group-hover:bg-amber-400/10 transition-colors duration-500 pointer-events-none" />
            <div className="relative z-10 max-w-xl">
              <h2 className="text-3xl md:text-4xl font-bold text-(--fg) mb-4 group-hover:text-amber-400 transition-colors">
                Vous avez un projet en tÃªte ?
              </h2>
              <p className="text-(--fg-2) text-sm md:text-base leading-relaxed">
                Premier Ã©change gratuit â€” 30 min pour analyser votre
                situation et vous proposer une approche concrÃ¨te, sans
                engagement.
              </p>
            </div>
            <Link
              href="/contact"
              className="relative z-10 inline-flex items-center gap-2 px-8 py-4 bg-amber-400 hover:bg-amber-300 text-black font-bold rounded-full transition-all duration-300 whitespace-nowrap shrink-0 shadow-[0_4px_20px_rgba(251,191,36,0.3)] hover:shadow-[0_8px_32px_rgba(251,191,36,0.5)] hover:-translate-y-1"
            >
              DÃ©marrer l&apos;Ã©change <ArrowUpRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
