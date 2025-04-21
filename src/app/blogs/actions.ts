"use server";
import { currentUser } from "@clerk/nextjs/server";
import { BlogModel } from "@/lib/mongodb/models/Blog";
import connectToDatabase from "@/lib/mongodb/mongodb";
import { revalidatePath } from "next/cache";

export async function createBlogPost(formData: FormData) {
  const user = await currentUser();
  if (!user) {
    throw new Error("Unauthenticated");
  }
  await connectToDatabase();
  const title = formData.get("title");
  const content = formData.get("content");
  await BlogModel.insertOne({
    userId: user.id,
    userName: user.username,
    title,
    content,
  });
  revalidatePath("/blogs");
}

export async function deletePost(postId: string) {
  const user = await currentUser();
  if (!user) {
    throw new Error("Unauthenticated");
  }
  await connectToDatabase();
  await BlogModel.deleteOne({ _id: postId, userId: user.id });
}
