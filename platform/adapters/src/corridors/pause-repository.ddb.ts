import type { PauseRepository } from "@peerwheel/services/corridors";
import { ensureSeeded, responseMeta, nowIso, corridorsById } from "../_shared/product-sandbox-store.js";

export class PauseRepositoryDdb implements PauseRepository {
  constructor(private readonly _dynamoClient: unknown) {}
  async pauseCorridor(input: any): Promise<any> {
    ensureSeeded();
    const correlationId = String(input?.correlationId ?? "");
    const c = corridorsById.get(String(input?.corridorId));
    if (!c) return null;
    const next = {
      ...c,
      status: "paused" as const,
      pausedVehicleClasses: input?.vehicleClasses ?? c.pausedVehicleClasses ?? [],
      pauseReason: input?.reason ?? "safety",
      pausedAt: nowIso(),
      updatedAt: nowIso(),
    };
    corridorsById.set(c.corridorId, next);
    return { data: next, ...responseMeta(correlationId) };
  }
}
