import { Blog } from "@/lib/types";
import React from "react";
import Image from "next/image";
import { Pencil } from "lucide-react";
import DeleteBlog from "@/app/blogs/components/DeleteBlog";
import Link from "next/link";
import { formatDate, timeDiff } from "@/lib/helper";

const BlogPost = ({
  blog: { _id, userId, userName, title, images = [], createdAt },
  currentUserId,
}: {
  currentUserId: string;
  blog: Blog;
}) => {
  return (
    <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow mb-5 w-full">
      <figure>
        {images[0] && (
          <Image
            src={images[0]}
            alt={title}
            className="w-full h-48 object-cover"
            width={400}
            height={400}
          />
        )}
      </figure>
      <div className="card-body">
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
        <h2 className="card-title">{title}</h2>

        <div className="flex items-center mt-4">
          <div className="avatar">
            <div className="avatar avatar-placeholder">
              <div className="bg-neutral text-neutral-content w-12 rounded-full">
                <span className="text-2xl">{userName[0].toUpperCase()}</span>
              </div>
            </div>
          </div>
          <div className="ml-2">
            <p className="text-sm">{userName}</p>
            <p className="text-xs text-base-content/70">
              {formatDate(createdAt)} · {timeDiff(createdAt)}
            </p>
          </div>
        </div>
        <div className="card-actions justify-end mt-2">
          <button className="btn btn-sm btn-outline">Read More</button>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
