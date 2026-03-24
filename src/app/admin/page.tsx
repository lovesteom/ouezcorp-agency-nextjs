import prisma from '@/lib/prisma';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  const pagesCount = await prisma.page.count();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Tableau de Bord</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 shadow-sm">
          <h3 className="text-xl font-semibold text-blue-800 mb-2">Pages</h3>
          <p className="text-4xl font-bold text-blue-600">{pagesCount}</p>
          <Link href="/admin/pages" className="mt-4 inline-block text-blue-700 hover:underline">
            Gérer les pages &rarr;
          </Link>
        </div>

        <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-6 shadow-sm">
          <h3 className="text-xl font-semibold text-emerald-800 mb-2">Contenu</h3>
          <p className="text-4xl font-bold text-emerald-600">Global</p>
          <Link href="/admin/content" className="mt-4 inline-block text-emerald-700 hover:underline">
            Gérer textes & images &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}
