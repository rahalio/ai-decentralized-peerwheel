"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { ridesService } from "@/services/domains/rides";
import { Banner, DataTable, PageHeader, PrimaryButton } from "@/components/ops-ui";
import { TaxiBenchmarkBand } from "@/components/TaxiBenchmarkBand";
import { formatProblem } from "@/services/shared/http";
import { demoRides } from "@/lib/demo-data";

export default function MatchingPage() {
  const q = useQuery({
    queryKey: ["rides", "matching"],
    queryFn: () => ridesService.list({ status: "requested" }),
    retry: false,
  });

  const usingDemo = q.isError || (!q.isLoading && !(q.data?.length));
  const queue = usingDemo
    ? demoRides
    : (q.data || []).map((row) => ({
        rideId: String(row.rideId ?? "—"),
        pickup: String(row.pickup ?? "—"),
        dropoff: String(row.dropoff ?? "—"),
        channel: String(row.channel ?? "—"),
        status: String(row.status ?? "—"),
        priceBand: {
          low: 28,
          mid: 34,
          high: 41,
          taxiBenchmark: 38,
          currency: "AED",
        },
      }));

  const band = queue[0]?.priceBand ?? {
    low: 28,
    mid: 34,
    high: 41,
    taxiBenchmark: 38,
    currency: "AED",
  };

  const rows = queue.map((r) => [
    <Link key={r.rideId} href={`/rides/${r.rideId}`}>{r.rideId}</Link>,
    r.pickup,
    r.dropoff,
    r.channel,
    r.status,
  ]);

  return (
    <>
      <PageHeader
        title="Live matching"
        subtitle="On-demand match with taxi-benchmark bands in sparse zones."
        actions={<PrimaryButton onClick={() => q.refetch()}>Refresh</PrimaryButton>}
      />
      {usingDemo ? (
        <Banner tone="amber">Demo match queue — API unavailable or empty.</Banner>
      ) : null}
      {q.isError ? <Banner tone="coral">{formatProblem(q.error)}</Banner> : null}
      <div style={{ marginBottom: 16 }}>
        <TaxiBenchmarkBand
          low={band.low}
          mid={band.mid}
          high={band.high}
          taxiBenchmark={band.taxiBenchmark}
          currency={band.currency}
        />
      </div>
      <DataTable
        columns={["Ride", "Pickup", "Dropoff", "Channel", "Status"]}
        rows={rows}
        empty={q.isLoading ? "Loading…" : "No open match requests."}
      />
    </>
  );
}
