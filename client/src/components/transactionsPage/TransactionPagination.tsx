import { ChevronLeft, ChevronRight, Eye } from "lucide-react";

type Pagination = {
  total?: number;
  limit?: number;
  page?: number;
  total_pages?: number;
};

type Props = {
  pagination?: Pagination;
  goToPage?: (page: number) => void;
  openPreview?: () => void
};

const TransactionPagination = ({
  pagination = {},
  openPreview = () => { },
  goToPage = () => { },
}: Props) => {
  const {
    total = 0,
    total_pages = 0,
    page: currentPage = 1,
    limit = 10,
  } = pagination;

  const getVisiblePages = () => {
    if (total_pages <= 5) {
      return Array.from({ length: total_pages }, (_, i) => i + 1);
    }

    let start = Math.max(1, currentPage - 2);
    let end = Math.min(total_pages, currentPage + 2);

    // Keep a window of 5 pages when possible
    if (end - start < 4) {
      if (start === 1) {
        end = Math.min(total_pages, start + 4);
      } else if (end === total_pages) {
        start = Math.max(1, end - 4);
      }
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  const pages = getVisiblePages();


  const start = total === 0 ? 0 : (currentPage - 1) * limit + 1;
  const end = Math.min(currentPage * limit, total);

  return (
    <div className="flex items-center justify-between border-t border-border px-6 py-4">
      <p className="text-xs text-text-secondary">
        Showing{" "}
        <span className="font-medium text-text-primary">
          {start}–{end}
        </span>{" "}
        of{" "}
        <span className="font-medium text-text-primary">{total}</span>
      </p>

      <div className="flex flex-row gap-3">
        <div className="">
          <button onClick={openPreview}
            className="px-4 py-1 border rounded border-border text-text-primary"
          >
            <Eye size={18} /></button>
        </div>

        <div className="flex items-center gap-1">
          <button
            disabled={currentPage <= 1}
            onClick={() => goToPage(currentPage - 1)}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-[#94A3B8] hover:bg-background disabled:opacity-40"
          >
            <ChevronLeft size={16} />
          </button>

          {pages.map((page) => (
            <button
              key={page}
              onClick={() => goToPage(page)}
              className={`flex h-8 min-w-8 items-center justify-center rounded-lg px-2 text-xs font-medium transition-colors ${page === currentPage
                ? "bg-primary-light text-primary"
                : "text-text-secondary hover:bg-background hover:text-text-primary"
                }`}
            >
              {page}
            </button>
          ))}

          <button
            disabled={currentPage >= total_pages}
            onClick={() => goToPage(currentPage + 1)}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-text-secondary hover:bg-background hover:text-text-primary disabled:opacity-40"
          >
            <ChevronRight size={16} />
          </button>
        </div>

      </div>
    </div>
  );
};

export default TransactionPagination;