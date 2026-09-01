import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

interface PasswordInputProps {
  label: string;
  id: string;
  name: string;
  value?: string;
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
  placeholder?: string;
  error?: string;
}

export function PasswordInput({
  label,
  id,
  value,
  onChange,
  placeholder = "••••••••",
  name = "",
  error,
}: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="space-y-2">
      <label
        htmlFor={id}
        className="text-sm font-medium text-[#33443C]"
      >
        {label}
      </label>

      <div className="relative">
        <input
          id={id}
          type={showPassword ? "text" : "password"}
          value={value}
          name={name}
          onChange={onChange}
          placeholder={placeholder}
          className={`h-11 w-full rounded-lg border bg-white px-3.5 pr-11 text-sm text-[#18231F] outline-none transition placeholder:text-[#A0AAA6] focus:border-[#1C9A6E] focus:ring-4 focus:ring-[#1C9A6E]/10 ${error
            ? "border-red-400"
            : "border-[#DDE6E2]"
            }`}
        />

        <button
          type="button"
          onClick={() => setShowPassword((value) => !value)}
          className="absolute right-0 top-0 flex h-11 w-11 items-center justify-center text-[#89958F] transition hover:text-[#153E30]"
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? (
            <EyeOff className="h-4 w-4" />
          ) : (
            <Eye className="h-4 w-4" />
          )}
        </button>
      </div>

      {error && (
        <p className="text-xs text-red-500">{error}</p>
      )}
    </div>
  );
}