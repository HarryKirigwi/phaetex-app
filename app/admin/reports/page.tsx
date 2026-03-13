"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

interface Product { id: number; name: string; }
interface TrendPoint { period: string; count: number; }
interface ConversionPoint { period: string; total: number; converted: number; rate: number; }
interface Summary { callRequests: number; clients: number; conversionRate: number; unreadMessages: number; subscribers: number; }

export default function ReportsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [productFilter, setProductFilter] = useState("");
  const [interval, setInterval] = useState<"day" | "month" | "year">("month");
  const [summary, setSummary] = useState<Summary | null>(null);
  const [callTrend, setCallTrend] = useState<TrendPoint[]>([]);
  const [clientTrend, setClientTrend] = useState<TrendPoint[]>([]);
  const [conversionTrend, setConversionTrend] = useState<ConversionPoint[]>([]);

  useEffect(() => {
    apiFetch<{ data: Product[] }>("/api/admin/products").then((r) => setProducts(r.data)).catch(console.error);
  }, []);

  useEffect(() => {
    const pq = productFilter ? `&productId=${productFilter}` : "";
    apiFetch<{ data: Summary }>(`/api/admin/reports/summary?${pq.slice(1)}`).then((r) => setSummary(r.data)).catch(console.error);
    apiFetch<{ data: TrendPoint[] }>(`/api/admin/reports/call-requests-trend?interval=${interval}${pq}`).then((r) => setCallTrend(r.data)).catch(console.error);
    apiFetch<{ data: TrendPoint[] }>(`/api/admin/reports/clients-trend?interval=${interval}${pq}`).then((r) => setClientTrend(r.data)).catch(console.error);
    apiFetch<{ data: ConversionPoint[] }>(`/api/admin/reports/conversion-rate?interval=${interval}${pq}`).then((r) => setConversionTrend(r.data)).catch(console.error);
  }, [productFilter, interval]);

  return (
    <div>
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <h1 className="text-2xl font-bold text-white">Reports</h1>
        <div className="flex items-center gap-3">
          <select value={productFilter} onChange={(e) => setProductFilter(e.target.value)} className="px-3 py-2 rounded-lg bg-[#0b1023] border border-gray-700 text-sm text-gray-300 focus:outline-none">
            <option value="">All Products</option>
            {products.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
          </select>
          <div className="flex rounded-lg overflow-hidden border border-gray-700">
            {(["day", "month", "year"] as const).map((i) => (
              <button key={i} onClick={() => setInterval(i)} className={`px-3 py-2 text-xs font-medium transition-colors ${interval === i ? "bg-accent-blue text-white" : "bg-[#0b1023] text-gray-400 hover:text-white"}`}>
                {i.charAt(0).toUpperCase() + i.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid sm:grid-cols-3 gap-4 mb-8">
        <div className="rounded-xl bg-[#0f1629] border border-gray-800 p-5">
          <p className="text-sm text-gray-400 mb-1">Total Call Requests</p>
          <p className="text-3xl font-bold text-blue-400">{summary?.callRequests ?? "--"}</p>
        </div>
        <div className="rounded-xl bg-[#0f1629] border border-gray-800 p-5">
          <p className="text-sm text-gray-400 mb-1">Active Clients</p>
          <p className="text-3xl font-bold text-emerald-400">{summary?.clients ?? "--"}</p>
        </div>
        <div className="rounded-xl bg-[#0f1629] border border-gray-800 p-5">
          <p className="text-sm text-gray-400 mb-1">Conversion Rate</p>
          <p className="text-3xl font-bold text-accent-blue">{summary ? `${summary.conversionRate}%` : "--"}</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        <div className="rounded-xl bg-[#0f1629] border border-gray-800 p-5">
          <h2 className="text-sm font-medium text-gray-400 mb-4">Call Requests Trend</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={callTrend}>
                <defs>
                  <linearGradient id="callGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#009BE5" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#009BE5" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="period" tick={{ fill: "#6b7280", fontSize: 11 }} />
                <YAxis tick={{ fill: "#6b7280", fontSize: 11 }} allowDecimals={false} />
                <Tooltip
                  contentStyle={{ background: "#0f1629", border: "1px solid #374151", borderRadius: "0.5rem" }}
                  labelStyle={{ color: "#9ca3af" }}
                  itemStyle={{ color: "#009BE5" }}
                />
                <Area type="monotone" dataKey="count" stroke="#009BE5" fill="url(#callGrad)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-xl bg-[#0f1629] border border-gray-800 p-5">
          <h2 className="text-sm font-medium text-gray-400 mb-4">Confirmed Sites</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={clientTrend}>
                <defs>
                  <linearGradient id="clientGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="period" tick={{ fill: "#6b7280", fontSize: 11 }} />
                <YAxis tick={{ fill: "#6b7280", fontSize: 11 }} allowDecimals={false} />
                <Tooltip
                  contentStyle={{ background: "#0f1629", border: "1px solid #374151", borderRadius: "0.5rem" }}
                  labelStyle={{ color: "#9ca3af" }}
                  itemStyle={{ color: "#10b981" }}
                />
                <Area type="monotone" dataKey="count" stroke="#10b981" fill="url(#clientGrad)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="rounded-xl bg-[#0f1629] border border-gray-800 p-5">
        <h2 className="text-sm font-medium text-gray-400 mb-4">Conversion Rate Trend</h2>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={conversionTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="period" tick={{ fill: "#6b7280", fontSize: 11 }} />
              <YAxis tick={{ fill: "#6b7280", fontSize: 11 }} unit="%" />
              <Tooltip
                contentStyle={{ background: "#0f1629", border: "1px solid #374151", borderRadius: "0.5rem" }}
                labelStyle={{ color: "#9ca3af" }}
                formatter={(value) => [`${value}%`, "Conversion Rate"]}
              />
              <Line type="monotone" dataKey="rate" stroke="#f59e0b" strokeWidth={2} dot={{ fill: "#f59e0b", r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
