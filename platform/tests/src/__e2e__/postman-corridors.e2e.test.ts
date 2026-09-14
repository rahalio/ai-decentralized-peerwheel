/**
 * Postman-collection 1:1 Vitest tests for corridors (generated)
 *
 * One it() = one API request. Add sample data to vars for e2e runs.
 * Run: pnpm test:e2e or pnpm test:suite:db
 * Requires: API server at baseUrl (default http://localhost:3000)
 */

import { describe, it, expect } from "vitest";

const vars: Record<string, string> = {
  baseUrl: "http://localhost:3000",
  orgId: "test-org",
  accessToken: "",
  corridorId: "",
  cursor: "",
  status: "",
};

function sub(s: string): string {
  return s.replace(/\{\{([^}]+)\}\}/g, (_, k) => vars[k.trim()] ?? "");
}

describe("Postman / corridors (1:1 generated)", () => {

  it("listCorridors", async () => {
    const url = sub("{{baseUrl}}/v1/corridors?cursor={{cursor}}&status={{status}}");
    const res = await fetch(url, {
      method: "GET",
      headers: vars.accessToken ? { Authorization: `Bearer ${vars.accessToken}` } : {},
    });
    expect(res.status).toBe(200);
    const j = await res.json(); expect(j).toHaveProperty("data");
  });

  it("getCorridor", async () => {
    const url = sub("{{baseUrl}}/v1/corridors/{{corridorId}}");
    const res = await fetch(url, {
      method: "GET",
      headers: vars.accessToken ? { Authorization: `Bearer ${vars.accessToken}` } : {},
    });
    expect(res.status).toBe(200);
    const j = await res.json(); expect(j).toHaveProperty("data");
  });

  it("pauseCorridor", async () => {
    const url = sub("{{baseUrl}}/v1/corridors/{{corridorId}}/pause");
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...(vars.accessToken ? { Authorization: `Bearer ${vars.accessToken}` } : {}) },
      body: sub("{\n  \"vehicleClasses\": null,\n  \"reason\": \"\"\n}"),
    });
    expect(res.status).toBe(200);
    const j = await res.json(); expect(j).toHaveProperty("data");
  });

  it("resumeCorridor", async () => {
    const url = sub("{{baseUrl}}/v1/corridors/{{corridorId}}/resume");
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...(vars.accessToken ? { Authorization: `Bearer ${vars.accessToken}` } : {}) },
      body: sub("{\n  \"vehicleClasses\": null\n}"),
    });
    expect(res.status).toBe(200);
    const j = await res.json(); expect(j).toHaveProperty("data");
  });

  it("updateCorridorLicensing", async () => {
    const url = sub("{{baseUrl}}/v1/corridors/{{corridorId}}/licensing");
    const res = await fetch(url, {
      method: "PUT",
      headers: { "Content-Type": "application/json", ...(vars.accessToken ? { Authorization: `Bearer ${vars.accessToken}` } : {}) },
      body: sub("{\n  \"licensingTags\": null\n}"),
    });
    expect(res.status).toBe(200);
    const j = await res.json(); expect(j).toHaveProperty("data");
    if (j?.data?.id) vars['corridorLicensingId'] = j.data.id;
  });
});
