/**
 * AvailabilityPublisher — Peerwheel sandbox.
 */
import type { AvailabilityPublisher } from "@peerwheel/services/vehicles";
import { ensureSeeded, responseMeta, sandboxId, nowIso, availabilityById } from "../_shared/product-sandbox-store.js";

export class AvailabilityPublisherDdb implements AvailabilityPublisher {
  constructor(private readonly _dynamoClient: unknown) {}
  async publishAvailability(input: any): Promise<any> {
    ensureSeeded();
    const correlationId = String(input?.correlationId ?? "");
    const id = sandboxId("avw");
    const window = {
      availabilityWindowId: id,
      vehicleId: String(input?.vehicleId),
      startAt: String(input?.startAt ?? nowIso()),
      endAt: String(input?.endAt ?? nowIso()),
      expectedNetYieldPerHour: input?.expectedNetYieldPerHour,
      platformFeeRate: input?.platformFeeRate ?? 0.08,
      pulled: false,
      createdAt: nowIso(),
    };
    availabilityById.set(id, window);
    return { data: window, ...responseMeta(correlationId) };
  }
}
