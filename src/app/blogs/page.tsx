import BlogPost from "@/components/BlogPost";
import { BlogModel } from "@/lib/mongodb/models/Blog";
import connectToDatabase from "@/lib/mongodb/mongodb";
import { Blog } from "@/lib/types";
import { currentUser } from "@clerk/nextjs/server";
import Link from "next/link";
import React from "react";

const page = async () => {
  await connectToDatabase();
  const user = await currentUser();
  if (!user) {
    return <>Unauthenticated</>;
  }
  const blogs: Blog[] = await BlogModel.find()
    .sort({ createdAt: "desc" })
    .lean();
  return (
    <div>
      <div className="flex flex-col justify-center items-center mx-auto max-w-5xl">
        {blogs.map((blog, i) => (
          <BlogPost key={i} blog={blog} currentUserId={user.id} />
        ))}
      </div>

      <Link
        href="/blogs/create"
        className="btn btn-primary btn-lg fixed bottom-8 right-8 shadow-lg"
        aria-label="Create new post"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 4v16m8-8H4"
          />
        </svg>
        Create Post
      </Link>
    </div>
  );
};

export default page;
