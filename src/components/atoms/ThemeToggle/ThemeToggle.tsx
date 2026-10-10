"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      aria-label="Toggle light and dark mode"
      className="hover:cursor-pointer hover:text-custom-blue"
    >
      {/* icons swap via CSS so server and client render the same markup */}
      <Sun className="hidden dark:block" />
      <Moon className="dark:hidden" />
    </button>
  );
}
