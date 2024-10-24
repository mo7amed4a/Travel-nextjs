
import BlogComponentApp from "@/components/blog/blogsComponent";
import { Axios } from "@/lib/api/Axios";

export default async function Resentpostes() {
  let recentPosts;
  try {
    recentPosts = await Axios.get(`/posts?pageNumber=1&POST_PER_PAGE=3`);
  } catch (error) {
    console.error("Error fetching package data:", error);
  }
  recentPosts = recentPosts?.data?.data?.posts;

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

       {recentPosts && (
        <div className="container-app grid grid-cols-1 md:grid-cols-3">
          {recentPosts.map((article, index) => <BlogComponentApp key={index} article={article} />)}
        </div>
      )}
    </div>
  );
}
