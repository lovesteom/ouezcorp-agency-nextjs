'use client';

import { useActionState } from 'react';
import { useRouter } from 'next/navigation';

export default function PageForm({ initialData = null, actionFunction }: { initialData?: any, actionFunction: any }) {
  const [state, formAction, isPending] = useActionState(actionFunction, { error: null });

  return (
    <form action={formAction} className="space-y-6 max-w-2xl bg-white p-6 rounded-lg shadow-sm border border-gray-100">
      {initialData?.id && <input type="hidden" name="id" value={initialData.id} />}
      {state?.error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-md text-sm">
          {state.error}
        </div>
      )}

      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Titre de la page *</label>
        <input 
          type="text" 
          id="title" 
          name="title" 
          required 
          defaultValue={initialData?.title || ''}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div>
        <label htmlFor="slug" className="block text-sm font-medium text-gray-700 mb-1">Slug (URL) *</label>
        <input 
          type="text" 
          id="slug" 
          name="slug" 
          required 
          defaultValue={initialData?.slug || ''}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 font-mono text-sm"
        />
      </div>

      <div>
        <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">Contenu (Texte ou HTML)</label>
        <textarea 
          id="content" 
          name="content" 
          rows={8}
          defaultValue={initialData?.content || ''}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      
      <div className="border-t border-gray-200 mt-8 pt-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">SEO & Méta-données</h3>
        
        <div className="space-y-4">
          <div>
            <label htmlFor="seoTitle" className="block text-sm font-medium text-gray-700 mb-1">Titre SEO</label>
            <input 
              type="text" 
              id="seoTitle" 
              name="seoTitle" 
              defaultValue={initialData?.seoTitle || ''}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label htmlFor="seoDescription" className="block text-sm font-medium text-gray-700 mb-1">Description SEO</label>
            <textarea 
              id="seoDescription" 
              name="seoDescription"
              rows={3} 
              defaultValue={initialData?.seoDescription || ''}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <div>
            <label htmlFor="seoKeywords" className="block text-sm font-medium text-gray-700 mb-1">Mots-clés SEO (séparés par des virgules)</label>
            <input 
              type="text" 
              id="seoKeywords" 
              name="seoKeywords" 
              defaultValue={initialData?.seoKeywords || ''}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200 mt-8 pt-6 flex justify-end">
        <button 
          type="submit" 
          disabled={isPending}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md transition-colors disabled:opacity-50"
        >
          {isPending ? 'Enregistrement...' : 'Enregistrer la page'}
        </button>
      </div>
    </form>
  );
}
