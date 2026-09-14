import type { MatchRepository } from "@peerwheel/services/rides";
import { ensureSeeded, responseMeta, nowIso, ridesById, vehiclesById } from "../_shared/product-sandbox-store.js";

export class MatchRepositoryDdb implements MatchRepository {
  constructor(private readonly _dynamoClient: unknown) {}
  async matchRide(input: any): Promise<any> {
    ensureSeeded();
    const correlationId = String(input?.correlationId ?? "");
    const ride = ridesById.get(String(input?.rideId));
    if (!ride) return null;
    const vehicleId = String(input?.vehicleId ?? [...vehiclesById.keys()][0] ?? "");
    const now = nowIso();
    const next = {
      ...ride,
      vehicleId,
      status: "matched",
      updatedAt: now,
      ledger: [...ride.ledger, { at: now, event: "matched", actor: "ops" }],
    };
    ridesById.set(ride.rideId, next);
    return { data: next, ...responseMeta(correlationId) };
  }
}
