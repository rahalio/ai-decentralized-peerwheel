import type { RetryRepository } from "@peerwheel/services/settlements";
import { ensureSeeded, responseMeta, nowIso, settlementsById } from "../_shared/product-sandbox-store.js";

export class RetryRepositoryDdb implements RetryRepository {
  constructor(private readonly _dynamoClient: unknown) {}
  async retrySettlement(input: any): Promise<any> {
    ensureSeeded();
    const correlationId = String(input?.correlationId ?? "");
    const s = settlementsById.get(String(input?.settlementId));
    if (!s) return null;
    const next = {
      ...s,
      status: "executed" as const,
      rail: input?.rail ?? s.rail,
      executedAt: nowIso(),
      updatedAt: nowIso(),
    };
    settlementsById.set(s.settlementId, next);
    return { data: next, ...responseMeta(correlationId) };
  }
}
