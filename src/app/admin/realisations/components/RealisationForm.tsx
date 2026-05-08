"use client";

import { useActionState } from "react";

export default function RealisationForm({
  initialData = null,
  actionFunction,
}: {
  initialData?: any;
  actionFunction: any;
}) {
  const [state, formAction, isPending] = useActionState(actionFunction, {
    error: null,
  });

  const initialTags = initialData?.tags
    ? (() => {
        try {
          return JSON.parse(initialData.tags).join(", ");
        } catch {
          return "";
        }
      })()
    : "";

  const initialGallery = initialData?.gallery
    ? (() => {
        try {
          return JSON.parse(initialData.gallery).join("\n");
        } catch {
          return "";
        }
      })()
    : "";

  return (
    <form
      action={formAction}
      className="space-y-6 max-w-3xl bg-white p-6 rounded-lg shadow-sm border border-gray-100"
    >
      {initialData?.id && (
        <input type="hidden" name="id" value={initialData.id} />
      )}
      {state?.error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-md text-sm">
          {state.error}
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Titre *
          </label>
          <input
            type="text"
            name="title"
            required
            defaultValue={initialData?.title || ""}
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Slug (URL) *
          </label>
          <input
            type="text"
            name="slug"
            required
            defaultValue={initialData?.slug || ""}
            className="w-full px-4 py-2 border border-gray-300 rounded-md font-mono text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Ordre d&apos;affichage
          </label>
          <input
            type="number"
            name="order"
            defaultValue={initialData?.order ?? 0}
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Client
          </label>
          <input
            type="text"
            name="client"
            defaultValue={initialData?.client || ""}
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Stack technique
          </label>
          <input
            type="text"
            name="stack"
            defaultValue={initialData?.stack || ""}
            placeholder="Next.js & PostgreSQL"
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Résultat obtenu
          </label>
          <input
            type="text"
            name="result"
            defaultValue={initialData?.result || ""}
            placeholder="Taux de conversion +42%"
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Extrait
          </label>
          <textarea
            name="excerpt"
            rows={3}
            defaultValue={initialData?.excerpt || ""}
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Contenu (HTML)
          </label>
          <textarea
            name="content"
            rows={12}
            defaultValue={initialData?.content || ""}
            className="w-full px-4 py-2 border border-gray-300 rounded-md font-mono text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Image principale (URL)
          </label>
          <input
            type="url"
            name="featuredImage"
            defaultValue={initialData?.featuredImage || ""}
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Tags (séparés par des virgules)
          </label>
          <input
            type="text"
            name="tags"
            defaultValue={initialTags}
            placeholder="E-commerce, Next.js, Stripe"
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Galerie (une URL par ligne)
          </label>
          <textarea
            name="gallery"
            rows={4}
            defaultValue={initialGallery}
            placeholder="https://example.com/image1.jpg&#10;https://example.com/image2.jpg"
            className="w-full px-4 py-2 border border-gray-300 rounded-md font-mono text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Statut
          </label>
          <select
            name="status"
            defaultValue={initialData?.status ?? "PUBLISHED"}
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
          >
            <option value="PUBLISHED">Publié</option>
            <option value="DRAFT">Brouillon</option>
            <option value="ARCHIVED">Archivé</option>
          </select>
        </div>
      </div>

      <div className="border-t border-gray-200 pt-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">SEO</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Titre SEO
            </label>
            <input
              type="text"
              name="seoTitle"
              defaultValue={initialData?.seoTitle || ""}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description SEO
            </label>
            <textarea
              name="seoDescription"
              rows={3}
              defaultValue={initialData?.seoDescription || ""}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200 pt-6 flex justify-end">
        <button
          type="submit"
          disabled={isPending}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md transition-colors disabled:opacity-50"
        >
          {isPending ? "Enregistrement..." : "Enregistrer la réalisation"}
        </button>
      </div>
    </form>
  );
}
