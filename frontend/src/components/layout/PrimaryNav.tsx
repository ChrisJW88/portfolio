"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Projects" },
  { href: "/dashboard", label: "Dashboard" }
];

export function PrimaryNav() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-30 bg-midnight/80 backdrop-blur-lg border-b border-white/10">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <Link href="/" className="font-display text-lg tracking-wide">
          Chris Wilson
        </Link>
        <nav className="flex items-center gap-2">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-full px-4 py-1 text-sm transition-all ${
                  isActive
                    ? "bg-gradient-to-r from-aurora to-signal text-midnight shadow-glow"
                    : "text-textSecondary hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}

