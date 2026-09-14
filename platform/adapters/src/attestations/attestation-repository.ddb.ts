import type { AttestationRepository } from "@peerwheel/services/attestations";
import { ensureSeeded, responseMeta, sandboxId, nowIso, attestationsById, ridesById, type Attestation } from "../_shared/product-sandbox-store.js";

export class AttestationRepositoryDdb implements AttestationRepository {
  constructor(private readonly _dynamoClient: unknown) {}
  async listAttestations(input: any): Promise<any> {
    ensureSeeded();
    const correlationId = String(input?.correlationId ?? "");
    let items = [...attestationsById.values()];
    if (input?.result) items = items.filter((a) => a.result === input.result);
    if (input?.rideId) items = items.filter((a) => a.rideId === input.rideId);
    return { data: { items }, ...responseMeta(correlationId) };
  }
  async submitIntegrityAttestation(input: any): Promise<any> {
    ensureSeeded();
    const correlationId = String(input?.correlationId ?? "");
    const id = sandboxId("att");
    const att: Attestation = {
      attestationId: id,
      rideId: String(input?.rideId),
      vehicleId: input?.vehicleId,
      result: input?.result ?? "passed",
      phase: input?.phase ?? "pre",
      proofHash: input?.proofHash,
      purposeTag: input?.purposeTag ?? "integrity_proof",
      sensorTypes: input?.sensorTypes,
      holdCleared: input?.result !== "hold",
      createdAt: nowIso(),
    };
    attestationsById.set(id, att);
    const ride = ridesById.get(att.rideId);
    if (ride && att.result === "hold") {
      ridesById.set(ride.rideId, { ...ride, attestationHold: true, updatedAt: nowIso() });
    }
    return { data: att, ...responseMeta(correlationId) };
  }
  async getAttestation(input: any): Promise<any> {
    ensureSeeded();
    const correlationId = String(input?.correlationId ?? "");
    const att = attestationsById.get(String(input?.attestationId));
    if (!att) return null;
    return { data: att, ...responseMeta(correlationId) };
  }
}
