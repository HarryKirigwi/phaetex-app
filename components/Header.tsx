"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import ThemeToggle from "./ThemeToggle";
import { PhaetexLogo } from "./PhaetexLogo";

const SCROLL_THRESHOLD = 24;

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#products", label: "Products" },
  { href: "#contact", label: "Contact" },
];

const LEGAL_PATHS = ["/privacy", "/terms", "/refund"];

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  const isLegalPage = LEGAL_PATHS.includes(pathname ?? "");

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > SCROLL_THRESHOLD);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const useScrolledStyle = isLegalPage || scrolled;
  const useDarkNavbar = !useScrolledStyle;

  const headerClasses = useDarkNavbar
    ? "bg-transparent border-b border-white/5"
    : "bg-white/90 dark:bg-primary-dark/95 backdrop-blur-xl border-b border-gray-200/80 dark:border-gray-700/80 shadow-[0_1px_0_0_rgba(0,155,229,0.12)] dark:shadow-[0_1px_0_0_rgba(0,155,229,0.2)]";

  const logoClasses = useDarkNavbar
    ? "text-white"
    : "text-primary-dark dark:text-white";

  const linkClasses = useDarkNavbar
    ? "text-gray-200 hover:text-white hover:bg-white/10"
    : "text-gray-600 hover:text-primary-dark hover:bg-accent-blue/10 dark:text-gray-300 dark:hover:text-white dark:hover:bg-white/10";

  const mobileContactClasses = useDarkNavbar
    ? "text-gray-200 hover:text-white hover:bg-white/10"
    : "text-gray-600 hover:text-primary-dark hover:bg-accent-blue/10 dark:text-gray-300 dark:hover:text-white dark:hover:bg-white/10";

  const themeVariant = useScrolledStyle ? "default" : "light";

  const sectionHref = (hash: string) => (isLegalPage ? `/${hash}` : hash);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${headerClasses}`}
    >
      <nav
        className="w-full flex items-center justify-between h-16 sm:h-[4.25rem]"
        style={{ paddingLeft: "var(--content-inset-x)", paddingRight: "var(--content-inset-x)" }}
      >
        <div className="max-w-6xl mx-auto w-full flex items-center justify-between">
        <a
          href={isLegalPage ? "/" : "#"}
          className={`inline-flex items-center transition-colors duration-300 hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue/50 focus-visible:ring-offset-2 ${logoClasses}`}
          aria-label="Phaetex Solutions home"
        >
          <span className="inline-block w-[140px] h-9 sm:w-[160px] sm:h-10 md:w-[180px] md:h-[2.75rem] max-h-[3.25rem]">
            <PhaetexLogo aria-hidden />
          </span>
        </a>
        <div className="flex items-center gap-1 sm:gap-2">
          {navLinks.map(({ href, label }) => (
            <a
              key={href}
              href={sectionHref(href)}
              className={`hidden sm:inline-flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-all ${linkClasses}`}
            >
              {label}
            </a>
          ))}
          <a
            href={sectionHref("#contact")}
            className={`sm:hidden inline-flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-all ${mobileContactClasses}`}
          >
            Contact
          </a>
          <ThemeToggle variant={themeVariant} />
        </div>
        </div>
      </nav>
    </header>
  );
}
