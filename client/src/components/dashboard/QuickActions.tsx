import {
  ArrowDownLeft,
  ArrowUpRight,
  Plus,
  Receipt,
} from "lucide-react";
import { Link } from "react-router-dom";

const actions = [
  {
    label: "Add transaction",
    href: "/transactions/new",
    icon: Plus,
    className:
      "bg-[#153E30] text-white hover:bg-[#1B4B3A]",
  },
  {
    label: "Record income",
    href: "/transactions/new?type=income",
    icon: ArrowDownLeft,
    className:
      "bg-[#E8F5EF] text-[#197B5A] hover:bg-[#DCEFE7]",
  },
  {
    label: "Record expense",
    href: "/transactions/new?type=expense",
    icon: ArrowUpRight,
    className:
      "bg-[#F4F1ED] text-[#806D5B] hover:bg-[#EEE9E3]",
  },
  {
    label: "Record payment",
    href: "/payments/new",
    icon: Receipt,
    className:
      "bg-[#EAF0F6] text-[#547493] hover:bg-[#E1E9F1]",
  },
];

export function QuickActions() {
  return (
    <div>
      <div className="mb-3">
        <h3 className="text-sm font-bold text-[#26362F]">
          Quick actions
        </h3>

        <p className="mt-1 text-xs text-[#89958F]">
          Common tasks
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <Link
              key={action.label}
              to={action.href}
              className={`flex min-h-23 flex-col justify-between rounded-xl p-4 transition ${action.className}`}
            >
              <Icon className="h-5 w-5" />

              <span className="text-xs font-semibold">
                {action.label}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}