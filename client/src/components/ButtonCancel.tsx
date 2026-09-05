import type React from "react";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    loading?: boolean;
    onClick?: () => void
}

export default function ButtonCancel({
    loading,
    children,
    ...props
}: Props) {
    return (
        <button
            {...props}
            disabled={loading}
            type="button"
            className="rounded-xl border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
        >
            {children || "Cancel"}
        </button>
    );
}