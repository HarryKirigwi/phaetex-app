"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { apiFetch, apiPost, apiPatch, downloadCsv } from "@/lib/api";
import DataTable from "@/components/admin/DataTable";

interface Product { id: number; name: string; }
interface Client {
  id: number;
  fullName: string;
  businessName: string;
  email: string;
  phone: string;
  domain: string | null;
  status: string;
  notes: string | null;
  product: { name: string };
  callRequest?: any;
  checklist?: any;
  registeredAt: string;
}

const statusColors: Record<string, string> = {
  ACTIVE: "bg-emerald-500/20 text-emerald-400",
  SUSPENDED: "bg-yellow-500/20 text-yellow-400",
  CHURNED: "bg-red-500/20 text-red-400",
};

export default function ClientsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [productFilter, setProductFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [showAdd, setShowAdd] = useState(false);
  const [selected, setSelected] = useState<Client | null>(null);
  const [form, setForm] = useState({ fullName: "", businessName: "", email: "", phone: "", domain: "", productId: 0, callRequestId: 0, notes: "" });
  const [version, setVersion] = useState(0);
  const productRef = useRef(productFilter);
  productRef.current = productFilter;
  const statusRef = useRef(statusFilter);
  statusRef.current = statusFilter;

  useEffect(() => {
    apiFetch<{ data: Product[] }>("/api/admin/products").then((r) => setProducts(r.data)).catch(console.error);
  }, []);

  const fetchData = useCallback(
    (params: Record<string, string>) => {
      const qs = new URLSearchParams(params);
      if (productRef.current) qs.set("productId", productRef.current);
      if (statusRef.current) qs.set("status", statusRef.current);
      return apiFetch<any>(`/api/admin/clients?${qs}`);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [version]
  );

  const applyProductFilter = (val: string) => {
    setProductFilter(val);
    productRef.current = val;
    setVersion((v) => v + 1);
  };

  const applyStatusFilter = (val: string) => {
    setStatusFilter(val);
    statusRef.current = val;
    setVersion((v) => v + 1);
  };

  const openDetail = async (row: Client) => {
    const res = await apiFetch<{ data: Client }>(`/api/admin/clients/${row.id}`);
    setSelected(res.data);
  };

  const addClient = async () => {
    const data: any = { ...form, productId: form.productId };
    if (!form.callRequestId) delete data.callRequestId;
    if (!form.domain) delete data.domain;
    await apiPost("/api/admin/clients", data);
    setShowAdd(false);
    setVersion((v) => v + 1);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-white">Clients</h1>
        <button onClick={() => setShowAdd(true)} className="px-4 py-2 rounded-lg bg-accent-blue text-white text-sm font-medium hover:bg-accent-blue/90 transition-colors">
          Add Client
        </button>
      </div>

      <DataTable<Client>
        columns={[
          { key: "businessName", label: "Business", sortable: true },
          { key: "fullName", label: "Contact", sortable: true },
          { key: "product", label: "Product", render: (r) => r.product?.name || "" },
          { key: "domain", label: "Domain", render: (r) => r.domain || "-" },
          {
            key: "status", label: "Status", sortable: true,
            render: (r) => <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[r.status] || ""}`}>{r.status}</span>,
          },
          { key: "registeredAt", label: "Registered", sortable: true, render: (r) => new Date(r.registeredAt).toLocaleDateString() },
        ]}
        fetchData={fetchData}
        onRowClick={openDetail}
        searchPlaceholder="Search name, business, email, domain..."
        filters={
          <>
            <select value={productFilter} onChange={(e) => applyProductFilter(e.target.value)} className="px-3 py-2 rounded-lg bg-[#0b1023] border border-gray-700 text-sm text-gray-300 focus:outline-none">
              <option value="">All Products</option>
              {products.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
            </select>
            <select value={statusFilter} onChange={(e) => applyStatusFilter(e.target.value)} className="px-3 py-2 rounded-lg bg-[#0b1023] border border-gray-700 text-sm text-gray-300 focus:outline-none">
              <option value="">All Statuses</option>
              <option value="ACTIVE">Active</option>
              <option value="SUSPENDED">Suspended</option>
              <option value="CHURNED">Churned</option>
            </select>
          </>
        }
        actions={
          <button onClick={() => downloadCsv("/api/admin/clients/export", "clients.csv")} className="px-3 py-2 rounded-lg bg-accent-blue/20 text-accent-blue text-sm hover:bg-accent-blue/30 transition-colors">
            Export CSV
          </button>
        }
      />

      {selected && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={() => setSelected(null)}>
          <div className="bg-[#0f1629] border border-gray-800 rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-6" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-lg font-bold text-white mb-4">{selected.businessName}</h2>
            <div className="space-y-2 text-sm">
              <p className="text-gray-400">Contact: <span className="text-white">{selected.fullName}</span></p>
              <p className="text-gray-400">Email: <span className="text-white">{selected.email}</span></p>
              <p className="text-gray-400">Phone: <span className="text-white">{selected.phone}</span></p>
              <p className="text-gray-400">Domain: <span className="text-accent-blue">{selected.domain || "Not set"}</span></p>
              <p className="text-gray-400">Product: <span className="text-white">{selected.product?.name}</span></p>
              <p className="text-gray-400">Status: <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusColors[selected.status]}`}>{selected.status}</span></p>
              {selected.notes && <p className="text-gray-400">Notes: <span className="text-gray-300">{selected.notes}</span></p>}
              {selected.callRequest && <p className="text-gray-400">From Call Request: <span className="text-white">#{selected.callRequest.id}</span></p>}
              {selected.checklist && <p className="text-gray-400">Checklist: <span className="text-accent-blue">#{selected.checklist.id}</span></p>}
            </div>
            <button onClick={() => setSelected(null)} className="mt-6 px-4 py-2 rounded-lg bg-gray-700 text-gray-300 text-sm hover:bg-gray-600 transition-colors">Close</button>
          </div>
        </div>
      )}

      {showAdd && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={() => setShowAdd(false)}>
          <div className="bg-[#0f1629] border border-gray-800 rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-6" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-lg font-bold text-white mb-4">Add New Client</h2>
            <div className="space-y-3 text-sm">
              {[
                { key: "fullName", label: "Full Name", type: "text" },
                { key: "businessName", label: "Business Name", type: "text" },
                { key: "email", label: "Email", type: "email" },
                { key: "phone", label: "Phone", type: "tel" },
                { key: "domain", label: "Domain (optional)", type: "text" },
                { key: "callRequestId", label: "Call Request ID (optional)", type: "number" },
                { key: "notes", label: "Notes (optional)", type: "text" },
              ].map((field) => (
                <div key={field.key}>
                  <label className="text-gray-400 block mb-1">{field.label}</label>
                  <input
                    type={field.type}
                    value={(form as any)[field.key]}
                    onChange={(e) => setForm({ ...form, [field.key]: field.type === "number" ? parseInt(e.target.value) || 0 : e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-[#0b1023] border border-gray-700 text-white text-sm focus:outline-none"
                  />
                </div>
              ))}
              <div>
                <label className="text-gray-400 block mb-1">Product</label>
                <select value={form.productId} onChange={(e) => setForm({ ...form, productId: parseInt(e.target.value) })} className="w-full px-3 py-2 rounded-lg bg-[#0b1023] border border-gray-700 text-white text-sm focus:outline-none">
                  <option value={0}>Select product</option>
                  {products.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
                </select>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={addClient} className="px-4 py-2 rounded-lg bg-accent-blue text-white text-sm font-medium hover:bg-accent-blue/90 transition-colors">Add Client</button>
              <button onClick={() => setShowAdd(false)} className="px-4 py-2 rounded-lg bg-gray-700 text-gray-300 text-sm hover:bg-gray-600 transition-colors">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
