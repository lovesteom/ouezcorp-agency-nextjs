import prisma from "@/lib/prisma";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const [pagesCount, postsCount, servicesCount, realisationsCount] =
    await Promise.all([
      prisma.page.count(),
      prisma.post.count(),
      prisma.service.count(),
      prisma.realisation.count(),
    ]);

  const stats = [
    { label: "Pages", count: pagesCount, href: "/admin/pages", color: "blue" },
    {
      label: "Articles",
      count: postsCount,
      href: "/admin/posts",
      color: "violet",
    },
    {
      label: "Services",
      count: servicesCount,
      href: "/admin/services",
      color: "amber",
    },
    {
      label: "Réalisations",
      count: realisationsCount,
      href: "/admin/realisations",
      color: "emerald",
    },
  ] as const;

  const colorMap = {
    blue: "bg-blue-50 border-blue-100 text-blue-800 text-blue-600 text-blue-700",
    violet:
      "bg-violet-50 border-violet-100 text-violet-800 text-violet-600 text-violet-700",
    amber:
      "bg-amber-50 border-amber-100 text-amber-800 text-amber-600 text-amber-700",
    emerald:
      "bg-emerald-50 border-emerald-100 text-emerald-800 text-emerald-600 text-emerald-700",
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">Tableau de Bord</h1>
      <p className="text-gray-500 mb-8 text-sm">
        Gérez tout le contenu de votre site depuis ici.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map(({ label, count, href, color }) => (
          <div
            key={label}
            className={`bg-${color}-50 border border-${color}-100 rounded-xl p-6 shadow-sm`}
          >
            <h3 className={`text-xl font-semibold text-${color}-800 mb-2`}>
              {label}
            </h3>
            <p className={`text-4xl font-bold text-${color}-600`}>{count}</p>
            <Link
              href={href}
              className={`mt-4 inline-block text-${color}-700 hover:underline text-sm`}
            >
              Gérer →
            </Link>
          </div>
        ))}
      </div>

      <div className="mt-10 bg-white border border-gray-100 rounded-xl p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-1">
          Contenu Global
        </h2>
        <p className="text-sm text-gray-500 mb-4">
          Textes et images réutilisables sur tout le site.
        </p>
        <Link
          href="/admin/content"
          className="inline-block text-emerald-700 hover:underline text-sm"
        >
          Gérer le contenu global →
        </Link>
      </div>
    </div>
  );
}
