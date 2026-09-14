"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { settlementsService } from "@/services/domains/settlements";
import { Banner, DataTable, PageHeader, PrimaryButton } from "@/components/ops-ui";
import { PeerPayoutSlaClock } from "@/components/PeerPayoutSlaClock";
import { formatProblem } from "@/services/shared/http";
import { demoSettlements } from "@/lib/demo-data";

export default function SettlementsPage() {
  const q = useQuery({
    queryKey: ["settlements"],
    queryFn: () => settlementsService.list(),
    retry: false,
  });

  const usingDemo = q.isError || (!q.isLoading && !(q.data?.length));
  const items = usingDemo
    ? demoSettlements
    : (q.data || []).map((row) => ({
        settlementId: String(row.settlementId ?? "—"),
        rideId: String(row.rideId ?? "—"),
        amount: Number(row.amount ?? 0),
        currency: String(row.currency ?? "AED"),
        status: String(row.status ?? "—"),
        platformFeeRate: Number(row.platformFeeRate ?? 0),
        platformFeeAmount: Number(row.platformFeeAmount ?? 0),
        rail: String(row.rail ?? "fiat") as "fiat" | "crypto",
        cryptoAllowed: Boolean(row.cryptoAllowed),
        attestationUnlockRequired: Boolean(row.attestationUnlockRequired),
        slaDeadlineAt: String(row.slaDeadlineAt ?? new Date().toISOString()),
        bankFloatBaselineHours: Number(row.bankFloatBaselineHours ?? 48),
      }));

  const focus = items[0];

  const rows = items.map((s) => [
    s.settlementId,
    <Link key={s.rideId} href={`/rides/${s.rideId}`}>{s.rideId}</Link>,
    `${s.amount.toFixed(2)} ${s.currency}`,
    `Fee ${(s.platformFeeRate * 100).toFixed(0)}% (${s.platformFeeAmount.toFixed(2)})`,
    s.rail,
    s.status,
    s.attestationUnlockRequired ? "unlock required" : "ready",
  ]);

  return (
    <>
      <PageHeader
        title="Settlements"
        subtitle="Peer payout with disclosed fee and fiat/crypto rail choice."
        actions={<PrimaryButton onClick={() => q.refetch()}>Refresh</PrimaryButton>}
      />
      {usingDemo ? (
        <Banner tone="amber">Demo settlements — API unavailable or empty.</Banner>
      ) : null}
      {q.isError ? <Banner tone="coral">{formatProblem(q.error)}</Banner> : null}
      {focus ? (
        <div style={{ marginBottom: 16 }}>
          <PeerPayoutSlaClock
            slaDeadlineAt={focus.slaDeadlineAt}
            bankFloatBaselineHours={focus.bankFloatBaselineHours}
            status={focus.status}
          />
        </div>
      ) : null}
      <DataTable
        columns={["Settlement", "Ride", "Amount", "Fee line", "Rail", "Status", "Integrity"]}
        rows={rows}
        empty={q.isLoading ? "Loading…" : "No settlements in window."}
      />
    </>
  );
}
