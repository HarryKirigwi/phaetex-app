"use client";

const faqs = [
  {
    question: "What is Phaetex Humanizer?",
    answer:
      "Phaetex Humanizer is an AI-powered tool that takes automated or AI-generated drafts and rewrites them into natural, engaging prose while preserving your unique voice.",
  },
  {
    question: "How does Phaetex handle my data and privacy?",
    answer:
      "We comply with the Kenya Data Protection Act 2019. We only collect the data we need to run your account and services, and we do not use your provided text to train external models. You can request access, correction, or deletion of your data at any time.",
  },
  {
    question: "What is included in the managed e-commerce plan?",
    answer:
      "For a one-time setup fee of Ksh 2,000 and Ksh 2,000 per month, we provide a fully managed shop: hosting, security updates, backups, and platform maintenance so you can focus on serving customers.",
  },
  {
    question: "How do pricing, subscriptions, and refunds work?",
    answer:
      "Humanizer credits and monthly subscriptions are non-refundable. You pay for a full month of access and can cancel to stop future charges. Our transparent pricing is Ksh 2,000 for setup and Ksh 2,000 per month for managed e-commerce.",
  },
  {
    question: "How can I get support or talk to the team?",
    answer:
      "You can reach out through the contact form on this site or email support@phaetex.com. Our team will review your request, investigate any technical issues, and get back to you.",
  },
];

import { useState } from "react";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      id="faq"
      data-animate
      className="py-16 sm:py-24 lg:py-28 px-4 sm:px-6 lg:px-8 bg-primary-dark"
      aria-labelledby="faq-heading"
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mb-10 lg:mb-12">
          <div>
            <h2
              id="faq-heading"
              className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white"
            >
              Frequently asked questions
            </h2>
            <p className="mt-2 text-sm sm:text-base text-gray-400 max-w-xl">
              Discover how Phaetex Humanizer and our managed e-commerce service
              work, how we handle your data, and what to expect from pricing.
            </p>
          </div>
          <a
            href="#contact"
            className="inline-flex items-center justify-center px-5 py-3 rounded-full font-medium bg-accent-blue text-white hover:bg-accent-blue/90 transition-colors shrink-0 w-fit"
          >
            Get in touch
          </a>
        </div>

        <div className="space-y-3">
          {faqs.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={item.question}
                className="rounded-2xl border border-gray-800 bg-[#050816] hover:border-accent-blue/60 transition-colors"
              >
                <button
                  type="button"
                  className="w-full flex items-center justify-between px-5 sm:px-6 py-4 sm:py-5 text-left gap-4"
                  onClick={() =>
                    setOpenIndex(isOpen ? null : index)
                  }
                  aria-expanded={isOpen}
                >
                  <span className="text-sm sm:text-base font-medium text-gray-100">
                    {item.question}
                  </span>
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-800 text-gray-200 border border-gray-700">
                    <span
                      className={`transform transition-transform ${
                        isOpen ? "rotate-45" : ""
                      }`}
                      aria-hidden
                    >
                      +
                    </span>
                  </span>
                </button>
                {isOpen && (
                  <div className="px-5 sm:px-6 pb-5 sm:pb-6 pt-0 text-sm sm:text-base text-gray-300 border-t border-gray-800">
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

