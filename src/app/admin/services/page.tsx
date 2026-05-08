import prisma from "@/lib/prisma";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function AdminServicesList() {
  const services = await prisma.service.findMany({
    orderBy: [{ order: "asc" }, { createdAt: "asc" }],
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Services</h1>
        <Link
          href="/admin/services/new"
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
        >
          + Nouveau service
        </Link>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="p-4 font-semibold text-gray-700">Ordre</th>
              <th className="p-4 font-semibold text-gray-700">Titre</th>
              <th className="p-4 font-semibold text-gray-700">Slug</th>
              <th className="p-4 font-semibold text-gray-700">Statut</th>
              <th className="p-4 font-semibold text-gray-700 text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {services.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-8 text-center text-gray-500">
                  Aucun service. Créez-en un !
                </td>
              </tr>
            ) : (
              services.map((service) => (
                <tr
                  key={service.id}
                  className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                >
                  <td className="p-4 text-gray-500 text-sm">{service.order}</td>
                  <td className="p-4 font-medium text-gray-900">
                    {service.title}
                  </td>
                  <td className="p-4 text-gray-600 font-mono text-sm">
                    {service.slug}
                  </td>
                  <td className="p-4">
                    <span
                      className={`inline-block px-2 py-1 text-xs rounded-full font-semibold ${
                        service.status === "PUBLISHED"
                          ? "bg-green-100 text-green-700"
                          : service.status === "ARCHIVED"
                            ? "bg-red-100 text-red-700"
                            : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {service.status === "PUBLISHED"
                        ? "Publié"
                        : service.status === "ARCHIVED"
                          ? "Archivé"
                          : "Masqué"}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <Link
                      href={`/services/${service.slug}`}
                      target="_blank"
                      className="text-gray-400 hover:text-gray-700 mr-4 text-sm"
                    >
                      Voir
                    </Link>
                    <Link
                      href={`/admin/services/${service.id}/edit`}
                      className="text-blue-600 hover:underline mr-4"
                    >
                      Modifier
                    </Link>
                    <Link
                      href={`/admin/services/${service.id}/delete`}
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
