import ServiceForm from "../components/ServiceForm";
import { createService } from "../actions";

export default function NewServicePage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Nouveau service</h1>
      <ServiceForm actionFunction={createService} />
    </div>
  );
}
