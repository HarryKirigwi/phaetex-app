"use client";

import { useState, useCallback, useRef } from "react";
import { apiFetch, apiPatch, downloadCsv } from "@/lib/api";
import DataTable from "@/components/admin/DataTable";

interface Message {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneCountry: string;
  phoneNumber: string;
  message: string;
  read: boolean;
  createdAt: string;
}

export default function MessagesPage() {
  const [readFilter, setReadFilter] = useState("");
  const [expanded, setExpanded] = useState<Message | null>(null);
  const [version, setVersion] = useState(0);
  const readRef = useRef(readFilter);
  readRef.current = readFilter;

  const fetchData = useCallback(
    (params: Record<string, string>) => {
      const qs = new URLSearchParams(params);
      if (readRef.current) qs.set("read", readRef.current);
      return apiFetch<any>(`/api/admin/messages?${qs}`);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [version]
  );

  const applyReadFilter = (val: string) => {
    setReadFilter(val);
    readRef.current = val;
    setVersion((v) => v + 1);
  };

  const toggleRead = async (row: Message) => {
    await apiPatch(`/api/admin/messages/${row.id}`, { read: !row.read });
    setExpanded(null);
    setVersion((v) => v + 1);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-white">Contact Messages</h1>
      </div>

      <DataTable<Message>
        columns={[
          { key: "name", label: "Name", render: (r) => `${r.firstName} ${r.lastName}` },
          { key: "email", label: "Email", sortable: true },
          { key: "phoneNumber", label: "Phone", render: (r) => `+${r.phoneCountry} ${r.phoneNumber}` },
          {
            key: "read", label: "Status",
            render: (r) => (
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${r.read ? "bg-gray-500/20 text-gray-400" : "bg-blue-500/20 text-blue-400"}`}>
                {r.read ? "Read" : "Unread"}
              </span>
            ),
          },
          { key: "createdAt", label: "Date", sortable: true, render: (r) => new Date(r.createdAt).toLocaleDateString() },
        ]}
        fetchData={fetchData}
        onRowClick={(r) => setExpanded(r)}
        searchPlaceholder="Search by name, email..."
        filters={
          <select value={readFilter} onChange={(e) => applyReadFilter(e.target.value)} className="px-3 py-2 rounded-lg bg-[#0b1023] border border-gray-700 text-sm text-gray-300 focus:outline-none">
            <option value="">All</option>
            <option value="false">Unread</option>
            <option value="true">Read</option>
          </select>
        }
        actions={
          <button onClick={() => downloadCsv("/api/admin/messages/export", "messages.csv")} className="px-3 py-2 rounded-lg bg-accent-blue/20 text-accent-blue text-sm hover:bg-accent-blue/30 transition-colors">
            Export CSV
          </button>
        }
      />

      {expanded && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={() => setExpanded(null)}>
          <div className="bg-[#0f1629] border border-gray-800 rounded-2xl w-full max-w-lg p-6" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-lg font-bold text-white mb-4">Message from {expanded.firstName} {expanded.lastName}</h2>
            <div className="space-y-2 text-sm mb-4">
              <p className="text-gray-400">Email: <span className="text-white">{expanded.email}</span></p>
              <p className="text-gray-400">Phone: <span className="text-white">+{expanded.phoneCountry} {expanded.phoneNumber}</span></p>
              <p className="text-gray-400">Date: <span className="text-white">{new Date(expanded.createdAt).toLocaleString()}</span></p>
            </div>
            <div className="bg-[#0b1023] rounded-lg p-4 text-gray-300 text-sm mb-4 whitespace-pre-wrap">{expanded.message}</div>
            <div className="flex gap-3">
              <button onClick={() => toggleRead(expanded)} className="px-4 py-2 rounded-lg bg-accent-blue text-white text-sm font-medium hover:bg-accent-blue/90 transition-colors">
                Mark as {expanded.read ? "Unread" : "Read"}
              </button>
              <button onClick={() => setExpanded(null)} className="px-4 py-2 rounded-lg bg-gray-700 text-gray-300 text-sm hover:bg-gray-600 transition-colors">Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
