import type { SettlementRepository } from "@peerwheel/services/settlements";
import { ensureSeeded, responseMeta, settlementsById } from "../_shared/product-sandbox-store.js";

export class SettlementRepositoryDdb implements SettlementRepository {
  constructor(private readonly _dynamoClient: unknown) {}
  async listSettlements(input: any): Promise<any> {
    ensureSeeded();
    const correlationId = String(input?.correlationId ?? "");
    let items = [...settlementsById.values()];
    if (input?.status) items = items.filter((s) => s.status === input.status);
    return { data: { items }, ...responseMeta(correlationId) };
  }
  async getSettlement(input: any): Promise<any> {
    ensureSeeded();
    const correlationId = String(input?.correlationId ?? "");
    const s = settlementsById.get(String(input?.settlementId));
    if (!s) return null;
    return { data: s, ...responseMeta(correlationId) };
  }
}
