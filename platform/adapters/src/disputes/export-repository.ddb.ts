import type { ExportRepository } from "@peerwheel/services/disputes";
import { ensureSeeded, responseMeta, nowIso, disputesById, ridesById, attestationsById } from "../_shared/product-sandbox-store.js";

export class ExportRepositoryDdb implements ExportRepository {
  constructor(private readonly _dynamoClient: unknown) {}
  async exportDisputeCasePack(input: any): Promise<any> {
    ensureSeeded();
    const correlationId = String(input?.correlationId ?? "");
    const d = disputesById.get(String(input?.disputeId));
    if (!d) return null;
    const ride = ridesById.get(d.rideId);
    const atts = [...attestationsById.values()].filter((a) => a.rideId === d.rideId);
    return {
      data: {
        disputeId: d.disputeId,
        exportedAt: nowIso(),
        payload: { dispute: d, ride, attestations: atts },
      },
      ...responseMeta(correlationId),
    };
  }
}
