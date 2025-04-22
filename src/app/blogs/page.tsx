import BlogPost from "@/components/BlogPost";
import DateFilter from "@/components/DateFilter";
import { BlogModel } from "@/lib/mongodb/models/Blog";
import connectToDatabase from "@/lib/mongodb/mongodb";
import { Blog } from "@/lib/types";
import { SignInButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import { Plus } from "lucide-react";
import Link from "next/link";
import React from "react";

export const revalidate = 0;

const page = async ({
  searchParams,
}: {
  searchParams: { startDate?: string; endDate?: string };
}) => {
  const startDate = searchParams.startDate;
  const endDate = searchParams.endDate;

  await connectToDatabase();
  const user = await currentUser();
  let blogs: Blog[] = await BlogModel.find().sort({ createdAt: "desc" }).lean();
  if (startDate && endDate) {
    blogs = await BlogModel.find({
      createdAt: {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      },
    })
      .sort({ createdAt: "desc" })
      .lean();
  }
  return (
    <div>
      <div className="flex justify-between mb-5 items-center">
        <DateFilter />
        {startDate && (
          <p className="text-xl">
            Filter: {startDate} - {endDate}
          </p>
        )}
        <div></div>
      </div>
      <div className="flex flex-col justify-center items-center mx-auto max-w-5xl">
        {blogs.map((blog, i) => (
          <BlogPost key={i} blog={blog} currentUserId={user?.id} />
        ))}
      </div>

      {user ? (
        <Link
          href="/blogs/create"
          className="btn btn-primary btn-lg fixed bottom-8 right-8 shadow-lg rounded-4xl"
          aria-label="Create new post"
        >
          <Plus />
          Create Post
        </Link>
      ) : (
        <div className="btn btn-primary btn-lg fixed bottom-8 right-8 shadow-lg rounded-4xl">
          <SignInButton>
            <div className="flex items-center">
              <Plus />
              Create Post
            </div>
          </SignInButton>
        </div>
      )}
    </div>
  );
};

export default page;
