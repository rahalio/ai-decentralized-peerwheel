"use client";

import { Panel } from "@/components/ops-ui";

export function YieldForesightPanel({
  expectedNetYieldPerHour,
  platformFeeRate,
  currency,
  taxiBenchmarkPerHour,
}: {
  expectedNetYieldPerHour: number;
  platformFeeRate: number;
  currency: string;
  taxiBenchmarkPerHour?: number;
}) {
  return (
    <Panel>
      <div
        style={{
          fontFamily: "var(--font-display)",
          fontSize: 13,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: "var(--color-brand)",
          marginBottom: 8,
        }}
      >
        Yield foresight
      </div>
      <div
        style={{
          fontFamily: "var(--font-display)",
          fontSize: 40,
          fontWeight: 700,
          color: "var(--color-yield)",
          lineHeight: 1.1,
        }}
      >
        {expectedNetYieldPerHour.toFixed(1)}{" "}
        <span style={{ fontSize: 18, color: "var(--color-steel)" }}>
          {currency}/hr net
        </span>
      </div>
      <p style={{ margin: "12px 0 0", color: "var(--color-steel)", fontSize: 14 }}>
        Platform fee line: {(platformFeeRate * 100).toFixed(0)}% disclosed before listing.
        {taxiBenchmarkPerHour != null
          ? ` Taxi corridor benchmark ${taxiBenchmarkPerHour.toFixed(1)} ${currency}/hr.`
          : null}
      </p>
    </Panel>
  );
}
