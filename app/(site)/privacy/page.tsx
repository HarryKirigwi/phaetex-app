import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy | Phaetex Solutions",
  description:
    "Phaetex Solutions privacy policy. How we collect, use, and protect your data under the Kenya Data Protection Act 2019.",
};

const sections = [
  {
    number: 1,
    title: "Data we collect",
    body: "We collect names and email addresses. We collect billing details through payment processors. Our AI Humanizer collects text you provide. Our e-commerce platform collects product details and customer transaction records. Our system logs IP addresses and device types.",
  },
  {
    number: 2,
    title: "Lawful basis for processing",
    body: "We process data to fulfill our contract with you. We process data with your consent. We process data to meet legal obligations.",
  },
  {
    number: 3,
    title: "Data usage",
    body: "We use data to create accounts. We use data to process payments. We use data to provide technical support. We use data to improve our software. Our AI Humanizer processes text to generate natural prose. We do not use your provided text to train external models.",
  },
  {
    number: 4,
    title: "Data sharing",
    body: "We share data with hosting providers. We share data with payment gateways. We do not sell your personal information. We disclose data when law requires.",
  },
  {
    number: 5,
    title: "Data safety",
    body: "We use encryption. We monitor our servers. No electronic storage method is perfect. We protect data from unauthorized access. We report data breaches to officials before 72 hours pass.",
  },
  {
    number: 6,
    title: "Your rights",
    body: "You request access to your data. You request correction of inaccurate data. You request deletion of your data. You object to data processing for marketing. You request a copy of your data in a portable format.",
  },
  {
    number: 7,
    title: "Data retention",
    body: "We keep data as long as necessary for our services. We delete data when you close your account.",
  },
  {
    number: 8,
    title: "Cookies",
    body: "Our platform uses cookies. Cookies track your session. You manage cookie settings in your browser.",
  },
  {
    number: 9,
    title: "Policy changes",
    body: "We update this policy. We notify you of changes on this platform.",
  },
  {
    number: 10,
    title: "Contact us",
    body: "Contact Phaetex Solutions through our platform. Address questions to our support team.",
  },
];

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white text-primary-dark dark:bg-primary-dark dark:text-gray-100">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm mb-10"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to home
        </Link>

        <h1 className="text-2xl sm:text-3xl font-bold text-primary-dark dark:text-white mb-2">
          Phaetex Solutions Privacy Policy
        </h1>
        <p className="text-gray-800 dark:text-gray-300 mb-12 leading-relaxed">
          Phaetex Solutions protects your personal data. We comply with the Kenya Data Protection Act 2019. This document explains our data practices.
        </p>

        <div className="space-y-10">
          {sections.map((section) => (
            <section key={section.number} className="space-y-3">
              <h2 className="text-lg sm:text-xl font-bold text-primary-dark dark:text-white">
                {section.number}. {section.title}
              </h2>
              <p className="text-gray-900 dark:text-gray-200 leading-relaxed">
                {section.body}
              </p>
            </section>
          ))}
        </div>

        <div className="mt-14 pt-8 border-t border-gray-700">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-accent-blue hover:text-accent-blue/90 transition-colors text-sm"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}
