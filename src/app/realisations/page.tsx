import { getAllRealisations } from "@/lib/api";
import Card from "@/components/Card";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nos Réalisations — OuezCorp",
  description: "Découvrez nos projets web et applications sur-mesure.",
};

export const revalidate = 60;

export default async function RealisationsPage() {
  const realisations = (await getAllRealisations()) || [];

  return (
    <div className="bg-(--bg) min-h-screen pt-28">
      {/* Hero */}
      <section className="py-32 border-b border-(--border)">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-amber-400 text-xs font-bold uppercase tracking-widest mb-6">
            Portfolio
          </p>
          <div className="grid md:grid-cols-2 gap-8 items-end">
            <h1 className="text-5xl md:text-7xl font-bold text-(--fg) tracking-tight leading-[0.92]">
              Nos projets
              <br />
              signatures.
            </h1>
            <p className="text-(--fg-2) text-lg leading-relaxed max-w-md">
              Chaque projet est une collaboration unique. Voici quelques
              réalisations dont nous sommes fiers.
            </p>
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          {/* Chiffres clés */}
          <div className="grid grid-cols-3 gap-4 mb-14">
            {[
              { value: "47+", label: "Projets livrés" },
              { value: "12", label: "Secteurs couverts" },
              { value: "4.9/5", label: "Note client moyenne" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="p-6 bg-(--bg-card) border border-(--border) rounded-2xl text-center"
              >
                <div className="text-3xl font-bold text-(--fg) mb-1">
                  {stat.value}
                </div>
                <div className="text-xs text-(--fg-2)">{stat.label}</div>
              </div>
            ))}
          </div>
          {realisations.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-6">
              {realisations.map((realisation: any) => (
                <Card
                  key={realisation.slug}
                  title={realisation.title}
                  description={
                    realisation.excerpt?.replace(/<[^>]*>/g, "") ||
                    "Projet réalisé avec passion."
                  }
                  image={realisation.featuredImage?.node?.sourceUrl}
                  url={`/realisations/${realisation.slug}`}
                />
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              <Card
                title="E-commerce Mode & Luxe"
                description="Migration WooCommerce Headless vers Next.js 15. Temps de chargement 8 s → 2,4 s. Taux de conversion +42 % dès le premier mois."
                category="E-commerce"
                url="/contact"
                className="min-h-70"
              />
              <Card
                title="Site Corporate Multilingue"
                description="Architecture FR/EN/DE avec next-intl et WordPress WPML. Score Lighthouse 97/100. 3 langues déployées en 6 semaines."
                category="Site Vitrine"
                url="/contact"
                className="min-h-70"
              />
              <Card
                title="Marketplace B2B SaaS"
                description="Plateforme B2B avec auth multi-rôles NextAuth.js, tableau de bord acheteur et 1 200+ références produits synchronisées en temps réel."
                category="Application Web"
                url="/contact"
                className="min-h-70"
              />
              <Card
                title="Refonte Cabinet Conseil"
                description="Refonte complète avec blog headless, formulaires dynamiques et intégration CRM. Trafic organique +280 % en 4 mois post-lancement."
                category="SEO & Performance"
                url="/contact"
                className="min-h-70"
              />
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
