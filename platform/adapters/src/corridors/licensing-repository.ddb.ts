import type { LicensingRepository } from "@peerwheel/services/corridors";
import { ensureSeeded, responseMeta, nowIso, corridorsById } from "../_shared/product-sandbox-store.js";

export class LicensingRepositoryDdb implements LicensingRepository {
  constructor(private readonly _dynamoClient: unknown) {}
  async updateCorridorLicensing(input: any): Promise<any> {
    ensureSeeded();
    const correlationId = String(input?.correlationId ?? "");
    const c = corridorsById.get(String(input?.corridorId));
    if (!c) return null;
    const next = {
      ...c,
      licensingTags: input?.licensingTags ?? c.licensingTags,
      updatedAt: nowIso(),
    };
    corridorsById.set(c.corridorId, next);
    return { data: next, ...responseMeta(correlationId) };
  }
}
