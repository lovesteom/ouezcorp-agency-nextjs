import React from "react";
import type { Metadata } from "next";
import Hero from "@/components/Hero";
import ProjectsShowcase from "@/components/ProjectsShowcase";
import BlogShowcase from "@/components/BlogShowcase";
import JsonLd from "@/components/JsonLd";
import { getAllServices, getAllRealisations, getAllPosts } from "@/lib/api";
import { fallbackServices as canonicalServices } from "@/lib/services-data";
import Link from "next/link";
import {
  Code2,
  Search,
  LifeBuoy,
  PenTool,
  MonitorPlay,
  Video,
  Share2,
  ArrowUpRight,
  CheckCircle2,
  XCircle,
  Users,
  Clock,
  TrendingUp,
} from "lucide-react";

export const metadata: Metadata = {
  title: {
    absolute: "OuezCorp — Agence IT & Développement Web · Bénin",
  },
  description:
    "Agence digitale spécialisée en architecture Headless WordPress + Next.js, cybersécurité, cloud et SEO technique. Basés à Cotonou, on intervient partout en Afrique de l'Ouest.",
  alternates: {
    canonical: "https://ouezcorp.com",
  },
};

export const revalidate = 60;

const iconMap = [Code2, Search, LifeBuoy, PenTool, MonitorPlay, Video, Share2];

const methodItems = [
  { type: "bad", label: "Facturation horaire non previsible" },
  { type: "good", label: "Forfait fixe contracte des le depart" },
  { type: "bad", label: "Delai de livraison flou" },
  { type: "good", label: "Livraison garantie en 4 a 8 semaines" },
  { type: "bad", label: "Theme WordPress generique a 1 500 EUR" },
  { type: "good", label: "Architecture Headless sur-mesure" },
  { type: "bad", label: "Aucun reporting post-livraison" },
  { type: "good", label: "Dashboard Lighthouse + GA4 mensuel" },
  { type: "bad", label: "SAV inexistant apres remise du projet" },
  { type: "good", label: "Maintenance corrective 3 mois incluse" },
];

const trustSignals = [
  { icon: Users, value: "47+", label: "Clients satisfaits" },
  { icon: Clock, value: "4-8", label: "Semaines de livraison" },
  { icon: TrendingUp, value: "280%", label: "Trafic organique moyen" },
];

export default async function Home() {
  const [servicesRaw, realisationsRaw, postsRaw] = await Promise.all([
    getAllServices().catch(() => null),
    getAllRealisations().catch(() => null),
    getAllPosts().catch(() => null),
  ]);

  const services = (servicesRaw || []) as any[];
  const realisations = (realisationsRaw || []) as any[];
  const posts = (postsRaw || []) as any[];
  const serviceItems =
    services.length > 0 ? services.slice(0, 8) : canonicalServices.slice(0, 7);

  return (
    <div className="bg-(--bg)">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "OuezCorp",
          url: "https://ouezcorp.com",
          logo: "https://ouezcorp.com/logo.png",
          description:
            "Agence digitale spécialisée en architecture Headless WordPress + Next.js, cybersécurité, cloud et SEO technique.",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Cotonou",
            addressCountry: "BJ",
          },
          contactPoint: {
            "@type": "ContactPoint",
            contactType: "customer service",
            url: "https://ouezcorp.com/contact",
          },
          sameAs: [],
        }}
      />
      <Hero />

      {/* Trust signals */}
      <section className="py-14 bg-(--bg-2) border-y border-(--border)">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
            {trustSignals.map(({ icon: Icon, value, label }) => (
              <div key={label} className="text-center group">
                <div className="w-10 h-10 mx-auto mb-3 rounded-xl bg-(--accent-subtle) border border-(--accent-border) flex items-center justify-center text-(--accent) group-hover:scale-110 transition-transform duration-200">
                  <Icon size={18} />
                </div>
                <div className="text-2xl font-bold text-(--fg) mb-1">
                  {value}
                </div>
                <div className="text-xs text-(--fg-3)">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Approche */}
      <section className="py-28 bg-(--bg) overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-widest text-(--accent) mb-5">
                Notre Approche
              </p>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-(--fg) tracking-tight leading-[1.06] mb-6">
                Exit les prestataires IT qui disparaissent apres livraison.
              </h2>
              <p className="text-(--fg-2) leading-relaxed text-base max-w-md mb-8">
                <strong className="text-(--fg) font-semibold">
                  A chaque besoin sa solution.
                </strong>{" "}
                Trop de prestataires facturent a l heures et livrent des sites
                non securises. Nous construisons des solutions sur mesure qui
                performent, protegent vos donnees et generent de la valeur.
              </p>
              <Link
                href="/contact"
                className="btn btn-primary px-7 py-3 text-sm"
              >
                Discutons de votre projet <ArrowUpRight size={15} />
              </Link>
            </div>

            {/* Desktop floating cards */}
            <div className="relative h-120 hidden md:block">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-(--accent-subtle) rounded-full blur-[70px] pointer-events-none" />
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
                    className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl border text-sm font-medium max-w-57.5 backdrop-blur-sm transition-all duration-300 hover:scale-[1.03] hover:z-10 cursor-default ${item.type === "good" ? "bg-(--accent-subtle) border-(--accent-border) text-(--fg)" : "bg-(--bg-card) border-(--border) text-(--fg-3) line-through opacity-60"}`}
                  >
                    {item.type === "good" ? (
                      <CheckCircle2
                        size={14}
                        className="text-(--accent) shrink-0"
                      />
                    ) : (
                      <XCircle size={14} className="text-(--fg-3) shrink-0" />
                    )}
                    <span className="truncate">{item.label}</span>
                  </div>
                );
              })}
            </div>

            {/* Mobile list */}
            <div className="grid gap-2 md:hidden">
              {methodItems.map((item, i) => (
                <div
                  key={i}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl border text-sm font-medium ${item.type === "good" ? "bg-(--accent-subtle) border-(--accent-border) text-(--fg)" : "bg-(--bg-card) border-(--border) text-(--fg-3) line-through opacity-60"}`}
                >
                  {item.type === "good" ? (
                    <CheckCircle2
                      size={14}
                      className="text-(--accent) shrink-0"
                    />
                  ) : (
                    <XCircle size={14} className="text-(--fg-3) shrink-0" />
                  )}
                  {item.label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-28 bg-(--bg-2) border-t border-(--border)">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-widest text-(--accent) mb-4">
                Nos Expertises
              </p>
              <h2 className="text-4xl md:text-5xl font-bold text-(--fg) tracking-tight leading-tight">
                Ce que nous faisons <br />
                <span className="text-(--fg-3)">le mieux.</span>
              </h2>
            </div>
            <Link
              href="/services"
              className="flex items-center gap-1.5 text-sm font-semibold text-(--fg-2) hover:text-(--fg) transition-colors group whitespace-nowrap"
            >
              Tous nos services{" "}
              <ArrowUpRight
                size={15}
                className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
              />
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {serviceItems.map((item: any, index: number) => {
              const Icon =
                item.icon ?? iconMap[index % iconMap.length];
              return (
                <Link
                  key={item.slug}
                  href={`/services/${item.slug}`}
                  className="card-interactive group p-7 rounded-2xl"
                >
                  <div className="w-10 h-10 mb-5 flex items-center justify-center rounded-xl bg-(--accent-subtle) border border-(--accent-border) text-(--accent) group-hover:scale-110 transition-transform duration-200">
                    <Icon size={18} />
                  </div>
                  <h3 className="text-sm font-bold text-(--fg) mb-3 group-hover:text-(--accent) transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-(--fg-2) text-sm leading-relaxed">
                    {item.excerpt?.replace(/<[^>]*>/g, "")}
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <ProjectsShowcase
        projects={
          realisations.length > 0
            ? realisations.slice(0, 5).map((r: any, i: number) => ({
                slug: r.slug,
                title: r.title,
                excerpt:
                  r.excerpt?.replace(/<[^>]*>/g, "") ||
                  "Projet realise sur mesure.",
                category: r.tags
                  ? (() => {
                      try {
                        const t = JSON.parse(r.tags);
                        return t[0] || "Realisation";
                      } catch {
                        return "Realisation";
                      }
                    })()
                  : "Realisation",
                image: r.featuredImage,
                accent: ["amber", "blue", "violet", "orange", "pink"][i % 5],
              }))
            : undefined
        }
      />

      <BlogShowcase
        posts={
          posts.length > 0
            ? posts.slice(0, 5).map((p: any) => ({
                slug: p.slug,
                title: p.title,
                excerpt: p.excerpt?.replace(/<[^>]*>/g, "") || "",
                category: p.categories
                  ? (() => {
                      try {
                        const c = JSON.parse(p.categories);
                        return c[0] || "Blog";
                      } catch {
                        return "Blog";
                      }
                    })()
                  : "Blog",
                image: p.featuredImage,
                date: p.publishedAt
                  ? new Date(p.publishedAt).toLocaleDateString("fr-FR", {
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
