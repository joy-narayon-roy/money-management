import type { ReactNode } from "react";

interface TransactionFieldProps {
  label: string;
  optional?: boolean;
  children: ReactNode;
  error_message?: string | null
}

export default function TransactionField({
  label,
  optional = false,
  children,
  error_message
}: TransactionFieldProps) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-gray-700">
        {label}

        {optional && (
          <span className="ml-1 font-normal text-gray-400">
            (optional)
          </span>
        )}
      </label>

      {children}
      {error_message && <span className="pl-2 text-[0.75rem] text-red-500">{error_message || ""}</span>}

    </div>
  );
}