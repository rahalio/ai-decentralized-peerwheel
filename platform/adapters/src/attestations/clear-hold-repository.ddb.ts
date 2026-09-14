import type { ClearHoldRepository } from "@peerwheel/services/attestations";
import { ensureSeeded, responseMeta, nowIso, attestationsById, ridesById, settlementsById } from "../_shared/product-sandbox-store.js";

export class ClearHoldRepositoryDdb implements ClearHoldRepository {
  constructor(private readonly _dynamoClient: unknown) {}
  async clearAttestationHold(input: any): Promise<any> {
    ensureSeeded();
    const correlationId = String(input?.correlationId ?? "");
    const att = attestationsById.get(String(input?.attestationId));
    if (!att) return null;
    const next = { ...att, result: "passed" as const, holdCleared: true };
    attestationsById.set(att.attestationId, next);
    const ride = ridesById.get(att.rideId);
    if (ride) ridesById.set(ride.rideId, { ...ride, attestationHold: false, updatedAt: nowIso() });
    for (const s of settlementsById.values()) {
      if (s.rideId === att.rideId && s.status === "blocked") {
        settlementsById.set(s.settlementId, { ...s, status: "pending", attestationUnlockRequired: false, updatedAt: nowIso() });
      }
    }
    return { data: next, ...responseMeta(correlationId) };
  }
}
