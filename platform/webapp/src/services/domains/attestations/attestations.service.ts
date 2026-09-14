import { apiClient } from "@/services/shared/infrastructure";
import { makeService } from "@/services/shared/infrastructure/service-wrapper";
import { asItems, unwrap } from "@/services/shared/http";

const raw = {
  async list(params?: Record<string, string>) {
    const q = params ? `?${new URLSearchParams(params)}` : "";
    return asItems(await unwrap(apiClient.get(`/v1/attestations${q}`)));
  },
  get(attestationId: string) {
    return unwrap<Record<string, unknown>>(
      apiClient.get(`/v1/attestations/${attestationId}`)
    );
  },
  submit(rideId: string, body: Record<string, unknown>, idempotencyKey: string) {
    return unwrap<Record<string, unknown>>(
      apiClient.post(`/v1/rides/${rideId}/attestations`, {
        body,
        headers: { "Idempotency-Key": idempotencyKey },
      })
    );
  },
  clearHold(attestationId: string, idempotencyKey: string) {
    return unwrap<Record<string, unknown>>(
      apiClient.post(`/v1/attestations/${attestationId}/clear-hold`, {
        headers: { "Idempotency-Key": idempotencyKey },
      })
    );
  },
  keepHold(attestationId: string, idempotencyKey: string) {
    return unwrap<Record<string, unknown>>(
      apiClient.post(`/v1/attestations/${attestationId}/keep-hold`, {
        headers: { "Idempotency-Key": idempotencyKey },
      })
    );
  },
};

export const attestationsService = makeService(raw, "attestations");
