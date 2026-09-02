import {
  Search,
  SlidersHorizontal,
} from "lucide-react";

interface Props {
  search: string;
  role: string;
  status: string;

  updateParam: (
    key: string,
    value: string
  ) => void;
}

const PartyFilters = ({
  search,
  role,
  status,
  updateParam,
}: Props) => {
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
          value={search}
          onChange={(event) =>
            updateParam(
              "search",
              event.target.value
            )
          }
          placeholder="Search parties..."
          className="h-11 w-full rounded-xl border-0 bg-[#F8FAFC] pl-10 pr-4 text-sm text-[#1E293B] outline-none ring-1 ring-inset ring-[#E2E8F0] placeholder:text-[#94A3B8] transition-all focus:bg-white focus:ring-2 focus:ring-[#10B981]/30"
        />
      </div>

      {/* Role */}
      <div className="relative">
        <SlidersHorizontal
          className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#64748B]"
          size={16}
        />

        <select
          value={role}
          onChange={(event) =>
            updateParam(
              "role",
              event.target.value
            )
          }
          className="h-11 min-w-[150px] appearance-none rounded-xl bg-[#F8FAFC] pl-10 pr-9 text-sm font-medium text-[#475569] outline-none ring-1 ring-inset ring-[#E2E8F0] transition hover:bg-white focus:ring-2 focus:ring-[#10B981]/30"
        >
          <option value="ALL">
            All roles
          </option>

          <option value="INCOME">
            Income
          </option>

          <option value="EXPENSE">
            Expense
          </option>

          <option value="AR">
            Receivable
          </option>

          <option value="AP">
            Payable
          </option>
        </select>
      </div>

      {/* Status */}
      <div className="relative">
        <select
          value={status}
          onChange={(event) =>
            updateParam(
              "status",
              event.target.value
            )
          }
          className="h-11 min-w-[140px] appearance-none rounded-xl bg-[#F8FAFC] px-4 pr-9 text-sm font-medium text-[#475569] outline-none ring-1 ring-inset ring-[#E2E8F0] transition hover:bg-white focus:ring-2 focus:ring-[#10B981]/30"
        >
          <option value="ALL">
            All status
          </option>

          <option value="true">
            Active
          </option>

          <option value="false">
            Inactive
          </option>
        </select>
      </div>
    </div>
  );
};

export default PartyFilters;