import type { PullRepository } from "@peerwheel/services/vehicles";
import { ensureSeeded, responseMeta, availabilityById, nowIso } from "../_shared/product-sandbox-store.js";

export class PullRepositoryDdb implements PullRepository {
  constructor(private readonly _dynamoClient: unknown) {}
  async pullAvailability(input: any): Promise<any> {
    ensureSeeded();
    const correlationId = String(input?.correlationId ?? "");
    const id = String(input?.availabilityWindowId);
    const window = availabilityById.get(id);
    if (!window) return null;
    const next = { ...window, pulled: true };
    availabilityById.set(id, next);
    return { data: next, ...responseMeta(correlationId) };
  }
}
