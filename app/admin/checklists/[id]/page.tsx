"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { apiFetch, apiPatch, downloadCsv } from "@/lib/api";

interface ChecklistItem {
  id?: number;
  phase: number;
  key: string;
  label: string;
  value: string;
  completed: boolean;
}

interface ChecklistData {
  id: number;
  client: { fullName: string; businessName: string; product?: { name: string } };
  items: ChecklistItem[];
}

const phaseLabels: Record<number, string> = {
  1: "Business & Legal Foundation",
  2: "Brand Identity & UI/UX",
  3: "Product Data & Inventory",
  4: "Financials & Payment",
  5: "Logistics & Fulfillment",
  6: "Technical & SEO",
  7: "Customer Support & Policies",
};

export default function ChecklistDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [checklist, setChecklist] = useState<ChecklistData | null>(null);
  const [items, setItems] = useState<ChecklistItem[]>([]);
  const [openPhase, setOpenPhase] = useState<number | null>(1);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    apiFetch<{ data: ChecklistData }>(`/api/admin/checklists/${id}`)
      .then((res) => { setChecklist(res.data); setItems(res.data.items); })
      .catch(() => router.push("/admin/checklists"));
  }, [id, router]);

  const updateItem = (idx: number, field: "value" | "completed", val: string | boolean) => {
    setItems((prev) => prev.map((item, i) => (i === idx ? { ...item, [field]: val } : item)));
    setSaved(false);
  };

  const save = async () => {
    setSaving(true);
    try {
      await apiPatch(`/api/admin/checklists/${id}`, { items: items.map(({ phase, key, label, value, completed }) => ({ phase, key, label, value, completed })) });
      setSaved(true);
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  if (!checklist) return <div className="text-gray-500 py-12 text-center">Loading...</div>;

  const phases = Array.from(new Set(items.map((i) => i.phase))).sort();

  return (
    <div>
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div>
          <button onClick={() => router.push("/admin/checklists")} className="text-sm text-gray-400 hover:text-white mb-2 flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            Back to checklists
          </button>
          <h1 className="text-2xl font-bold text-white">{checklist.client.businessName}</h1>
          <p className="text-sm text-gray-400">{checklist.client.fullName} &middot; {checklist.client.product?.name}</p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => downloadCsv(`/api/admin/checklists/${id}/export`, `checklist-${id}.csv`)} className="px-3 py-2 rounded-lg bg-accent-blue/20 text-accent-blue text-sm hover:bg-accent-blue/30 transition-colors">
            Export CSV
          </button>
          <button onClick={save} disabled={saving} className="px-4 py-2 rounded-lg bg-accent-blue text-white text-sm font-medium hover:bg-accent-blue/90 transition-colors disabled:opacity-50">
            {saving ? "Saving..." : saved ? "Saved" : "Save All"}
          </button>
        </div>
      </div>

      <div className="mb-4">
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <span className="text-emerald-400 font-medium">{items.filter((i) => i.completed).length}</span>
          <span>of</span>
          <span className="text-white font-medium">{items.length}</span>
          <span>items completed</span>
        </div>
        <div className="mt-2 h-2 bg-[#0b1023] rounded-full overflow-hidden">
          <div className="h-full bg-accent-blue rounded-full transition-all" style={{ width: `${items.length > 0 ? (items.filter((i) => i.completed).length / items.length) * 100 : 0}%` }} />
        </div>
      </div>

      <div className="space-y-3">
        {phases.map((phase) => {
          const phaseItems = items.filter((i) => i.phase === phase);
          const isOpen = openPhase === phase;
          const completed = phaseItems.filter((i) => i.completed).length;

          return (
            <div key={phase} className="rounded-xl border border-gray-800 bg-[#0f1629] overflow-hidden">
              <button
                className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-white/5 transition-colors"
                onClick={() => setOpenPhase(isOpen ? null : phase)}
              >
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-accent-blue/20 text-accent-blue flex items-center justify-center text-sm font-bold">{phase}</span>
                  <span className="text-white font-medium">{phaseLabels[phase]}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-gray-400">{completed}/{phaseItems.length}</span>
                  <svg className={`w-5 h-5 text-gray-400 transition-transform ${isOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>
              {isOpen && (
                <div className="border-t border-gray-800 px-5 py-4 space-y-4">
                  {phaseItems.map((item) => {
                    const globalIdx = items.indexOf(item);
                    return (
                      <div key={item.key} className="flex items-start gap-3">
                        <input
                          type="checkbox"
                          checked={item.completed}
                          onChange={(e) => updateItem(globalIdx, "completed", e.target.checked)}
                          className="mt-1 w-4 h-4 rounded border-gray-600 bg-[#0b1023] text-accent-blue focus:ring-accent-blue/50"
                        />
                        <div className="flex-1 min-w-0">
                          <label className={`text-sm font-medium ${item.completed ? "text-gray-500 line-through" : "text-gray-200"}`}>
                            {item.label}
                          </label>
                          <input
                            type="text"
                            value={item.value || ""}
                            onChange={(e) => updateItem(globalIdx, "value", e.target.value)}
                            placeholder="Enter value..."
                            className="mt-1 w-full px-3 py-1.5 rounded-lg bg-[#0b1023] border border-gray-700 text-white text-sm placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-accent-blue/50"
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
