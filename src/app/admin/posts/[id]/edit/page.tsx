import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import PostForm from "../../components/PostForm";
import { updatePost } from "../../actions";

export default async function EditPostPage({
  params,
}: {
  params: { id: string };
}) {
  const post = await prisma.post.findUnique({ where: { id: params.id } });
  if (!post) notFound();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Modifier l&apos;article</h1>
      <PostForm initialData={post} actionFunction={updatePost} />
    </div>
  );
}
