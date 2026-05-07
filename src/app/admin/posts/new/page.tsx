import PostForm from "../components/PostForm";
import { createPost } from "../actions";

export default function NewPostPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Nouvel article</h1>
      <PostForm actionFunction={createPost} />
    </div>
  );
}
