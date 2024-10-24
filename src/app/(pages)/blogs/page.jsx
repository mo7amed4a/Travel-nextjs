import Link from "next/link";
import { Axios, baseURL } from "@/lib/api/Axios";
import SubHeader from "@/components/global/sub-header";
import { formatDate } from "@/utils/formatDate";
import { notFound } from "next/navigation";
import EmptyData from "@/components/global/empty";
import BlogComponentApp from "@/components/blog/blogsComponent";
import PaginationApp from "@/components/global/pagination";

export default async function BlogsPage({searchParams}) {
  const { page, limit} = searchParams;
  

  let recentPosts;
  try {
    recentPosts = await Axios.get(`posts`);
  } catch (error) {
    console.error("Error fetching package data:", error);
    return notFound();
  }

  recentPosts = recentPosts.data.data.posts;

  let data;
  try {
    data = await Axios.get(`posts?pageNumber=${page || 1}&POST_PER_PAGE=${limit || 10}`);
  } catch (error) {
    console.error("Error fetching package data:", error);
    return notFound();
  }

  if (data?.data?.data?.posts?.length === 0) {
    return <EmptyData text="Posts is empty" />;
  }

  const {totalPages} = data.data;  
  const { posts } = data.data.data;

  return (
    <div>
      <SubHeader
        title="Blogs"
        desc="description page blogs"
        img="/images/slider-pattern.png"
      />
      <div className="relative z-40">

      {/* <RichEditor /> */}
      </div>
      <div className="container-app py-10 grid grid-cols-1 xl:grid-cols-6 gap-x-8">
        <div className="md:col-span-4">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {posts?.map((article) => (
            <BlogComponentApp article={article} key={article._id} />
          ))}

          </div>
          <PaginationApp page={parseInt(page || 1)} totalPages={totalPages} limit={limit || 10} url="/blogs"/>
        </div>
          <aside className="md:col-span-2 mt-8">
            <h3 className="widget-title text-xl font-semibold mb-4">
              Recent Post
            </h3>
            <ul className="flex flex-col gap-y-2 divide-y-2">
              {recentPosts &&
                recentPosts?.slice(0, 3).map((post, index) => (
                  <li className="flex gap-x-2 h-20 pt-2" key={index}>
                    <figure className="">
                      <Link href={`/blogs/${post._id}`}>
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
                          href={`/blogs/${post._id}`}
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
          </aside>
      </div>
    </div>
  );
}
