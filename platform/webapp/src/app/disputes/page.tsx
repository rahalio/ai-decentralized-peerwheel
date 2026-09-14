"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { disputesService } from "@/services/domains/disputes";
import { Banner, DataTable, PageHeader, Panel, PrimaryButton } from "@/components/ops-ui";
import { formatProblem } from "@/services/shared/http";
import { demoDisputes } from "@/lib/demo-data";

export default function DisputesPage() {
  const q = useQuery({
    queryKey: ["disputes"],
    queryFn: () => disputesService.list(),
    retry: false,
  });

  const usingDemo = q.isError || (!q.isLoading && !(q.data?.length));
  const items = usingDemo
    ? demoDisputes
    : (q.data || []).map((row) => ({
        disputeId: String(row.disputeId ?? "—"),
        rideId: String(row.rideId ?? "—"),
        reason: String(row.reason ?? "—"),
        status: String(row.status ?? "—"),
        deadlineAt: String(row.deadlineAt ?? "—"),
        ownerEvidence: "—",
        riderEvidence: "—",
      }));

  const focus = items[0];

  const rows = items.map((d) => [
    d.disputeId,
    <Link key={d.rideId} href={`/rides/${d.rideId}`}>{d.rideId}</Link>,
    d.reason,
    d.status,
    d.deadlineAt,
  ]);

  return (
    <>
      <PageHeader
        title="Dispute desk"
        subtitle="Time-boxed cases with dual-readable ledger + IoT attestations."
        actions={<PrimaryButton onClick={() => q.refetch()}>Refresh</PrimaryButton>}
      />
      {usingDemo ? (
        <Banner tone="amber">Demo dispute queue — API unavailable or empty.</Banner>
      ) : null}
      {q.isError ? <Banner tone="coral">{formatProblem(q.error)}</Banner> : null}
      {focus ? (
        <div style={{ display: "grid", gap: 16, gridTemplateColumns: "1fr 1fr", marginBottom: 16 }}>
          <Panel>
            <div style={{ color: "var(--color-brand)", marginBottom: 8 }}>Owner evidence</div>
            <p style={{ margin: 0, color: "var(--color-steel)", fontSize: 14 }}>
              {focus.ownerEvidence}
            </p>
          </Panel>
          <Panel>
            <div style={{ color: "var(--color-brand)", marginBottom: 8 }}>Rider evidence</div>
            <p style={{ margin: 0, color: "var(--color-steel)", fontSize: 14 }}>
              {focus.riderEvidence}
            </p>
          </Panel>
        </div>
      ) : null}
      <DataTable
        columns={["Dispute", "Ride", "Reason", "Status", "Deadline"]}
        rows={rows}
        empty={q.isLoading ? "Loading…" : "No open disputes."}
      />
    </>
  );
}
