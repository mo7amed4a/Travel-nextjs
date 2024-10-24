'use client'
import { Pagination } from "flowbite-react";
import { useRouter } from "next/navigation";

export default function PaginationApp({page, url,limit=10, totalPages=1}) {
  const router = useRouter()
  const onPageChange = (page) => {
    router.push(`${url}?page=${page}&limit=${limit}`)
  };
  return (
    <div className="flex overflow-x-auto sm:justify-center">
      {totalPages > 1 && <Pagination currentPage={page} totalPages={totalPages} onPageChange={onPageChange} />}
    </div>
  );
}
