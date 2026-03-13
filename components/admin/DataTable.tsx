"use client";

import { useState, useEffect, useRef, ReactNode } from "react";

interface Column<T> {
  key: string;
  label: string;
  render?: (row: T) => ReactNode;
  sortable?: boolean;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  fetchData: (params: Record<string, string>) => Promise<{ data: T[]; meta: { total: number; page: number; limit: number; totalPages: number } }>;
  onRowClick?: (row: T) => void;
  filters?: ReactNode;
  actions?: ReactNode;
  searchPlaceholder?: string;
  extraParams?: Record<string, string>;
}

export default function DataTable<T extends { id: number }>({
  columns,
  fetchData,
  onRowClick,
  filters,
  actions,
  searchPlaceholder = "Search...",
  extraParams,
}: DataTableProps<T>) {
  const [data, setData] = useState<T[]>([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(20);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [sort, setSort] = useState("");
  const [order, setOrder] = useState<"asc" | "desc">("desc");
  const [initialLoad, setInitialLoad] = useState(true);
  const [fetching, setFetching] = useState(false);

  const fetchRef = useRef(fetchData);
  fetchRef.current = fetchData;
  const extraRef = useRef(extraParams);
  extraRef.current = extraParams;
  const loadId = useRef(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, 300);
    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    const id = ++loadId.current;
    setFetching(true);

    const params: Record<string, string> = {
      page: String(page),
      limit: String(limit),
      order,
      ...(extraRef.current || {}),
    };
    if (debouncedSearch) params.search = debouncedSearch;
    if (sort) params.sort = sort;

    fetchRef.current(params)
      .then((res) => {
        if (id !== loadId.current) return;
        setData(res.data);
        setTotal(res.meta.total);
        setTotalPages(res.meta.totalPages);
      })
      .catch((err) => {
        if (id !== loadId.current) return;
        console.error(err);
      })
      .finally(() => {
        if (id !== loadId.current) return;
        setInitialLoad(false);
        setFetching(false);
      });
  }, [page, limit, debouncedSearch, sort, order, fetchData, extraParams]);

  const handleSort = (key: string) => {
    if (sort === key) { setOrder(order === "asc" ? "desc" : "asc"); }
    else { setSort(key); setOrder("desc"); }
  };

  const showSkeleton = initialLoad;
  const showEmpty = !initialLoad && !fetching && data.length === 0;

  return (
    <div>
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <div className="flex-1">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={searchPlaceholder}
            className="w-full sm:w-72 px-3 py-2 rounded-lg bg-[#0b1023] border border-gray-700 text-white placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-accent-blue/50"
          />
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          {filters}
          {actions}
        </div>
      </div>

      <div className={`rounded-xl border border-gray-800 overflow-hidden transition-opacity ${fetching && !showSkeleton ? "opacity-60" : "opacity-100"}`}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#060b1a] border-b border-gray-800">
                {columns.map((col) => (
                  <th
                    key={col.key}
                    className={`text-left px-4 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider whitespace-nowrap ${col.sortable ? "cursor-pointer hover:text-white select-none" : ""}`}
                    onClick={() => col.sortable && handleSort(col.key)}
                  >
                    <span className="flex items-center gap-1">
                      {col.label}
                      {col.sortable && sort === col.key && (
                        <span>{order === "asc" ? "↑" : "↓"}</span>
                      )}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800/50">
              {showSkeleton ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i} className="bg-[#0f1629]">
                    {columns.map((col) => (
                      <td key={col.key} className="px-4 py-3">
                        <div className="h-4 bg-gray-800 rounded animate-pulse w-24" />
                      </td>
                    ))}
                  </tr>
                ))
              ) : showEmpty ? (
                <tr>
                  <td colSpan={columns.length} className="px-4 py-12 text-center text-gray-500">
                    No records found
                  </td>
                </tr>
              ) : (
                data.map((row) => (
                  <tr
                    key={row.id}
                    className={`bg-[#0f1629] hover:bg-[#131b33] transition-colors ${onRowClick ? "cursor-pointer" : ""}`}
                    onClick={() => onRowClick?.(row)}
                  >
                    {columns.map((col) => (
                      <td key={col.key} className="px-4 py-3 whitespace-nowrap text-gray-300">
                        {col.render ? col.render(row) : String((row as any)[col.key] ?? "")}
                      </td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex items-center justify-between mt-4 text-sm text-gray-400">
        <span>
          {total > 0 ? `Showing ${(page - 1) * limit + 1}-${Math.min(page * limit, total)} of ${total}` : "0 results"}
        </span>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setPage(Math.max(1, page - 1))}
            disabled={page <= 1}
            className="px-3 py-1.5 rounded-lg bg-[#0b1023] border border-gray-700 disabled:opacity-30 hover:bg-[#131b33] transition-colors"
          >
            Previous
          </button>
          <span className="text-gray-500">{page} / {totalPages}</span>
          <button
            onClick={() => setPage(Math.min(totalPages, page + 1))}
            disabled={page >= totalPages}
            className="px-3 py-1.5 rounded-lg bg-[#0b1023] border border-gray-700 disabled:opacity-30 hover:bg-[#131b33] transition-colors"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
