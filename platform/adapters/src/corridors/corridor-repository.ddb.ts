import type { CorridorRepository } from "@peerwheel/services/corridors";
import { ensureSeeded, responseMeta, corridorsById } from "../_shared/product-sandbox-store.js";

export class CorridorRepositoryDdb implements CorridorRepository {
  constructor(private readonly _dynamoClient: unknown) {}
  async listCorridors(input: any): Promise<any> {
    ensureSeeded();
    const correlationId = String(input?.correlationId ?? "");
    let items = [...corridorsById.values()];
    if (input?.status) items = items.filter((c) => c.status === input.status);
    return { data: { items }, ...responseMeta(correlationId) };
  }
  async getCorridor(input: any): Promise<any> {
    ensureSeeded();
    const correlationId = String(input?.correlationId ?? "");
    const c = corridorsById.get(String(input?.corridorId));
    if (!c) return null;
    return { data: c, ...responseMeta(correlationId) };
  }
}
