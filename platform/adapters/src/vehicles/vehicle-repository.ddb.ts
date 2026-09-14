/**
 * VehicleRepository — Peerwheel in-memory sandbox.
 */

import type { VehicleRepository } from "@peerwheel/services/vehicles";
import {
  ensureSeeded,
  responseMeta,
  sandboxId,
  nowIso,
  vehiclesById,
  type Vehicle,
} from "../_shared/product-sandbox-store.js";

export class VehicleRepositoryDdb implements VehicleRepository {
  constructor(private readonly _dynamoClient: unknown) {}

  async listVehicles(input: any): Promise<any> {
    ensureSeeded();
    const correlationId = String(input?.correlationId ?? "");
    let items = [...vehiclesById.values()];
    if (input?.status) items = items.filter((v) => v.status === input.status);
    if (input?.ownerId) items = items.filter((v) => v.ownerId === input.ownerId);
    return { data: { items }, ...responseMeta(correlationId) };
  }

  async registerVehicle(input: any): Promise<any> {
    ensureSeeded();
    const correlationId = String(input?.correlationId ?? "");
    const now = nowIso();
    const vehicleId = String(input?.id ?? sandboxId("veh"));
    const vehicle: Vehicle = {
      vehicleId,
      ownerId: String(input?.ownerId ?? "usr_owner_demo"),
      licensingTags: input?.licensingTags ?? [],
      status: "active",
      telematicsEndpoint: input?.telematicsEndpoint,
      sensors: input?.sensors ?? [],
      corridorId: input?.corridorId,
      createdAt: now,
      updatedAt: now,
    };
    vehiclesById.set(vehicleId, vehicle);
    return { data: vehicle, ...responseMeta(correlationId) };
  }

  async getVehicle(input: any): Promise<any> {
    ensureSeeded();
    const correlationId = String(input?.correlationId ?? "");
    const vehicle = vehiclesById.get(String(input?.vehicleId));
    if (!vehicle) return null;
    return { data: vehicle, ...responseMeta(correlationId) };
  }

  async updateVehicle(input: any): Promise<any> {
    ensureSeeded();
    const correlationId = String(input?.correlationId ?? "");
    const vehicle = vehiclesById.get(String(input?.vehicleId));
    if (!vehicle) return null;
    const next = {
      ...vehicle,
      ...input,
      vehicleId: vehicle.vehicleId,
      updatedAt: nowIso(),
    };
    vehiclesById.set(vehicle.vehicleId, next);
    return { data: next, ...responseMeta(correlationId) };
  }
}
