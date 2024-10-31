import Link from "next/link";
import { Axios, baseURL } from "@/lib/api/Axios";
import SubHeader from "@/components/global/sub-header";
import { formatDate } from "@/utils/formatDate";
import EmptyData from "@/components/global/empty";
import BlogComponentApp from "@/components/blog/blogsComponent";
import PaginationApp from "@/components/global/pagination";
import { titleApp } from "@/constant/data";

export async function generateMetadata({ params }) {
  return {
    title: "blog page | " + titleApp,
    description: "description page blog",
    keywords: "keyword page blog",
  };
}

export default async function BlogsPage({ searchParams }) {
  const { page, limit } = searchParams;

  let section;
  try {
    section = await Axios.get(`/pages/blogs/sections`);
  } catch (error) {
    console.error("Error fetching blogs data:", error);
  }

  section = section?.data?.data?.sections[0];
  

  let recentPosts;
  try {
    recentPosts = await Axios.get(`posts?POST_PER_PAGE=5&pageNumber=1`);
  } catch (error) {
    console.error("Error fetching package data:", error);
  }
  recentPosts = recentPosts?.data?.data?.posts;

  let data;
  try {
    data = await Axios.get(
      `posts?pageNumber=${page || 1}&POST_PER_PAGE=${limit || 10}`
    );
  } catch (error) {
    console.error("Error fetching package data:", error);
  }

  const { totalPages } = data.data;
  const { posts } = data.data.data;

  return (
    <div>
      {section && section?.title && (
          <SubHeader
            title={section?.title}
            desc={section?.content}
            img={baseURL + section?.images[0]?.url}
          />
        )}
      <div className="relative z-40">{/* <RichEditor /> */}</div>
      <div className="container-app py-10 grid grid-cols-1 xl:grid-cols-6 gap-x-8">
        <div className="md:col-span-4">
          {posts?.length === 0 ? (
            <EmptyData text="Blogs is empty" />
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2">
                {posts?.map((article) => (
                  <BlogComponentApp article={article} key={article._id} />
                ))}
              </div>
              <PaginationApp
                page={parseInt(page || 1)}
                totalPages={totalPages}
                limit={limit || 10}
                url="/blogs"
              />
            </>
          )}
        </div>
        <aside className="md:col-span-2 mt-8 relative">
          <div className="sticky top-40">
            <h3 className="widget-title text-xl font-semibold mb-4">
              Recent Post
            </h3>
            <ul className="flex flex-col gap-y-2 divide-y-2">
              {recentPosts &&
                recentPosts?.map((post, index) => (
                  <li className="flex gap-x-2 h-20 pt-2" key={index}>
                    <figure className="">
                      <Link href={`/blogs/${post.slug}`}>
                        <img
                          className="rounded-lg w-32 h-full"
                          src={
                            baseURL + post.image[0].url || "/images/default.jpg"
                          } // صورة افتراضية إذا لم تكن الصورة موجودة
                          alt={post.title || "Default Title"}
                        />
                      </Link>
                    </figure>
                    <div className="flex flex-col justify-around w-full">
                      <h5 className="">
                        <Link
                          href={`/blogs/${post.slug}`}
                          className="text-gray-800 hover:text-secondary"
                        >
                          {post.title}
                        </Link>
                      </h5>
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span className="posted-on">
                          <span className="hover:text-secondary">
                            {formatDate(post.createdAt)}
                          </span>
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}
