import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface UpworkPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function UpworkPagination({
  currentPage,
  totalPages,
  onPageChange,
}: UpworkPaginationProps) {
  const getPageNumbers = () => {
    const pages = [];
    const showEllipsisStart = currentPage > 3;
    const showEllipsisEnd = currentPage < totalPages - 2;

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 4) {
        for (let i = 1; i <= 5; i++) {
          pages.push(i);
        }
        if (showEllipsisEnd) pages.push("ellipsis");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 3) {
        pages.push(1);
        if (showEllipsisStart) pages.push("ellipsis");
        for (let i = totalPages - 4; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        if (showEllipsisStart) pages.push("ellipsis");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        if (showEllipsisEnd) pages.push("ellipsis");
        pages.push(totalPages);
      }
    }
    return pages;
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  return (
    <Pagination className="my-8">
      <PaginationContent>
        {/* Previous Button */}
        <PaginationItem>
          <PaginationPrevious
            onClick={() => handlePageChange(currentPage - 1)}
            className={`${
              currentPage === 1
                ? "pointer-events-none opacity-50"
                : "cursor-pointer"
            }`}
            aria-disabled={currentPage === 1}
          />
        </PaginationItem>

        {/* Page Numbers */}
        {getPageNumbers().map((page, index) => (
          <PaginationItem key={index}>
            {page === "ellipsis" ? (
              <PaginationEllipsis />
            ) : (
              <PaginationLink
                onClick={() => handlePageChange(page as number)}
                isActive={currentPage === page}
                className={`${
                  currentPage === page
                    ? "bg-dribbble-primary text-white hover:bg-dribbble-secondary p-1"
                    : "hover:bg-gray-100"
                } cursor-pointer`}
              >
                {page}
              </PaginationLink>
            )}
          </PaginationItem>
        ))}

        {/* Next Button */}
        <PaginationItem>
          <PaginationNext
            onClick={() => handlePageChange(currentPage + 1)}
            className={`${
              currentPage === totalPages
                ? "pointer-events-none opacity-50"
                : "cursor-pointer"
            }`}
            aria-disabled={currentPage === totalPages}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
