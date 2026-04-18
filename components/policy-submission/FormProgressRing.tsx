"use client";

/** Circular progress indicator (0–100) similar to reference policy submission UI. */
export default function FormProgressRing({ percent }: { percent: number }) {
  const p = Math.min(100, Math.max(0, Math.round(percent)));
  const r = 16;
  const c = 2 * Math.PI * r;
  const strokeDashoffset = c - (p / 100) * c;

  return (
    <div
      className="relative flex align-items-center justify-content-center"
      style={{ width: "4.5rem", height: "4.5rem" }}
    >
      <svg width="72" height="72" viewBox="0 0 36 36" className="-rotate-90" aria-hidden>
        <circle cx="18" cy="18" r={r} fill="none" className="stroke-200" strokeWidth="2.5" style={{ stroke: "var(--surface-300)" }} />
        <circle
          cx="18"
          cy="18"
          r={r}
          fill="none"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={strokeDashoffset}
          style={{ stroke: "#ea580c" }}
        />
      </svg>
      <span className="absolute text-lg font-semibold text-orange-600 w-full text-center" style={{ pointerEvents: "none" }}>
        {p}%
      </span>
    </div>
  );
}
