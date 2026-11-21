"use client";

import { useEffect, useState } from "react";

const Footer = () => {
  const [year, setYear] = useState<number | null>(null);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="border-t border-subtle bg-canvas py-10 text-sm text-muted">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 sm:flex-row">
        <div className="font-mono text-xs">
          © {year ?? 2026} MODELFORGE • MULTI-PROJECT ML GOVERNANCE PLATFORM
        </div>
        <div className="flex gap-6 text-xs">
          <a href="#" className="hover:text-secondary">Templates</a>
          <a href="#" className="hover:text-secondary">Governance Rules</a>
          <a href="#" className="hover:text-secondary">GitHub App</a>
          <a href="#" className="hover:text-secondary">System Status</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
