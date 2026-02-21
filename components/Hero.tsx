"use client";

import dynamic from "next/dynamic";

const PlexusBackground = dynamic(
  () => import("@/components/PlexusBackground"),
  { ssr: false }
);

/** Mini site preview shown inside the phone mockup – mirrors hero + nav. */
function HeroPhonePreview() {
  return (
    <div className="h-full w-full overflow-hidden rounded-[2.25rem] bg-primary-dark flex flex-col pt-5">
      {/* Mini nav */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-white/10 shrink-0">
        <span className="text-[10px] font-semibold text-white tracking-tight">Phaetex</span>
        <div className="flex gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
          <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
          <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
        </div>
      </div>
      {/* Mini hero content */}
      <div className="flex-1 p-3 flex flex-col justify-center min-h-0">
        <div className="h-1.5 w-3/4 rounded bg-white/20 mb-2" />
        <div className="h-1 w-full rounded bg-white/15 mb-1" />
        <div className="h-1 w-[80%] rounded bg-white/15 mb-3" />
        <div className="flex gap-1.5 mb-3">
          <span className="h-1.5 w-12 rounded bg-accent-orange/80" />
          <span className="h-1.5 w-10 rounded border border-accent-blue/60" />
        </div>
        <div className="mt-auto flex gap-2">
          <span className="h-2 w-8 rounded bg-accent-blue/30" />
          <span className="h-2 w-8 rounded bg-white/10" />
        </div>
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-end sm:items-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <PlexusBackground />
        <div
          className="absolute inset-0 z-10 pointer-events-none"
          style={{ backgroundColor: "rgba(4, 9, 30, 0.1)" }}
          aria-hidden
        />
      </div>
      <div className="relative z-20 w-full px-4 sm:px-6 lg:px-8 pt-20 pb-12 sm:pb-16 lg:pb-24">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="max-w-2xl">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.15] tracking-tight mb-5 sm:mb-6 max-w-xl">
                Professional SaaS Solutions for{" "}
                <span className="text-accent-blue">Creators & Small Businesses</span>
              </h1>
              <p className="text-base sm:text-lg text-gray-400 leading-relaxed mb-8 max-w-lg">
                Elevate your writing with our AI Humanizer or launch your online store today for just Ksh 2,000. We build digital tools that work for you.
              </p>
              <a
                href="#products"
                className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl font-medium bg-accent-blue text-white hover:bg-accent-blue/90 transition-colors shadow-lg shadow-accent-blue/20"
              >
                See our products
              </a>
            </div>
            <div className="relative flex justify-center lg:justify-end order-first lg:order-none min-h-[420px] lg:min-h-[520px]">
              {/* Dashboard-style layout: phone + floating cards */}
              <div className="relative w-full max-w-[340px] lg:max-w-[480px] h-[420px] lg:h-[520px] flex items-center justify-center">
                {/* "Before Phaetex" pill */}
                <div className="absolute top-0 right-4 lg:right-8 z-10 px-3 py-1.5 rounded-full bg-gray-800/95 dark:bg-primary-dark/95 border border-gray-600/50 text-xs font-medium text-gray-300">
                  Before Phaetex
                </div>
                {/* Content / product card */}
                <div className="absolute top-10 right-0 lg:right-4 w-[140px] lg:w-[180px] z-10 rounded-xl border border-gray-600/50 bg-gray-800/95 dark:bg-primary-dark/95 p-3 shadow-xl">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-8 h-8 rounded-lg bg-accent-blue/20 flex items-center justify-center text-accent-blue font-bold text-sm">P</span>
                    <div>
                      <p className="text-xs font-semibold text-white leading-tight">Humanizer</p>
                      <p className="text-[10px] text-gray-500">phaetex.com</p>
                    </div>
                  </div>
                  <span className="inline-block px-2 py-0.5 rounded text-[10px] font-medium bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 mb-2">Creator</span>
                  <p className="text-[10px] text-gray-400 leading-snug mb-2">Content that sounds human. One click.</p>
                  <div className="h-1.5 w-full rounded-full bg-gray-700 overflow-hidden">
                    <div className="h-full w-3/4 rounded-full bg-accent-blue" />
                  </div>
                </div>
                {/* "After Phaetex" pill */}
                <div className="absolute top-[7.5rem] lg:top-36 right-4 lg:right-8 z-10 px-3 py-1.5 rounded-full bg-gray-800/95 dark:bg-primary-dark/95 border border-gray-600/50 text-xs font-medium text-gray-300">
                  After Phaetex
                </div>
                {/* Central tilted phone (main visual) */}
                <div
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 perspective-[1200px] z-20"
                  aria-hidden
                >
                  <div
                    className="relative w-[min(260px,75vw)] lg:w-[300px] flex justify-center items-center"
                    style={{
                      transform: "rotateY(-18deg) rotateZ(6deg)",
                      transformStyle: "preserve-3d",
                    }}
                  >
                    <div
                      className="relative rounded-[2.75rem] p-2 sm:p-2.5 shadow-2xl border border-white/10 bg-gradient-to-b from-gray-800 to-gray-900"
                      style={{
                        boxShadow: "0 25px 80px -12px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.06)",
                      }}
                    >
                      <div className="relative w-full aspect-[9/19] max-h-[400px] lg:max-h-[480px] rounded-[2.25rem] overflow-hidden bg-primary-dark">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-3.5 rounded-b-lg bg-gray-900 z-10" aria-hidden />
                        <HeroPhonePreview />
                      </div>
                    </div>
                  </div>
                </div>
                {/* Users metric card */}
                <div className="absolute bottom-20 lg:bottom-24 right-0 lg:right-2 w-[130px] lg:w-[160px] z-10 rounded-xl border border-gray-600/50 bg-gray-800/95 dark:bg-primary-dark/95 p-3 shadow-xl">
                  <div className="flex items-center justify-between mb-2">
                    <span className="w-8 h-8 rounded-lg bg-accent-blue/20 flex items-center justify-center text-accent-blue">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                    </span>
                    <span className="text-[10px] font-semibold text-emerald-400">+1.6%</span>
                  </div>
                  <p className="text-xs font-semibold text-white mb-1">Users</p>
                  <div className="h-6 w-full flex items-end gap-0.5">
                    {[40, 55, 45, 70, 60, 75, 68].map((h, i) => (
                      <span key={i} className="flex-1 rounded-t bg-accent-blue/60" style={{ height: `${h}%` }} />
                    ))}
                  </div>
                  <p className="text-[10px] text-gray-500 mt-2">Ksh 10,561 · Investment</p>
                </div>
                {/* Sales metric card */}
                <div className="absolute bottom-0 lg:bottom-2 right-0 lg:right-2 w-[130px] lg:w-[160px] z-10 rounded-xl border border-gray-600/50 bg-gray-800/95 dark:bg-primary-dark/95 p-3 shadow-xl">
                  <div className="flex items-center justify-between mb-2">
                    <span className="w-8 h-8 rounded-lg bg-accent-blue/20 flex items-center justify-center text-accent-blue">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
                    </span>
                    <span className="text-[10px] font-semibold text-emerald-400">+0.4%</span>
                  </div>
                  <p className="text-xs font-semibold text-white mb-1">Sales</p>
                  <div className="h-6 w-full flex items-end gap-0.5">
                    {[50, 48, 62, 55, 70, 65, 72].map((h, i) => (
                      <span key={i} className="flex-1 rounded-t bg-accent-blue/60" style={{ height: `${h}%` }} />
                    ))}
                  </div>
                  <p className="text-[10px] text-gray-500 mt-2">Ksh 10,561 · Investment</p>
                </div>
                {/* 4.5 Rating card */}
                <div className="absolute bottom-12 lg:bottom-16 left-0 lg:left-4 w-[120px] lg:w-[140px] z-10 rounded-xl border border-gray-600/50 bg-gray-800/95 dark:bg-primary-dark/95 p-3 shadow-xl">
                  <span className="w-8 h-8 rounded-lg bg-accent-blue/20 flex items-center justify-center text-accent-orange mb-2">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
                  </span>
                  <p className="text-sm font-bold text-white">4.5 Rating</p>
                  <p className="text-[10px] text-gray-500">From 200+ reviews</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
