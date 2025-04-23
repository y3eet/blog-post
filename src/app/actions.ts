"use server";
import { currentUser } from "@clerk/nextjs/server";
import { BlogModel } from "@/lib/mongodb/models/Blog";
import connectToDatabase from "@/lib/mongodb/mongodb";
import { revalidatePath } from "next/cache";
import CommentModel from "@/lib/mongodb/models/Comment";
import { z } from "zod";

const blogSchema = z.object({
  title: z.string().max(100, "Title must be at most 100 characters"),
  content: z.string().max(5000, "Content must be at most 5000 characters"),
});

const commentSchema = z.object({
  content: z.string().max(500, "Comment must be at most 500 characters"),
});

export async function createBlogPost(formData: FormData, images: string[]) {
  const result = blogSchema.safeParse({
    title: formData.get("title"),
    content: formData.get("content"),
  });
  if (!result.success) {
    throw new Error(result.error.errors.map((e) => e.message).join(", "));
  }
  if (images.length > 1) {
    throw new Error("You can only upload at maximum of 1 image");
  }
  const user = await currentUser();
  if (!user) {
    throw new Error("Unauthenticated");
  }
  await connectToDatabase();
  await BlogModel.insertOne({
    userId: user.id,
    userName: user.username,
    title: result.data.title,
    content: result.data.content,
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
  const result = blogSchema.safeParse({
    title: formData.get("title"),
    content: formData.get("content"),
  });

  if (!result.success) {
    throw new Error(result.error.errors.map((e) => e.message).join(", "));
  }
  if (images.length > 1) {
    throw new Error("You can only upload at maximum of 1 image");
  }
  const user = await currentUser();
  if (!user) {
    throw new Error("Unauthenticated");
  }
  await connectToDatabase();
  await BlogModel.updateOne(
    { _id, userId: user.id },
    {
      $set: {
        userName: user.username,
        title: result.data.title,
        content: result.data.content,
        images,
      },
    }
  );
  return revalidatePath("/blogs");
}

export async function updateComment(commentId: string, content: string) {
  const result = commentSchema.safeParse({
    content,
  });
  if (!result.success) {
    throw new Error(result.error.errors.map((e) => e.message).join(", "));
  }
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
