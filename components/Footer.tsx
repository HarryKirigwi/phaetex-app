"use client";

import { PhaetexLogo } from "./PhaetexLogo";

const resources = [
  { label: "Freebies", href: "#" },
  { label: "Documentation", href: "#" },
  { label: "Blog", href: "#" },
  { label: "Refund Policy", href: "#" },
];

const support = [
  { label: "Pricing", href: "#products" },
  { label: "FAQ", href: "#" },
  { label: "Support", href: "#contact" },
  { label: "License Terms", href: "#" },
  //{ label: "Discord", href: "#" },
];

const company = [
  { label: "About", href: "#about" },
  { label: "Contact Us", href: "#contact" },
];

const socials = [
  { label: "LinkedIn", href: "#", icon: "in" },
  { label: "Facebook", href: "#", icon: "f" },
  { label: "YouTube", href: "#", icon: "play" },
  //{ label: "GitHub", href: "#", icon: "gh" },
  //{ label: "Dribbble", href: "#", icon: "d" },
];

function SocialIcons({ className = "" }: { className?: string }) {
  return (
    <div className={`flex gap-2 ${className}`}>
      {socials.map(({ label, href, icon }) => (
        <a
          key={label}
          href={href}
          className="w-10 h-10 rounded-lg bg-white/10 hover:bg-accent-blue/20 flex items-center justify-center text-accent-blue hover:text-white transition-colors shrink-0"
          aria-label={label}
        >
          {icon === "in" && (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          )}
          {icon === "f" && (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
          )}
          {icon === "play" && (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
          )}
          {icon === "gh" && (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
              <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
            </svg>
          )}
          {icon === "d" && (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
              <path d="M12 24C5.385 24 0 18.615 0 12S5.385 0 12 0s12 5.385 12 12-5.385 12-12 12zm10.12-10.358c-.35-.11-3.17-.953-6.384-.438-1.733.334-2.235 1.059-2.235 1.059s-.572-1.878-2.497-2.838c-1.925-.96-3.644-.082-3.644-.082s-.943 1.41-.943 2.784c0 1.373.943 2.784.943 2.784s1.719-1.756 3.644-.082c1.925 1.674 2.497 2.838 2.497 2.838s.502-.725 2.235-1.059c3.214-.515 6.034.328 6.384.438.35.11.35.547.35.547s-.35.437-.35.547z"/>
            </svg>
          )}
        </a>
      ))}
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="bg-primary-dark text-gray-400 md:rounded-none rounded-t-3xl">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-8 md:pt-12 md:pb-8 lg:pt-16">
        {/* Mobile: logo centered at top */}
        <a href="#" className="flex justify-center md:hidden mb-8 transition-opacity hover:opacity-90 text-white w-full max-w-[280px] sm:max-w-[320px] mx-auto h-16 sm:h-20 md:h-24">
          <PhaetexLogo aria-hidden />
        </a>

        {/* Upper section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10">
          {/* Newsletter & Social */}
          <div className="lg:col-span-5 space-y-6 order-2 md:order-1">
            <div className="text-center md:text-left">
              <h3 className="font-bold text-white mb-2">Join our newsletter</h3>
              <p className="text-sm text-gray-400 mb-4 max-w-sm md:max-w-none mx-auto md:mx-0">
                Discover the features that will transform your customer relationships.
              </p>
              <form
                onSubmit={(e) => e.preventDefault()}
                className="flex rounded-xl overflow-hidden border border-gray-600 bg-primary-dark/80 focus-within:border-accent-blue/50 focus-within:ring-1 focus-within:ring-accent-blue/50 max-w-md md:max-w-none mx-auto md:mx-0"
              >
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="flex-1 min-w-0 px-4 py-3 bg-transparent text-white placeholder-gray-500 focus:outline-none text-sm"
                  aria-label="Email for newsletter"
                />
                <button
                  type="submit"
                  className="p-3 bg-accent-blue text-white hover:bg-accent-blue/90 transition-colors shrink-0"
                  aria-label="Subscribe"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </button>
              </form>
            </div>
            <div className="hidden md:block">
              <h3 className="font-bold text-white mb-3">Follow us on</h3>
              <SocialIcons />
            </div>
          </div>

          {/* Resources */}
          <div className="lg:col-span-2 order-3 md:order-2">
            <h3 className="font-bold text-white mb-4">Resources</h3>
            <ul className="space-y-2">
              {resources.map(({ label, href }) => (
                <li key={label}>
                  <a href={href} className="text-gray-400 hover:text-white transition-colors text-sm">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support + Company: on mobile two columns side by side */}
          <div className="grid grid-cols-2 gap-6 md:contents order-4 md:order-3">
          {/* Support */}
          <div className="lg:col-span-2">
            <h3 className="font-bold text-white mb-4">Support</h3>
            <ul className="space-y-2">
              {support.map(({ label, href }) => (
                <li key={label}>
                  <a href={href} className="text-gray-400 hover:text-white transition-colors text-sm">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="lg:col-span-3">
            <h3 className="font-bold text-white mb-4">Company</h3>
            <ul className="space-y-2">
              {company.map(({ label, href }) => (
                <li key={label}>
                  <a href={href} className="text-gray-400 hover:text-white transition-colors text-sm">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          </div>
        </div>

        {/* Separator */}
        <div className="mt-10 md:mt-12 pt-8 border-t border-gray-600/80" />

        {/* Mobile: social icons centered below separator */}
        <div className="flex justify-center md:hidden mb-6">
          <SocialIcons className="justify-center" />
        </div>

        {/* Lower section: mobile = stacked centered; desktop = logo left, copyright right */}
        <div className="mt-6 md:mt-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <a href="#" className="hidden md:inline-flex items-center transition-opacity hover:opacity-90 shrink-0 text-white w-40 h-10 lg:w-48 lg:h-12">
            <PhaetexLogo aria-hidden />
          </a>
          {/* Mobile: stacked centered with underlined links */}
          <div className="flex flex-col items-center gap-2 text-center md:hidden">
            <p className="text-sm text-gray-500">
              Copyright © {new Date().getFullYear()} Phaetex Solutions
            </p>
            <a href="/privacy" className="text-sm text-gray-500 hover:text-white transition-colors border-b border-gray-500 pb-0.5">Privacy Policy</a>
            <a href="#" className="text-sm text-gray-500 hover:text-white transition-colors border-b border-gray-500 pb-0.5">Terms & Conditions</a>
          </div>
          {/* Desktop: single line with pipes */}
          <p className="hidden md:block text-sm text-gray-500">
            Copyright © {new Date().getFullYear()} Phaetex Solutions{" "}
            <span className="text-gray-600">|</span>{" "}
            <a href="/privacy" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a>{" "}
            <span className="text-gray-600">|</span>{" "}
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Terms & Conditions</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
