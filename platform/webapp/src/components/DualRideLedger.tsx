"use client";

import { Panel, Mono } from "@/components/ops-ui";

export type LedgerRow = {
  at: string;
  actor: string;
  event: string;
  detail: string;
};

export function DualRideLedger({
  rideId,
  ownerId,
  riderId,
  entries,
}: {
  rideId: string;
  ownerId: string;
  riderId: string;
  entries: LedgerRow[];
}) {
  return (
    <div style={{ display: "grid", gap: 16, gridTemplateColumns: "1fr 1fr" }}>
      <Panel>
        <div style={{ marginBottom: 10, color: "var(--color-brand)" }}>Owner view</div>
        <Mono>{rideId}</Mono>
        <div style={{ fontSize: 12, color: "var(--color-steel)", marginTop: 4 }}>Owner {ownerId}</div>
        <ul style={{ listStyle: "none", padding: 0, margin: "14px 0 0", display: "grid", gap: 10 }}>
          {entries.map((e, i) => (
            <li key={i} style={{ borderLeft: "2px solid var(--color-yield)", paddingLeft: 10 }}>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--color-steel)" }}>
                {e.at}
              </div>
              <div style={{ fontSize: 14 }}>{e.event}</div>
              <div style={{ fontSize: 12, color: "var(--color-steel)" }}>{e.detail}</div>
            </li>
          ))}
        </ul>
      </Panel>
      <Panel>
        <div style={{ marginBottom: 10, color: "var(--color-brand)" }}>Rider view</div>
        <Mono>{rideId}</Mono>
        <div style={{ fontSize: 12, color: "var(--color-steel)", marginTop: 4 }}>Rider {riderId}</div>
        <ul style={{ listStyle: "none", padding: 0, margin: "14px 0 0", display: "grid", gap: 10 }}>
          {entries.map((e, i) => (
            <li key={i} style={{ borderLeft: "2px solid var(--color-asphalt-700)", paddingLeft: 10 }}>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--color-steel)" }}>
                {e.at}
              </div>
              <div style={{ fontSize: 14 }}>{e.event}</div>
              <div style={{ fontSize: 12, color: "var(--color-steel)" }}>{e.detail}</div>
            </li>
          ))}
        </ul>
      </Panel>
    </div>
  );
}
