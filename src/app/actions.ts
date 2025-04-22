"use server";
import { currentUser } from "@clerk/nextjs/server";
import { BlogModel } from "@/lib/mongodb/models/Blog";
import connectToDatabase from "@/lib/mongodb/mongodb";
import { revalidatePath } from "next/cache";
import CommentModel from "@/lib/mongodb/models/Comment";
import { redirect } from "next/navigation";

export async function createBlogPost(formData: FormData, images: string[]) {
  const user = await currentUser();
  if (!user) {
    throw new Error("Unauthenticated");
  }
  await connectToDatabase();
  //TODO: validation
  const title = formData.get("title");
  const content = formData.get("content");

  await BlogModel.insertOne({
    userId: user.id,
    userName: user.username,
    title,
    content,
    images,
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
  return revalidatePath("/blogs");
}

export async function updateBlogPost(
  _id: string,
  formData: FormData,
  images: string[]
) {
  const user = await currentUser();
  if (!user) {
    throw new Error("Unauthenticated");
  }
  await connectToDatabase();
  //TODO: validation
  const title = formData.get("title");
  const content = formData.get("content");

  await BlogModel.updateOne(
    { _id, userId: user.id },
    {
      $set: {
        userName: user.username,
        title,
        content,
        images,
      },
    }
  );
  revalidatePath("/blogs");
  return redirect("/blogs");
}

export async function updateComment(commentId: string, content: string) {
  const user = await currentUser();
  if (!user) {
    throw new Error("Unauthenticated");
  }

  await connectToDatabase();
  await CommentModel.updateOne(
    { _id: commentId, userId: user.id },
    {
      $set: {
        content,
      },
    }
  );
}

export async function deleteComment(commentId: string) {
  const user = await currentUser();
  if (!user) {
    throw new Error("Unauthenticated");
  }
  await connectToDatabase();
  await CommentModel.deleteOne({ _id: commentId, userId: user.id });
}
