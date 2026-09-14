import type { ExtendRepository } from "@peerwheel/services/disputes";
import { ensureSeeded, responseMeta, nowIso, disputesById } from "../_shared/product-sandbox-store.js";

export class ExtendRepositoryDdb implements ExtendRepository {
  constructor(private readonly _dynamoClient: unknown) {}
  async extendDispute(input: any): Promise<any> {
    ensureSeeded();
    const correlationId = String(input?.correlationId ?? "");
    const d = disputesById.get(String(input?.disputeId));
    if (!d) return null;
    const next = {
      ...d,
      deadlineAt: String(input?.newDeadlineAt ?? d.deadlineAt),
      updatedAt: nowIso(),
    };
    disputesById.set(d.disputeId, next);
    return { data: next, ...responseMeta(correlationId) };
  }
}
