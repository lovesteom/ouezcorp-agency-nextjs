import { getSiteContents } from '@/lib/actions/site-content';
import ContentManagerClient from './ContentManagerClient';

export const dynamic = 'force-dynamic';

export default async function AdminContentPage() {
  const contents = await getSiteContents();

  // Group contents by their 'group' field
  const groupedContents = contents.reduce((acc: any, current: any) => {
    if (!acc[current.group]) {
      acc[current.group] = [];
    }
    acc[current.group].push(current);
    return acc;
  }, {} as Record<string, typeof contents>);

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Contenu Global du Site</h1>
      <p className="text-gray-500 mb-8">
        Gérez tous les textes, images et configurations du site depuis cette interface centralisée.
      </p>

      <ContentManagerClient initialData={groupedContents} flatContents={contents} />
    </div>
  );
}
