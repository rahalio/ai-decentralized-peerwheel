import type { ExecuteRepository } from "@peerwheel/services/settlements";
import { ensureSeeded, responseMeta, nowIso, settlementsById } from "../_shared/product-sandbox-store.js";

export class ExecuteRepositoryDdb implements ExecuteRepository {
  constructor(private readonly _dynamoClient: unknown) {}
  async executeSettlement(input: any): Promise<any> {
    ensureSeeded();
    const correlationId = String(input?.correlationId ?? "");
    const s = settlementsById.get(String(input?.settlementId ?? input?.id));
    if (!s) return null;
    if (s.status === "blocked" || s.attestationUnlockRequired) {
      return { data: s, ...responseMeta(correlationId) };
    }
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
