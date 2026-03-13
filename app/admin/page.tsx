"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";
import Link from "next/link";

interface SummaryData {
  callRequests: number;
  unreadMessages: number;
  subscribers: number;
  clients: number;
  conversionRate: number;
}

const cards = [
  { key: "callRequests", label: "Call Requests", href: "/admin/call-requests", color: "text-blue-400", bg: "bg-blue-500/10" },
  { key: "unreadMessages", label: "Unread Messages", href: "/admin/messages", color: "text-orange-400", bg: "bg-orange-500/10" },
  { key: "subscribers", label: "Newsletter Subscribers", href: "/admin/subscribers", color: "text-emerald-400", bg: "bg-emerald-500/10" },
  { key: "clients", label: "Active Clients", href: "/admin/clients", color: "text-purple-400", bg: "bg-purple-500/10" },
];

export default function AdminOverviewPage() {
  const [summary, setSummary] = useState<SummaryData | null>(null);

  useEffect(() => {
    apiFetch<{ data: SummaryData }>("/api/admin/reports/summary")
      .then((res) => setSummary(res.data))
      .catch(console.error);
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-6">Dashboard Overview</h1>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {cards.map((card) => (
          <Link
            key={card.key}
            href={card.href}
            className="rounded-xl bg-[#0f1629] border border-gray-800 p-5 hover:border-gray-700 transition-colors"
          >
            <p className="text-sm text-gray-400 mb-1">{card.label}</p>
            <p className={`text-3xl font-bold ${card.color}`}>
              {summary ? (summary as any)[card.key] : "--"}
            </p>
          </Link>
        ))}
      </div>

      <div className="rounded-xl bg-[#0f1629] border border-gray-800 p-5 mb-8">
        <p className="text-sm text-gray-400 mb-1">Conversion Rate</p>
        <p className="text-3xl font-bold text-accent-blue">
          {summary ? `${summary.conversionRate}%` : "--"}
        </p>
        <p className="text-xs text-gray-500 mt-1">Call requests converted to clients</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[
          { href: "/admin/call-requests", label: "Manage Call Requests" },
          { href: "/admin/messages", label: "View Messages" },
          { href: "/admin/subscribers", label: "Manage Subscribers" },
          { href: "/admin/clients", label: "Manage Clients" },
          { href: "/admin/checklists", label: "E-commerce Checklists" },
          { href: "/admin/reports", label: "View Reports" },
        ].map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="flex items-center justify-between px-4 py-3 rounded-lg bg-[#0f1629] border border-gray-800 hover:border-accent-blue/50 transition-colors text-sm text-gray-300 hover:text-white"
          >
            {link.label}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        ))}
      </div>
    </div>
  );
}
