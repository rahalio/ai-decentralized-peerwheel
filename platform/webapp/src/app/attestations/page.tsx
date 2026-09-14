"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { attestationsService } from "@/services/domains/attestations";
import { Banner, DataTable, PageHeader, PrimaryButton } from "@/components/ops-ui";
import { AttestationHoldChip } from "@/components/AttestationHoldChip";
import { PurposeLimitedProof } from "@/components/PurposeLimitedProof";
import { formatProblem } from "@/services/shared/http";
import { demoAttestations } from "@/lib/demo-data";

export default function AttestationsPage() {
  const q = useQuery({
    queryKey: ["attestations"],
    queryFn: () => attestationsService.list(),
    retry: false,
  });

  const usingDemo = q.isError || (!q.isLoading && !(q.data?.length));
  const items = usingDemo
    ? demoAttestations
    : (q.data || []).map((row) => ({
        attestationId: String(row.attestationId ?? "—"),
        rideId: String(row.rideId ?? "—"),
        result: String(row.result ?? "hold") as "pass" | "fail" | "hold",
        phase: String(row.phase ?? "pre") as "pre" | "during" | "post",
        proofHash: String(row.proofHash ?? "—"),
        purposeTag: String(row.purposeTag ?? "integrity"),
        sensorTypes: Array.isArray(row.sensorTypes)
          ? (row.sensorTypes as string[])
          : [],
        holdCleared: Boolean(row.holdCleared),
      }));

  const focus = items.find((a) => a.result === "hold") ?? items[0];

  const rows = items.map((a) => [
    a.attestationId,
    <Link key={a.rideId} href={`/rides/${a.rideId}`}>{a.rideId}</Link>,
    <AttestationHoldChip
      key={`${a.attestationId}-chip`}
      result={a.result}
      phase={a.phase}
      holdCleared={a.holdCleared}
    />,
    a.purposeTag,
  ]);

  return (
    <>
      <PageHeader
        title="Integrity attestation desk"
        subtitle="Bind lock/heartbeat/fault proofs to rides; block payout on security holds."
        actions={<PrimaryButton onClick={() => q.refetch()}>Refresh</PrimaryButton>}
      />
      {usingDemo ? (
        <Banner tone="amber">Demo hold queue — API unavailable or empty.</Banner>
      ) : null}
      {q.isError ? <Banner tone="coral">{formatProblem(q.error)}</Banner> : null}
      {focus ? (
        <div style={{ marginBottom: 16 }}>
          <PurposeLimitedProof
            proofHash={focus.proofHash}
            purposeTag={focus.purposeTag}
            sensorTypes={focus.sensorTypes}
          />
        </div>
      ) : null}
      <DataTable
        columns={["Attestation", "Ride", "Proof", "Purpose"]}
        rows={rows}
        empty={q.isLoading ? "Loading…" : "Healthy corridor — no open holds."}
      />
    </>
  );
}
