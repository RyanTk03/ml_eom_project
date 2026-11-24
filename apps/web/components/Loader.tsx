import React from "react";

interface LoaderProps {
  variant?: "inline" | "card" | "fullscreen";
  label?: string;
}

export function Loader({ variant = "card", label }: LoaderProps) {
  if (variant === "inline") {
    return (
      <span
        role="status"
        aria-label={label || "Loading"}
        className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"
      />
    );
  }

  const spinner = (
    <div
      role="status"
      className="flex flex-col items-center justify-center gap-3"
    >
      <div className="relative flex h-11 w-11 items-center justify-center">
        {/* Halo subtil */}
        <span className="absolute inset-0 rounded-full bg-accent/15 blur-sm" />
        {/* Anneau externe */}
        <span className="h-10 w-10 animate-spin rounded-full border-2 border-subtle border-t-accent" />
        {/* Point central pulsant */}
        <span className="absolute h-2 w-2 rounded-full bg-accent animate-pulse" />
      </div>
      {label && (
        <p className="font-mono text-xs uppercase tracking-wider text-secondary">
          {label}
        </p>
      )}
    </div>
  );

  if (variant === "fullscreen") {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-canvas/85 bg-telemetry-grid backdrop-blur-sm">
        {spinner}
      </div>
    );
  }

  return (
    <div className="flex min-h-[180px] w-full items-center justify-center rounded-xl border border-subtle bg-surface/70 p-6">
      {spinner}
    </div>
  );
}
