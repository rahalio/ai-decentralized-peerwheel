"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import clsx from "clsx";
import { useRole, type OperatorRole } from "@/contexts/role-context";
import type { ReactNode } from "react";

const NAV: Record<OperatorRole, { href: string; label: string }[]> = {
  owner: [
    { href: "/", label: "Owner home" },
    { href: "/vehicles", label: "Vehicles" },
    { href: "/settlements", label: "Settlements" },
    { href: "/rides/ride_demo_01", label: "Ride receipt" },
  ],
  ops: [
    { href: "/", label: "Ops home" },
    { href: "/matching", label: "Matching" },
    { href: "/attestations", label: "Attestations" },
    { href: "/settlements", label: "Settlements" },
    { href: "/disputes", label: "Disputes" },
  ],
  dispute: [
    { href: "/", label: "Dispute desk" },
    { href: "/disputes", label: "Cases" },
    { href: "/rides/ride_demo_02", label: "Ride ledger" },
    { href: "/attestations", label: "Proofs" },
  ],
  strategy: [
    { href: "/", label: "Strategy home" },
    { href: "/canvas", label: "Operating canvas" },
    { href: "/matching", label: "Channel match" },
  ],
  city: [
    { href: "/", label: "City home" },
    { href: "/corridors", label: "Corridors" },
    { href: "/vehicles", label: "Licensing" },
  ],
};

const ROLES: { id: OperatorRole; label: string }[] = [
  { id: "owner", label: "Owner / fleet" },
  { id: "ops", label: "Settlement ops" },
  { id: "dispute", label: "Dispute desk" },
  { id: "strategy", label: "Strategy" },
  { id: "city", label: "City / compliance" },
];

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const { role, setRole, corridorId, setCorridorId } = useRole();
  const items = NAV[role];

  if (pathname === "/login") {
    return <>{children}</>;
  }

  return (
    <div style={{ display: "grid", gridTemplateColumns: "240px 1fr", minHeight: "100vh" }}>
      <aside
        style={{
          background: "var(--color-asphalt-900)",
          borderRight: "1px solid var(--color-asphalt-700)",
          padding: "20px 16px",
          display: "flex",
          flexDirection: "column",
          gap: 20,
        }}
      >
        <div>
          <div
            style={{
              fontFamily: "var(--font-display)",
              fontSize: 22,
              fontWeight: 700,
              color: "var(--color-brand)",
              letterSpacing: "0.04em",
            }}
          >
            Peerwheel
          </div>
          <div style={{ color: "var(--color-steel)", fontSize: 12, marginTop: 4 }}>
            AV peer settlement
          </div>
        </div>

        <label style={{ display: "grid", gap: 6, fontSize: 12, color: "var(--color-steel)" }}>
          Workspace
          <select
            value={role}
            onChange={(e) => setRole(e.target.value as OperatorRole)}
            style={{
              background: "var(--color-asphalt-950)",
              color: "var(--color-ink)",
              border: "1px solid var(--color-asphalt-700)",
              borderRadius: "var(--radius-sm)",
              padding: "8px 10px",
            }}
          >
            {ROLES.map((r) => (
              <option key={r.id} value={r.id}>
                {r.label}
              </option>
            ))}
          </select>
        </label>

        <label style={{ display: "grid", gap: 6, fontSize: 12, color: "var(--color-steel)" }}>
          Corridor
          <select
            value={corridorId}
            onChange={(e) => setCorridorId(e.target.value)}
            style={{
              background: "var(--color-asphalt-950)",
              color: "var(--color-ink)",
              border: "1px solid var(--color-asphalt-700)",
              borderRadius: "var(--radius-sm)",
              padding: "8px 10px",
            }}
          >
            <option value="cor_dxb_marina">Dubai Marina</option>
            <option value="cor_dxb_downtown">Downtown / DIFC</option>
          </select>
        </label>

        <nav style={{ display: "grid", gap: 4 }}>
          {items.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname === item.href || pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={clsx(isActive && "active")}
                style={{
                  padding: "10px 12px",
                  borderRadius: "var(--radius-sm)",
                  color: isActive ? "var(--color-asphalt-950)" : "var(--color-ink)",
                  background: isActive ? "var(--color-yield)" : "transparent",
                  fontWeight: isActive ? 600 : 400,
                  transition: `background var(--motion-settle)`,
                }}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div style={{ marginTop: "auto", fontSize: 12, color: "var(--color-steel)" }}>
          Payout unlocks only when integrity proves out.
        </div>
      </aside>

      <main style={{ padding: "28px 32px" }}>
        <motion.div
          key={pathname + role}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.22 }}
        >
          {children}
        </motion.div>
      </main>
    </div>
  );
}
