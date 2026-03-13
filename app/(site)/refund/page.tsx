import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Refund Policy | Phaetex Solutions",
  description:
    "Phaetex Solutions refund policy for AI Humanizer credits, subscriptions, and related services.",
};

const sections = [
  {
    number: 1,
    title: "Scope",
    body:
      "This policy covers all Phaetex Solutions software products. This policy covers all service credits.",
  },
  {
    number: 2,
    title: "Humanization credits",
    body:
      "You purchase credits for the AI Humanizer. These credit purchases are final. Phaetex Solutions does not issue refunds for purchased credits. You use your credits at your own discretion.",
  },
  {
    number: 3,
    title: "Monthly subscriptions",
    body:
      "Phaetex Solutions offers monthly subscriptions for software. All monthly subscription payments are non-refundable. You pay for the full month of access. We do not provide partial refunds for unused days within a billing cycle. You cancel your subscription to prevent future charges.",
  },
  {
    number: 4,
    title: "Product issues",
    body:
      "We strive for quality software. Reach out to support@phaetex.com for issues with our products. Email our support team with your account details. Explain the technical problem in detail. Our team works to resolve your concern.",
  },
  {
    number: 5,
    title: "Modifications",
    body:
      "Phaetex Solutions updates this refund policy. We post updates on this website. Your use of our services confirms your agreement to this policy.",
  },
];

export default function RefundPage() {
  return (
    <div className="min-h-screen bg-white text-primary-dark dark:bg-primary-dark dark:text-gray-100">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm mb-10"
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
          Back to home
        </Link>

        <h1 className="text-2xl sm:text-3xl font-bold text-primary-dark dark:text-white mb-2">
          Phaetex Solutions Refund Policy
        </h1>
        <p className="text-gray-800 dark:text-gray-300 mb-12 leading-relaxed">
          This refund policy explains how Phaetex Solutions handles payments,
          credits, and subscription cancellations for our products and
          services.
        </p>

        <div className="space-y-10">
          {sections.map((section) => (
            <section key={section.number} className="space-y-3">
              <h2 className="text-lg sm:text-xl font-bold text-primary-dark dark:text-white">
                {section.number}. {section.title}
              </h2>
              <p className="text-gray-900 dark:text-gray-200 leading-relaxed">{section.body}</p>
            </section>
          ))}
        </div>

        <div className="mt-14 pt-8 border-t border-gray-700">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-accent-blue hover:text-accent-blue/90 transition-colors text-sm"
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
            Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}

