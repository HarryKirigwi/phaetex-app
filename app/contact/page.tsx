import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Call Request | Phaetex Solutions",
  description:
    "Request a consultation call with Phaetex Solutions about managed e-commerce and custom software.",
};

export default function ContactCallRequestPage() {
  return (
    <div className="min-h-screen bg-white text-primary-dark dark:bg-primary-dark dark:text-gray-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 sm:pt-24 sm:pb-20">
        <Link
          href="/#products"
          className="inline-flex items-center gap-2 text-gray-500 hover:text-accent-blue transition-colors text-sm mb-8"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to products
        </Link>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* Left: intro copy + company contact details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary-dark dark:text-white mb-4">
                Call Request Form
              </h1>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4 max-w-lg">
                Complete these fields to book your consultation. Phaetex
                Solutions helps you scale your online presence with managed
                e-commerce and custom software.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="rounded-2xl bg-gray-200/80 dark:bg-primary-dark/80 border border-gray-200 dark:border-gray-700 p-5 sm:col-span-2">
                <span
                  className="inline-flex w-10 h-10 rounded-lg bg-white/50 dark:bg-white/10 items-center justify-center text-primary-dark dark:text-white mb-3"
                  aria-hidden
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </span>
                <h2 className="font-semibold text-primary-dark dark:text-white mb-1">
                  Visit us
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Nairobi, Kenya
                </p>
              </div>

              <div className="rounded-2xl bg-gray-200/80 dark:bg-primary-dark/80 border border-gray-200 dark:border-gray-700 p-5">
                <span
                  className="inline-flex w-10 h-10 rounded-lg bg-white/50 dark:bg-white/10 items-center justify-center text-primary-dark dark:text-white mb-3"
                  aria-hidden
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </span>
                <h2 className="font-semibold text-primary-dark dark:text-white mb-1">
                  Email us
                </h2>
                <a
                  href="mailto:sales@phaetex.com"
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-accent-blue dark:hover:text-accent-blue transition-colors"
                >
                  sales@phaetex.com
                </a>
              </div>

              <div className="rounded-2xl bg-gray-200/80 dark:bg-primary-dark/80 border border-gray-200 dark:border-gray-700 p-5">
                <span
                  className="inline-flex w-10 h-10 rounded-lg bg-white/50 dark:bg-white/10 items-center justify-center text-primary-dark dark:text-white mb-3"
                  aria-hidden
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </span>
                <h2 className="font-semibold text-primary-dark dark:text-white mb-1">
                  Call / WhatsApp
                </h2>
                <a
                  href="https://wa.me/254743684477"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-accent-blue dark:hover:text-accent-blue transition-colors"
                >
                  +254 743 684 477
                </a>
              </div>
            </div>
          </div>

          {/* Right: form – styled like main contact form */}
          <form className="rounded-2xl bg-gray-200/80 dark:bg-primary-dark/80 border border-gray-200 dark:border-gray-700 p-6 sm:p-8 space-y-5">
            <div>
              <label
                htmlFor="call-full-name"
                className="block text-sm font-medium text-primary-dark dark:text-white mb-1.5"
              >
                Full Name
              </label>
              <input
                id="call-full-name"
                type="text"
                placeholder="Enter your name"
                className="w-full px-4 py-3 rounded-xl bg-white dark:bg-primary-dark/60 border border-gray-300 dark:border-gray-600 text-primary-dark dark:text-white placeholder-gray-500 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent-blue/50 focus:border-accent-blue"
              />
            </div>

            <div>
              <label
                htmlFor="call-business-name"
                className="block text-sm font-medium text-primary-dark dark:text-white mb-1.5"
              >
                Business Name
              </label>
              <input
                id="call-business-name"
                type="text"
                placeholder="Enter your shop or project name"
                className="w-full px-4 py-3 rounded-xl bg-white dark:bg-primary-dark/60 border border-gray-300 dark:border-gray-600 text-primary-dark dark:text-white placeholder-gray-500 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent-blue/50 focus:border-accent-blue"
              />
            </div>

            <div>
              <label
                htmlFor="call-phone"
                className="block text-sm font-medium text-primary-dark dark:text-white mb-1.5"
              >
                Phone Number
              </label>
              <input
                id="call-phone"
                type="tel"
                placeholder="Provide your M-Pesa or WhatsApp number"
                className="w-full px-4 py-3 rounded-xl bg-white dark:bg-primary-dark/60 border border-gray-300 dark:border-gray-600 text-primary-dark dark:text-white placeholder-gray-500 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent-blue/50 focus:border-accent-blue"
              />
            </div>

            <div>
              <label
                htmlFor="call-email"
                className="block text-sm font-medium text-primary-dark dark:text-white mb-1.5"
              >
                Email Address
              </label>
              <input
                id="call-email"
                type="email"
                placeholder="Provide your email"
                className="w-full px-4 py-3 rounded-xl bg-white dark:bg-primary-dark/60 border border-gray-300 dark:border-gray-600 text-primary-dark dark:text-white placeholder-gray-500 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent-blue/50 focus:border-accent-blue"
              />
            </div>

            <div>
              <p className="block text-sm font-medium text-primary-dark dark:text-white mb-1.5">
                Primary Interest
              </p>
              <div className="grid sm:grid-cols-2 gap-3">
                <label className="flex items-center gap-2 px-3 py-3 rounded-xl bg-white dark:bg-primary-dark/60 border border-gray-300 dark:border-gray-600 text-sm cursor-pointer">
                  <input
                    type="radio"
                    name="call-primary-interest"
                    value="managed-ecommerce"
                    className="text-accent-blue focus:ring-accent-blue/60"
                  />
                  <span className="text-primary-dark dark:text-white">
                    Managed E-commerce
                  </span>
                </label>
                <label className="flex items-center gap-2 px-3 py-3 rounded-xl bg-white dark:bg-primary-dark/60 border border-gray-300 dark:border-gray-600 text-sm cursor-pointer">
                  <input
                    type="radio"
                    name="call-primary-interest"
                    value="custom-software"
                    className="text-accent-blue focus:ring-accent-blue/60"
                  />
                  <span className="text-primary-dark dark:text-white">
                    Custom Software
                  </span>
                </label>
              </div>
            </div>

            <div>
              <label
                htmlFor="call-challenge"
                className="block text-sm font-medium text-primary-dark dark:text-white mb-1.5"
              >
                Current Challenge
              </label>
              <textarea
                id="call-challenge"
                rows={4}
                placeholder="Describe your main digital hurdle."
                className="w-full px-4 py-3 rounded-xl bg-white dark:bg-primary-dark/60 border border-gray-300 dark:border-gray-600 text-primary-dark dark:text-white placeholder-gray-500 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent-blue/50 focus:border-accent-blue resize-y"
              />
            </div>

            <div>
              <p className="block text-sm font-medium text-primary-dark dark:text-white mb-1.5">
                Preferred Calling Time
              </p>
              <div className="grid sm:grid-cols-2 gap-3">
                <label className="flex items-center gap-2 px-3 py-3 rounded-xl bg-white dark:bg-primary-dark/60 border border-gray-300 dark:border-gray-600 text-sm cursor-pointer">
                  <input
                    type="radio"
                    name="call-preferred-time"
                    value="morning"
                    className="text-accent-blue focus:ring-accent-blue/60"
                  />
                  <span className="text-primary-dark dark:text-white">
                    Morning (9:00 AM to 11:00 AM)
                  </span>
                </label>
                <label className="flex items-center gap-2 px-3 py-3 rounded-xl bg-white dark:bg-primary-dark/60 border border-gray-300 dark:border-gray-600 text-sm cursor-pointer">
                  <input
                    type="radio"
                    name="call-preferred-time"
                    value="afternoon"
                    className="text-accent-blue focus:ring-accent-blue/60"
                  />
                  <span className="text-primary-dark dark:text-white">
                    Afternoon (2:00 PM to 4:00 PM)
                  </span>
                </label>
              </div>
            </div>

            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl font-medium bg-accent-blue text-white hover:bg-accent-blue/90 transition-colors shadow-lg shadow-accent-blue/20"
            >
              Submit Request
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

