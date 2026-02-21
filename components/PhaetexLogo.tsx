"use client";

type PhaetexLogoProps = {
  className?: string;
  /** Accessible label when used as sole content of a link */
  "aria-hidden"?: boolean;
};

const ACCENT_ORANGE = "#ffa500";

export function PhaetexLogo({ className = "", "aria-hidden": ariaHidden }: PhaetexLogoProps) {
  return (
    <svg
      viewBox="0 0 200 52"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`block w-full h-full object-contain object-left ${className}`}
      aria-hidden={ariaHidden}
    >
      {/* Orange swoosh arching over "Phaetex" */}
      <path
        d="M 4 34 Q 50 12 100 26 T 196 30"
        stroke={ACCENT_ORANGE}
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
      {/* "Phaetex" – larger, fill follows parent currentColor */}
      <text
        x="0"
        y="34"
        fill="currentColor"
        fontFamily="ui-sans-serif, system-ui, sans-serif"
        fontSize="32"
        fontWeight="700"
        letterSpacing="-0.02em"
      >
        Phaetex
      </text>
      {/* "SOLUTIONS" – smaller, below Phaetex, emerging from the right */}
      <text
        x="200"
        y="50"
        textAnchor="end"
        fill={ACCENT_ORANGE}
        fontFamily="ui-sans-serif, system-ui, sans-serif"
        fontSize="9"
        fontWeight="600"
        letterSpacing="0.14em"
      >
        SOLUTIONS
      </text>
    </svg>
  );
}
