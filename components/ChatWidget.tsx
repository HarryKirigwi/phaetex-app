"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type MoreInfoItem = { title: string; url: string };
type ChatResponse = { answer: string; moreInfo?: MoreInfoItem[] };

type ChatMessage =
  | { id: string; role: "bot"; text: string; moreInfo?: MoreInfoItem[] }
  | { id: string; role: "user"; text: string };

function getBackendBaseUrl() {
  const base = process.env.NEXT_PUBLIC_BACKEND_BASE_URL?.trim();
  if (base) return base.replace(/\/+$/, "");

  const host = process.env.NEXT_PUBLIC_BACKEND_HOST?.trim();
  if (host) return `http://${host}:4000`;

  return "http://localhost:4000";
}

function uuid() {
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

const WELCOME_TEXT = "Welcome to Phaetex Solutions, how may I help you?";

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: uuid(), role: "bot", text: WELCOME_TEXT },
  ]);

  const panelRef = useRef<HTMLDivElement | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const backendBaseUrl = useMemo(() => getBackendBaseUrl(), []);

  useEffect(() => {
    if (!isOpen) return;
    const t = setTimeout(() => inputRef.current?.focus(), 50);
    return () => clearTimeout(t);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight });
  }, [isOpen, messages.length]);

  useEffect(() => {
    if (!isOpen) return;

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setIsOpen(false);
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

  async function sendMessage() {
    const text = input.trim();
    if (!text || isSending) return;

    setIsSending(true);
    setInput("");

    const userMsg: ChatMessage = { id: uuid(), role: "user", text };
    setMessages((prev) => [...prev, userMsg]);

    try {
      const res = await fetch(`${backendBaseUrl}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });

      if (!res.ok) {
        throw new Error(`Chat request failed: ${res.status}`);
      }

      const data = (await res.json()) as ChatResponse;

      const botMsg: ChatMessage = {
        id: uuid(),
        role: "bot",
        text: data?.answer ?? "",
        moreInfo: Array.isArray(data?.moreInfo) ? data.moreInfo : undefined,
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: uuid(),
          role: "bot",
          text: "Sorry — I couldn’t reach our support system right now. Please try again in a moment.",
        },
      ]);
    } finally {
      setIsSending(false);
    }
  }

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {isOpen ? (
        <div
          ref={panelRef}
          className="absolute bottom-16 right-0 w-[min(92vw,380px)] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl dark:border-white/10 dark:bg-slate-950"
        >
          <div className="flex items-center justify-between gap-3 border-b border-slate-200/70 bg-slate-950 px-4 py-3 text-white dark:border-white/10 dark:bg-slate-950">
            <div className="min-w-0">
              <div className="truncate text-sm font-semibold text-white">
                Phaetex Chat
              </div>
              <div className="truncate text-xs text-slate-200">
                Ask anything about our services
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full text-white/90 hover:bg-white/10"
              aria-label="Close chat"
            >
              <span aria-hidden>×</span>
            </button>
          </div>

          <div
            ref={listRef}
            className="max-h-[55vh] space-y-3 overflow-y-auto px-4 py-4"
          >
            {messages.map((m) => (
              <div
                key={m.id}
                className={m.role === "user" ? "flex justify-end" : "flex justify-start"}
              >
                <div
                  className={
                    m.role === "user"
                      ? "max-w-[85%] rounded-2xl bg-slate-950 px-3 py-2 text-sm text-white dark:bg-slate-900"
                      : "max-w-[85%] rounded-2xl bg-slate-100 px-3 py-2 text-sm text-slate-900 dark:bg-white/10 dark:text-slate-100"
                  }
                >
                  <div className="whitespace-pre-wrap">{m.text}</div>
                  {"moreInfo" in m && Array.isArray(m.moreInfo) && m.moreInfo.length > 0 ? (
                    <div className="mt-2 space-y-1">
                      {m.moreInfo.map((info, idx) => (
                        <a
                          key={`${m.id}-${idx}`}
                          href={info.url}
                          target="_blank"
                          rel="noreferrer noopener"
                          className="block text-xs underline underline-offset-2 opacity-90 hover:opacity-100"
                        >
                          {`For more info: ${info.title}`}
                        </a>
                      ))}
                    </div>
                  ) : null}
                </div>
              </div>
            ))}

            {isSending ? (
              <div className="flex justify-start">
                <div className="max-w-[85%] rounded-2xl bg-slate-100 px-3 py-2 text-sm text-slate-900 dark:bg-white/10 dark:text-slate-100">
                  Thinking…
                </div>
              </div>
            ) : null}
          </div>

          <div className="border-t border-gray-200/70 p-3 dark:border-white/10">
            <div className="flex items-center gap-2">
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    void sendMessage();
                  }
                }}
                placeholder="Type your message…"
                className="h-11 flex-1 rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none ring-0 placeholder:text-slate-400 focus:border-slate-300 dark:border-white/10 dark:bg-slate-950 dark:text-slate-100 dark:placeholder:text-slate-400 dark:focus:border-white/20"
                aria-label="Chat message"
                disabled={isSending}
              />
              <button
                type="button"
                onClick={() => void sendMessage()}
                disabled={isSending || !input.trim()}
                className="h-11 rounded-xl bg-slate-950 px-4 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50 dark:bg-slate-900"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      ) : null}

      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-slate-950 text-white shadow-lg ring-1 ring-black/5 hover:opacity-95 dark:bg-slate-900"
        aria-label="Open chat"
      >
        <svg
          aria-hidden
          viewBox="0 0 24 24"
          fill="none"
          className="h-7 w-7"
        >
          <path
            d="M7 8h10M7 12h6m-2.25 8c-1.6 0-3.13-.35-4.5-.98L3 20l.98-3.25A9.75 9.75 0 0 1 2.5 12.75C2.5 7.37 7.37 2.5 12.75 2.5S23 7.37 23 12.75 18.13 23 12.75 23c-1.1 0-2.16-.14-3.16-.4"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
}

