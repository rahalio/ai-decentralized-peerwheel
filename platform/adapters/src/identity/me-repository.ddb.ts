/**
 * MeRepository — sandbox operator session.
 */
import type { MeRepository } from "@peerwheel/services/identity";
import {
  getOrCreateTenantProfile,
  nowIso,
  responseMeta,
  toPublicUser,
  usersById,
} from "../_shared/sandbox-store.js";

export class MeRepositoryDdb implements MeRepository {
  constructor(private readonly _dynamoClient: unknown) {}

  async getOperatorMe(input: any): Promise<any> {
    const correlationId = String(input?.correlationId ?? "");
    const userId = String(input?.userId ?? "");
    let user = userId ? usersById.get(userId) : undefined;
    if (!user) {
      user = [...usersById.values()].find((u) => u.status === "active");
    }
    if (!user) return null;
    const tenant = getOrCreateTenantProfile(user.tenantId);
    return {
      data: {
        operator: toPublicUser(user),
        tenant: {
          tenantId: tenant.tenantId,
          displayName: tenant.displayNameEn,
          status: tenant.status,
        },
      },
      ...responseMeta(correlationId),
    };
  }

  async updateOperatorMe(input: any): Promise<any> {
    const correlationId = String(input?.correlationId ?? "");
    const user = [...usersById.values()].find((u) => u.status === "active");
    if (!user) return null;
    if (input?.displayName) user.displayName = String(input.displayName);
    user.updatedAt = nowIso();
    usersById.set(user.userId, user);
    return this.getOperatorMe({ ...input, userId: user.userId, correlationId });
  }
}
