import PageForm from '../../components/PageForm';
import { updatePage } from '../../actions';
import prisma from '@/lib/prisma';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export default async function EditPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const page = await prisma.page.findUnique({
    where: { id: resolvedParams.id }
  });

  if (!page) {
    notFound();
  }

  return (
    <div>
      <div className="mb-6 flex items-center">
        <Link href="/admin/pages" className="text-gray-500 hover:text-gray-900 mr-4">
          &larr; Retour
        </Link>
        <h1 className="text-3xl font-bold">Modifier la page</h1>
      </div>
      
      <PageForm initialData={page} actionFunction={updatePage} />
    </div>
  );
}
