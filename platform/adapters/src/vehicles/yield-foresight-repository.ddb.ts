import type { YieldForesightRepository } from "@peerwheel/services/vehicles";
import { ensureSeeded, responseMeta, vehiclesById } from "../_shared/product-sandbox-store.js";

export class YieldForesightRepositoryDdb implements YieldForesightRepository {
  constructor(private readonly _dynamoClient: unknown) {}
  async getYieldForesight(input: any): Promise<any> {
    ensureSeeded();
    const correlationId = String(input?.correlationId ?? "");
    const vehicleId = String(input?.vehicleId);
    if (!vehiclesById.has(vehicleId)) return null;
    return {
      data: {
        vehicleId,
        expectedNetYieldPerHour: 42.5,
        platformFeeRate: 0.08,
        currency: "AED",
        taxiBenchmarkPerHour: 38,
      },
      ...responseMeta(correlationId),
    };
  }
}
