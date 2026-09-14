import type { DisputeRepository } from "@peerwheel/services/disputes";
import { ensureSeeded, responseMeta, sandboxId, nowIso, disputesById, type Dispute } from "../_shared/product-sandbox-store.js";

export class DisputeRepositoryDdb implements DisputeRepository {
  constructor(private readonly _dynamoClient: unknown) {}
  async listDisputes(input: any): Promise<any> {
    ensureSeeded();
    const correlationId = String(input?.correlationId ?? "");
    let items = [...disputesById.values()];
    if (input?.status) items = items.filter((d) => d.status === input.status);
    return { data: { items }, ...responseMeta(correlationId) };
  }
  async openDispute(input: any): Promise<any> {
    ensureSeeded();
    const correlationId = String(input?.correlationId ?? "");
    const id = sandboxId("dsp");
    const dispute: Dispute = {
      disputeId: id,
      rideId: String(input?.rideId),
      reason: input?.reason ?? "other",
      status: "open",
      evidence: input?.evidence,
      deadlineAt: new Date(Date.now() + 72 * 3600_000).toISOString(),
      createdAt: nowIso(),
      updatedAt: nowIso(),
    };
    disputesById.set(id, dispute);
    return { data: dispute, ...responseMeta(correlationId) };
  }
  async getDispute(input: any): Promise<any> {
    ensureSeeded();
    const correlationId = String(input?.correlationId ?? "");
    const d = disputesById.get(String(input?.disputeId));
    if (!d) return null;
    return { data: d, ...responseMeta(correlationId) };
  }
}
