"use client";

import { useState, FormEvent } from "react";
import { apiPost } from "@/lib/api";

export default function Contact() {
  const emailAddr = "sales@phaetex.com";
  const whatsappNumber = "254743684477";
  const whatsappUrl = `https://wa.me/${whatsappNumber}`;

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneCountry, setPhoneCountry] = useState("254");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("sending");
    try {
      await apiPost("/api/contact-messages", { firstName, lastName, email, phoneCountry, phoneNumber, message });
      setStatus("sent");
      setFirstName(""); setLastName(""); setEmail(""); setPhoneNumber(""); setMessage("");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section
      id="contact"
      data-animate
      className="py-16 sm:py-24 lg:py-28 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-primary-dark/40 border-t border-gray-200 dark:border-gray-800"
      aria-labelledby="contact-heading"
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* Left: intro + contact cards */}
          <div>
            <h2
              id="contact-heading"
              className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary-dark dark:text-white mb-4"
            >
              We&apos;d love to hear from you
            </h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-8 max-w-lg">
              Have a project in mind or want to learn more? Reach out and we&apos;ll get back to you.
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="rounded-2xl bg-gray-200/80 dark:bg-primary-dark/80 border border-gray-200 dark:border-gray-700 p-5 sm:col-span-2">
                <span className="inline-flex w-10 h-10 rounded-lg bg-white/50 dark:bg-white/10 items-center justify-center text-primary-dark dark:text-white mb-3" aria-hidden>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                </span>
                <h3 className="font-semibold text-primary-dark dark:text-white mb-1">Visit us</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Nairobi, Kenya</p>
              </div>
              <div className="rounded-2xl bg-gray-200/80 dark:bg-primary-dark/80 border border-gray-200 dark:border-gray-700 p-5">
                <span className="inline-flex w-10 h-10 rounded-lg bg-white/50 dark:bg-white/10 items-center justify-center text-primary-dark dark:text-white mb-3" aria-hidden>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                </span>
                <h3 className="font-semibold text-primary-dark dark:text-white mb-1">Chat to sales</h3>
                <a href={`mailto:${emailAddr}`} className="text-sm text-gray-600 dark:text-gray-400 hover:text-accent-blue dark:hover:text-accent-blue transition-colors">
                  {emailAddr}
                </a>
              </div>
              <div className="rounded-2xl bg-gray-200/80 dark:bg-primary-dark/80 border border-gray-200 dark:border-gray-700 p-5">
                <span className="inline-flex w-10 h-10 rounded-lg bg-white/50 dark:bg-white/10 items-center justify-center text-primary-dark dark:text-white mb-3" aria-hidden>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                </span>
                <h3 className="font-semibold text-primary-dark dark:text-white mb-1">Call us</h3>
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-gray-600 dark:text-gray-400 hover:text-accent-blue dark:hover:text-accent-blue transition-colors">
                  +254 43684477
                </a>
              </div>
            </div>
          </div>

          {/* Right: form */}
          <form
            className="rounded-2xl bg-gray-200/80 dark:bg-primary-dark/80 border border-gray-200 dark:border-gray-700 p-6 sm:p-8 space-y-5"
            onSubmit={handleSubmit}
          >
            {status === "sent" && (
              <div className="rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-sm px-4 py-3">
                Message sent successfully! We&apos;ll be in touch.
              </div>
            )}
            {status === "error" && (
              <div className="rounded-lg bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400 text-sm px-4 py-3">
                Something went wrong. Please try again.
              </div>
            )}
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="contact-first" className="block text-sm font-medium text-primary-dark dark:text-white mb-1.5">
                  First Name
                </label>
                <input
                  id="contact-first"
                  type="text"
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="First name"
                  className="w-full px-4 py-3 rounded-xl bg-white dark:bg-primary-dark/60 border border-gray-300 dark:border-gray-600 text-primary-dark dark:text-white placeholder-gray-500 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent-blue/50 focus:border-accent-blue"
                />
              </div>
              <div>
                <label htmlFor="contact-last" className="block text-sm font-medium text-primary-dark dark:text-white mb-1.5">
                  Last Name
                </label>
                <input
                  id="contact-last"
                  type="text"
                  required
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Last name"
                  className="w-full px-4 py-3 rounded-xl bg-white dark:bg-primary-dark/60 border border-gray-300 dark:border-gray-600 text-primary-dark dark:text-white placeholder-gray-500 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent-blue/50 focus:border-accent-blue"
                />
              </div>
            </div>
            <div>
              <label htmlFor="contact-email" className="block text-sm font-medium text-primary-dark dark:text-white mb-1.5">
                Email
              </label>
              <input
                id="contact-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@gmail.com"
                className="w-full px-4 py-3 rounded-xl bg-white dark:bg-primary-dark/60 border border-gray-300 dark:border-gray-600 text-primary-dark dark:text-white placeholder-gray-500 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent-blue/50 focus:border-accent-blue"
              />
            </div>
            <div>
              <label htmlFor="contact-phone" className="block text-sm font-medium text-primary-dark dark:text-white mb-1.5">
                Phone Number
              </label>
              <div className="flex rounded-xl overflow-hidden bg-white dark:bg-primary-dark/60 border border-gray-300 dark:border-gray-600 focus-within:ring-2 focus-within:ring-accent-blue/50 focus-within:border-accent-blue">
                <select
                  id="contact-phone-country"
                  aria-label="Country code"
                  value={phoneCountry}
                  onChange={(e) => setPhoneCountry(e.target.value)}
                  className="px-3 py-3 bg-gray-100 dark:bg-primary-dark/80 border-r border-gray-300 dark:border-gray-600 text-primary-dark dark:text-white text-sm focus:outline-none"
                >
                  <option value="254">+254</option>
                  <option value="255">+255</option>
                  <option value="256">+256</option>
                  <option value="1">+1</option>
                  <option value="44">+44</option>
                  <option value="91">+91</option>
                </select>
                <input
                  id="contact-phone"
                  type="tel"
                  required
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="Phone number"
                  className="flex-1 min-w-0 px-4 py-3 bg-transparent text-primary-dark dark:text-white placeholder-gray-500 dark:placeholder-gray-500 focus:outline-none"
                />
              </div>
            </div>
            <div>
              <label htmlFor="contact-message" className="block text-sm font-medium text-primary-dark dark:text-white mb-1.5">
                Message
              </label>
              <textarea
                id="contact-message"
                rows={4}
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Please type your message here.."
                className="w-full px-4 py-3 rounded-xl bg-white dark:bg-primary-dark/60 border border-gray-300 dark:border-gray-600 text-primary-dark dark:text-white placeholder-gray-500 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent-blue/50 focus:border-accent-blue resize-y"
              />
            </div>
            <button
              type="submit"
              disabled={status === "sending"}
              className="px-6 py-3.5 rounded-xl font-medium bg-accent-blue text-white hover:bg-accent-blue/90 transition-colors shadow-lg shadow-accent-blue/20 disabled:opacity-50"
            >
              {status === "sending" ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
