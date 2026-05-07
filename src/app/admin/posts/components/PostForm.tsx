"use client";

import { useActionState } from "react";

interface PostFormProps {
  initialData?: any;
  actionFunction: any;
}

export default function PostForm({
  initialData = null,
  actionFunction,
}: PostFormProps) {
  const [state, formAction, isPending] = useActionState(actionFunction, {
    error: null,
  });

  const initialCategories = initialData?.categories
    ? (() => {
        try {
          return JSON.parse(initialData.categories).join(", ");
        } catch {
          return "";
        }
      })()
    : "";

  const initialDate = initialData?.publishedAt
    ? new Date(initialData.publishedAt).toISOString().slice(0, 16)
    : new Date().toISOString().slice(0, 16);

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
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
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
            Auteur
          </label>
          <input
            type="text"
            name="author"
            defaultValue={initialData?.author || "OuezCorp Team"}
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
            Image à la une (URL)
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
            Catégories (séparées par des virgules)
          </label>
          <input
            type="text"
            name="categories"
            defaultValue={initialCategories}
            placeholder="Next.js, SEO, TypeScript"
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Date de publication
          </label>
          <input
            type="datetime-local"
            name="publishedAt"
            defaultValue={initialDate}
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="flex items-center gap-3 pt-5">
          <input
            type="checkbox"
            id="published"
            name="published"
            defaultChecked={initialData?.published ?? true}
            className="w-4 h-4 text-blue-600 border-gray-300 rounded"
          />
          <label
            htmlFor="published"
            className="text-sm font-medium text-gray-700"
          >
            Publié
          </label>
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
          {isPending ? "Enregistrement..." : "Enregistrer l'article"}
        </button>
      </div>
    </form>
  );
}
