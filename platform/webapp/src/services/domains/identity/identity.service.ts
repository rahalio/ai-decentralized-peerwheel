import { apiClient } from "@/services/shared/infrastructure";
import { makeService } from "@/services/shared/infrastructure/service-wrapper";
import { asItems, unwrap } from "@/services/shared/http";

const raw = {
  async listApiKeys() {
    return asItems(await unwrap(apiClient.get(`/v0/tenants/me/api-keys`)));
  },
  login(body: { email: string; password: string }) {
    return unwrap<Record<string, unknown>>(apiClient.post(`/v0/auth/login`, { body }));
  },
  me() {
    return unwrap<Record<string, unknown>>(apiClient.get(`/v0/auth/me`));
  },
  logout() {
    return apiClient.post(`/v0/auth/logout`);
  },
};

export const identityService = makeService(raw, "identity");
