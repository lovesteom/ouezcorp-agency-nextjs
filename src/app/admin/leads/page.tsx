import prisma from "@/lib/prisma";
import { format } from "date-fns";
import { markLeadAsRead, archiveLead, deleteLead } from "./actions";

export const dynamic = "force-dynamic";

const STATUS_LABEL: Record<string, string> = {
  NEW: "Nouveau",
  READ: "Lu",
  ARCHIVED: "Archivé",
};

export default async function AdminLeadsPage() {
  const leads = await prisma.contactLead.findMany({
    where: { status: { not: "ARCHIVED" } },
    orderBy: { createdAt: "desc" },
  });

  const newCount = leads.filter((l) => l.status === "NEW").length;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Leads & Contacts</h1>
          <p className="text-gray-500 text-sm mt-1">
            {newCount > 0
              ? `${newCount} message${newCount > 1 ? "s" : ""} non lu${newCount > 1 ? "s" : ""}`
              : "Tous les messages ont été lus"}
          </p>
        </div>
      </div>

      {leads.length === 0 ? (
        <div className="bg-white border border-gray-200 rounded-lg p-8 text-center text-gray-500">
          Aucun message reçu pour le moment.
        </div>
      ) : (
        <div className="space-y-4">
          {leads.map((lead) => (
            <div
              key={lead.id}
              className={`bg-white border rounded-xl p-6 ${
                lead.status === "NEW"
                  ? "border-amber-300 shadow-sm"
                  : "border-gray-200"
              }`}
            >
              <div className="flex justify-between items-start gap-6">
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    {lead.status === "NEW" && (
                      <span className="w-2 h-2 rounded-full bg-amber-400 flex-shrink-0 inline-block" />
                    )}
                    <span className="font-semibold text-gray-900">
                      {lead.name}
                    </span>
                    <a
                      href={`mailto:${lead.email}`}
                      className="text-blue-600 hover:underline text-sm"
                    >
                      {lead.email}
                    </a>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                        lead.status === "NEW"
                          ? "bg-amber-100 text-amber-700"
                          : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {STATUS_LABEL[lead.status] ?? lead.status}
                    </span>
                  </div>
                  {(lead.subject || lead.budget) && (
                    <p className="text-xs text-gray-500 mb-3">
                      {[lead.subject, lead.budget].filter(Boolean).join(" — ")}
                    </p>
                  )}
                  <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
                    {lead.message}
                  </p>
                </div>

                <div className="flex-shrink-0 text-right space-y-2 text-xs">
                  <p className="text-gray-400">
                    {format(new Date(lead.createdAt), "dd/MM/yyyy HH:mm")}
                  </p>
                  <div className="flex flex-col items-end gap-1">
                    {lead.status === "NEW" && (
                      <form
                        action={async () => {
                          "use server";
                          await markLeadAsRead(lead.id);
                        }}
                      >
                        <button
                          type="submit"
                          className="text-blue-600 hover:underline"
                        >
                          Marquer comme lu
                        </button>
                      </form>
                    )}
                    <form
                      action={async () => {
                        "use server";
                        await archiveLead(lead.id);
                      }}
                    >
                      <button
                        type="submit"
                        className="text-gray-400 hover:underline"
                      >
                        Archiver
                      </button>
                    </form>
                    <form
                      action={async () => {
                        "use server";
                        await deleteLead(lead.id);
                      }}
                    >
                      <button
                        type="submit"
                        className="text-red-500 hover:underline"
                      >
                        Supprimer
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
