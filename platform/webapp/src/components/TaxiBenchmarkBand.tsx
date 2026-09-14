"use client";

import { Panel } from "@/components/ops-ui";

export function TaxiBenchmarkBand({
  low,
  mid,
  high,
  taxiBenchmark,
  currency,
}: {
  low: number;
  mid: number;
  high: number;
  taxiBenchmark: number;
  currency: string;
}) {
  const max = Math.max(high, taxiBenchmark) * 1.15;
  const pct = (v: number) => `${Math.min(100, (v / max) * 100)}%`;

  return (
    <Panel>
      <div style={{ fontFamily: "var(--font-display)", fontSize: 16, marginBottom: 12 }}>
        Taxi benchmark band
      </div>
      <div style={{ position: "relative", height: 28, marginBottom: 10 }}>
        <div
          style={{
            position: "absolute",
            inset: "10px 0",
            background: "var(--color-asphalt-700)",
            borderRadius: 2,
          }}
        />
        <div
          style={{
            position: "absolute",
            left: pct(low),
            width: `calc(${pct(high)} - ${pct(low)})`,
            top: 6,
            height: 16,
            background: "var(--color-yield-dim)",
            borderRadius: 2,
          }}
        />
        <div
          title="Taxi"
          style={{
            position: "absolute",
            left: pct(taxiBenchmark),
            top: 2,
            width: 3,
            height: 24,
            background: "var(--color-amber)",
          }}
        />
        <div
          title="Mid"
          style={{
            position: "absolute",
            left: pct(mid),
            top: 8,
            width: 8,
            height: 12,
            background: "var(--color-yield)",
            borderRadius: 1,
            transform: "translateX(-50%)",
          }}
        />
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "var(--color-steel)" }}>
        <span>Low {low} {currency}</span>
        <span>Mid {mid}</span>
        <span>Taxi {taxiBenchmark}</span>
        <span>High {high}</span>
      </div>
    </Panel>
  );
}
