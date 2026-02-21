"use client";

type ThemeToggleProps = { variant?: "default" | "light" };

export default function ThemeToggle({ variant = "default" }: ThemeToggleProps) {
  function toggle() {
    const html = document.documentElement;
    const isDark = html.classList.contains("dark");
    if (isDark) {
      html.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      html.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
  }

  const buttonClass =
    variant === "light"
      ? "rounded-lg p-2 text-gray-200 hover:text-white hover:bg-white/10 transition-colors"
      : "rounded-lg p-2 text-primary-dark dark:text-gray-100 hover:bg-black/10 dark:hover:bg-white/10 transition-colors";

  return (
    <button
      type="button"
      onClick={toggle}
      className={buttonClass}
      aria-label="Toggle light/dark mode"
    >
      {/* Sun: shown in dark mode (click to switch to light) */}
      <span className="hidden dark:inline" aria-hidden>
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      </span>
      {/* Moon: shown in light mode (click to switch to dark) */}
      <span className="dark:hidden" aria-hidden>
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>
      </span>
    </button>
  );
}
