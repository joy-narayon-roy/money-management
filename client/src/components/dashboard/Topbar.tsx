import {
  Bell,
  Menu,
  Search,
  ChevronDown,
} from "lucide-react";

interface TopbarProps {
  onMenuClick?: () => void;
}

export function Topbar({
  onMenuClick,
}: TopbarProps) {
  return (
    <header className="flex h-20 items-center justify-between border-b border-[#E5EBE8] bg-white px-4 sm:px-6 lg:px-8">
      {/* Mobile menu */}
      <button
        onClick={onMenuClick}
        className="rounded-lg p-2 text-[#53615C] hover:bg-[#F3F7F5] lg:hidden"
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* Search */}
      <div className="relative hidden w-full max-w-sm md:block">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#A0AAA6]" />

        <input
          type="search"
          placeholder="Search transactions..."
          className="h-10 w-full rounded-lg border border-[#E1E9E5] bg-[#FAFCFB] pl-10 pr-4 text-sm text-[#18231F] outline-none placeholder:text-[#A0AAA6] focus:border-[#1C9A6E] focus:ring-4 focus:ring-[#1C9A6E]/10"
        />
      </div>

      <div className="ml-auto flex items-center gap-3">
        {/* Mobile search */}
        <button className="rounded-lg p-2 text-[#718079] hover:bg-[#F3F7F5] md:hidden">
          <Search className="h-5 w-5" />
        </button>

        {/* Notifications */}
        <button className="relative rounded-lg p-2 text-[#718079] hover:bg-[#F3F7F5]">
          <Bell className="h-5 w-5" />

          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full border-2 border-white bg-[#1C9A6E]" />
        </button>

        <div className="h-7 w-px bg-[#E5EBE8]" />

        {/* User */}
        <button className="flex items-center gap-2 rounded-lg p-1.5 hover:bg-[#F3F7F5]">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#DDEFE7] text-xs font-bold text-[#197B5A]">
            J
          </div>

          <div className="hidden text-left sm:block">
            <p className="text-xs font-semibold text-[#33443C]">
              Joy
            </p>
            <p className="text-[10px] text-[#8A9691]">
              Personal
            </p>
          </div>

          <ChevronDown className="hidden h-4 w-4 text-[#89958F] sm:block" />
        </button>
      </div>
    </header>
  );
}