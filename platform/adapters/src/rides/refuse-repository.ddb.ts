import type { RefuseRepository } from "@peerwheel/services/rides";
import { ensureSeeded, responseMeta, nowIso, ridesById } from "../_shared/product-sandbox-store.js";

export class RefuseRepositoryDdb implements RefuseRepository {
  constructor(private readonly _dynamoClient: unknown) {}
  async refuseRide(input: any): Promise<any> {
    ensureSeeded();
    const correlationId = String(input?.correlationId ?? "");
    const ride = ridesById.get(String(input?.rideId));
    if (!ride) return null;
    const now = nowIso();
    const next = {
      ...ride,
      status: "refused",
      updatedAt: now,
      ledger: [...ride.ledger, { at: now, event: "refused", actor: "rider", detail: "pre-ride attestation failed" }],
    };
    ridesById.set(ride.rideId, next);
    return { data: next, ...responseMeta(correlationId) };
  }
}
