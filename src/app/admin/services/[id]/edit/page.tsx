import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import ServiceForm from "../../components/ServiceForm";
import { updateService } from "../../actions";

export default async function EditServicePage({
  params,
}: {
  params: { id: string };
}) {
  const service = await prisma.service.findUnique({ where: { id: params.id } });
  if (!service) notFound();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Modifier le service</h1>
      <ServiceForm initialData={service} actionFunction={updateService} />
    </div>
  );
}
