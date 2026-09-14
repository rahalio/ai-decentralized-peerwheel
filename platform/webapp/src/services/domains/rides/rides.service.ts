import { apiClient } from "@/services/shared/infrastructure";
import { makeService } from "@/services/shared/infrastructure/service-wrapper";
import { asItems, unwrap } from "@/services/shared/http";

const raw = {
  async list(params?: Record<string, string>) {
    const q = params ? `?${new URLSearchParams(params)}` : "";
    return asItems(await unwrap(apiClient.get(`/v1/rides${q}`)));
  },
  get(rideId: string) {
    return unwrap<Record<string, unknown>>(apiClient.get(`/v1/rides/${rideId}`));
  },
  request(body: Record<string, unknown>, idempotencyKey: string) {
    return unwrap<Record<string, unknown>>(
      apiClient.post(`/v1/rides`, {
        body,
        headers: { "Idempotency-Key": idempotencyKey },
      })
    );
  },
  match(rideId: string, body: Record<string, unknown>, idempotencyKey: string) {
    return unwrap<Record<string, unknown>>(
      apiClient.post(`/v1/rides/${rideId}/match`, {
        body,
        headers: { "Idempotency-Key": idempotencyKey },
      })
    );
  },
  complete(rideId: string, idempotencyKey: string) {
    return unwrap<Record<string, unknown>>(
      apiClient.post(`/v1/rides/${rideId}/complete`, {
        headers: { "Idempotency-Key": idempotencyKey },
      })
    );
  },
  refuse(rideId: string, idempotencyKey: string) {
    return unwrap<Record<string, unknown>>(
      apiClient.post(`/v1/rides/${rideId}/refuse`, {
        headers: { "Idempotency-Key": idempotencyKey },
      })
    );
  },
};

export const ridesService = makeService(raw, "rides");
