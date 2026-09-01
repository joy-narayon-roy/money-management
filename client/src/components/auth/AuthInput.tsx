import { type InputHTMLAttributes, forwardRef } from "react";

interface AuthInputProps
    extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    error?: string;
}

export const AuthInput = forwardRef<HTMLInputElement, AuthInputProps>(
    ({ label, error, id, ...props }, ref) => {
        return (
            <div className="space-y-2">
                <label
                    htmlFor={id}
                    className="text-sm font-medium text-[#33443C]"
                >
                    {label}
                </label>

                <input
                    ref={ref}
                    id={id}
                    className={`h-11 w-full rounded-lg border bg-white px-3.5 text-sm text-[#18231F] outline-none transition placeholder:text-[#A0AAA6] focus:border-primary focus:ring-4 focus:ring-[#1C9A6E]/10 ${error
                        ? "border-red-400 focus:border-red-500 focus:ring-red-500/10"
                        : "border-[#DDE6E2]"
                        }`}
                    {...props}
                />

                {error && (
                    <p className="text-xs text-red-500">{error}</p>
                )}
            </div>
        );
    }
);

AuthInput.displayName = "AuthInput";