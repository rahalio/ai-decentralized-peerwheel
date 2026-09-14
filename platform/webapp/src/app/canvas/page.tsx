"use client";

import { useQuery } from "@tanstack/react-query";
import { canvasService } from "@/services/domains/canvas";
import { Banner, DataTable, PageHeader, PrimaryButton } from "@/components/ops-ui";
import { PairedCanvasEditor } from "@/components/PairedCanvasEditor";
import { formatProblem } from "@/services/shared/http";
import { demoCanvasFit } from "@/lib/demo-data";

export default function CanvasPage() {
  const q = useQuery({
    queryKey: ["canvas"],
    queryFn: () => canvasService.getFit(),
    retry: false,
  });

  const usingDemo = q.isError || !q.data;
  const fit = usingDemo
    ? demoCanvasFit
    : {
        canvasFitId: String(q.data?.canvasFitId ?? demoCanvasFit.canvasFitId),
        valueProposition: String(
          q.data?.valueProposition ?? demoCanvasFit.valueProposition
        ),
        customerSegments: Array.isArray(q.data?.customerSegments)
          ? (q.data!.customerSegments as string[])
          : demoCanvasFit.customerSegments,
        channelMetrics: demoCanvasFit.channelMetrics,
        costRevenueVariancePct: Number(
          (q.data as { costRevenueVariancePct?: number } | undefined)
            ?.costRevenueVariancePct ?? demoCanvasFit.costRevenueVariancePct
        ),
        publishedToMatching: Boolean(q.data?.publishedToMatching),
        updatedAt: String(q.data?.updatedAt ?? demoCanvasFit.updatedAt),
      };

  const varianceTone =
    fit.costRevenueVariancePct < -8 ? ("coral" as const) : ("yield" as const);

  const channelRows = fit.channelMetrics.map((c) => [
    c.channel,
    String(c.rides),
    `${(c.conversion * 100).toFixed(0)}%`,
  ]);

  return (
    <>
      <PageHeader
        title="Operating canvas"
        subtitle="Paired VP ↔ segment, channel KPIs, and monthly cost/revenue variance."
        actions={<PrimaryButton onClick={() => q.refetch()}>Refresh</PrimaryButton>}
      />
      {usingDemo ? (
        <Banner tone="amber">Demo canvas fit — API unavailable.</Banner>
      ) : null}
      {q.isError ? <Banner tone="coral">{formatProblem(q.error)}</Banner> : null}
      <Banner tone={varianceTone}>
        Cost/revenue variance {fit.costRevenueVariancePct.toFixed(1)}% vs plan
        {fit.publishedToMatching ? " · published to matching" : " · draft"}.
      </Banner>
      <div style={{ marginBottom: 16 }}>
        <PairedCanvasEditor
          valueProposition={fit.valueProposition}
          customerSegments={fit.customerSegments}
        />
      </div>
      <div style={{ marginBottom: 8, fontFamily: "var(--font-display)" }}>Channel KPIs</div>
      <DataTable
        columns={["Channel", "Rides", "Conversion"]}
        rows={channelRows}
        empty="No channel metrics."
      />
    </>
  );
}
