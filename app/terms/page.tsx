import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms & Conditions | Phaetex Solutions",
  description:
    "Phaetex Solutions terms and conditions governing the use of our AI Humanizer and managed e-commerce services.",
};

const sections = [
  {
    number: 1,
    title: "Agreement",
    body:
      "This document constitutes a legal contract between Phaetex Solutions and you. You accept these terms by accessing our services. You accept these terms by creating an account.",
  },
  {
    number: 2,
    title: "Eligibility",
    body:
      "You confirm you reached the legal age of 18 years. You possess the legal authority to form a binding agreement.",
  },
  {
    number: 3,
    title: "Services",
    body:
      "Phaetex Solutions provides software for text processing. Phaetex Solutions provides managed platforms for e-commerce. We maintain the underlying technology. We update the software to ensure functionality.",
  },
  {
    number: 4,
    title: "Fees and payments",
    body:
      "The e-commerce setup fee is Ksh 2,000. This fee is a one-time payment. The monthly maintenance fee is Ksh 2,000. You pay this fee every month. All payments occur through M-Pesa or our specified payment channels. We suspend access for unpaid balances. We do not provide refunds.",
  },
  {
    number: 5,
    title: "User accounts",
    body:
      "You provide true and complete information during registration. You protect your login credentials. You notify us of unauthorized account use. You are responsible for all activities under your account.",
  },
  {
    number: 6,
    title: "Content ownership",
    body:
      "You retain ownership of the text you process through our AI Humanizer. You retain ownership of the products you list on your e-commerce store. You guarantee your content does not violate any laws. You guarantee your content does not infringe on intellectual property rights.",
  },
  {
    number: 7,
    title: "AI Humanizer use",
    body:
      "Our software improves the readability of automated text. We do not guarantee the performance of the output against specific detection tools. You use the output at your own risk.",
  },
  {
    number: 8,
    title: "E-commerce use",
    body:
      "We provide the hosting environment. We provide the security updates. You manage your shop customers. You fulfill your own orders.",
  },
  {
    number: 9,
    title: "Prohibited uses",
    body:
      "You do not use our software for illegal purposes. You do not attempt to breach our security. You do not scrape data from our platform. You do not upload malware.",
  },
  {
    number: 10,
    title: "Intellectual property",
    body:
      "Phaetex Solutions owns all rights to the software. Phaetex Solutions owns all rights to the platform design. You do not copy our code. You do not resell our services without permission.",
  },
  {
    number: 11,
    title: "Limitation of liability",
    body:
      "We provide services on an as-is basis. We do not guarantee the software is free of errors. We are not liable for financial losses. We are not liable for data loss. Our total liability does not exceed the amount you paid us.",
  },
  {
    number: 12,
    title: "Governing law",
    body:
      "The laws of Kenya govern these terms. Any disputes will be resolved in Kenyan courts.",
  },
  {
    number: 13,
    title: "Termination",
    body:
      "You stop using the service at any time. We terminate your account for violations of these terms. We terminate your account for non-payment.",
  },
  {
    number: 14,
    title: "Changes to terms",
    body:
      "We update these terms. We post the updated version on our website. Your continued use of the platform indicates your agreement to the new terms.",
  },
  {
    number: 15,
    title: "Contact",
    body:
      "Reach out to our support team for questions regarding these terms.",
  },
];

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-primary-dark text-gray-100">
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

        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
          Phaetex Solutions Terms and Conditions
        </h1>
        <p className="text-gray-400 mb-12 leading-relaxed">
          These terms and conditions govern your use of Phaetex Solutions
          products and services, including our AI Humanizer and managed
          e-commerce platforms.
        </p>

        <div className="space-y-10">
          {sections.map((section) => (
            <section key={section.number} className="space-y-3">
              <h2 className="text-lg sm:text-xl font-bold text-white">
                {section.number}. {section.title}
              </h2>
              <p className="text-gray-300 leading-relaxed">{section.body}</p>
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

