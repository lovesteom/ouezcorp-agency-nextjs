import { getPostBySlug, getAllPosts } from "@/lib/api";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface PageProps {
  params: {
    slug: string;
  };
}

export const revalidate = 60;

export async function generateStaticParams() {
  const posts = (await getAllPosts()) || [];
  return posts.map((post: any) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);
  if (!post) return {};

  return {
    title: post.seo?.title || post.title,
    description: post.seo?.metaDesc || post.excerpt,
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="bg-(--bg) min-h-screen pt-20">
      <article className="max-w-3xl mx-auto px-6 py-24">
        {/* Retour */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm text-(--fg-3) hover:text-(--fg) transition-colors mb-14 group"
        >
          <ArrowLeft
            size={15}
            className="group-hover:-translate-x-1 transition-transform"
          />
          Retour au blog
        </Link>

        {/* Catégories */}
        {post.categories?.nodes?.length > 0 && (
          <div className="flex gap-2 flex-wrap mb-6">
            {post.categories.nodes.map((cat: any) => (
              <span
                key={cat.slug}
                className="inline-block px-3 py-1 text-[10px] font-bold tracking-widest text-amber-400 uppercase bg-amber-400/10 rounded-full"
              >
                {cat.name}
              </span>
            ))}
          </div>
        )}

        {/* Titre */}
        <h1 className="text-4xl md:text-5xl font-bold text-(--fg) tracking-tight leading-tight mb-10">
          {post.title}
        </h1>

        {/* Auteur + date */}
        <div className="flex items-center justify-between mb-12 pb-8 border-b border-(--border)">
          <div className="flex items-center gap-3">
            {post.author?.node?.avatar?.url && (
              <div className="relative w-9 h-9 rounded-full overflow-hidden border border-(--border-strong)">
                <Image
                  src={post.author.node.avatar.url}
                  alt={post.author.node.name}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <span className="text-sm font-medium text-(--fg)">
              {post.author?.node?.name || "OuezCorp Team"}
            </span>
          </div>
          <time dateTime={post.date} className="text-xs text-(--fg-3)">
            {new Date(post.date).toLocaleDateString("fr-FR", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </time>
        </div>

        {/* Image à la une */}
        {post.featuredImage?.node?.sourceUrl && (
          <div className="relative h-[420px] w-full mb-14 rounded-2xl overflow-hidden border border-(--border)">
            <Image
              src={post.featuredImage.node.sourceUrl}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* Contenu */}
        <div
          className="prose prose-lg max-w-none prose-headings:font-bold prose-headings:text-(--fg) prose-headings:tracking-tight prose-a:text-(--accent) hover:prose-a:text-(--accent-hover) prose-strong:text-(--fg) prose-p:text-(--fg-2) prose-p:leading-relaxed prose-li:text-(--fg-2) prose-code:text-(--accent) prose-code:bg-(--accent-subtle) prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>
    </div>
  );
}
