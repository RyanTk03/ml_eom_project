import React from "react";
import { LucideIcon } from "lucide-react";
import { UseFormRegisterReturn } from "react-hook-form";

interface FormFieldProps extends UseFormRegisterReturn {
  id: string;
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
  icon: LucideIcon;
  rightElement?: React.ReactNode;
  error?: string;
}

export function FormField({
  id,
  name,
  label,
  type = "text",
  placeholder,
  autoComplete,
  icon: Icon,
  rightElement,
  error,
  ...others
}: FormFieldProps) {
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <label
          htmlFor={id}
          className="block text-xs font-mono uppercase tracking-wider text-secondary"
        >
          {label}
        </label>
        {rightElement}
      </div>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted">
          <Icon className="h-4 w-4" />
        </div>
        <input
          id={id}
          name={name}
          type={type}
          autoComplete={autoComplete}
          required
          placeholder={placeholder}
          className="w-full rounded-lg border border-subtle bg-canvas pl-10 pr-4 py-2.5 text-sm text-primary placeholder:text-muted focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent transition-colors font-mono"
          {...others}
        />
        {error && (
          <p className="mt-1 text-xs font-mono text-status-critical">
            {error}
          </p>
        )}
      </div>
    </div>
  );
}
