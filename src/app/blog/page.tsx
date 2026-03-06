import { getAllPosts } from "@/lib/api";
import Card from "@/components/Card";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog — OuezCorp",
  description: "Articles et actualités sur le développement web et le SEO.",
};

export const revalidate = 60;

export default async function BlogPage() {
  const posts = (await getAllPosts()) || [];

  return (
    <div className="bg-[#0b0b0b] min-h-screen pt-28">
      {/* Hero */}
      <section className="py-32 border-b border-[#222222]">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-amber-400 text-xs font-bold uppercase tracking-widest mb-6">
            Ressources
          </p>
          <div className="grid md:grid-cols-2 gap-8 items-end">
            <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight leading-[0.92]">
              Le Blog
              <br />
              Tech.
            </h1>
            <div>
              <p className="text-gray-300 text-lg leading-relaxed max-w-md mb-6">
                Insights techniques, tutoriels approfondis et retours
                d&apos;expérience sur le développement Headless, le SEO et les
                architectures web modernes.
              </p>
              <div className="flex flex-wrap gap-2">
                {[
                  "Next.js",
                  "WordPress Headless",
                  "SEO Technique",
                  "Performance",
                  "TypeScript",
                  "Core Web Vitals",
                ].map((topic) => (
                  <span
                    key={topic}
                    className="px-3 py-1.5 text-[10px] font-semibold text-gray-300 bg-[#161616] border border-[#2a2a2a] rounded-full"
                  >
                    {topic}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Posts */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          {posts.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {posts.map((post: any) => (
                <Card
                  key={post.slug}
                  title={post.title}
                  description={post.excerpt?.replace(/<[^>]*>?/gm, "")}
                  image={post.featuredImage?.node?.sourceUrl}
                  url={`/blog/${post.slug}`}
                />
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-5">
              {[
                {
                  category: "Next.js",
                  title:
                    "Architecture Headless : pourquoi découpler WordPress ?",
                  desc: "Les avantages concrets d’une architecture découplée pour la performance, le SEO et l’expérience développeur.",
                },
                {
                  category: "SEO",
                  title:
                    "Core Web Vitals 2025 : les métriques qui comptent vraiment",
                  desc: "LCP, INP, CLS — comment les optimiser concrètement dans un projet Next.js 15.",
                },
                {
                  category: "E-commerce",
                  title: "WooCommerce Headless vs Shopify : lequel choisir ?",
                  desc: "Comparatif technique et business pour choisir la bonne plateforme selon votre projet.",
                },
              ].map((post) => (
                <div
                  key={post.title}
                  className="group p-6 bg-[#161616] border border-[#2a2a2a] rounded-2xl hover:border-amber-400/40 transition-all"
                >
                  <span className="inline-block px-2.5 py-1 mb-4 text-[10px] font-bold tracking-widest text-amber-400 uppercase bg-amber-400/10 rounded-full">
                    {post.category}
                  </span>
                  <h3 className="text-white font-bold text-sm mb-2 leading-snug group-hover:text-amber-400 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-gray-400 text-xs leading-relaxed">
                    {post.desc}
                  </p>
                  <p className="mt-4 text-[10px] text-gray-500 font-semibold uppercase tracking-widest">
                    Bientôt disponible
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
