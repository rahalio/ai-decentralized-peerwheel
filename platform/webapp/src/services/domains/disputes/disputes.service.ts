import { apiClient } from "@/services/shared/infrastructure";
import { makeService } from "@/services/shared/infrastructure/service-wrapper";
import { asItems, unwrap } from "@/services/shared/http";

const raw = {
  async list(params?: Record<string, string>) {
    const q = params ? `?${new URLSearchParams(params)}` : "";
    return asItems(await unwrap(apiClient.get(`/v1/disputes${q}`)));
  },
  get(disputeId: string) {
    return unwrap<Record<string, unknown>>(apiClient.get(`/v1/disputes/${disputeId}`));
  },
  open(body: Record<string, unknown>, idempotencyKey: string) {
    return unwrap<Record<string, unknown>>(
      apiClient.post(`/v1/disputes`, {
        body,
        headers: { "Idempotency-Key": idempotencyKey },
      })
    );
  },
  resolve(disputeId: string, body: Record<string, unknown>, idempotencyKey: string) {
    return unwrap<Record<string, unknown>>(
      apiClient.post(`/v1/disputes/${disputeId}/resolve`, {
        body,
        headers: { "Idempotency-Key": idempotencyKey },
      })
    );
  },
  extend(disputeId: string, body: Record<string, unknown>, idempotencyKey: string) {
    return unwrap<Record<string, unknown>>(
      apiClient.post(`/v1/disputes/${disputeId}/extend`, {
        body,
        headers: { "Idempotency-Key": idempotencyKey },
      })
    );
  },
  exportCasePack(disputeId: string, idempotencyKey: string) {
    return unwrap<Record<string, unknown>>(
      apiClient.post(`/v1/disputes/${disputeId}/export`, {
        headers: { "Idempotency-Key": idempotencyKey },
      })
    );
  },
};

export const disputesService = makeService(raw, "disputes");
