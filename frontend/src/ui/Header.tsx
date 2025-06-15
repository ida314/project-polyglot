// src/ui/Header.tsx
import { Link, NavLink } from "react-router-dom";
import { BookOpen } from "lucide-react";
import LoginButton from "@/features/auth/LoginButton";

export default function Header() {
  return (
    <header className="border-b border-zinc-200 dark:border-zinc-800">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        {/* Logo / Home */}
        <Link
          to="/"
          className="flex items-center gap-2 text-lg font-semibold tracking-tight"
        >
          {/* replace with your SVG/logo if you have one */}
          <span className="text-primary-600 dark:text-primary-400">Polyglot</span>
        </Link>

        {/* Center nav (hidden on small screens) */}
        <nav className="hidden md:flex items-center gap-6">
          <NavLink
            to="/review"
            className={({ isActive }) =>
              [
                "flex items-center gap-1 text-sm font-medium transition-colors",
                isActive
                  ? "text-primary-600 dark:text-primary-400"
                  : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white",
              ].join(" ")
            }
          >
            <BookOpen size={16} />
            Review
          </NavLink>
        </nav>

        {/* Auth */}
        <LoginButton />
      </div>
    </header>
  );
}
