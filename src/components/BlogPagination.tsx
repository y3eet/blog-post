"use client";
import { useRouter, useSearchParams } from "next/navigation";

const BlogPagination = ({
  pages,
  currentPage,
}: {
  pages: number[];
  currentPage: number;
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const appendQuery = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(key, value);
    router.push(`?${params.toString()}`);
  };
  return (
    <div>
      <div className="join">
        {pages.map((page) => (
          <button
            className={`join-item btn btn-lg ${
              currentPage === page && "btn-accent"
            }`}
            onClick={() => appendQuery("page", page.toString())}
            key={page}
          >
            {page}
          </button>
        ))}
      </div>
    </div>
  );
};

export default BlogPagination;
