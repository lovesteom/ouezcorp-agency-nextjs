import prisma from "@/lib/prisma";
import Link from "next/link";
import { setRealisationStatus } from "@/app/admin/realisations/actions";

export const dynamic = "force-dynamic";

export default async function AdminRealisationsList() {
  const realisations = await prisma.realisation.findMany({
    orderBy: [{ order: "asc" }, { createdAt: "desc" }],
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Réalisations</h1>
        <Link
          href="/admin/realisations/new"
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
        >
          + Nouvelle réalisation
        </Link>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="p-4 font-semibold text-gray-700">Ordre</th>
              <th className="p-4 font-semibold text-gray-700">Titre</th>
              <th className="p-4 font-semibold text-gray-700">Client</th>
              <th className="p-4 font-semibold text-gray-700">Statut</th>
              <th className="p-4 font-semibold text-gray-700 text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {realisations.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-8 text-center text-gray-500">
                  Aucune réalisation. Créez-en une !
                </td>
              </tr>
            ) : (
              realisations.map((r) => (
                <tr
                  key={r.id}
                  className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                >
                  <td className="p-4 text-gray-500 text-sm">{r.order}</td>
                  <td className="p-4 font-medium text-gray-900">{r.title}</td>
                  <td className="p-4 text-gray-600 text-sm">
                    {r.client || "—"}
                  </td>
                  <td className="p-4">
                    <span
                      className={`inline-block px-2 py-1 text-xs rounded-full font-semibold ${
                        r.status === "PUBLISHED"
                          ? "bg-green-100 text-green-700"
                          : r.status === "ARCHIVED"
                            ? "bg-red-100 text-red-700"
                            : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {r.status === "PUBLISHED"
                        ? "Publié"
                        : r.status === "ARCHIVED"
                          ? "Archivé"
                          : "Brouillon"}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <Link
                      href={`/realisations/${r.slug}`}
                      target="_blank"
                      className="text-gray-400 hover:text-gray-700 mr-4 text-sm"
                    >
                      Voir
                    </Link>
                    <form
                      action={async () => {
                        "use server";
                        await setRealisationStatus(
                          r.id,
                          r.status === "PUBLISHED" ? "DRAFT" : "PUBLISHED",
                        );
                      }}
                      className="inline"
                    >
                      <button
                        type="submit"
                        className="text-amber-700 hover:underline mr-4"
                      >
                        {r.status === "PUBLISHED"
                          ? "Mettre en brouillon"
                          : "Publier"}
                      </button>
                    </form>
                    <Link
                      href={`/admin/realisations/${r.id}/edit`}
                      className="text-blue-600 hover:underline mr-4"
                    >
                      Modifier
                    </Link>
                    <Link
                      href={`/admin/realisations/${r.id}/delete`}
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
