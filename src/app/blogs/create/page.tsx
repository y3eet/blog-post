"use client";
import { useState, ChangeEvent } from "react";
import { createBlogPost } from "./actions";
import { useRouter } from "next/navigation";
const CreatePost = () => {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true);
    try {
      await createBlogPost(formData);
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
          <h2 className="card-title text-2xl font-bold mb-6">
            Create New Blog Post
          </h2>

          <form action={handleSubmit}>
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
              />
            </div>

            <div className="form-control mb-6">
              <label className="label">
                <span className="label-text">Featured Image</span>
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="file-input file-input-bordered w-full"
              />
            </div>

            {imagePreview && (
              <div className="mb-6">
                <p className="label-text mb-2">Image Preview</p>
                <div className="relative h-60 w-full">
                  <Image
                    src={imagePreview}
                    alt="Preview"
                    fill
                    className="object-contain rounded-lg"
                  />
                </div>
              </div>
            )}

            <div className="card-actions justify-end">
              <button
                type="submit"
                className={`btn btn-primary ${isSubmitting ? "loading" : ""}`}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Publishing..." : "Publish Post"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
