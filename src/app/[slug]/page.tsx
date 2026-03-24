import { getPage, getPageSEO } from '@/lib/cms';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const seo = await getPageSEO(slug);
  
  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
  };
}

export default async function DynamicCMSPage({ params }: PageProps) {
  const { slug } = await params;
  const page = await getPage(slug);

  if (!page) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-12 min-h-screen">
      <article className="max-w-4xl mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {page.title}
          </h1>
          <div className="h-1 w-20 bg-blue-600 rounded"></div>
        </header>

        <div 
          className="prose prose-lg prose-blue max-w-none text-gray-700"
          dangerouslySetInnerHTML={{ __html: page.content || '' }}
        />
      </article>
    </div>
  );
}
