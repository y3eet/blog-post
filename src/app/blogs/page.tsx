import BlogPagination from "@/components/BlogPagination";
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

interface PageProps {
  searchParams?: Promise<{
    startDate?: string;
    endDate?: string;
    page?: string;
  }>;
}

const Page = async ({ searchParams }: PageProps) => {
  const startDate = (await searchParams)?.startDate;
  const endDate = (await searchParams)?.endDate;
  const page = Number((await searchParams)?.page ?? "1");

  await connectToDatabase();
  const user = await currentUser();
  const totalBlogs = await BlogModel.countDocuments();
  const blogsPerPage = 20;
  const pages: number[] = Array.from(
    { length: Math.ceil(totalBlogs / blogsPerPage) },
    (_, i) => i + 1
  );

  const filter: Record<string, unknown> = {};
  if (startDate && endDate) {
    const start = new Date(startDate);
    start.setHours(0, 0, 0, 0);
    const end = new Date(endDate);
    end.setHours(23, 59, 59, 999);
    filter.createdAt = { $gte: start, $lte: end };
  }

  const blogs: Blog[] = await BlogModel.find(filter)
    .sort({ createdAt: "desc" })
    .lean()
    .limit(blogsPerPage)
    .skip((page - 1) * blogsPerPage);
  return (
    <div>
      <div className="flex justify-between mb-5 items-center">
        <DateFilter />
        {startDate && (
          <p className="text-lg">
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
      <div className="flex w-full justify-center my-10">
        <BlogPagination pages={pages} currentPage={page} />
      </div>
    </div>
  );
};
export default Page;
