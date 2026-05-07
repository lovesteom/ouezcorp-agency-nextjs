"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { deleteRealisation } from "../../actions";

export default function DeleteRealisationPage({
  params,
}: {
  params: { id: string };
}) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  function handleDelete() {
    startTransition(async () => {
      await deleteRealisation(params.id);
      router.push("/admin/realisations");
    });
  }

  return (
    <div className="max-w-md">
      <h1 className="text-3xl font-bold mb-4">Supprimer la réalisation</h1>
      <p className="text-gray-600 mb-6">
        Cette action est irréversible. Voulez-vous vraiment supprimer cette
        réalisation ?
      </p>
      <div className="flex gap-4">
        <button
          onClick={handleDelete}
          disabled={isPending}
          className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-6 rounded-md transition-colors disabled:opacity-50"
        >
          {isPending ? "Suppression..." : "Confirmer la suppression"}
        </button>
        <button
          onClick={() => router.back()}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-6 rounded-md transition-colors"
        >
          Annuler
        </button>
      </div>
    </div>
  );
}
