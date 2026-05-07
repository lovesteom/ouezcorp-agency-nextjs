import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import RealisationForm from "../../components/RealisationForm";
import { updateRealisation } from "../../actions";

export default async function EditRealisationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const realisation = await prisma.realisation.findUnique({
    where: { id },
  });
  if (!realisation) notFound();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Modifier la réalisation</h1>
      <RealisationForm
        initialData={realisation}
        actionFunction={updateRealisation}
      />
    </div>
  );
}
