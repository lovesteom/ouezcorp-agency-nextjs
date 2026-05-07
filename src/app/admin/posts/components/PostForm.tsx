"use client";

import { useActionState, useRef, useState } from "react";
import Image from "next/image";

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
  const [imageUrl, setImageUrl] = useState<string>(
    initialData?.featuredImage || "",
  );
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadError(null);
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: fd,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Erreur upload");
      setImageUrl(data.url);
    } catch (err: any) {
      setUploadError(err.message);
    } finally {
      setUploading(false);
    }
  }

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
            Image à la une
          </label>
          {/* Champ caché envoyé avec le formulaire */}
          <input type="hidden" name="featuredImage" value={imageUrl} />

          {/* Prévisualisation */}
          {imageUrl && (
            <div className="relative mb-2 w-full h-40 rounded-md overflow-hidden border border-gray-200 bg-gray-50">
              <Image
                src={imageUrl}
                alt="Aperçu"
                fill
                className="object-cover"
                unoptimized={imageUrl.startsWith("http://localhost")}
              />
              <button
                type="button"
                onClick={() => {
                  setImageUrl("");
                  if (fileInputRef.current) fileInputRef.current.value = "";
                }}
                className="absolute top-2 right-2 bg-white/80 hover:bg-white text-gray-700 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold shadow"
              >
                ✕
              </button>
            </div>
          )}

          {/* Sélecteur de fichier */}
          <div
            className="flex items-center gap-2 border border-dashed border-gray-300 rounded-md px-4 py-3 cursor-pointer hover:bg-gray-50 transition"
            onClick={() => fileInputRef.current?.click()}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1M12 12V4m0 0L8 8m4-4l4 4"
              />
            </svg>
            <span className="text-sm text-gray-500">
              {uploading
                ? "Upload en cours…"
                : "Choisir une image (JPG, PNG, WebP — max 5 Mo)"}
            </span>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif,image/svg+xml"
            className="hidden"
            onChange={handleFileChange}
          />
          {uploadError && (
            <p className="text-red-500 text-xs mt-1">{uploadError}</p>
          )}

          {/* Fallback saisie manuelle URL */}
          <details className="mt-2">
            <summary className="text-xs text-gray-400 cursor-pointer select-none">
              Ou coller une URL directement
            </summary>
            <input
              type="text"
              placeholder="https://… ou /images/…"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
            />
          </details>
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
