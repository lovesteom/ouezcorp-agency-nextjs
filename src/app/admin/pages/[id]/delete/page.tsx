import prisma from '@/lib/prisma';
import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import { deletePage } from '../../actions';

export default async function DeletePage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const page = await prisma.page.findUnique({
    where: { id: resolvedParams.id }
  });

  if (!page) {
    notFound();
  }

  // Server action for the delete button
  const handleDelete = async () => {
    'use server';
    await deletePage(resolvedParams.id);
    redirect('/admin/pages');
  };

  return (
    <div className="max-w-xl mx-auto mt-12 bg-white p-8 rounded-xl shadow-sm border border-red-100">
      <div className="text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100 mb-6">
          <svg className="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Supprimer la page</h2>
        <p className="text-gray-500 mb-8">
          Êtes-vous sûr de vouloir supprimer la page <strong className="text-gray-900">"{page.title}"</strong> ({page.slug}) ? Cette action est irréversible.
        </p>

        <form action={handleDelete} className="flex flex-col sm:flex-row justify-center gap-4">
          <Link 
            href="/admin/pages" 
            className="px-6 py-2.5 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors"
          >
            Annuler
          </Link>
          <button 
            type="submit" 
            className="px-6 py-2.5 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors"
          >
            Oui, supprimer
          </button>
        </form>
      </div>
    </div>
  );
}
