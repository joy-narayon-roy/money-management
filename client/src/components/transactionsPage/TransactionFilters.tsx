import { useState } from "react";
import { CalendarDays, X } from "lucide-react";

interface TransactionDateFilterProps {
  from?: string;
  to?: string;
  onApply: (from?: string, to?: string) => void;
}

export default function TransactionDateFilter({
  from,
  to,
  onApply,
}: TransactionDateFilterProps) {
  const [open, setOpen] = useState(false);

  const [startDate, setStartDate] = useState(from ?? "");
  const [endDate, setEndDate] = useState(to ?? "");

  const handleApply = () => {
    onApply(
      startDate || undefined,
      endDate || undefined
    );

    setOpen(false);
  };

  const handleClear = () => {
    setStartDate("");
    setEndDate("");

    onApply(undefined, undefined);
    setOpen(false);
  };

  const formatDate = (date?: string) => {
    if (!date) return "";

    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    }).format(new Date(`${date}T00:00:00`));
  };

  const label =
    from && to
      ? `${formatDate(from)} – ${formatDate(to)}`
      : from
        ? `From ${formatDate(from)}`
        : to
          ? `Until ${formatDate(to)}`
          : "All dates";

  return (
    <div className="relative">
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="
          inline-flex h-10 items-center gap-2
          rounded-lg border border-[#E2E8F0]
          bg-white px-3
          text-sm font-medium text-[#1E293B]
          shadow-sm
          transition
          hover:bg-[#F8FAFC]
        "
      >
        <CalendarDays
          size={16}
          className="text-[#64748B]"
        />

        <span>{label}</span>
      </button>

      {/* Popover */}
      {open && (
        <div
          className="
            absolute right-0 z-50 mt-2
            w-[360px]
            rounded-xl
            border border-[#E2E8F0]
            bg-white
            p-4
            shadow-lg
          "
        >
          {/* Header */}
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold text-[#1E293B]">
                Date range
              </h3>

              <p className="mt-0.5 text-xs text-[#64748B]">
                Filter transactions by date
              </p>
            </div>

            <button
              type="button"
              onClick={() => setOpen(false)}
              className="
                rounded-md p-1.5
                text-[#64748B]
                hover:bg-[#F8FAFC]
                hover:text-[#1E293B]
              "
            >
              <X size={16} />
            </button>
          </div>

          {/* Date inputs */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label
                htmlFor="transaction-start-date"
                className="
                  mb-1.5 block
                  text-xs font-medium
                  text-[#64748B]
                "
              >
                Start date
              </label>

              <input
                id="transaction-start-date"
                type="date"
                value={startDate}
                max={endDate || undefined}
                onChange={(e) => setStartDate(e.target.value)}
                className="
                  h-10 w-full
                  rounded-lg
                  border border-[#E2E8F0]
                  bg-white
                  px-3
                  text-sm text-[#1E293B]
                  outline-none
                  transition
                  focus:border-[#10B981]
                  focus:ring-2
                  focus:ring-[#D1FAE5]
                "
              />
            </div>

            <div>
              <label
                htmlFor="transaction-end-date"
                className="
                  mb-1.5 block
                  text-xs font-medium
                  text-[#64748B]
                "
              >
                End date
              </label>

              <input
                id="transaction-end-date"
                type="date"
                value={endDate}
                min={startDate || undefined}
                onChange={(e) => setEndDate(e.target.value)}
                className="
                  h-10 w-full
                  rounded-lg
                  border border-[#E2E8F0]
                  bg-white
                  px-3
                  text-sm text-[#1E293B]
                  outline-none
                  transition
                  focus:border-[#10B981]
                  focus:ring-2
                  focus:ring-[#D1FAE5]
                "
              />
            </div>
          </div>

          {/* Actions */}
          <div className="mt-4 flex items-center justify-between border-t border-[#E2E8F0] pt-4">
            <button
              type="button"
              onClick={handleClear}
              className="
                text-sm font-medium
                text-[#64748B]
                hover:text-text-primary
              "
            >
              Clear
            </button>

            <button
              type="button"
              onClick={handleApply}
              className="
                rounded-lg
                bg-primary
                px-4 py-2
                text-sm font-medium
                text-white
                transition
                hover:bg-primary-hover
              "
            >
              Apply
            </button>
          </div>
        </div>
      )}
    </div>
  );
}