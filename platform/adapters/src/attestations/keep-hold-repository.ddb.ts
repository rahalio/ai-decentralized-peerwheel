import type { KeepHoldRepository } from "@peerwheel/services/attestations";
import { ensureSeeded, responseMeta, attestationsById } from "../_shared/product-sandbox-store.js";

export class KeepHoldRepositoryDdb implements KeepHoldRepository {
  constructor(private readonly _dynamoClient: unknown) {}
  async keepAttestationHold(input: any): Promise<any> {
    ensureSeeded();
    const correlationId = String(input?.correlationId ?? "");
    const att = attestationsById.get(String(input?.attestationId));
    if (!att) return null;
    const next = { ...att, result: "hold" as const, holdCleared: false };
    attestationsById.set(att.attestationId, next);
    return { data: next, ...responseMeta(correlationId) };
  }
}
