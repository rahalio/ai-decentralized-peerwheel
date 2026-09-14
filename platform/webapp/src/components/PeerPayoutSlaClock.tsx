"use client";

import { useEffect, useState } from "react";
import { Panel } from "@/components/ops-ui";

function formatRemaining(ms: number): string {
  if (ms <= 0) return "SLA breached";
  const h = Math.floor(ms / 3_600_000);
  const m = Math.floor((ms % 3_600_000) / 60_000);
  return `${h}h ${m}m remaining`;
}

export function PeerPayoutSlaClock({
  slaDeadlineAt,
  bankFloatBaselineHours,
  status,
}: {
  slaDeadlineAt: string;
  bankFloatBaselineHours: number;
  status?: string;
}) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 30_000);
    return () => clearInterval(t);
  }, []);

  const deadline = new Date(slaDeadlineAt).getTime();
  const remaining = deadline - now;
  const breached = remaining <= 0;
  const color = breached ? "var(--color-coral)" : "var(--color-yield)";

  return (
    <Panel>
      <div style={{ fontFamily: "var(--font-display)", fontSize: 16, marginBottom: 8 }}>
        Peer payout SLA
      </div>
      <div
        role="status"
        aria-live="polite"
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 22,
          color,
          fontWeight: 500,
        }}
      >
        {formatRemaining(remaining)}
      </div>
      <p style={{ margin: "10px 0 0", color: "var(--color-steel)", fontSize: 13 }}>
        vs bank float baseline {bankFloatBaselineHours}h
        {status ? ` · status ${status}` : ""}
      </p>
    </Panel>
  );
}
