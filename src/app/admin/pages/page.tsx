import prisma from '@/lib/prisma';
import Link from 'next/link';
import { format } from 'date-fns';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function AdminPagesList() {
  const pages = await prisma.page.findMany({
    orderBy: { updatedAt: 'desc' },
  });
  console.log("RENDER ADMIN PAGES: Found", pages.length, "pages");

  return (
    <div>
      <br/><br/><br/><br/>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Gestion des Pages</h1>
        <Link 
          href="/admin/pages/new" 
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
        >
          + Nouvelle Page
        </Link>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="p-4 font-semibold text-gray-700">Titre</th>
              <th className="p-4 font-semibold text-gray-700">Slug</th>
              <th className="p-4 font-semibold text-gray-700">Dernière Modif.</th>
              <th className="p-4 font-semibold text-gray-700 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {pages.length === 0 ? (
              <tr>
                <td colSpan={4} className="p-8 text-center text-gray-500">
                  Aucune page trouvée. Créez-en une !
                </td>
              </tr>
            ) : (
              pages.map(page => (
                <tr key={page.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="p-4 font-medium text-gray-900">{page.title}</td>
                  <td className="p-4 text-gray-600 font-mono text-sm">{page.slug}</td>
                  <td className="p-4 text-gray-500 text-sm">
                    {format(new Date(page.updatedAt), 'dd/MM/yyyy HH:mm')}
                  </td>
                  <td className="p-4 text-right">
                    <Link href={`/admin/pages/${page.id}/edit`} className="text-blue-600 hover:underline mr-4">
                      Modifier
                    </Link>
                    <Link href={`/admin/pages/${page.id}/delete`} className="text-red-600 hover:underline">
                      Supprimer
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
