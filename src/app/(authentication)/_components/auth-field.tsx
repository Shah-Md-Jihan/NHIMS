import type { ReactNode } from "react";

type AuthFieldProps = {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  icon?: ReactNode;
  trailing?: ReactNode;
  type?: "text" | "email" | "password";
  autoComplete?: string;
  placeholder?: string;
  error?: string;
  hint?: string;
  required?: boolean;
  onBlur?: () => void;
};

export const AuthField = ({
  id,
  label,
  value,
  onChange,
  icon,
  trailing,
  type = "text",
  autoComplete,
  placeholder,
  error,
  hint,
  required,
  onBlur,
}: AuthFieldProps) => {
  const errorId = error ? `${id}-error` : undefined;
  const hintId = hint ? `${id}-hint` : undefined;
  const describedBy = [errorId, hintId].filter(Boolean).join(" ") || undefined;

  const inputClass = [
    "h-12 w-full rounded-lg border bg-white text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:ring-4",
    icon ? "pl-11" : "pl-4",
    trailing ? "pr-16" : "pr-4",
    error
      ? "border-red-400 focus:border-red-500 focus:ring-red-500/10"
      : "border-zinc-200 focus:border-teal-600 focus:ring-teal-600/10",
  ].join(" ");

  return (
    <div className="space-y-2">
      <label className="block text-[13px] font-medium text-zinc-800" htmlFor={id}>
        {label}
      </label>
      <div className="relative">
        {icon ? (
          <span className="pointer-events-none absolute left-4 top-1/2 flex size-[18px] -translate-y-1/2 items-center justify-center text-zinc-400">
            {icon}
          </span>
        ) : null}
        <input
          aria-describedby={describedBy}
          aria-invalid={error ? true : undefined}
          autoComplete={autoComplete}
          className={inputClass}
          id={id}
          name={id}
          onBlur={onBlur}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          required={required}
          type={type}
          value={value}
        />
        {trailing ? (
          <div className="absolute right-2 top-1/2 -translate-y-1/2">{trailing}</div>
        ) : null}
      </div>
      {error ? (
        <p className="text-xs font-medium text-red-600" id={errorId}>
          {error}
        </p>
      ) : hint ? (
        <p className="text-xs text-zinc-500" id={hintId}>
          {hint}
        </p>
      ) : null}
    </div>
  );
};
