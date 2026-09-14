"use client";

import { Panel, Mono } from "@/components/ops-ui";

export function PurposeLimitedProof({
  proofHash,
  purposeTag,
  sensorTypes,
}: {
  proofHash: string;
  purposeTag: string;
  sensorTypes?: string[];
}) {
  return (
    <Panel>
      <div style={{ fontFamily: "var(--font-display)", fontSize: 16, marginBottom: 8 }}>
        Purpose-limited proof
      </div>
      <p style={{ margin: "0 0 10px", color: "var(--color-steel)", fontSize: 13 }}>
        Integrity hash only — no raw cabin or location stream.
      </p>
      <Mono>{proofHash}</Mono>
      <div style={{ marginTop: 10, fontSize: 13 }}>
        Purpose tag: <span style={{ color: "var(--color-brand)" }}>{purposeTag}</span>
      </div>
      {sensorTypes?.length ? (
        <div style={{ marginTop: 6, fontSize: 12, color: "var(--color-steel)" }}>
          Sensors: {sensorTypes.join(" · ")}
        </div>
      ) : null}
    </Panel>
  );
}
