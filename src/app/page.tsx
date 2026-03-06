import React from "react";
import Hero from "@/components/Hero";
import ProjectsShowcase from "@/components/ProjectsShowcase";
import BlogShowcase from "@/components/BlogShowcase";
import { getAllServices, getAllRealisations, getAllPosts } from "@/lib/api";
import Link from "next/link";
import {
  Code2,
  ShoppingCart,
  Search,
  Globe,
  Palette,
  Zap,
  ArrowUpRight,
  CheckCircle2,
  XCircle,
} from "lucide-react";

export const revalidate = 60;

const iconMap = [Code2, ShoppingCart, Search, Globe, Palette, Zap];

const fallbackServices = [
  {
    slug: "DeveloppementWeb",
    title: "Développement Web",
    excerpt:
      "WordPress sur mesure, React JS et Next.js. Sites rapides, responsives et optimisés. Déploiement clé en main avec hébergement sécurisé inclus.",
  },
  {
    slug: "ecommerce",
    title: "E-commerce sur mesure",
    excerpt:
      "WooCommerce optimisé pour le marché africain. Paiement mobile money, stocks en temps réel. Taux de conversion boosté dès le lancement.",
  },
  {
    slug: "seo",
    title: "SEO & Visibilité",
    excerpt:
      "Audit technique, optimisation Core Web Vitals, référencement local Bénin/Afrique de l'Ouest. Rapport mensuel des positions inclus.",
  },
  {
    slug: "it-managed",
    title: "IT Managé & Cloud",
    excerpt:
      "Gestion complète de votre infrastructure IT, cloud sécurisé, sauvegardes automatisées et support 24/7. Optimisation des coûts et performance garantie.",
  },
  {
    slug: "cybersecurity-audit",
    title: "Cybersécurité & Audit IT",
    excerpt:
      "Audit complet de votre infrastructure IT, tests de pénétration, conformité aux normes de sécurité. Protection proactive contre les menaces et vulnérabilités.",
  },
  {
    slug: "maintenance-support",
    title: "Maintenance & Support",
    excerpt:
      "Maintenance corrective et évolutive, mises à jour, sauvegardes automatiques. Support réactif sous 24h.",
  },
];

const methodItems = [
  { type: "bad", label: "Facturation horaire non prévisible" },
  { type: "good", label: "Forfait fixe contracté dès le départ" },
  { type: "bad", label: "Délai de livraison flou" },
  { type: "good", label: "Livraison garantie en 4 à 8 semaines" },
  { type: "bad", label: "Thème WordPress générique à 1 500 €" },
  { type: "good", label: "Architecture Headless sur-mesure" },
  { type: "bad", label: "Aucun reporting post-livraison" },
  { type: "good", label: "Dashboard Lighthouse + GA4 mensuel" },
  { type: "bad", label: "SAV inexistant après remise du projet" },
  { type: "good", label: "Maintenance corrective 3 mois incluse" },
];

export default async function Home() {
  // Fetch tout en parallèle, sans Suspense (évite le streaming React / TransformStream)
  const [servicesRaw, realisationsRaw, postsRaw] = await Promise.all([
    getAllServices().catch(() => null),
    getAllRealisations().catch(() => null),
    getAllPosts().catch(() => null),
  ]);

  const services = (servicesRaw || []) as any[];
  const realisations = (realisationsRaw || []) as any[];
  const posts = (postsRaw || []) as any[];
  const serviceItems =
    services.length > 0 ? services.slice(0, 6) : fallbackServices;

  return (
    <div className="bg-[#0b0b0b]">
      <Hero />

      {/* Section Approche */}
      <section className="py-32 bg-[#0e0e0e] border-t border-[#222222] overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 md:gap-0 items-center">
            {/* Left — texte */}
            <div className="md:pr-16">
              <p className="text-amber-400 text-xs font-bold uppercase tracking-widest mb-5">
                Notre Approche
              </p>
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-[1.04] mb-6">
                Exit les prestataires IT<br /> qui disparaissent après livraison.
              </h2>
              <p className="text-gray-300 leading-relaxed text-base max-w-md">
                <strong className="text-white font-semibold">
                  À chaque besoin sa solution.
                </strong>{" "}
               Trop de prestataires facturent à l'heure et livrent des sites ou des infrastructures non sécurisées. Nous construisons des solutions sur mesure qui performent, protègent vos données et génèrent de la valeur dès le premier mois.
              </p>
            </div>

            {/* Right — cartes flottantes (desktop) */}
            <div className="relative h-[500px] hidden md:block">
              {/* Halo ambiant */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-400/5 rounded-full blur-[90px] pointer-events-none" />

              {(
                [
                  { top: "2%", left: "10%", rotate: "-5deg" },
                  { top: "0%", left: "52%", rotate: "4deg" },
                  { top: "20%", left: "-1%", rotate: "2deg" },
                  { top: "18%", right: "0%", rotate: "-3deg" },
                  { top: "39%", left: "14%", rotate: "-4deg" },
                  { top: "37%", left: "54%", rotate: "5deg" },
                  { top: "58%", left: "1%", rotate: "1deg" },
                  { top: "56%", right: "3%", rotate: "-4deg" },
                  { top: "76%", left: "12%", rotate: "3deg" },
                  { top: "74%", right: "0%", rotate: "-3deg" },
                ] as React.CSSProperties[]
              ).map((pos, i) => {
                const { rotate, ...posStyle } = pos as any;
                const item = methodItems[i];
                return (
                  <div
                    key={i}
                    style={{
                      position: "absolute",
                      ...posStyle,
                      transform: `rotate(${rotate})`,
                    }}
                    className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl border text-sm font-medium max-w-[230px] backdrop-blur-sm ${
                      item.type === "good"
                        ? "bg-amber-400/10 border-amber-400/25 text-white shadow-[0_4px_28px_rgba(251,191,36,0.13)]"
                        : "bg-[#111]/80 border-[#272727] text-gray-600 line-through decoration-gray-700"
                    }`}
                  >
                    {item.type === "good" ? (
                      <CheckCircle2
                        size={14}
                        className="text-amber-400 shrink-0"
                      />
                    ) : (
                      <XCircle size={14} className="text-gray-700 shrink-0" />
                    )}
                    <span className="truncate">{item.label}</span>
                  </div>
                );
              })}
            </div>

            {/* Right — liste simple (mobile) */}
            <div className="grid gap-2.5 md:hidden">
              {methodItems.map((item, i) => (
                <div
                  key={i}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl border text-sm font-medium ${
                    item.type === "good"
                      ? "bg-amber-400/8 border-amber-400/30 text-white"
                      : "bg-[#161616] border-[#2a2a2a] text-gray-500 line-through decoration-gray-600"
                  }`}
                >
                  {item.type === "good" ? (
                    <CheckCircle2
                      size={14}
                      className="text-amber-400 shrink-0"
                    />
                  ) : (
                    <XCircle size={14} className="text-gray-600 shrink-0" />
                  )}
                  {item.label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section Services */}
      <section className="py-32 bg-[#0b0b0b]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <p className="text-amber-400 text-xs font-bold uppercase tracking-widest mb-4">
                Nos Expertises
              </p>
              <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tight leading-tight">
                Ce que nous
                <br />
                faisons le mieux.
              </h2>
            </div>
            <Link
              href="/services"
              className="flex items-center gap-1.5 text-sm font-semibold text-gray-400 hover:text-white transition-colors group whitespace-nowrap"
            >
              Tous nos services
              <ArrowUpRight
                size={15}
                className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
              />
            </Link>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {serviceItems.map((item: any, index: number) => {
              const Icon = iconMap[index % iconMap.length];
              return (
                <div
                  key={item.slug}
                  className="group p-8 bg-[#161616] border border-[#2a2a2a] rounded-2xl hover:border-amber-400/50 transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="w-10 h-10 mb-6 flex items-center justify-center rounded-xl bg-amber-400/10 text-amber-400">
                    <Icon size={19} />
                  </div>
                  <h3 className="text-base font-bold text-white mb-3 group-hover:text-amber-400 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {item.excerpt?.replace(/<[^>]*>/g, "")}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Section Réalisations — style Apple horizontal scroll */}
      <ProjectsShowcase
        projects={
          realisations.length > 0
            ? realisations.slice(0, 5).map((r: any, i: number) => ({
                slug: r.slug,
                title: r.title,
                excerpt:
                  r.excerpt?.replace(/<[^>]*>/g, "") ||
                  "Projet réalisé sur mesure.",
                category: r.categories?.nodes?.[0]?.name || "Réalisation",
                image: r.featuredImage?.node?.sourceUrl,
                accent: ["lime", "blue", "violet", "orange", "pink"][i % 5],
              }))
            : undefined
        }
      />

      {/* Section Blog — style Apple horizontal scroll */}
      <BlogShowcase
        posts={
          posts.length > 0
            ? posts.slice(0, 5).map((p: any) => ({
                slug: p.slug,
                title: p.title,
                excerpt: p.excerpt?.replace(/<[^>]*>/g, "") || "",
                category:
                  p.categories?.nodes?.[0]?.name ||
                  p.tags?.nodes?.[0]?.name ||
                  "Blog",
                image: p.featuredImage?.node?.sourceUrl,
                date: p.date
                  ? new Date(p.date).toLocaleDateString("fr-FR", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })
                  : undefined,
              }))
            : undefined
        }
      />
    </div>
  );
}
