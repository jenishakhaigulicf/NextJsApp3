"use server";
import { uploadImage } from "@/lib/cloudinary";
import { storePost, updatePostLikeStatus } from "@/lib/posts";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createPost(prevState, formData) {
  // when this not written then the issue is created
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

  let imageUrl;
  try {
    imageUrl = await uploadImage(image);
  } catch (e) {
    throw new Error("image upload failed, please try again");
  }

  await storePost({
    imageUrl,
    title,
    content,
    userId: 1,
  });

  revalidatePath("/", "layouts");
  redirect("/feed");
}
// configuring server action
export async function togglePostLikeStatus(postId) {
  updatePostLikeStatus(postId, 2);
  revalidatePath("/feed");
}
