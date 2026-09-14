"use client";

import { motion } from "framer-motion";

export function AttestationHoldChip({
  result,
  phase,
  holdCleared,
}: {
  result: string;
  phase: string;
  holdCleared?: boolean;
}) {
  const held = result === "hold" || result === "fail" || (result !== "pass" && !holdCleared);
  const color = held ? "var(--color-amber)" : "var(--color-yield)";
  const label = held ? `Hold · ${phase}` : `Cleared · ${phase}`;

  return (
    <motion.span
      animate={held ? { opacity: [1, 0.65, 1] } : { opacity: 1 }}
      transition={held ? { duration: 1.2, repeat: Infinity, ease: "easeInOut" } : undefined}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        padding: "4px 10px",
        borderRadius: "var(--radius-sm)",
        border: `1px solid ${color}`,
        color,
        fontSize: 12,
        fontFamily: "var(--font-mono)",
        background: "var(--color-asphalt-950)",
      }}
      role="status"
      aria-label={held ? "Integrity hold blocks settlement" : "Attestation cleared"}
    >
      <span
        aria-hidden
        style={{
          width: 6,
          height: 6,
          borderRadius: "50%",
          background: color,
        }}
      />
      {label}
    </motion.span>
  );
}
