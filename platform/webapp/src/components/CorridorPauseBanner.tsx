"use client";

export function CorridorPauseBanner({
  corridorName,
  reason,
  classes,
}: {
  corridorName: string;
  reason?: string;
  classes?: string[];
}) {
  return (
    <div
      role="status"
      aria-live="polite"
      style={{
        borderLeft: "3px solid var(--color-coral)",
        background: "var(--color-asphalt-900)",
        border: "1px solid var(--color-asphalt-700)",
        borderRadius: "var(--radius-sm)",
        padding: "12px 14px",
        marginBottom: 16,
      }}
    >
      <strong style={{ color: "var(--color-coral)" }}>Corridor paused</strong>
      <span style={{ color: "var(--color-ink)" }}> — {corridorName}</span>
      <div style={{ marginTop: 6, fontSize: 13, color: "var(--color-steel)" }}>
        {reason || "Safety pause without rewriting settled history."}
        {classes?.length ? ` Classes: ${classes.join(", ")}.` : null}
      </div>
    </div>
  );
}
