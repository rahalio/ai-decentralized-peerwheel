import type { ResolveRepository } from "@peerwheel/services/disputes";
import { ensureSeeded, responseMeta, nowIso, disputesById } from "../_shared/product-sandbox-store.js";

export class ResolveRepositoryDdb implements ResolveRepository {
  constructor(private readonly _dynamoClient: unknown) {}
  async resolveDispute(input: any): Promise<any> {
    ensureSeeded();
    const correlationId = String(input?.correlationId ?? "");
    const d = disputesById.get(String(input?.disputeId));
    if (!d) return null;
    const next = {
      ...d,
      status: "resolved" as const,
      resolution: String(input?.resolution ?? ""),
      resolvedAt: nowIso(),
      updatedAt: nowIso(),
    };
    disputesById.set(d.disputeId, next);
    return { data: next, ...responseMeta(correlationId) };
  }
}
