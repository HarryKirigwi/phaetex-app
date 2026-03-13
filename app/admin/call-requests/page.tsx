"use client";

import { useState, useCallback, useRef } from "react";
import { apiFetch, apiPatch, downloadCsv } from "@/lib/api";
import DataTable from "@/components/admin/DataTable";

interface CallRequest {
  id: number;
  fullName: string;
  businessName: string;
  email: string;
  phone: string;
  primaryInterest: string;
  currentChallenge: string;
  preferredTime: string;
  status: string;
  adminNotes: string | null;
  product: { name: string } | null;
  createdAt: string;
}

const statusColors: Record<string, string> = {
  NEW: "bg-blue-500/20 text-blue-400",
  IN_PROGRESS: "bg-yellow-500/20 text-yellow-400",
  CONVERTED: "bg-emerald-500/20 text-emerald-400",
  CLOSED: "bg-gray-500/20 text-gray-400",
};

export default function CallRequestsPage() {
  const [statusFilter, setStatusFilter] = useState("");
  const [selected, setSelected] = useState<CallRequest | null>(null);
  const [notes, setNotes] = useState("");
  const [detailStatus, setDetailStatus] = useState("");
  const [version, setVersion] = useState(0);
  const statusRef = useRef(statusFilter);
  statusRef.current = statusFilter;

  const fetchData = useCallback(
    (params: Record<string, string>) => {
      const qs = new URLSearchParams(params);
      if (statusRef.current) qs.set("status", statusRef.current);
      return apiFetch<any>(`/api/admin/call-requests?${qs}`);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [version]
  );

  const applyStatusFilter = (val: string) => {
    setStatusFilter(val);
    statusRef.current = val;
    setVersion((v) => v + 1);
  };

  const openDetail = async (row: CallRequest) => {
    const res = await apiFetch<{ data: CallRequest }>(`/api/admin/call-requests/${row.id}`);
    setSelected(res.data);
    setNotes(res.data.adminNotes || "");
    setDetailStatus(res.data.status);
  };

  const saveDetail = async () => {
    if (!selected) return;
    await apiPatch(`/api/admin/call-requests/${selected.id}`, { status: detailStatus, adminNotes: notes });
    setSelected(null);
    setVersion((v) => v + 1);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-white">Call Requests</h1>
      </div>

      <DataTable<CallRequest>
        columns={[
          { key: "fullName", label: "Name", sortable: true },
          { key: "businessName", label: "Business", sortable: true },
          { key: "primaryInterest", label: "Interest", render: (r) => r.primaryInterest.replace("-", " ") },
          {
            key: "status", label: "Status", sortable: true,
            render: (r) => (
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[r.status] || ""}`}>
                {r.status}
              </span>
            ),
          },
          { key: "createdAt", label: "Date", sortable: true, render: (r) => new Date(r.createdAt).toLocaleDateString() },
        ]}
        fetchData={fetchData}
        onRowClick={openDetail}
        searchPlaceholder="Search by name, business, email..."
        filters={
          <select
            value={statusFilter}
            onChange={(e) => applyStatusFilter(e.target.value)}
            className="px-3 py-2 rounded-lg bg-[#0b1023] border border-gray-700 text-sm text-gray-300 focus:outline-none"
          >
            <option value="">All Statuses</option>
            <option value="NEW">New</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="CONVERTED">Converted</option>
            <option value="CLOSED">Closed</option>
          </select>
        }
        actions={
          <button
            onClick={() => downloadCsv("/api/admin/call-requests/export", "call-requests.csv")}
            className="px-3 py-2 rounded-lg bg-accent-blue/20 text-accent-blue text-sm hover:bg-accent-blue/30 transition-colors"
          >
            Export CSV
          </button>
        }
      />

      {selected && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={() => setSelected(null)}>
          <div className="bg-[#0f1629] border border-gray-800 rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-6" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-lg font-bold text-white mb-4">Call Request Details</h2>
            <div className="space-y-3 text-sm">
              <div><span className="text-gray-400">Name:</span> <span className="text-white ml-2">{selected.fullName}</span></div>
              <div><span className="text-gray-400">Business:</span> <span className="text-white ml-2">{selected.businessName}</span></div>
              <div><span className="text-gray-400">Email:</span> <span className="text-white ml-2">{selected.email}</span></div>
              <div><span className="text-gray-400">Phone:</span> <span className="text-white ml-2">{selected.phone}</span></div>
              <div><span className="text-gray-400">Interest:</span> <span className="text-white ml-2">{selected.primaryInterest}</span></div>
              <div><span className="text-gray-400">Preferred Time:</span> <span className="text-white ml-2">{selected.preferredTime}</span></div>
              <div><span className="text-gray-400">Challenge:</span> <p className="text-gray-300 mt-1">{selected.currentChallenge}</p></div>
              <div>
                <label className="text-gray-400 block mb-1">Status</label>
                <select value={detailStatus} onChange={(e) => setDetailStatus(e.target.value)} className="w-full px-3 py-2 rounded-lg bg-[#0b1023] border border-gray-700 text-white text-sm focus:outline-none">
                  <option value="NEW">New</option>
                  <option value="IN_PROGRESS">In Progress</option>
                  <option value="CONVERTED">Converted</option>
                  <option value="CLOSED">Closed</option>
                </select>
              </div>
              <div>
                <label className="text-gray-400 block mb-1">Admin Notes</label>
                <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={3} className="w-full px-3 py-2 rounded-lg bg-[#0b1023] border border-gray-700 text-white text-sm focus:outline-none resize-y" />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={saveDetail} className="px-4 py-2 rounded-lg bg-accent-blue text-white text-sm font-medium hover:bg-accent-blue/90 transition-colors">Save</button>
              <button onClick={() => setSelected(null)} className="px-4 py-2 rounded-lg bg-gray-700 text-gray-300 text-sm hover:bg-gray-600 transition-colors">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
