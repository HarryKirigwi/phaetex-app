"use client";

import { useEffect } from "react";

const ROOT_MARGIN = "0px 0px -80px 0px";
const THRESHOLD = 0.1;

export default function ScrollAnimationController() {
  useEffect(() => {
    const els = document.querySelectorAll("[data-animate]");
    if (els.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
          }
        });
      },
      { rootMargin: ROOT_MARGIN, threshold: THRESHOLD }
    );

    els.forEach((el) => observer.observe(el));
    return () => els.forEach((el) => observer.unobserve(el));
  }, []);

  return null;
}
