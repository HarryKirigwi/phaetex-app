"use client";

import { useState, useEffect } from "react";
import ThemeToggle from "./ThemeToggle";

const SCROLL_THRESHOLD = 24;

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#products", label: "Products" },
  { href: "#contact", label: "Contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > SCROLL_THRESHOLD);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 dark:bg-primary-dark/95 backdrop-blur-xl border-b border-gray-200/80 dark:border-gray-700/80 shadow-[0_1px_0_0_rgba(0,155,229,0.12)] dark:shadow-[0_1px_0_0_rgba(0,155,229,0.2)]"
          : "bg-transparent border-b border-white/5"
      }`}
    >
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16 sm:h-[4.25rem]">
        <a
          href="#"
          className={`inline-flex items-center gap-2 font-semibold text-lg tracking-tight transition-colors ${
            scrolled
              ? "text-primary-dark dark:text-white"
              : "text-white hover:text-gray-200"
          }`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-accent-blue shrink-0" aria-hidden />
          Phaetex Solutions
        </a>
        <div className="flex items-center gap-1 sm:gap-2">
          {navLinks.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className={`hidden sm:inline-flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                scrolled
                  ? "text-gray-600 hover:text-primary-dark hover:bg-accent-blue/10 dark:text-gray-300 dark:hover:text-white dark:hover:bg-white/10"
                  : "text-gray-200 hover:text-white hover:bg-white/10"
              }`}
            >
              {label}
            </a>
          ))}
          <a
            href="#contact"
            className="sm:hidden inline-flex items-center px-3 py-2 rounded-lg text-sm font-medium text-gray-200 hover:text-white hover:bg-white/10 transition-all"
          >
            Contact
          </a>
          <ThemeToggle variant={scrolled ? "default" : "light"} />
        </div>
      </nav>
    </header>
  );
}
