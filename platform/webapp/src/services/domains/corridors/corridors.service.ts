import { apiClient } from "@/services/shared/infrastructure";
import { makeService } from "@/services/shared/infrastructure/service-wrapper";
import { asItems, unwrap } from "@/services/shared/http";

const raw = {
  async list(params?: Record<string, string>) {
    const q = params ? `?${new URLSearchParams(params)}` : "";
    return asItems(await unwrap(apiClient.get(`/v1/corridors${q}`)));
  },
  get(corridorId: string) {
    return unwrap<Record<string, unknown>>(
      apiClient.get(`/v1/corridors/${corridorId}`)
    );
  },
  pause(corridorId: string, body: Record<string, unknown>, idempotencyKey: string) {
    return unwrap<Record<string, unknown>>(
      apiClient.post(`/v1/corridors/${corridorId}/pause`, {
        body,
        headers: { "Idempotency-Key": idempotencyKey },
      })
    );
  },
  resume(corridorId: string, body: Record<string, unknown>, idempotencyKey: string) {
    return unwrap<Record<string, unknown>>(
      apiClient.post(`/v1/corridors/${corridorId}/resume`, {
        body,
        headers: { "Idempotency-Key": idempotencyKey },
      })
    );
  },
  updateLicensing(
    corridorId: string,
    body: Record<string, unknown>,
    idempotencyKey: string
  ) {
    return unwrap<Record<string, unknown>>(
      apiClient.post(`/v1/corridors/${corridorId}/licensing`, {
        body,
        headers: { "Idempotency-Key": idempotencyKey },
      })
    );
  },
};

export const corridorsService = makeService(raw, "corridors");
