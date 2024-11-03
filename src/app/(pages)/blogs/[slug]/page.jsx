import ShareSocial from "@/components/blog/share-social";
import ViewBlog from "@/components/blog/ViewBlog";
import SliderApp from "@/components/Home/Slider";
import { titleApp } from "@/constant/data";
import { Axios, baseURL } from "@/lib/api/Axios";
import { formatDate } from "@/utils/formatDate";
import { Badge } from "flowbite-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export async function generateMetadata({ params, searchParams }, parent) {
  // read route params
  const slug = (await params).slug;

  let data;
  try {
    data = await Axios.get(`/posts/${slug}`);
  } catch (error) {
    console.error("Error fetching post data:", error);
  }

  if (!data?.data?.data?.post) {
    return notFound();
  }

  const { post } = data?.data?.data;
  
  return post && {
    title: post.title + " | " + titleApp,
    description: post?.descriptionMeta || '',
    keywords: post.tags.join(", "),
    // openGraph: {
    //   images: ["/some-specific-page-image.jpg"],
    // },
  };
}

export default async function PackagesDetailsPage({ params }) {
  const slug = await params.slug;

  let data;
  try {
    data = await Axios.get(`/posts/${slug}`);
  } catch (error) {
    console.error("Error fetching post data:", error);
  }

  if (!data?.data?.data?.post) {
    return notFound();
  }

  const { post } = data.data.data;

  let recentPosts;
  try {
    recentPosts = await Axios.get(`posts?POST_PER_PAGE=5&pageNumber=1`);
  } catch (error) {
    console.error("Error fetching package data:", error);
  }

  recentPosts = recentPosts?.data?.data?.posts;

  return (
    <div className="w-full mt-40">
      <div className="container-app py-10 grid grid-cols-1 xl:grid-cols-6 gap-x-8">
        <div className="space-y-10 md:col-span-4">
          <div className="h-64 md:h-96 hide-btn">
            {post.image.length > 0 && post.image.length === 1 ? (
              <SliderApp
                slides={post.image}
                size="small"
                props={{
                  indicators: false,
                  leftControl: " ",
                  rightControl: " ",
                }}
              />
            ) : (
              <SliderApp
                slides={post.image}
                size="small"
                props={{
                  leftControl: " ",
                  rightControl: " ",
                }}
              />
            )}
          </div>
          <h1 className="text-3xl font-bold my-4">{post?.title}</h1>
          <ViewBlog html={post?.description} />
          <div className="mt-4">
            <h4 className="font-bold">Tags:</h4>
            <div className="flex gap-2 -mt-3">
              {post?.tags?.map((tag, index) => (
                <Badge key={index} color="blue" className="my-4">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
          <ShareSocial imageUrl={baseURL + post?.image[0].url} />
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
