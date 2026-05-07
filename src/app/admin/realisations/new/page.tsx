import RealisationForm from "../components/RealisationForm";
import { createRealisation } from "../actions";

export default function NewRealisationPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Nouvelle réalisation</h1>
      <RealisationForm actionFunction={createRealisation} />
    </div>
  );
}
