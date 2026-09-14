"use client";

import { useState } from "react";
import { Panel, PrimaryButton } from "@/components/ops-ui";

export function PairedCanvasEditor({
  valueProposition,
  customerSegments,
  onSave,
}: {
  valueProposition: string;
  customerSegments: string[];
  onSave?: (vp: string, segments: string[]) => void;
}) {
  const [vp, setVp] = useState(valueProposition);
  const [segments, setSegments] = useState(customerSegments.join("\n"));

  return (
    <Panel>
      <div style={{ fontFamily: "var(--font-display)", fontSize: 16, marginBottom: 12 }}>
        Paired VP ↔ segment
      </div>
      <p style={{ margin: "0 0 14px", color: "var(--color-steel)", fontSize: 13 }}>
        Value proposition and customer segments stay locked as one living object.
      </p>
      <div style={{ display: "grid", gap: 16, gridTemplateColumns: "1fr 1fr" }}>
        <label style={{ display: "grid", gap: 6, fontSize: 13 }}>
          Value proposition
          <textarea
            value={vp}
            onChange={(e) => setVp(e.target.value)}
            rows={5}
            style={{
              background: "var(--color-asphalt-950)",
              border: "1px solid var(--color-asphalt-700)",
              borderRadius: "var(--radius-sm)",
              color: "var(--color-ink)",
              padding: 10,
              resize: "vertical",
            }}
          />
        </label>
        <label style={{ display: "grid", gap: 6, fontSize: 13 }}>
          Customer segments (one per line)
          <textarea
            value={segments}
            onChange={(e) => setSegments(e.target.value)}
            rows={5}
            style={{
              background: "var(--color-asphalt-950)",
              border: "1px solid var(--color-asphalt-700)",
              borderRadius: "var(--radius-sm)",
              color: "var(--color-ink)",
              padding: 10,
              resize: "vertical",
            }}
          />
        </label>
      </div>
      {onSave ? (
        <div style={{ marginTop: 14 }}>
          <PrimaryButton
            onClick={() =>
              onSave(
                vp.trim(),
                segments
                  .split("\n")
                  .map((s) => s.trim())
                  .filter(Boolean)
              )
            }
          >
            Propose re-fit
          </PrimaryButton>
        </div>
      ) : null}
    </Panel>
  );
}
