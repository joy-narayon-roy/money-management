import {
  ArrowUpRight,
  Eye,
  EyeOff,
} from "lucide-react";
import { useState } from "react";

interface BalanceCardProps {
  balance?: number;
  change?: number;
}

export function BalanceCard({
  balance = 0,
  change = 0,
}: BalanceCardProps) {
  const [visible, setVisible] = useState(true);

  const formattedBalance = balance.toLocaleString(
    "en-BD",
    {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }
  );

  return (
    <div className="relative overflow-hidden rounded-2xl bg-[#153E30] p-6 text-white shadow-[0_15px_35px_rgba(21,62,48,0.18)]">
      {/* Decorative circles */}
      <div className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full border border-white/10" />
      <div className="pointer-events-none absolute -right-8 -top-12 h-40 w-40 rounded-full border border-white/10" />

      <div className="relative">
        <div className="flex items-center justify-between">
          <p className="text-sm text-[#B8D3C8]">
            Current balance
          </p>

          <button
            onClick={() => setVisible(!visible)}
            className="rounded-lg p-1.5 text-[#A9C9BC] transition hover:bg-white/10 hover:text-white"
          >
            {visible ? (
              <Eye className="h-4 w-4" />
            ) : (
              <EyeOff className="h-4 w-4" />
            )}
          </button>
        </div>

        <div className="mt-3 flex items-end gap-3">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
            {visible ? `৳${formattedBalance}` : "৳••••••"}
          </h2>

          <span className="mb-1 flex items-center gap-1 rounded-full bg-[#55D59D]/15 px-2 py-1 text-[11px] font-semibold text-[#83E4B9]">
            <ArrowUpRight className="h-3 w-3" />
            {change}%
          </span>
        </div>

        <p className="mt-2 text-xs text-[#9FBEB1]">
          Compared with last month
        </p>
      </div>
    </div>
  );
}