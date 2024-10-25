import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

interface PagainationProps {
  totalPages: number;
  currentPage: number;
}

export default function Pagination({
  totalPages,
  currentPage,
}: PagainationProps) {
  const maxPage = Math.min(totalPages, Math.max(currentPage + 4, 10));
  const minPage = Math.max(1, Math.min(currentPage - 5, maxPage - 9));

  const numberedPageItems = [];
  for (let page = minPage; page <= maxPage; page++) {
    numberedPageItems.push(
      <div className="hidden md:flex" key={page}>
        <Link
          aria-label={"Page " + page}
          role="button"
          href={"/?page=" + page}
          className={` border p-2 aspect-square rounded-md flex items-center justify-center cursor-pointer ${
            currentPage === page
              ? "pointer-events-none border-foreground"
              : "border-border"
          }`}
        >
          {page}
        </Link>
      </div>
    );
  }
  return (
    <div className="flex gap-4 items-center justify-between">
      {currentPage > 1 && (
        <Link
          aria-label="left arrow"
          role="button"
          href={"/?page=" + (currentPage - 1)}
          className={`mr-auto border border-border p-2 rounded-lg hover:border-foreground duration-300 ease-in-out  
            ${currentPage === minPage ? "pointer-events-none" : ""}`}
        >
          <ChevronLeft size={20} />
        </Link>
      )}
      {numberedPageItems}
      {currentPage < totalPages && (
        <Link
          aria-label="right arrow"
          role="button"
          href={"/?page=" + (currentPage + 1)}
          className={`ml-auto border border-border p-2 rounded-lg hover:border-foreground duration-300 ease-in-out 
            ${currentPage === maxPage ? "pointer-events-none" : ""}`}
        >
          <ChevronRight size={20} />
        </Link>
      )}
    </div>
  );
}
