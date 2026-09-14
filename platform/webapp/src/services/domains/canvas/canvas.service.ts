import { apiClient } from "@/services/shared/infrastructure";
import { makeService } from "@/services/shared/infrastructure/service-wrapper";
import { unwrap } from "@/services/shared/http";

const raw = {
  getFit() {
    return unwrap<Record<string, unknown>>(apiClient.get(`/v1/canvas/fits`));
  },
  updateFit(body: Record<string, unknown>, idempotencyKey: string) {
    return unwrap<Record<string, unknown>>(
      apiClient.put(`/v1/canvas/fits`, {
        body,
        headers: { "Idempotency-Key": idempotencyKey },
      })
    );
  },
};

export const canvasService = makeService(raw, "canvas");
