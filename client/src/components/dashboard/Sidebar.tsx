import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  ArrowLeftRight,
  Users,
  Wallet,
  ArrowDownLeft,
  ArrowUpRight,
  BarChart3,
  Settings,
  LogOut,
  X,
  type LucideIcon,
} from "lucide-react";

import Logo from "../Logo";

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

interface NavigationItem {
  name: string;
  href: string;
  icon: LucideIcon;
}

const mainNavigation: NavigationItem[] = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Transactions",
    href: "/transactions",
    icon: ArrowLeftRight,
  },
  {
    name: "Parties",
    href: "/parties",
    icon: Users,
  },
  {
    name: "Accounts",
    href: "/accounts",
    icon: Wallet,
  },
];

const financeNavigation: NavigationItem[] = [
  {
    name: "Receivables",
    href: "/receivables",
    icon: ArrowDownLeft,
  },
  {
    name: "Payables",
    href: "/payables",
    icon: ArrowUpRight,
  },
  {
    name: "Reports",
    href: "/reports",
    icon: BarChart3,
  },
];

export function Sidebar({
  open,
  onClose,
}: SidebarProps) {
  const nav = useNavigate()
  const handelLogout = () => {
    nav("/logout")
  }
  return (
    <>
      {/* Mobile backdrop */}
      <div
        onClick={onClose}
        className={`
          fixed inset-0 z-40
          bg-[#10271F]/30
          backdrop-blur-sm
          transition-opacity
          lg:hidden
          ${open
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
          }
        `}
      />

      {/* Sidebar */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50
          flex h-dvh w-64 shrink-0
          flex-col
          border-r border-[#E5EBE8]
          bg-white
          transition-transform duration-300 ease-in-out

          ${open
            ? "translate-x-0"
            : "-translate-x-full"
          }

          lg:static
          lg:translate-x-0
        `}
      >
        {/* Header */}
        <div className="flex h-20 shrink-0 items-center justify-between px-6">
          <Logo />

          <button
            type="button"
            onClick={onClose}
            aria-label="Close sidebar"
            className="
              rounded-lg
              p-2
              text-[#718079]
              transition
              hover:bg-[#F3F7F5]
              hover:text-[#153E30]
              lg:hidden
            "
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav
          className="
            min-h-0
            flex-1
            overflow-y-auto
            overflow-x-hidden
            px-4
            py-4
          "
        >
          <NavigationGroup
            label="MAIN"
            items={mainNavigation}
            onNavigate={onClose}
          />

          <NavigationGroup
            label="FINANCE"
            items={financeNavigation}
            onNavigate={onClose}
          />
        </nav>

        {/* Footer */}
        <div className="shrink-0 border-t border-[#E8EEEB] p-4">
          <NavLink
            to="/settings"
            onClick={onClose}
            className={navItemClasses}
          >
            <Settings className="h-4.5 w-4.5 shrink-0" />

            <span>Settings</span>
          </NavLink>

          <button
            type="button"
            onClick={handelLogout}
            className="
              mt-1
              flex
              w-full
              items-center
              gap-3
              rounded-lg
              px-3
              py-2.5
              text-sm
              text-[#718079]
              transition
              hover:bg-red-50
              hover:text-red-600
            "
          >
            <LogOut className="h-4.5 w-4.5 shrink-0" />

            <span>Sign out</span>
          </button>
        </div>
      </aside>
    </>
  );
}

const navItemClasses = ({
  isActive,
}: {
  isActive: boolean;
}) =>
  `
    mb-1
    flex
    items-center
    gap-3
    rounded-lg
    px-3
    py-2.5
    text-sm
    transition

    ${isActive
    ? "bg-[#E8F5EF] font-semibold text-[#197B5A]"
    : "text-[#718079] hover:bg-[#F3F7F5] hover:text-[#153E30]"
  }
  `;

interface NavigationGroupProps {
  label: string;
  items: NavigationItem[];
  onNavigate: () => void;
}

function NavigationGroup({
  label,
  items,
  onNavigate,
}: NavigationGroupProps) {
  return (
    <div className="mb-7">
      <p className="mb-2 px-3 text-[10px] font-bold tracking-[0.12em] text-[#A0AAA6]">
        {label}
      </p>

      {items.map((item) => {
        const Icon = item.icon;

        return (
          <NavLink
            key={item.href}
            to={item.href}
            onClick={onNavigate}
            className={navItemClasses}
          >
            <Icon className="h-4.5 w-4.5 shrink-0" />

            <span className="truncate">
              {item.name}
            </span>
          </NavLink>
        );
      })}
    </div>
  );
}