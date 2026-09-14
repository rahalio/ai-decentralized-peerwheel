"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ridesService } from "@/services/domains/rides";
import { Banner, PageHeader, Panel, PrimaryButton } from "@/components/ops-ui";
import { DualRideLedger } from "@/components/DualRideLedger";
import { AttestationHoldChip } from "@/components/AttestationHoldChip";
import { TaxiBenchmarkBand } from "@/components/TaxiBenchmarkBand";
import { formatProblem } from "@/services/shared/http";
import { demoRideById } from "@/lib/demo-data";

export default function RideReceiptPage() {
  const params = useParams();
  const rideId = String(params.id ?? "ride_demo_01");

  const q = useQuery({
    queryKey: ["ride", rideId],
    queryFn: () => ridesService.get(rideId),
    retry: false,
  });

  const demo = demoRideById(rideId);
  const usingDemo = q.isError || !q.data;
  const ride = usingDemo
    ? demo!
    : {
        rideId: String(q.data?.rideId ?? rideId),
        vehicleId: String(q.data?.vehicleId ?? "—"),
        riderId: String(q.data?.riderId ?? "—"),
        ownerId: String(q.data?.ownerId ?? "—"),
        status: String(q.data?.status ?? "—"),
        pickup: String(q.data?.pickup ?? "—"),
        dropoff: String(q.data?.dropoff ?? "—"),
        corridorId: String(q.data?.corridorId ?? "—"),
        channel: String(q.data?.channel ?? "—"),
        priceBand: demo!.priceBand,
        attestationHold: Boolean(q.data?.attestationHold),
        ledger: demo!.ledger,
        createdAt: String(q.data?.createdAt ?? ""),
      };

  return (
    <>
      <PageHeader
        title="Ride receipt"
        subtitle="Dual-readable fare, fee line, attestation summary, and ledger refs."
        actions={
          <Link href="/disputes">
            <PrimaryButton>Open dispute</PrimaryButton>
          </Link>
        }
      />
      {usingDemo ? (
        <Banner tone="amber">Demo receipt — API unavailable.</Banner>
      ) : null}
      {q.isError ? <Banner tone="coral">{formatProblem(q.error)}</Banner> : null}
      <div style={{ display: "grid", gap: 16, gridTemplateColumns: "1fr 1fr", marginBottom: 16 }}>
        <Panel>
          <div style={{ fontFamily: "var(--font-display)", fontSize: 18, marginBottom: 8 }}>
            {ride.pickup} → {ride.dropoff}
          </div>
          <div style={{ fontSize: 13, color: "var(--color-steel)", marginBottom: 10 }}>
            Status {ride.status} · channel {ride.channel} · vehicle {ride.vehicleId}
          </div>
          {ride.attestationHold ? (
            <AttestationHoldChip result="hold" phase="post" />
          ) : (
            <AttestationHoldChip result="pass" phase="pre" holdCleared />
          )}
        </Panel>
        <TaxiBenchmarkBand
          low={ride.priceBand.low}
          mid={ride.priceBand.mid}
          high={ride.priceBand.high}
          taxiBenchmark={ride.priceBand.taxiBenchmark}
          currency={ride.priceBand.currency}
        />
      </div>
      <DualRideLedger
        rideId={ride.rideId}
        ownerId={ride.ownerId}
        riderId={ride.riderId}
        entries={ride.ledger}
      />
    </>
  );
}
