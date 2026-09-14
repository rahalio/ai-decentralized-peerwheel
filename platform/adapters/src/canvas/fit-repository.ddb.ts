import type { FitRepository } from "@peerwheel/services/canvas";
import { ensureSeeded, responseMeta, nowIso, getCanvasFit, setCanvasFit } from "../_shared/product-sandbox-store.js";

export class FitRepositoryDdb implements FitRepository {
  constructor(private readonly _dynamoClient: unknown) {}
  async getCanvasFit(input: any): Promise<any> {
    ensureSeeded();
    const correlationId = String(input?.correlationId ?? "");
    return { data: getCanvasFit(), ...responseMeta(correlationId) };
  }
  async updateCanvasFit(input: any): Promise<any> {
    ensureSeeded();
    const correlationId = String(input?.correlationId ?? "");
    const current = getCanvasFit();
    const next = {
      ...current,
      valueProposition: String(input?.valueProposition ?? current.valueProposition),
      customerSegments: input?.customerSegments ?? current.customerSegments,
      channelMetrics: input?.channelMetrics ?? current.channelMetrics,
      costRevenuePlan: input?.costRevenuePlan ?? current.costRevenuePlan,
      publishedToMatching: Boolean(input?.publishToMatching ?? current.publishedToMatching),
      revisions: [
        ...(current.revisions ?? []),
        {
          revisedAt: nowIso(),
          valueProposition: String(input?.valueProposition ?? current.valueProposition),
          customerSegments: input?.customerSegments ?? current.customerSegments,
          note: input?.note,
        },
      ],
      updatedAt: nowIso(),
    };
    setCanvasFit(next);
    return { data: next, ...responseMeta(correlationId) };
  }
}
