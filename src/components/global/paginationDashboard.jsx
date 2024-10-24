import { Pagination } from "flowbite-react";

export default function PaginationClient({currentPage, setCurrentPage, totalPages=100}) {
  const onPageChange = (page) => setCurrentPage(page);
  return (
    <div className="flex overflow-x-auto sm:justify-center">
      {totalPages > 1 && <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />}
    </div>
  );
}
