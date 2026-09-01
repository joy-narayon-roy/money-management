import { AlertCircle, X } from "lucide-react";

interface AuthErrorProps {
    message: string;
    onClose?: () => void;
}

export function AuthError({
    message,
    onClose,
}: AuthErrorProps) {
    return (
        <div className="mb-5 flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 px-3.5 py-3 text-sm text-red-700">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />

            <p className="flex-1 leading-5">{message}</p>

            {onClose && (
                <button
                    type="button"
                    onClick={onClose}
                    className="text-red-400 transition hover:text-red-600"
                    aria-label="Close error"
                >
                    <X className="h-4 w-4" />
                </button>
            )}
        </div>
    );
}