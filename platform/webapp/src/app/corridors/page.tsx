"use client";

import { useQuery } from "@tanstack/react-query";
import { corridorsService } from "@/services/domains/corridors";
import { Banner, DataTable, PageHeader, PrimaryButton } from "@/components/ops-ui";
import { CorridorPauseBanner } from "@/components/CorridorPauseBanner";
import { formatProblem } from "@/services/shared/http";
import { demoCorridors } from "@/lib/demo-data";

export default function CorridorsPage() {
  const q = useQuery({
    queryKey: ["corridors"],
    queryFn: () => corridorsService.list(),
    retry: false,
  });

  const usingDemo = q.isError || (!q.isLoading && !(q.data?.length));
  const items = usingDemo
    ? demoCorridors
    : (q.data || []).map((row) => ({
        corridorId: String(row.corridorId ?? "—"),
        name: String(row.name ?? "—"),
        metro: String(row.metro ?? "—"),
        status: String(row.status ?? "active") as "active" | "paused",
        pausedVehicleClasses: Array.isArray(row.pausedVehicleClasses)
          ? (row.pausedVehicleClasses as string[])
          : [],
        licensingTags: Array.isArray(row.licensingTags)
          ? (row.licensingTags as string[])
          : [],
        pauseReason: row.pauseReason ? String(row.pauseReason) : undefined,
      }));

  const paused = items.filter((c) => c.status === "paused");

  const rows = items.map((c) => [
    c.corridorId,
    c.name,
    c.metro,
    c.status,
    c.licensingTags.join(", ") || "—",
    c.pausedVehicleClasses.join(", ") || "—",
  ]);

  return (
    <>
      <PageHeader
        title="Corridors"
        subtitle="Pause corridor or vehicle class without rewriting settled history."
        actions={<PrimaryButton onClick={() => q.refetch()}>Refresh</PrimaryButton>}
      />
      {usingDemo ? (
        <Banner tone="amber">Demo corridors — API unavailable or empty.</Banner>
      ) : null}
      {q.isError ? <Banner tone="coral">{formatProblem(q.error)}</Banner> : null}
      {paused.map((c) => (
        <CorridorPauseBanner
          key={c.corridorId}
          corridorName={c.name}
          reason={c.pauseReason}
          classes={c.pausedVehicleClasses}
        />
      ))}
      <DataTable
        columns={["Corridor", "Name", "Metro", "Status", "Licensing", "Paused classes"]}
        rows={rows}
        empty={q.isLoading ? "Loading…" : "No corridors registered."}
      />
    </>
  );
}
