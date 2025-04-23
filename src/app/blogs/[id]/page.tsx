import { formatDate, timeDiff } from "@/lib/helper";
import { BlogModel } from "@/lib/mongodb/models/Blog";
import CommentModel from "@/lib/mongodb/models/Comment";
import connectToDatabase from "@/lib/mongodb/mongodb";
import { Blog } from "@/lib/types";
import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import Image from "next/image";
import EditComment from "@/components/EditComment";
import { SignInButton, SignUpButton } from "@clerk/nextjs";
import DeleteComment from "@/components/DeleteComment";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  await connectToDatabase();
  const user = await currentUser();
  const blogPost: Blog | null = await BlogModel.findById(id);
  if (!blogPost) {
    return (
      <div className="container mx-auto px-4 py-8">Blog post not found.</div>
    );
  }
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          {blogPost.title}
        </h1>

        <div className="flex items-center justify-center mb-6">
          <div className="avatar">
            <div className="avatar avatar-placeholder">
              <div className="bg-neutral text-neutral-content w-12 rounded-full">
                <span className="text-2xl">
                  {blogPost.userName[0].toUpperCase()}
                </span>
              </div>
            </div>
          </div>
          <div className="ml-4 text-left">
            <p className="font-medium">{blogPost.userName}</p>
            <p className="text-sm text-base-content/70">
              {formatDate(blogPost.createdAt)} · {timeDiff(blogPost.createdAt)}
            </p>
          </div>
        </div>

        <div className="flex justify-center gap-2">
          <button className="btn btn-sm btn-outline gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
            </svg>
            Share
          </button>
          <button className="btn btn-sm btn-outline gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
            </svg>
            Tweet
          </button>
          <button className="btn btn-sm btn-outline gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
            </svg>
            Copy Link
          </button>
        </div>
      </div>
      {/* Images */}
      <div className="mb-12">
        {blogPost?.images?.[0] && (
          <div className="w-full flex justify-center">
            <Image
              src={blogPost.images[0]}
              alt={blogPost.title}
              className="w-max-2xl h-auto object-contain rounded-xl shadow-lg"
              width={1200}
              height={600}
              priority
              loading="eager"
            />
          </div>
        )}
      </div>
      {/* Content */}
      <article className="lg:col-span-8 prose prose-lg max-w-none">
        <p>{blogPost.content}</p>
      </article>
      {/* Comments */}
      <CommentForm postId={id} currentUserId={user?.id} />
    </div>
  );
};

export default page;

const CommentForm = async ({
  postId,
  currentUserId,
}: {
  postId: string;
  currentUserId?: string;
}) => {
  await connectToDatabase();
  const comments = await CommentModel.find({ postId: postId }).sort({
    createdAt: "desc",
  });
  const handleCommentSubmit = async (formData: FormData) => {
    "use server";
    await connectToDatabase();
    const newComment = formData.get("newComment");
    const user = await currentUser();
    if (!user) {
      redirect("/");
    }
    await CommentModel.create({
      postId,
      userId: user.id,
      userName: user.username,
      content: newComment,
    });
    revalidatePath(`/blogs/${postId}`);
  };
  return (
    <div className="mt-12 pt-8 border-t border-base-300">
      <h3 className="text-2xl font-bold mb-6">Comments ({comments.length})</h3>

      {/* Comment Form */}
      {!!currentUserId ? (
        <form action={handleCommentSubmit} className="mb-8">
          <div className="form-control">
            <textarea
              className="textarea textarea-bordered h-24 w-full"
              placeholder="Join the discussion..."
              name="newComment"
              maxLength={500}
            ></textarea>
          </div>
          <div className="mt-4">
            <button type="submit" className="btn btn-primary">
              Post Comment
            </button>
          </div>
        </form>
      ) : (
        <div className="my-4 flex gap-3 items-center">
          <p className="text-xl">Login to post comment:</p>
          <SignInButton>
            <button className="btn btn-primary">Login</button>
          </SignInButton>
          <SignUpButton>
            <button className="btn btn-primary">Register</button>
          </SignUpButton>
        </div>
      )}

      {/* Comments List */}
      <div className="space-y-6">
        {comments.map((comment, i) => (
          <div key={i} className="card bg-base-100">
            <div className="card-body">
              <div className="flex items-start">
                <div className="avatar">
                  <div className="avatar avatar-placeholder">
                    <div className="bg-neutral text-neutral-content w-12 rounded-full">
                      <span className="text-2xl">
                        {comment.userName[0].toUpperCase()}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="ml-4 flex-1">
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium">{comment.userName}</h4>
                    <span className="text-sm text-base-content/70">
                      {formatDate(comment.createdAt)}
                    </span>
                  </div>
                  <p className="mt-2">{comment.content}</p>
                  {currentUserId === comment.userId && (
                    <div className="mt-2">
                      <EditComment
                        commentId={String(comment._id)}
                        commentContent={comment.content}
                      />
                      <DeleteComment commentId={String(comment._id)} />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
