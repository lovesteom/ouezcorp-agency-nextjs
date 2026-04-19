import { getServiceBySlug, getAllServices } from "@/lib/api";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, CheckCircle2 } from "lucide-react";

interface PageProps {
  params: {
    slug: string;
  };
}

export const revalidate = 60;

export async function generateStaticParams() {
  const services = (await getAllServices()) || [];
  return services.map((service: any) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const service = await getServiceBySlug(params.slug);
  if (!service) return {};

  return {
    title: service.seo?.title || service.title,
    description: service.seo?.metaDesc || service.excerpt,
  };
}

export default async function ServicePage({ params }: PageProps) {
  const service = await getServiceBySlug(params.slug);

  if (!service) {
    notFound();
  }

  return (
    <div className="bg-(--bg) min-h-screen pt-32 pb-24 overflow-hidden relative">
      {/* Decorative ambient background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-amber-400/10 rounded-[100%] blur-[120px] pointer-events-none" />

      <article className="max-w-4xl mx-auto px-6 relative z-10">
        {/* Navigation Retour */}
        <Link
          href="/services"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#2a2a2a] bg-black/80 backdrop-blur-md text-sm text-gray-400 hover:text-white hover:border-amber-400/40 hover:bg-amber-400/10 transition-all duration-300 mb-16 group"
        >
          <ArrowLeft
            size={16}
            className="group-hover:-translate-x-1 transition-transform text-amber-400"
          />
          Retour aux services
        </Link>

        {/* Hero Service */}
        <div className="mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md border border-amber-400/20 bg-amber-400/10 text-amber-400 text-xs font-bold uppercase tracking-widest mb-6 shadow-[0_4px_28px_rgba(251,191,36,0.1)]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
            </span>
            Service Expert
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-(--fg) tracking-tight leading-tight mb-6">
            {service.title}
          </h1>
          {service.excerpt && (
            <p className="text-xl text-(--fg-2) max-w-2xl leading-relaxed">
              {service.excerpt.replace(/<[^>]*>/g, "")}
            </p>
          )}
        </div>

        {/* Image / Cover */}
        {service.featuredImage?.node?.sourceUrl && (
          <div className="relative h-[400px] md:h-[500px] w-full mb-20 rounded-3xl overflow-hidden border border-[#2a2a2a] group">
            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
            <Image
              src={service.featuredImage.node.sourceUrl}
              alt={service.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              priority
            />
          </div>
        )}

        {/* Contenu Riche */}
        <div className="bg-(--bg-card) border border-(--border) rounded-3xl p-8 md:p-14 shadow-2xl mb-20">
          <div
            className="prose prose-lg max-w-none prose-headings:font-bold prose-headings:text-(--fg) prose-headings:tracking-tight prose-a:text-(--accent) hover:prose-a:text-(--accent-hover) prose-strong:text-(--fg) prose-strong:font-semibold prose-p:text-(--fg-2) prose-p:leading-relaxed prose-li:text-(--fg-2) prose-code:text-(--accent) prose-code:bg-(--accent-subtle) prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded"
            dangerouslySetInnerHTML={{ __html: service.content }}
          />
        </div>

        {/* CTA B2B Premium */}
        <div className="group relative overflow-hidden bg-(--bg-card) border border-(--border) hover:border-(--accent-border) rounded-3xl transition-all duration-300 hover:shadow-[0_12px_40px_rgba(251,191,36,0.08)]">
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-400/10 rounded-full blur-[80px] group-hover:bg-amber-400/15 transition-colors duration-500 pointer-events-none" />

          <div className="relative p-10 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-xl">
              <h3 className="text-2xl md:text-3xl font-bold text-(--fg) mb-4 group-hover:text-(--accent) transition-colors">
                Prêt à intégrer ce service à votre stratégie ?
              </h3>
              <p className="text-(--fg-2) text-base mb-6">
                Nos experts sont disponibles pour évaluer vos besoins techniques
                et construire une solution sur mesure.
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-(--fg-2)">
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-amber-400" />
                  Audit Gratuit
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-amber-400" />
                  Livraison Rapide
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-amber-400" />
                  Support Stratégique
                </li>
              </ul>
            </div>

            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-amber-400 hover:bg-amber-300 text-black font-bold rounded-full transition-all duration-300 whitespace-nowrap text-base shadow-[0_4px_20px_rgba(251,191,36,0.3)] hover:shadow-[0_8px_32px_rgba(251,191,36,0.5)] hover:-translate-y-1 shrink-0 w-full md:w-auto"
            >
              Contactez-nous <ArrowUpRight size={18} />
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}
