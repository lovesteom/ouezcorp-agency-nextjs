import prisma from "@/lib/prisma";
import Link from "next/link";
import { format } from "date-fns";

export const dynamic = "force-dynamic";

export default async function AdminPostsList() {
  const posts = await prisma.post.findMany({
    orderBy: { publishedAt: "desc" },
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Articles de blog</h1>
        <Link
          href="/admin/posts/new"
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
        >
          + Nouvel article
        </Link>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="p-4 font-semibold text-gray-700">Titre</th>
              <th className="p-4 font-semibold text-gray-700">Slug</th>
              <th className="p-4 font-semibold text-gray-700">Statut</th>
              <th className="p-4 font-semibold text-gray-700">Publication</th>
              <th className="p-4 font-semibold text-gray-700 text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {posts.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-8 text-center text-gray-500">
                  Aucun article. Créez-en un !
                </td>
              </tr>
            ) : (
              posts.map((post) => (
                <tr
                  key={post.id}
                  className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                >
                  <td className="p-4 font-medium text-gray-900">
                    {post.title}
                  </td>
                  <td className="p-4 text-gray-600 font-mono text-sm">
                    {post.slug}
                  </td>
                  <td className="p-4">
                    <span
                      className={`inline-block px-2 py-1 text-xs rounded-full font-semibold ${post.published ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}
                    >
                      {post.published ? "Publié" : "Brouillon"}
                    </span>
                  </td>
                  <td className="p-4 text-gray-500 text-sm">
                    {format(new Date(post.publishedAt), "dd/MM/yyyy")}
                  </td>
                  <td className="p-4 text-right">
                    <Link
                      href={`/blog/${post.slug}`}
                      target="_blank"
                      className="text-gray-400 hover:text-gray-700 mr-4 text-sm"
                    >
                      Voir
                    </Link>
                    <Link
                      href={`/admin/posts/${post.id}/edit`}
                      className="text-blue-600 hover:underline mr-4"
                    >
                      Modifier
                    </Link>
                    <Link
                      href={`/admin/posts/${post.id}/delete`}
                      className="text-red-600 hover:underline"
                    >
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
