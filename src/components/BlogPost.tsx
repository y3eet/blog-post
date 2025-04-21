import { Blog } from "@/lib/types";
import React from "react";
import Image from "next/image";
import { Pencil } from "lucide-react";
import DeleteBlog from "@/app/blogs/components/DeleteBlog";
import Link from "next/link";

const BlogPost = ({
  blog: { _id, userId, userName, title, content, images = [] },
  currentUserId,
}: {
  currentUserId: string;
  blog: Blog;
}) => {
  return (
    <div className="mb-10 card w-full bg-base-100 shadow-xl overflow-hidden border border-base-200 hover:shadow-2xl transition-shadow duration-300">
      <div className="card-body p-6 md:p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="avatar placeholder">
            <div className="avatar avatar-placeholder">
              <div className="bg-neutral text-neutral-content w-10 rounded-full">
                <span className="text-1.5xl">
                  {userName.charAt(0)?.toUpperCase()}
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center w-full justify-between">
            <span className="text-base-content/70">
              by <span className="font-medium">{userName}</span>
            </span>
            {currentUserId === userId && (
              <div>
                <DeleteBlog postId={_id.toString()} />
                <Link
                  href={`/blogs/edit/${_id.toString()}`}
                  className="btn btn-sm btn-success btn-circle"
                >
                  <Pencil size={18} />
                </Link>
              </div>
            )}
          </div>
        </div>
        <h1 className="card-title text-2xl md:text-3xl font-bold mb-2">
          {title}
        </h1>

        <div className="divider my-2"></div>

        <div className="prose prose-lg max-w-none">
          {content.split("\n").map((paragraph, idx) =>
            paragraph ? (
              <p key={idx} className="mb-4">
                {paragraph}
              </p>
            ) : (
              <br key={idx} />
            )
          )}
        </div>

        {images && images.length > 0 && (
          <div className="mt-8">
            <h3 className="font-bold text-xl mb-4">Gallery</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {images.map((image, idx) => (
                <figure
                  key={idx}
                  className="relative h-64 overflow-hidden rounded-lg shadow-md"
                >
                  <Image
                    src={image}
                    alt={`Image ${idx + 1} for ${title}`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover hover:scale-105 transition-transform duration-500"
                  />
                </figure>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogPost;
