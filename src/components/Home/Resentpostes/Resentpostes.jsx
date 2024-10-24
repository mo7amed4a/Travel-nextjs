import React from "react";

import { Link } from "react-router-dom";
import BlogComponentApp from "../../blogs/blogsComponent";
import useFetch from "../../../hooks/useFetch";
import Loading from "../../global/Loading";
import ErrorComponent from "../../global/Error";

export default function Resentpostes() {
  const { data, loading, error } = useFetch(
    "/posts?pageNumber=1&POST_PER_PAGE=3"
  );

  return (
    <div className="mt-[100px]">
      <div className="flex flex-col items-center justify-center text-center">
        <div className="flex items-center mb-4">
          <div className="w-24 bg-red-500 h-[3px] inline-block"></div>
          <p className="ml-2 text-red-500 uppercase font-semibold text-sm">
            FROM OUR BLOG
          </p>
        </div>

        <h2 className="text-5xl font-bold mb-4">OUR RECENT POSTS</h2>

        <p className="text-lg text-gray-600 max-w-2xl">
          Mollit voluptatem perspiciatis convallis elementum corporis quo
          veritatis aliquid blandit, blandit torquent, odit placeat. Adipiscing
          repudiandae eius cursus? Nostrum magnis maxime curae placeat.
        </p>
      </div>

      {loading && <Loading />}
      {error && <ErrorComponent error={error} small />}
      {!data && <EmptyData text="Post not found." />}
      {data?.data?.posts && (
        <div className="container-app grid grid-cols-1 md:grid-cols-3">
          {data?.data?.posts.map((article, index) => <BlogComponentApp key={index} article={article} />)}
        </div>
      )}
    </div>
  );
}
