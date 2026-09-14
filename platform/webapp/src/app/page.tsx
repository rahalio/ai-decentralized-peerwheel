"use client";

import Link from "next/link";
import type { CSSProperties } from "react";
import { useRole } from "@/contexts/role-context";
import { Banner, PageHeader, Panel, PrimaryButton } from "@/components/ops-ui";
import { YieldForesightPanel } from "@/components/YieldForesightPanel";
import { PeerPayoutSlaClock } from "@/components/PeerPayoutSlaClock";
import { AttestationHoldChip } from "@/components/AttestationHoldChip";
import { CorridorPauseBanner } from "@/components/CorridorPauseBanner";
import {
  demoAttestations,
  demoCorridors,
  demoSettlements,
  demoYieldForesight,
} from "@/lib/demo-data";

export default function HomePage() {
  const { role, corridorId } = useRole();
  const paused = demoCorridors.find((c) => c.corridorId === corridorId && c.status === "paused");
  const hold = demoAttestations.find((a) => a.result === "hold");
  const settlement = demoSettlements[0];

  if (role === "ops") {
    return (
      <>
        <PageHeader
          title="Settlement ops"
          subtitle="Holds and peer payout SLA — integrity unlocks money movement."
        />
        {hold ? (
          <Banner tone="amber">
            Open attestation hold on {hold.rideId}.{" "}
            <AttestationHoldChip result={hold.result} phase={hold.phase} holdCleared={hold.holdCleared} />
          </Banner>
        ) : null}
        <div style={{ display: "grid", gap: 16, gridTemplateColumns: "1fr 1fr" }}>
          <PeerPayoutSlaClock
            slaDeadlineAt={settlement.slaDeadlineAt}
            bankFloatBaselineHours={settlement.bankFloatBaselineHours}
            status={settlement.status}
          />
          <Panel>
            <h2 style={h2}>Attestation desk</h2>
            <p style={p}>Clear or keep holds before execute payout.</p>
            <Link href="/attestations">
              <PrimaryButton>Open holds</PrimaryButton>
            </Link>
          </Panel>
        </div>
      </>
    );
  }

  if (role === "dispute") {
    return (
      <>
        <PageHeader
          title="Dispute desk"
          subtitle="Time-boxed cases with dual-readable ledger and purpose-limited IoT proofs."
        />
        <Banner tone="amber">Open window on ride_demo_02 — deadline in policy.</Banner>
        <Link href="/disputes">
          <PrimaryButton>Open cases</PrimaryButton>
        </Link>
      </>
    );
  }

  if (role === "strategy") {
    return (
      <>
        <PageHeader
          title="Operating canvas"
          subtitle="Keep value proposition and segments paired; publish channel constraints."
        />
        <Link href="/canvas">
          <PrimaryButton>Open canvas</PrimaryButton>
        </Link>
      </>
    );
  }

  if (role === "city") {
    return (
      <>
        <PageHeader
          title="Corridor compliance"
          subtitle="Pause vehicle classes without rewriting settled history."
        />
        {paused ? (
          <CorridorPauseBanner
            corridorName={paused.name}
            reason={paused.pauseReason}
            classes={paused.pausedVehicleClasses}
          />
        ) : (
          <Banner tone="yield">Selected corridor is active.</Banner>
        )}
        <Link href="/corridors">
          <PrimaryButton>Manage corridors</PrimaryButton>
        </Link>
      </>
    );
  }

  return (
    <>
      <PageHeader
        title="Owner home"
        subtitle="What is my expected net yield if I list idle hours now?"
        actions={
          <Link href="/vehicles">
            <PrimaryButton>Publish availability</PrimaryButton>
          </Link>
        }
      />
      {paused ? (
        <CorridorPauseBanner
          corridorName={paused.name}
          reason={paused.pauseReason}
          classes={paused.pausedVehicleClasses}
        />
      ) : null}
      <div style={{ display: "grid", gap: 16, gridTemplateColumns: "1.2fr 1fr" }}>
        <YieldForesightPanel
          expectedNetYieldPerHour={demoYieldForesight.expectedNetYieldPerHour}
          platformFeeRate={demoYieldForesight.platformFeeRate}
          currency={demoYieldForesight.currency}
          taxiBenchmarkPerHour={demoYieldForesight.taxiBenchmarkPerHour}
        />
        <PeerPayoutSlaClock
          slaDeadlineAt={settlement.slaDeadlineAt}
          bankFloatBaselineHours={settlement.bankFloatBaselineHours}
          status={settlement.status}
        />
      </div>
      <div style={{ display: "grid", gap: 16, gridTemplateColumns: "1fr 1fr", marginTop: 16 }}>
        <Panel>
          <h2 style={h2}>Vehicles</h2>
          <p style={p}>Availability windows and sensor health.</p>
          <Link href="/vehicles">Manage fleet →</Link>
        </Panel>
        <Panel>
          <h2 style={h2}>Open holds</h2>
          <p style={p}>
            {hold ? (
              <AttestationHoldChip result={hold.result} phase={hold.phase} />
            ) : (
              "Corridor healthy."
            )}
          </p>
          <Link href="/settlements">Settlements →</Link>
        </Panel>
      </div>
    </>
  );
}

const h2: CSSProperties = {
  margin: "0 0 8px",
  fontFamily: "var(--font-display)",
  fontSize: 18,
};
const p: CSSProperties = {
  margin: "0 0 14px",
  color: "var(--color-steel)",
  fontSize: 14,
};
