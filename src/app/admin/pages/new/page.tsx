import PageForm from '../components/PageForm';
import { createPage } from '../actions';
import Link from 'next/link';

export default function NewPage() {
  return (
    <div>
      <div className="mb-6 flex items-center">
        <Link href="/admin/pages" className="text-gray-500 hover:text-gray-900 mr-4">
          &larr; Retour
        </Link>
        <h1 className="text-3xl font-bold">Nouvelle Page</h1>
      </div>
      
      <PageForm actionFunction={createPage} />
    </div>
  );
}
