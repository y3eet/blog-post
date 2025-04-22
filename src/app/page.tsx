import Subscribe from "@/components/Subscribe";
import { formatDate, timeDiff } from "@/lib/helper";
import { BlogModel } from "@/lib/mongodb/models/Blog";
import connectToDatabase from "@/lib/mongodb/mongodb";
import { Blog } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  await connectToDatabase();
  const blogs: Blog[] = await BlogModel.find()
    .sort({ createdAt: "desc" })
    .limit(3)
    .lean();
  return (
    <div>
      <div
        className="hero min-h-[60vh] bg-base-200"
        style={{
          backgroundImage:
            "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDdwmJg_lL2KTkC5bkdmNlsbWV43DWfQM6Iw&s')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">Welcome</h1>
            <p className="mb-5">Exam purposes only :)</p>
            <Subscribe />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 bg-base-200">
        <h2 className="text-3xl font-bold mb-8 text-center">Latest Posts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog, i) => (
            <div key={i} className="card bg-base-100 shadow-xl">
              <figure className="w-full h-[200px] overflow-hidden">
                {blog?.images?.[0] && (
                  <Image
                    src={blog.images?.[0]}
                    alt="Post thumbnail"
                    className="card-image w-full h-full object-cover"
                    width={400}
                    height={200}
                  />
                )}
              </figure>
              <div className="card-body">
                <h2 className="card-title">{blog.title}</h2>
                <div className="flex items-center mt-4">
                  <div className="avatar">
                    <div className="avatar avatar-placeholder">
                      <div className="bg-neutral text-neutral-content w-12 rounded-full">
                        <span className="text-2xl">
                          {blog.userName[0].toUpperCase()}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="ml-2">
                    <p className="text-sm">{blog.userName}</p>
                    <p className="text-xs text-base-content/70">
                      {formatDate(blog.createdAt)} . {timeDiff(blog.createdAt)}
                    </p>
                  </div>
                </div>
                <div className="card-actions justify-end mt-2">
                  <button className="btn btn-sm btn-outline">Read More</button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-8">
          <Link href="/blogs" className="btn btn-outline">
            View All Posts
          </Link>
        </div>
      </div>

      <div className="footer footer-center p-4 bg-base-300 text-base-content">
        <p>© 2025 - Exam purposes :)</p>
      </div>
    </div>
  );
}
