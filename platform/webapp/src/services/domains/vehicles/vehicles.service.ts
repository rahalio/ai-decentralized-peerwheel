import { apiClient } from "@/services/shared/infrastructure";
import { makeService } from "@/services/shared/infrastructure/service-wrapper";
import { asItems, unwrap } from "@/services/shared/http";

const raw = {
  async list(params?: Record<string, string>) {
    const q = params ? `?${new URLSearchParams(params)}` : "";
    return asItems(await unwrap(apiClient.get(`/v1/vehicles${q}`)));
  },
  get(vehicleId: string) {
    return unwrap<Record<string, unknown>>(apiClient.get(`/v1/vehicles/${vehicleId}`));
  },
  register(body: Record<string, unknown>, idempotencyKey: string) {
    return unwrap<Record<string, unknown>>(
      apiClient.post(`/v1/vehicles`, {
        body,
        headers: { "Idempotency-Key": idempotencyKey },
      })
    );
  },
  update(vehicleId: string, body: Record<string, unknown>) {
    return unwrap<Record<string, unknown>>(
      apiClient.patch(`/v1/vehicles/${vehicleId}`, { body })
    );
  },
  async listAvailability(vehicleId: string) {
    return asItems(
      await unwrap(apiClient.get(`/v1/vehicles/${vehicleId}/availability`))
    );
  },
  publishAvailability(
    vehicleId: string,
    body: Record<string, unknown>,
    idempotencyKey: string
  ) {
    return unwrap<Record<string, unknown>>(
      apiClient.post(`/v1/vehicles/${vehicleId}/availability`, {
        body,
        headers: { "Idempotency-Key": idempotencyKey },
      })
    );
  },
  pullAvailability(
    vehicleId: string,
    availabilityWindowId: string,
    idempotencyKey: string
  ) {
    return unwrap<Record<string, unknown>>(
      apiClient.post(
        `/v1/vehicles/${vehicleId}/availability/${availabilityWindowId}/pull`,
        { headers: { "Idempotency-Key": idempotencyKey } }
      )
    );
  },
  getYieldForesight(vehicleId: string) {
    return unwrap<Record<string, unknown>>(
      apiClient.get(`/v1/vehicles/${vehicleId}/yield-foresight`)
    );
  },
};

export const vehiclesService = makeService(raw, "vehicles");
