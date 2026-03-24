import Link from 'next/link';
import { ReactNode } from 'react';

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen bg-gray-100 text-gray-900">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200">
        <div className="h-full px-3 py-4 overflow-y-auto">
          <div className="mb-6 px-2">
            <br />
            <h2 className="text-2xl font-bold text-gray-800 tracking-tight">CMS Admin</h2>
          </div>
          <ul className="space-y-2 font-medium">
            <li>
              <Link href="/admin" className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group transition-colors">
                <span className="ms-3">Tableau de bord</span>
              </Link>
            </li>
            <li>
              <Link href="/admin/pages" className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group transition-colors">
                <span className="flex-1 ms-3 whitespace-nowrap">Gestion des Pages</span>
              </Link>
            </li>
            <li>
              <Link href="/admin/content" className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group transition-colors">
                <span className="flex-1 ms-3 whitespace-nowrap">Contenu Global</span>
              </Link>
            </li>
            <li>
              <Link href="/" className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group transition-colors">
                <span className="flex-1 ms-3 whitespace-nowrap">Retour au site</span>
              </Link>
            </li>
          </ul>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto p-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 min-h-[calc(100vh-4rem)]">
          {children}
        </div>
      </main>
    </div>
  );
}
