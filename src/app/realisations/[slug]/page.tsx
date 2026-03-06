import { getRealisationBySlug, getAllRealisations } from "@/lib/api";
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
  const realisations = (await getAllRealisations()) || [];
  return realisations.map((realisation: any) => ({
    slug: realisation.slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const realisation = await getRealisationBySlug(params.slug);
  if (!realisation) return {};

  return {
    title: realisation.seo?.title || realisation.title,
    description: realisation.seo?.metaDesc || realisation.excerpt,
  };
}

export default async function RealisationPage({ params }: PageProps) {
  const realisation = await getRealisationBySlug(params.slug);

  if (!realisation) {
    notFound();
  }

  return (
    <div className="bg-[#0b0b0b] min-h-screen pt-20">
      <article className="max-w-5xl mx-auto px-6 py-24">
        {/* Retour */}
        <Link
          href="/realisations"
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-white transition-colors mb-14 group"
        >
          <ArrowLeft
            size={15}
            className="group-hover:-translate-x-1 transition-transform"
          />
          Retour aux réalisations
        </Link>

        {/* Tag + Titre */}
        <p className="text-amber-400 text-xs font-bold uppercase tracking-widest mb-4">
          Projet
        </p>
        <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight leading-tight mb-14">
          {realisation.title}
        </h1>

        {/* Meta cards */}
        <div className="grid md:grid-cols-3 gap-4 mb-16">
          {[
            {
              label: "Client",
              value: realisation.realisationsFields?.client || "Confidentiel",
            },
            {
              label: "Stack",
              value:
                realisation.realisationsFields?.stackTechnique ||
                "Next.js & WordPress",
            },
            { label: "Résultat", value: "Optimisé & Performant", accent: true },
          ].map((item) => (
            <div
              key={item.label}
              className="p-6 bg-[#161616] border border-[#2a2a2a] rounded-2xl"
            >
              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">
                {item.label}
              </p>
              <p
                className={`text-base font-semibold ${
                  item.accent ? "text-amber-400" : "text-white"
                }`}
              >
                {item.value}
              </p>
            </div>
          ))}
        </div>

        {/* Image principale */}
        {realisation.featuredImage?.node?.sourceUrl && (
          <div className="relative h-[500px] w-full mb-14 rounded-2xl overflow-hidden border border-[#2a2a2a]">
            <Image
              src={realisation.featuredImage.node.sourceUrl}
              alt={realisation.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* Contenu */}
        <div
          className="prose prose-invert prose-lg max-w-none mb-16 prose-headings:font-bold prose-headings:text-white prose-headings:tracking-tight prose-a:text-amber-400 hover:prose-a:text-amber-300 prose-p:text-gray-400 prose-p:leading-relaxed prose-li:text-gray-400"
          dangerouslySetInnerHTML={{ __html: realisation.content }}
        />

        {/* Galerie */}
        {realisation.realisationsFields?.galerie?.nodes?.length > 0 && (
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-white tracking-tight mb-8">
              Galerie du projet
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {realisation.realisationsFields.galerie.nodes.map(
                (image: any, index: number) => (
                  <div
                    key={index}
                    className="relative h-64 rounded-2xl overflow-hidden border border-[#2a2a2a]"
                  >
                    <Image
                      src={image.sourceUrl}
                      alt={image.altText || `Image ${index + 1}`}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                ),
              )}
            </div>
          </div>
        )}

        {/* CTA bas */}
        <div className="p-8 bg-[#161616] border border-[#2a2a2a] rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-lg font-bold text-white mb-1">
              Un projet similaire ?
            </h3>
            <p className="text-gray-500 text-sm">
              Contactez-nous pour discuter de votre vision.
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
