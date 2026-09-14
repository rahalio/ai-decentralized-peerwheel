"use client";

import type { CSSProperties, ReactNode } from "react";

export function PageHeader({
  title,
  subtitle,
  actions,
}: {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
}) {
  return (
    <header
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        gap: 16,
        marginBottom: 24,
      }}
    >
      <div>
        <div
          style={{
            fontFamily: "var(--font-display)",
            fontSize: 13,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "var(--color-brand)",
            marginBottom: 6,
          }}
        >
          Peerwheel
        </div>
        <h1
          style={{
            margin: 0,
            fontFamily: "var(--font-display)",
            fontSize: 28,
            fontWeight: 600,
          }}
        >
          {title}
        </h1>
        {subtitle ? (
          <p style={{ margin: "8px 0 0", color: "var(--color-steel)", maxWidth: 640 }}>
            {subtitle}
          </p>
        ) : null}
      </div>
      {actions}
    </header>
  );
}

export function Panel({
  children,
  style,
}: {
  children: ReactNode;
  style?: CSSProperties;
}) {
  return (
    <section
      style={{
        background: "var(--color-asphalt-900)",
        border: "1px solid var(--color-asphalt-700)",
        borderRadius: "var(--radius-md)",
        padding: 16,
        ...style,
      }}
    >
      {children}
    </section>
  );
}

export function Banner({
  tone,
  children,
}: {
  tone: "yield" | "amber" | "coral";
  children: ReactNode;
}) {
  const color =
    tone === "yield"
      ? "var(--color-yield)"
      : tone === "amber"
        ? "var(--color-amber)"
        : "var(--color-coral)";
  return (
    <div
      role="status"
      style={{
        borderLeft: `3px solid ${color}`,
        background: "var(--color-asphalt-900)",
        padding: "12px 14px",
        borderRadius: "var(--radius-sm)",
        marginBottom: 16,
        color: "var(--color-ink)",
      }}
    >
      {children}
    </div>
  );
}

export function DataTable({
  columns,
  rows,
  empty,
}: {
  columns: string[];
  rows: ReactNode[][];
  empty: string;
}) {
  if (!rows.length) {
    return (
      <Panel>
        <div style={{ color: "var(--color-steel)", padding: 8 }}>{empty}</div>
      </Panel>
    );
  }
  return (
    <Panel style={{ padding: 0, overflow: "auto" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
        <thead>
          <tr>
            {columns.map((c) => (
              <th
                key={c}
                style={{
                  textAlign: "left",
                  padding: "12px 14px",
                  borderBottom: "1px solid var(--color-asphalt-700)",
                  color: "var(--color-steel)",
                  fontWeight: 500,
                }}
              >
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i}>
              {row.map((cell, j) => (
                <td
                  key={j}
                  style={{
                    padding: "12px 14px",
                    borderBottom: "1px solid var(--color-asphalt-700)",
                    fontFamily: j === 0 ? "var(--font-mono)" : undefined,
                    fontSize: j === 0 ? 12 : 14,
                  }}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </Panel>
  );
}

export function PrimaryButton({
  children,
  onClick,
  disabled,
  type = "button",
}: {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit";
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      style={{
        background: "var(--color-yield)",
        color: "var(--color-asphalt-950)",
        border: "none",
        borderRadius: "var(--radius-sm)",
        padding: "10px 14px",
        fontWeight: 600,
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.5 : 1,
        transition: `background var(--motion-settle)`,
      }}
    >
      {children}
    </button>
  );
}

export function Mono({ children }: { children: ReactNode }) {
  return (
    <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--color-brand)" }}>
      {children}
    </span>
  );
}
