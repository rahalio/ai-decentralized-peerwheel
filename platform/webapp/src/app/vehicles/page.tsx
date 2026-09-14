"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { vehiclesService } from "@/services/domains/vehicles";
import { Banner, DataTable, PageHeader, PrimaryButton } from "@/components/ops-ui";
import { YieldForesightPanel } from "@/components/YieldForesightPanel";
import { formatProblem } from "@/services/shared/http";
import { demoVehicles, demoYieldForesight } from "@/lib/demo-data";

export default function VehiclesPage() {
  const q = useQuery({
    queryKey: ["vehicles"],
    queryFn: () => vehiclesService.list(),
    retry: false,
  });

  const usingDemo = q.isError || (!q.isLoading && !(q.data?.length));
  const items = usingDemo
    ? demoVehicles
    : (q.data || []).map((row) => ({
        vehicleId: String(row.vehicleId ?? "—"),
        status: String(row.status ?? "—"),
        licensingTags: Array.isArray(row.licensingTags)
          ? (row.licensingTags as string[])
          : [],
        availabilityLabel: String(row.corridorId ?? "—"),
        expectedNetYieldPerHour: Number(row.expectedNetYieldPerHour ?? 0),
        platformFeeRate: Number(row.platformFeeRate ?? demoYieldForesight.platformFeeRate),
        sensorsHealthy: true,
      }));

  const rows = items.map((v) => [
    <Link key={v.vehicleId} href={`/vehicles`}>{v.vehicleId}</Link>,
    v.status,
    Array.isArray(v.licensingTags) ? v.licensingTags.join(", ") : "—",
    v.availabilityLabel,
    `${v.expectedNetYieldPerHour.toFixed(1)} net/hr`,
  ]);

  return (
    <>
      <PageHeader
        title="Vehicles & availability"
        subtitle="Register AVs, licensing tags, sensor bindings, and idle windows."
        actions={<PrimaryButton onClick={() => q.refetch()}>Refresh</PrimaryButton>}
      />
      {usingDemo ? (
        <Banner tone="amber">Showing demo fleet — API unavailable or empty.</Banner>
      ) : null}
      {q.isError ? <Banner tone="coral">{formatProblem(q.error)}</Banner> : null}
      <div style={{ marginBottom: 16 }}>
        <YieldForesightPanel
          expectedNetYieldPerHour={demoYieldForesight.expectedNetYieldPerHour}
          platformFeeRate={demoYieldForesight.platformFeeRate}
          currency={demoYieldForesight.currency}
          taxiBenchmarkPerHour={demoYieldForesight.taxiBenchmarkPerHour}
        />
      </div>
      <DataTable
        columns={["Vehicle", "Status", "Licensing", "Availability", "Yield"]}
        rows={rows}
        empty={q.isLoading ? "Loading…" : "Register first AV + sensors."}
      />
    </>
  );
}
