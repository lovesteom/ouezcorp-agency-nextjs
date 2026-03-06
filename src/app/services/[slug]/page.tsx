import { getServiceBySlug, getAllServices } from "@/lib/api";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

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
    <div className="bg-[#0b0b0b] min-h-screen pt-20">
      <article className="max-w-4xl mx-auto px-6 py-24">
        {/* Retour */}
        <Link
          href="/services"
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-white transition-colors mb-14 group"
        >
          <ArrowLeft
            size={15}
            className="group-hover:-translate-x-1 transition-transform"
          />
          Retour aux services
        </Link>

        {/* Tag + Titre */}
        <p className="text-amber-400 text-xs font-bold uppercase tracking-widest mb-4">
          Service
        </p>
        <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight leading-tight mb-12">
          {service.title}
        </h1>

        {/* Image */}
        {service.featuredImage?.node?.sourceUrl && (
          <div className="relative h-[400px] w-full mb-14 rounded-2xl overflow-hidden border border-[#2a2a2a]">
            <Image
              src={service.featuredImage.node.sourceUrl}
              alt={service.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* Contenu */}
        <div
          className="prose prose-invert prose-lg max-w-none prose-headings:font-bold prose-headings:text-white prose-headings:tracking-tight prose-a:text-amber-400 hover:prose-a:text-amber-300 prose-strong:text-white prose-p:text-gray-400 prose-p:leading-relaxed prose-li:text-gray-400 prose-code:text-amber-400 prose-code:bg-amber-400/10 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded"
          dangerouslySetInnerHTML={{ __html: service.content }}
        />

        {/* CTA bas */}
        <div className="mt-16 p-8 bg-[#161616] border border-[#2a2a2a] rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-lg font-bold text-white mb-1">
              Intéressé par ce service ?
            </h3>
            <p className="text-gray-400 text-sm">
              Contactez-nous pour discuter de votre projet.
            </p>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-amber-400 hover:bg-amber-300 text-black font-bold rounded-full transition-all whitespace-nowrap text-sm"
          >
            Démarrer <ArrowUpRight size={15} />
          </Link>
        </div>
      </article>
    </div>
  );
}
