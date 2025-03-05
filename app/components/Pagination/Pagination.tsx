import { ChevronRight, ChevronLeft } from "@geist-ui/icons";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  // Calculate page numbers to show
  const getPageNumbers = () => {
    const pages = [];

    // Always show first page
    pages.push(1);

    // Calculate start and end pages
    let startPage = Math.max(2, currentPage - 1);
    let endPage = Math.min(totalPages - 1, currentPage + 1);

    // Adjust if at the start
    if (currentPage <= 3) {
      endPage = Math.min(5, totalPages - 1);
    }

    // Adjust if at the end
    if (currentPage >= totalPages - 2) {
      startPage = Math.max(2, totalPages - 4);
    }

    // Add ellipsis after first page if needed
    if (startPage > 2) {
      pages.push("...");
    }

    // Add middle pages
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    // Add ellipsis before last page if needed
    if (endPage < totalPages - 1) {
      pages.push("...");
    }

    // Always show last page if more than one page
    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className="flex justify-center mt-8">
      <nav className="flex items-center" aria-label="Pagination">
        {/* Previous page */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`mr-2 px-3 py-1 rounded-md ${
            currentPage === 1
              ? "text-gray-400 cursor-not-allowed"
              : "text-[#ff7f66] hover:bg-[#ff947f] hover:text-white"
          }`}
          aria-label="Previous page"
          data-testid="previous-page-button"
        >
          <ChevronLeft size={20} />
        </button>

        {/* Page numbers */}
        <div className="flex space-x-1">
          {getPageNumbers().map((page, index) =>
            page === "..." ? (
              <span key={`ellipsis-${index}`} className="px-3 py-1">
                ...
              </span>
            ) : (
              <button
                key={`page-${page}`}
                onClick={() => onPageChange(page as number)}
                className={`px-3 py-1 rounded-md ${
                  currentPage === page
                    ? "bg-[#ff7f66] text-white"
                    : "text-[#ff7f66] hover:bg-[#ff947f] hover:text-white"
                }`}
                aria-current={currentPage === page ? "page" : undefined}
              >
                {page}
              </button>
            )
          )}
        </div>

        {/* Next page */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`ml-2 px-3 py-1 rounded-md ${
            currentPage === totalPages
              ? "text-gray-400 cursor-not-allowed"
              : "text-[#ff7f66] hover:bg-[#ff947f] hover:text-white"
          }`}
          aria-label="Next page"
          data-testid="next-page-button"
        >
          <ChevronRight size={20} />
        </button>
      </nav>
    </div>
  );
}
