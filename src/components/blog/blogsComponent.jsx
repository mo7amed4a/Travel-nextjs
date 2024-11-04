import React from "react";
import { baseURL } from "@/lib/api/Axios";
import { formatDate } from "@/utils/formatDate";
import Link from "next/link";
import SliderApp from "../Home/Slider";
import Image from "next/image";

export default function BlogComponentApp({ article }) {  
  return (
    <article className="p-4 w-full">
      <figure className="w-full h-[240px] bg-gray-200">
        <Link href={`/blogs/${article.slug}`}>
          <Image width={600} height={400}
            className="w-full h-full object-center"
            src={baseURL + article.image[0].url || "/images/default.jpg"} // صورة افتراضية إذا لم تكن الصورة موجودة
            alt={article.title || "Default Title"}
          />
        </Link>
      </figure>
      <div className="flex flex-col gap-y-2">
        <h3 className="text-xl hover:text-secondary">
          <Link href={`/blogs/${article.slug}`}>{article.titleOutSide}</Link>
        </h3>
        <div className="flex gap-x-4 text-sm text-gray-500">
          <span className="hover:text-secondary">
            <span>{formatDate(article.createdAt)}</span>
          </span>
        </div>
        <p className="text-gray-700 h-8 overflow-hidden">
          {article.descriptionOutSide || "No description available."}
        </p>
        <Link
          href={`/blogs/${article.slug}`}
          className="text-secondary-500 font-semibold"
        >
          CONTINUE READING...
        </Link>
      </div>
    </article>
  );
}
