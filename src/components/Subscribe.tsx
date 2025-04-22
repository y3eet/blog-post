"use client";

const Subscribe = () => {
  return (
    <>
      <button
        onClick={() => {
          const n = Math.floor(Math.random() * 3);
          const links = [
            "https://cornhub.website/",
            "https://onlyfans.com/onlyfans",
            "https://github.com/y3eet/blog-post",
          ];
          window.open(links[n], "_blank");
        }}
        className="btn btn-primary"
      >
        Subscribe
      </button>
    </>
  );
};

export default Subscribe;
