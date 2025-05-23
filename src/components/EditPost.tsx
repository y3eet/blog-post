"use client";

import { useState, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import { useUploadThing } from "@/utils/uploadthig";
import { X } from "lucide-react";
import Image from "next/image";
import { Blog } from "@/lib/types";
import { updateBlogPost } from "@/app/actions";

const EditPost = ({ blog }: { blog: Blog }) => {
  const router = useRouter();
  const [title, setTitle] = useState(blog.title);
  const [content, setContent] = useState(blog.content);
  const [urls, setUrls] = useState<string[]>(blog.images || []);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const { startUpload, isUploading } = useUploadThing("imageUploader", {
    onClientUploadComplete: (res) => {
      const newUrls = res.map((file) => file.url);
      setUrls((prev) => [...prev, ...newUrls]);
    },
    onUploadError: (error) => {
      console.error("Upload error:", error);
    },
  });

  const handleImageSubmit = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const filesArr = Array.from(files).map((file) => file);
      const total = filesArr.length + urls.length;
      if (total <= 5) {
        startUpload(filesArr);
      } else {
        alert("Choose only a maximum 5 of images");
      }
    }
  };
  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true);
    try {
      await updateBlogPost(blog._id as string, formData, urls);
      router.push("/blogs");
    } catch (e) {
      alert(e);
    }
    setIsSubmitting(false);
  }

  return (
    <div className="container mx-auto p-4 max-w-3xl">
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-2xl font-bold mb-6">Edit Blog Post</h2>
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              await handleSubmit(formData);
            }}
          >
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">Title</span>
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="input input-bordered w-full"
                placeholder="Enter your blog title"
                required
                name="title"
                maxLength={100}
              />
            </div>

            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">Content</span>
              </label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="textarea textarea-bordered w-full h-60"
                placeholder="Write your blog content here..."
                required
                name="content"
                maxLength={5000}
              />
            </div>

            <div className="form-control mb-6 flex flex-col gap-2 max-w-3xs">
              <label className="label">
                <span className="label-text">Featured Image</span>
              </label>
              <button
                disabled={isUploading}
                type="button"
                className="btn btn-outline"
                onClick={() => {
                  document.getElementById("upload")?.click();
                }}
              >
                {isUploading ? "Uploading.." : "Upload"}
                <input
                  id="upload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageSubmit}
                  className="hidden"
                  name="images"
                />
              </button>
            </div>

            {urls && (
              <div className="mb-6">
                <p className="label-text mb-2">Image Preview</p>
                <div className="flex gap-4 flex-wrap">
                  {urls.map((url, i) => (
                    <div
                      key={i}
                      className="card border border-base-300 shadow-sm h-40 w-40 relative"
                    >
                      <figure className="h-full w-full">
                        <Image
                          src={url}
                          alt={`Preview ${i + 1}`}
                          fill
                          className="object-contain rounded-lg"
                        />
                      </figure>
                      <button
                        type="button"
                        className="btn btn-xs btn-error absolute top-2 right-2 z-10"
                        onClick={() => {
                          setUrls((prev) => prev.filter((_, idx) => idx !== i));
                        }}
                        aria-label={`Delete image ${i + 1}`}
                      >
                        <X />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="card-actions justify-end">
              <button
                type="submit"
                className={`btn btn-primary`}
                disabled={isSubmitting || isUploading}
              >
                {isSubmitting ? "Publishing..." : "Update Post"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditPost;
