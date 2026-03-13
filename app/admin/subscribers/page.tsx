"use client";

import { useState, useCallback, useRef } from "react";
import { apiFetch, apiPatch, downloadCsv } from "@/lib/api";
import DataTable from "@/components/admin/DataTable";

interface Subscriber {
  id: number;
  email: string;
  status: string;
  createdAt: string;
}

export default function SubscribersPage() {
  const [statusFilter, setStatusFilter] = useState("");
  const [version, setVersion] = useState(0);
  const statusRef = useRef(statusFilter);
  statusRef.current = statusFilter;

  const fetchData = useCallback(
    (params: Record<string, string>) => {
      const qs = new URLSearchParams(params);
      if (statusRef.current) qs.set("status", statusRef.current);
      return apiFetch<any>(`/api/admin/subscribers?${qs}`);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [version]
  );

  const toggleStatus = async (row: Subscriber) => {
    const newStatus = row.status === "SUBSCRIBED" ? "UNSUBSCRIBED" : "SUBSCRIBED";
    await apiPatch(`/api/admin/subscribers/${row.id}`, { status: newStatus });
    setVersion((v) => v + 1);
  };

  const applyFilter = (val: string) => {
    setStatusFilter(val);
    statusRef.current = val;
    setVersion((v) => v + 1);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-white">Newsletter Subscribers</h1>
      </div>

      <DataTable<Subscriber>
        columns={[
          { key: "email", label: "Email", sortable: true },
          {
            key: "status", label: "Status", sortable: true,
            render: (r) => (
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${r.status === "SUBSCRIBED" ? "bg-emerald-500/20 text-emerald-400" : "bg-gray-500/20 text-gray-400"}`}>
                {r.status}
              </span>
            ),
          },
          { key: "createdAt", label: "Subscribed", sortable: true, render: (r) => new Date(r.createdAt).toLocaleDateString() },
          {
            key: "actions", label: "Actions",
            render: (r) => (
              <button
                onClick={(e) => { e.stopPropagation(); toggleStatus(r); }}
                className="text-xs text-gray-400 hover:text-white transition-colors"
              >
                {r.status === "SUBSCRIBED" ? "Unsubscribe" : "Resubscribe"}
              </button>
            ),
          },
        ]}
        fetchData={fetchData}
        searchPlaceholder="Search by email..."
        filters={
          <select value={statusFilter} onChange={(e) => applyFilter(e.target.value)} className="px-3 py-2 rounded-lg bg-[#0b1023] border border-gray-700 text-sm text-gray-300 focus:outline-none">
            <option value="">All</option>
            <option value="SUBSCRIBED">Subscribed</option>
            <option value="UNSUBSCRIBED">Unsubscribed</option>
          </select>
        }
        actions={
          <button onClick={() => downloadCsv("/api/admin/subscribers/export", "subscribers.csv")} className="px-3 py-2 rounded-lg bg-accent-blue/20 text-accent-blue text-sm hover:bg-accent-blue/30 transition-colors">
            Export CSV
          </button>
        }
      />
    </div>
  );
}
