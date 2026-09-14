import type { CompleteRepository } from "@peerwheel/services/rides";
import { ensureSeeded, responseMeta, nowIso, ridesById } from "../_shared/product-sandbox-store.js";

export class CompleteRepositoryDdb implements CompleteRepository {
  constructor(private readonly _dynamoClient: unknown) {}
  async completeRide(input: any): Promise<any> {
    ensureSeeded();
    const correlationId = String(input?.correlationId ?? "");
    const ride = ridesById.get(String(input?.rideId));
    if (!ride) return null;
    const now = nowIso();
    const next = {
      ...ride,
      status: "completed",
      completedAt: now,
      updatedAt: now,
      ledger: [...ride.ledger, { at: now, event: "completed", actor: "system" }],
    };
    ridesById.set(ride.rideId, next);
    return { data: next, ...responseMeta(correlationId) };
  }
}
