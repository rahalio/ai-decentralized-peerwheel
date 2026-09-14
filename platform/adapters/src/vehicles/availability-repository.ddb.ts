/**
 * AvailabilityRepository — Peerwheel sandbox.
 */

import type { AvailabilityRepository } from "@peerwheel/services/vehicles";
import {
  ensureSeeded,
  responseMeta,
  availabilityById,
} from "../_shared/product-sandbox-store.js";

export class AvailabilityRepositoryDdb implements AvailabilityRepository {
  constructor(private readonly _dynamoClient: unknown) {}

  async listAvailabilityWindows(input: any): Promise<any> {
    ensureSeeded();
    const correlationId = String(input?.correlationId ?? "");
    const vehicleId = String(input?.vehicleId ?? "");
    const items = [...availabilityById.values()].filter((w) => w.vehicleId === vehicleId);
    return { data: { items }, ...responseMeta(correlationId) };
  }
}
