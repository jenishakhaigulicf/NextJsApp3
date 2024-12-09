import PostForm from "@/components/post-form";
import { storePost } from "@/lib/posts";
import { redirect } from "next/navigation";

export default function NewPostPage() {
  // when server then async
  async function createPost(prevState, formData) {
    // when this not written then the issue is created
    "use server";
    const title = formData.get("title");
    const image = formData.get("image");
    const content = formData.get("content");

    let errors = [];

    if (!title || title.trim().length === 0) {
      errors.push({ title: "title", content: "Title is required" });
    }
    if (!content || content.trim().length === 0) {
      errors.push({ title: "content", content: "Content is required" });
    }
    if (!image || image.size === 0) {
      errors.push({ title: "image", content: "Image is required" });
    }

    if (errors.length > 0) {
      return {
        errors,
      };
    }

    await storePost({
      imageUrl: "",
      title,
      content,
      userId: 1,
    });

    redirect("/feed");
  }
  return <PostForm action={createPost} />;
}
