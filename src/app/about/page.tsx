import React from "react";
const regularPosts = [
  {
    id: 1,
    image: "/images/post1.jpg",
    title: "Understanding React Server Components",
    excerpt:
      "A quick dive into the new React Server Components and how they change the way we build apps.",
    category: "React",
    categoryColor: "badge-primary",
    author: "Jane Doe",
    authorImage: "/images/authors/jane.jpg",
    date: "2024-06-01",
    readTime: "5 min read",
  },
  {
    id: 2,
    image: "/images/post2.jpg",
    title: "TypeScript Tips for Beginners",
    excerpt:
      "Essential TypeScript tips and tricks to help you write safer and cleaner code.",
    category: "TypeScript",
    categoryColor: "badge-secondary",
    author: "John Smith",
    authorImage: "/images/authors/john.jpg",
    date: "2024-05-28",
    readTime: "7 min read",
  },
  {
    id: 3,
    image: "/images/post3.jpg",
    title: "Styling in Next.js with Tailwind CSS",
    excerpt:
      "Learn how to efficiently style your Next.js apps using Tailwind CSS.",
    category: "Next.js",
    categoryColor: "badge-accent",
    author: "Alex Lee",
    authorImage: "/images/authors/alex.jpg",
    date: "2024-05-20",
    readTime: "6 min read",
  },
];
const page = () => {
  return (
    <div className="mb-8">
      <div className="grid grid-cols-1">
        {regularPosts.map((post) => (
          <div
            key={post.id}
            className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow mb-5"
          >
            <figure>
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-48 object-cover"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{post.title}</h2>
              <div className="flex items-center mt-4">
                <div className="avatar">
                  <div className="w-8 h-8 rounded-full">
                    <img src={post.authorImage} alt={post.author} />
                  </div>
                </div>
                <div className="ml-2">
                  <p className="text-sm">{post.author}</p>
                  <p className="text-xs text-base-content/70">
                    {post.date} · {post.readTime}
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
    </div>
  );
};

export default page;
