import type { Metadata } from "next";
import Link from "next/link";
import CallRequestForm from "@/components/CallRequestForm";

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
          <CallRequestForm />
        </div>
      </div>
    </div>
  );
}

