"use client";

import { useState, FormEvent } from "react";
import { apiPost } from "@/lib/api";

export default function CallRequestForm() {
  const [fullName, setFullName] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [primaryInterest, setPrimaryInterest] = useState("");
  const [currentChallenge, setCurrentChallenge] = useState("");
  const [preferredTime, setPreferredTime] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!primaryInterest || !preferredTime) return;
    setStatus("sending");
    try {
      await apiPost("/api/call-requests", { fullName, businessName, phone, email, primaryInterest, currentChallenge, preferredTime });
      setStatus("sent");
      setFullName(""); setBusinessName(""); setPhone(""); setEmail("");
      setPrimaryInterest(""); setCurrentChallenge(""); setPreferredTime("");
    } catch {
      setStatus("error");
    }
  }

  const inputClass = "w-full px-4 py-3 rounded-xl bg-white dark:bg-primary-dark/60 border border-gray-300 dark:border-gray-600 text-primary-dark dark:text-white placeholder-gray-500 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent-blue/50 focus:border-accent-blue";

  return (
    <form className="rounded-2xl bg-gray-200/80 dark:bg-primary-dark/80 border border-gray-200 dark:border-gray-700 p-6 sm:p-8 space-y-5" onSubmit={handleSubmit}>
      {status === "sent" && (
        <div className="rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-sm px-4 py-3">
          Request submitted! We&apos;ll call you soon.
        </div>
      )}
      {status === "error" && (
        <div className="rounded-lg bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400 text-sm px-4 py-3">
          Something went wrong. Please try again.
        </div>
      )}
      <div>
        <label htmlFor="call-full-name" className="block text-sm font-medium text-primary-dark dark:text-white mb-1.5">Full Name</label>
        <input id="call-full-name" type="text" required value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Enter your name" className={inputClass} />
      </div>
      <div>
        <label htmlFor="call-business-name" className="block text-sm font-medium text-primary-dark dark:text-white mb-1.5">Business Name</label>
        <input id="call-business-name" type="text" required value={businessName} onChange={(e) => setBusinessName(e.target.value)} placeholder="Enter your shop or project name" className={inputClass} />
      </div>
      <div>
        <label htmlFor="call-phone" className="block text-sm font-medium text-primary-dark dark:text-white mb-1.5">Phone Number</label>
        <input id="call-phone" type="tel" required value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Provide your M-Pesa or WhatsApp number" className={inputClass} />
      </div>
      <div>
        <label htmlFor="call-email" className="block text-sm font-medium text-primary-dark dark:text-white mb-1.5">Email Address</label>
        <input id="call-email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Provide your email" className={inputClass} />
      </div>
      <div>
        <p className="block text-sm font-medium text-primary-dark dark:text-white mb-1.5">Primary Interest</p>
        <div className="grid sm:grid-cols-2 gap-3">
          <label className="flex items-center gap-2 px-3 py-3 rounded-xl bg-white dark:bg-primary-dark/60 border border-gray-300 dark:border-gray-600 text-sm cursor-pointer">
            <input type="radio" name="call-primary-interest" value="managed-ecommerce" checked={primaryInterest === "managed-ecommerce"} onChange={(e) => setPrimaryInterest(e.target.value)} className="text-accent-blue focus:ring-accent-blue/60" />
            <span className="text-primary-dark dark:text-white">Managed E-commerce</span>
          </label>
          <label className="flex items-center gap-2 px-3 py-3 rounded-xl bg-white dark:bg-primary-dark/60 border border-gray-300 dark:border-gray-600 text-sm cursor-pointer">
            <input type="radio" name="call-primary-interest" value="custom-software" checked={primaryInterest === "custom-software"} onChange={(e) => setPrimaryInterest(e.target.value)} className="text-accent-blue focus:ring-accent-blue/60" />
            <span className="text-primary-dark dark:text-white">Custom Software</span>
          </label>
        </div>
      </div>
      <div>
        <label htmlFor="call-challenge" className="block text-sm font-medium text-primary-dark dark:text-white mb-1.5">Current Challenge</label>
        <textarea id="call-challenge" rows={4} required value={currentChallenge} onChange={(e) => setCurrentChallenge(e.target.value)} placeholder="Describe your main digital hurdle." className={`${inputClass} resize-y`} />
      </div>
      <div>
        <p className="block text-sm font-medium text-primary-dark dark:text-white mb-1.5">Preferred Calling Time</p>
        <div className="grid sm:grid-cols-2 gap-3">
          <label className="flex items-center gap-2 px-3 py-3 rounded-xl bg-white dark:bg-primary-dark/60 border border-gray-300 dark:border-gray-600 text-sm cursor-pointer">
            <input type="radio" name="call-preferred-time" value="morning" checked={preferredTime === "morning"} onChange={(e) => setPreferredTime(e.target.value)} className="text-accent-blue focus:ring-accent-blue/60" />
            <span className="text-primary-dark dark:text-white">Morning (9:00 AM to 11:00 AM)</span>
          </label>
          <label className="flex items-center gap-2 px-3 py-3 rounded-xl bg-white dark:bg-primary-dark/60 border border-gray-300 dark:border-gray-600 text-sm cursor-pointer">
            <input type="radio" name="call-preferred-time" value="afternoon" checked={preferredTime === "afternoon"} onChange={(e) => setPreferredTime(e.target.value)} className="text-accent-blue focus:ring-accent-blue/60" />
            <span className="text-primary-dark dark:text-white">Afternoon (2:00 PM to 4:00 PM)</span>
          </label>
        </div>
      </div>
      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full sm:w-auto px-6 py-3.5 rounded-xl font-medium bg-accent-blue text-white hover:bg-accent-blue/90 transition-colors shadow-lg shadow-accent-blue/20 disabled:opacity-50"
      >
        {status === "sending" ? "Submitting..." : "Submit Request"}
      </button>
    </form>
  );
}
