'use client';

import { useState } from 'react';
import { saveSiteContent, deleteSiteContent, SaveContentInput } from '@/lib/actions/site-content';
import { useRouter } from 'next/navigation';

export default function ContentManagerClient({
  initialData,
  flatContents
}: {
  initialData: Record<string, any[]>;
  flatContents: any[];
}) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(Object.keys(initialData)[0] || 'GLOBAL');
  const [groups, setGroups] = useState<string[]>(Array.from(new Set([...Object.keys(initialData), 'GLOBAL', 'Homepage', 'Footer', 'Header'])));
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Partial<SaveContentInput> | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem?.key || !editingItem?.type) return;
    
    setLoading(true);
    await saveSiteContent(editingItem as SaveContentInput);
    setLoading(false);
    setIsModalOpen(false);
    
    // Refresh group list if this is a new group
    if (editingItem.group && !groups.includes(editingItem.group)) {
      setGroups([...groups, editingItem.group]);
    }
    
    router.refresh(); // Tells Next.js to reconstruct the Server Page
  };

  const handleDelete = async (key: string) => {
    if (confirm(`Etes-vous sûr de vouloir supprimer '${key}'?`)) {
      await deleteSiteContent(key);
      router.refresh();
    }
  };

  const currentTabItems = flatContents.filter(c => c.group === activeTab);

  return (
    <div className="flex flex-col md:flex-row gap-8">
      {/* Sidebar for Groups */}
      <aside className="w-full md:w-64 shrink-0">
        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">Groupes de Contenu</h3>
        <ul className="space-y-1">
          {groups.map((group) => (
            <li key={group}>
              <button
                onClick={() => setActiveTab(group)}
                className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                  activeTab === group ? 'bg-blue-50 text-blue-700 font-medium' : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                {group}
              </button>
            </li>
          ))}
        </ul>

        <button
          onClick={() => {
            setEditingItem({ group: activeTab, type: 'TEXT' });
            setIsModalOpen(true);
          }}
          className="mt-6 w-full py-2 px-4 shadow-sm text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition"
        >
          + Ajouter un élément
        </button>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">{activeTab}</h2>
        </div>

        {currentTabItems.length === 0 ? (
          <div className="text-center py-16 px-4">
            <div className="text-gray-400 mb-2">
              <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" /></svg>
            </div>
            <p className="text-lg text-gray-800 font-medium">Aucun contenu trouvé</p>
            <p className="text-gray-500">Ajoutez du contenu pour <span className="font-semibold text-gray-900">{activeTab}</span> afin de configurer cette section du site.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {currentTabItems.map((item) => (
              <div key={item.key} className="p-5 flex items-start justify-between border border-gray-100 rounded-xl hover:bg-gray-50 transition-colors group">
                <div className="flex-1 mr-6">
                  <div className="flex items-center gap-3">
                    <h4 className="text-base font-bold text-gray-900">{item.label}</h4>
                    <span className="text-xs bg-gray-100 text-gray-600 py-0.5 px-2 rounded-full border border-gray-200">
                      {item.type}
                    </span>
                    <span className="text-[10px] text-gray-400 font-mono bg-gray-50 px-1 py-0.5 rounded">
                      {item.key}
                    </span>
                  </div>
                  <div className="mt-2 text-sm text-gray-600 line-clamp-3 overflow-hidden bg-white p-3 rounded-lg border border-gray-100 italic break-all">
                    {item.type === 'IMAGE' ? (
                      <img src={item.value} alt={item.label} className="mt-2 h-12 rounded object-cover border border-gray-200" />
                    ) : (
                      item.value 
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button 
                    onClick={() => {
                      setEditingItem(item);
                      setIsModalOpen(true);
                    }}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    Editer
                  </button>
                  <button 
                    onClick={() => handleDelete(item.key)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    Supprimer
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Editor Modal */}
      {isModalOpen && editingItem && (
        <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                {flatContents.find(c => c.key === editingItem.key) ? 'Modifier' : 'Créer un élément'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 p-2 transition">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            
            <form onSubmit={handleSave} className="flex-1 overflow-y-auto p-6 flex flex-col gap-5">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Clé unique (ID)</label>
                  <input
                    type="text"
                    required
                    disabled={!!flatContents.find(c => c.key === editingItem.key)}
                    pattern="[a-zA-Z0-9_-]+"
                    className="w-full border-gray-200 rounded-lg text-sm bg-gray-50 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50"
                    placeholder="home_hero_title"
                    value={editingItem.key || ''}
                    onChange={(e) => setEditingItem({...editingItem, key: e.target.value})}
                  />
                  <p className="text-xs text-gray-400 mt-1">Sera utilisé dans le code. Sans espaces.</p>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Label (Nom lisible)</label>
                  <input
                    type="text"
                    required
                    className="w-full border-gray-200 rounded-lg text-sm bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Titre Principal Accueil"
                    value={editingItem.label || ''}
                    onChange={(e) => setEditingItem({...editingItem, label: e.target.value})}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Groupe d'appartenance</label>
                  <input
                    type="text"
                    required
                    className="w-full border-gray-200 rounded-lg text-sm bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Homepage"
                    value={editingItem.group || ''}
                    onChange={(e) => setEditingItem({...editingItem, group: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Type de Média</label>
                  <select 
                    className="w-full border-gray-200 rounded-lg text-sm bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                    value={editingItem.type || 'TEXT'}
                    onChange={(e) => setEditingItem({...editingItem, type: e.target.value})}
                  >
                    <option value="TEXT">Texte Standard</option>
                    <option value="IMAGE">Image (URL)</option>
                    <option value="RICH_TEXT">Texte Enrichi (HTML)</option>
                  </select>
                </div>
              </div>

              <div className="flex-1 flex flex-col">
                <label className="block text-sm font-semibold text-gray-700 mb-1">Contenu / Valeur</label>
                {editingItem.type === 'IMAGE' ? (
                  <div className="flex flex-col gap-2">
                    <input
                      type="url"
                      required
                      placeholder="https://..."
                      className="w-full border-gray-200 rounded-lg text-sm bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                      value={editingItem.value || ''}
                      onChange={(e) => setEditingItem({...editingItem, value: e.target.value})}
                    />
                    {editingItem.value && (
                      <div className="p-2 border border-dashed border-gray-300 rounded-lg mt-2 bg-gray-50 flex items-center justify-center h-32">
                        <img src={editingItem.value} alt="Preview" className="max-h-full object-contain rounded" onError={(e) => e.currentTarget.style.display='none'} />
                      </div>
                    )}
                  </div>
                ) : (
                  <textarea
                    required
                    rows={8}
                    className="w-full flex-1 border-gray-200 rounded-lg text-sm font-mono bg-gray-50 focus:ring-blue-500 focus:border-blue-500 resize-none p-3"
                    placeholder={editingItem.type === 'RICH_TEXT' ? '<p>Bonjour</p>' : 'Entrez le texte...'}
                    value={editingItem.value || ''}
                    onChange={(e) => setEditingItem({...editingItem, value: e.target.value})}
                  />
                )}
              </div>
              
              <div className="pt-4 border-t border-gray-100 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-5 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 shadow-sm transition disabled:opacity-70 flex items-center gap-2"
                >
                  {loading && <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>}
                  Sauvegarder
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
