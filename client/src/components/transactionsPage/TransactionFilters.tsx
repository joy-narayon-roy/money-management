import {
  CalendarDays,
  ChevronDown,
  Search,
  SlidersHorizontal,
} from "lucide-react";

const TransactionFilters = () => {
  return (
    <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
      {/* Search */}
      <div className="relative flex-1">
        <Search
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#94A3B8]"
          size={17}
        />

        <input
          type="text"
          placeholder="Search transactions..."
          className="h-11 w-full rounded-xl border-0 bg-[#F8FAFC] pl-10 pr-4 text-sm text-[#1E293B] outline-none ring-1 ring-inset ring-[#E2E8F0] placeholder:text-[#94A3B8] transition-all focus:bg-white focus:ring-2 focus:ring-[#10B981]/30"
        />
      </div>

      {/* Date */}
      <button
        type="button"
        className="flex h-11 items-center justify-between gap-5 rounded-xl bg-[#F8FAFC] px-4 text-sm font-medium text-[#475569] ring-1 ring-inset ring-[#E2E8F0] transition hover:bg-white hover:text-[#1E293B]"
      >
        <span className="flex items-center gap-2">
          <CalendarDays size={16} className="text-[#64748B]" />
          All dates
        </span>

        <ChevronDown size={15} className="text-[#94A3B8]" />
      </button>

      {/* Filter */}
      <button
        type="button"
        className="flex h-11 items-center justify-center gap-2 rounded-xl bg-[#F8FAFC] px-4 text-sm font-medium text-[#475569] ring-1 ring-inset ring-[#E2E8F0] transition hover:bg-white hover:text-[#1E293B]"
      >
        <SlidersHorizontal size={16} />
        Filters
      </button>
    </div>
  );
};

export default TransactionFilters;