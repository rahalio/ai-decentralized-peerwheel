import { apiClient } from "@/services/shared/infrastructure";
import { makeService } from "@/services/shared/infrastructure/service-wrapper";
import { asItems, unwrap } from "@/services/shared/http";

const raw = {
  async list(params?: Record<string, string>) {
    const q = params ? `?${new URLSearchParams(params)}` : "";
    return asItems(await unwrap(apiClient.get(`/v1/settlements${q}`)));
  },
  get(settlementId: string) {
    return unwrap<Record<string, unknown>>(
      apiClient.get(`/v1/settlements/${settlementId}`)
    );
  },
  execute(settlementId: string, body: Record<string, unknown>, idempotencyKey: string) {
    return unwrap<Record<string, unknown>>(
      apiClient.post(`/v1/settlements/${settlementId}/execute`, {
        body,
        headers: { "Idempotency-Key": idempotencyKey },
      })
    );
  },
  retry(settlementId: string, idempotencyKey: string) {
    return unwrap<Record<string, unknown>>(
      apiClient.post(`/v1/settlements/${settlementId}/retry`, {
        headers: { "Idempotency-Key": idempotencyKey },
      })
    );
  },
};

export const settlementsService = makeService(raw, "settlements");
