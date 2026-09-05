import {
  SlidersHorizontal,
} from "lucide-react";
import SearchBar from "../SearchBar";
import SelectInput from "../SelectInput";
import type { Option } from "../../types/select_option";
import data from "../../data";

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
  const statusOptions: Option[] = [
    {
      label: "All status",
      value: ""
    },
    {
      label: "Active",
      value: 'true'
    }, {
      label: "Inactive",
      value: 'false'
    }
  ]

  return (
    <div className="flex flex-col gap-3 lg:flex-row lg:items-center">

      {/* Search */}
      <SearchBar search={search} updateSearch={(v) => updateParam("search", v)} />

      {/* Role */}
      <div className="relative">
        <SlidersHorizontal
          className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-text-secondary"
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
          className="h-11 min-w-37.5 appearance-none rounded-xl bg-background pl-10 pr-9 text-sm font-medium text-[#475569] outline-none ring-1 ring-inset ring-[#E2E8F0] transition hover:bg-white focus:ring-2 focus:ring-[#10B981]/30"
        >
          <option value="ALL">
            All roles
          </option>
          {data.options.party.role.role_options.map((opt, i) => <option key={i} value={opt.value}>{opt.label}</option>)}

        </select>
      </div>

      {/* Status */}
      <div className="relative">
        <SelectInput
          value={status}
          onChange={(event) => updateParam("status", event.target.value)}
          options={statusOptions}
        />
        {/* <select
          value={status}
          onChange={(event) =>
            updateParam(
              "status",
              event.target.value
            )
          }
          className="h-11 min-w-35 appearance-none rounded-xl bg-background px-4 pr-9 text-sm font-medium text-[#475569] outline-none ring-1 ring-inset ring-[#E2E8F0] transition hover:bg-white focus:ring-2 focus:ring-[#10B981]/30"
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
        </select> */}
      </div>
    </div>
  );
};

export default PartyFilters;