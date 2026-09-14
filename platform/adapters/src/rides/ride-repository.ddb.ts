import type { RideRepository } from "@peerwheel/services/rides";
import { ensureSeeded, responseMeta, sandboxId, nowIso, ridesById, type Ride } from "../_shared/product-sandbox-store.js";

export class RideRepositoryDdb implements RideRepository {
  constructor(private readonly _dynamoClient: unknown) {}
  async listRides(input: any): Promise<any> {
    ensureSeeded();
    const correlationId = String(input?.correlationId ?? "");
    let items = [...ridesById.values()];
    if (input?.status) items = items.filter((r) => r.status === input.status);
    if (input?.channel) items = items.filter((r) => r.channel === input.channel);
    return { data: { items }, ...responseMeta(correlationId) };
  }
  async requestRide(input: any): Promise<any> {
    ensureSeeded();
    const correlationId = String(input?.correlationId ?? "");
    const now = nowIso();
    const rideId = String(input?.id ?? sandboxId("rid"));
    const ride: Ride = {
      rideId,
      riderId: input?.riderId,
      status: "requested",
      pickup: input?.pickup,
      dropoff: input?.dropoff,
      corridorId: input?.corridorId,
      channel: input?.channel ?? "app",
      priceBand: { currency: "AED", low: 22, high: 34, taxiBenchmark: 30 },
      ledger: [{ at: now, event: "requested", actor: "rider" }],
      createdAt: now,
      updatedAt: now,
    };
    ridesById.set(rideId, ride);
    return { data: ride, ...responseMeta(correlationId) };
  }
  async getRide(input: any): Promise<any> {
    ensureSeeded();
    const correlationId = String(input?.correlationId ?? "");
    const ride = ridesById.get(String(input?.rideId));
    if (!ride) return null;
    return { data: ride, ...responseMeta(correlationId) };
  }
}
