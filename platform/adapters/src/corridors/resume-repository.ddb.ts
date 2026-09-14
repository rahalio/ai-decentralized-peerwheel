import type { ResumeRepository } from "@peerwheel/services/corridors";
import { ensureSeeded, responseMeta, nowIso, corridorsById } from "../_shared/product-sandbox-store.js";

export class ResumeRepositoryDdb implements ResumeRepository {
  constructor(private readonly _dynamoClient: unknown) {}
  async resumeCorridor(input: any): Promise<any> {
    ensureSeeded();
    const correlationId = String(input?.correlationId ?? "");
    const c = corridorsById.get(String(input?.corridorId));
    if (!c) return null;
    const next = {
      ...c,
      status: "active" as const,
      pausedVehicleClasses: [],
      pauseReason: undefined,
      pausedAt: undefined,
      updatedAt: nowIso(),
    };
    corridorsById.set(c.corridorId, next);
    return { data: next, ...responseMeta(correlationId) };
  }
}
