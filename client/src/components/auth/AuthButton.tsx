import type { ButtonHTMLAttributes } from "react";
import { Loader2 } from "lucide-react";

interface AuthButtonProps
    extends ButtonHTMLAttributes<HTMLButtonElement> {
    loading?: boolean;
}

export function AuthButton({
    children,
    loading = false,
    disabled,
    ...props
}: AuthButtonProps) {
    return (
        <button
            disabled={disabled || loading}
            className="flex h-11 w-full items-center justify-center rounded-lg bg-[#153E30] px-4 text-sm font-semibold text-white shadow-[0_8px_20px_rgba(21,62,48,0.18)] transition hover:bg-[#1B4B3A] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
            {...props}
        >
            {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
                children
            )}
        </button>
    );
}