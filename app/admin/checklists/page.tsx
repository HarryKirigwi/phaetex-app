"use client";

import { useState, useEffect, useCallback } from "react";
import { apiFetch, apiPost, downloadCsv } from "@/lib/api";
import DataTable from "@/components/admin/DataTable";
import Link from "next/link";

interface Checklist {
  id: number;
  clientId: number;
  client: { fullName: string; businessName: string; product: { name: string } };
  items: any[];
  createdAt: string;
}

interface ClientOption { id: number; fullName: string; businessName: string; }

export default function ChecklistsPage() {
  const [showCreate, setShowCreate] = useState(false);
  const [clients, setClients] = useState<ClientOption[]>([]);
  const [selectedClientId, setSelectedClientId] = useState(0);
  const [version, setVersion] = useState(0);

  useEffect(() => {
    if (showCreate) {
      apiFetch<any>("/api/admin/clients?limit=100").then((r) => setClients(r.data)).catch(console.error);
    }
  }, [showCreate]);

  const fetchData = useCallback(
    (params: Record<string, string>) => {
      const qs = new URLSearchParams(params);
      return apiFetch<any>(`/api/admin/checklists?${qs}`);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [version]
  );

  const createChecklist = async () => {
    if (!selectedClientId) return;
    await apiPost("/api/admin/checklists", { clientId: selectedClientId, items: defaultChecklistItems() });
    setShowCreate(false);
    setVersion((v) => v + 1);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-white">E-commerce Checklists</h1>
        <button onClick={() => setShowCreate(true)} className="px-4 py-2 rounded-lg bg-accent-blue text-white text-sm font-medium hover:bg-accent-blue/90 transition-colors">
          New Checklist
        </button>
      </div>

      <DataTable<Checklist>
        columns={[
          { key: "client", label: "Client", render: (r) => r.client?.businessName || "" },
          { key: "contact", label: "Contact", render: (r) => r.client?.fullName || "" },
          { key: "product", label: "Product", render: (r) => r.client?.product?.name || "" },
          { key: "items", label: "Items", render: (r) => `${r.items?.filter((i: any) => i.completed).length || 0}/${r.items?.length || 0}` },
          { key: "createdAt", label: "Created", sortable: true, render: (r) => new Date(r.createdAt).toLocaleDateString() },
          {
            key: "actions", label: "",
            render: (r) => (
              <div className="flex gap-2">
                <Link href={`/admin/checklists/${r.id}`} className="text-accent-blue text-xs hover:underline" onClick={(e) => e.stopPropagation()}>
                  Open
                </Link>
                <button onClick={(e) => { e.stopPropagation(); downloadCsv(`/api/admin/checklists/${r.id}/export`, `checklist-${r.id}.csv`); }} className="text-gray-400 text-xs hover:text-white">
                  CSV
                </button>
              </div>
            ),
          },
        ]}
        fetchData={fetchData}
      />

      {showCreate && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={() => setShowCreate(false)}>
          <div className="bg-[#0f1629] border border-gray-800 rounded-2xl w-full max-w-md p-6" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-lg font-bold text-white mb-4">Create Checklist</h2>
            <div>
              <label className="text-sm text-gray-400 block mb-1">Select Client</label>
              <select value={selectedClientId} onChange={(e) => setSelectedClientId(parseInt(e.target.value))} className="w-full px-3 py-2 rounded-lg bg-[#0b1023] border border-gray-700 text-white text-sm focus:outline-none">
                <option value={0}>Choose a client</option>
                {clients.map((c) => <option key={c.id} value={c.id}>{c.businessName} - {c.fullName}</option>)}
              </select>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={createChecklist} disabled={!selectedClientId} className="px-4 py-2 rounded-lg bg-accent-blue text-white text-sm font-medium hover:bg-accent-blue/90 transition-colors disabled:opacity-50">Create</button>
              <button onClick={() => setShowCreate(false)} className="px-4 py-2 rounded-lg bg-gray-700 text-gray-300 text-sm hover:bg-gray-600 transition-colors">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function defaultChecklistItems() {
  return [
    { phase: 1, key: "business_name", label: "Official Business Name", completed: false },
    { phase: 1, key: "registration_number", label: "Registration Number", completed: false },
    { phase: 1, key: "kra_pin", label: "KRA PIN", completed: false },
    { phase: 1, key: "primary_contact_name", label: "Primary Contact Name", completed: false },
    { phase: 1, key: "primary_contact_role", label: "Primary Contact Role", completed: false },
    { phase: 1, key: "primary_contact_phone", label: "Primary Contact Phone", completed: false },
    { phase: 1, key: "primary_contact_email", label: "Primary Contact Email", completed: false },
    { phase: 2, key: "logo_primary", label: "Primary Logo", completed: false },
    { phase: 2, key: "logo_favicon", label: "Favicon", completed: false },
    { phase: 2, key: "logo_inverted", label: "Inverted Logo", completed: false },
    { phase: 2, key: "colors", label: "Brand Colors", completed: false },
    { phase: 2, key: "fonts", label: "Brand Fonts", completed: false },
    { phase: 2, key: "hero_banners", label: "Hero Banners", completed: false },
    { phase: 2, key: "lifestyle_shots", label: "Lifestyle/Product Shots", completed: false },
    { phase: 2, key: "brand_voice", label: "Brand Voice / Tone", completed: false },
    { phase: 3, key: "catalog_format", label: "Catalog Format (CSV/Sheet)", completed: false },
    { phase: 3, key: "skus", label: "Product SKUs", completed: false },
    { phase: 3, key: "pricing", label: "Pricing Information", completed: false },
    { phase: 3, key: "stock_levels", label: "Stock Levels", completed: false },
    { phase: 3, key: "weight_dimensions", label: "Weight & Dimensions", completed: false },
    { phase: 3, key: "categorization", label: "Product Categorization", completed: false },
    { phase: 3, key: "variants", label: "Product Variants", completed: false },
    { phase: 3, key: "descriptions", label: "Rich Product Descriptions", completed: false },
    { phase: 4, key: "mpesa_shortcode", label: "M-Pesa Shortcode", completed: false },
    { phase: 4, key: "daraja_keys", label: "Daraja API Keys", completed: false },
    { phase: 4, key: "alt_payments", label: "Alternative Payment Methods", completed: false },
    { phase: 4, key: "settlement_bank", label: "Settlement Bank Details", completed: false },
    { phase: 4, key: "currency", label: "Currency", completed: false },
    { phase: 5, key: "shipping_zones", label: "Shipping Zones", completed: false },
    { phase: 5, key: "pricing_rules", label: "Shipping Pricing Rules", completed: false },
    { phase: 5, key: "fulfillment_centers", label: "Fulfillment Centers", completed: false },
    { phase: 5, key: "courier_partners", label: "Courier Partners", completed: false },
    { phase: 6, key: "domain_access", label: "Domain Access / DNS", completed: false },
    { phase: 6, key: "email_infrastructure", label: "Email Infrastructure", completed: false },
    { phase: 6, key: "ga4_pixel", label: "GA4 Tracking Pixel", completed: false },
    { phase: 6, key: "meta_pixel", label: "Meta Tracking Pixel", completed: false },
    { phase: 6, key: "target_keywords", label: "Target SEO Keywords", completed: false },
    { phase: 7, key: "contact_info", label: "Customer Support Contact Info", completed: false },
    { phase: 7, key: "refund_policy", label: "Refund Policy", completed: false },
    { phase: 7, key: "shipping_policy", label: "Shipping Policy", completed: false },
    { phase: 7, key: "privacy_policy", label: "Privacy Policy", completed: false },
    { phase: 7, key: "terms", label: "Terms & Conditions", completed: false },
    { phase: 7, key: "faqs", label: "FAQs", completed: false },
  ];
}
