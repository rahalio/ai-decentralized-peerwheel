/** Seeded demo data so Peerwheel UI works when the API is down or returns 500. */

export type DemoVehicle = {
  vehicleId: string;
  ownerId: string;
  status: string;
  licensingTags: string[];
  corridorId: string;
  expectedNetYieldPerHour: number;
  platformFeeRate: number;
  sensorsHealthy: boolean;
  availabilityLabel: string;
};

export type DemoRide = {
  rideId: string;
  vehicleId: string;
  riderId: string;
  ownerId: string;
  status: string;
  pickup: string;
  dropoff: string;
  corridorId: string;
  channel: string;
  priceBand: { low: number; mid: number; high: number; taxiBenchmark: number; currency: string };
  attestationHold: boolean;
  ledger: { at: string; actor: string; event: string; detail: string }[];
  createdAt: string;
};

export type DemoAttestation = {
  attestationId: string;
  rideId: string;
  vehicleId: string;
  result: "pass" | "fail" | "hold";
  phase: "pre" | "during" | "post";
  proofHash: string;
  purposeTag: string;
  sensorTypes: string[];
  holdCleared: boolean;
  createdAt: string;
};

export type DemoSettlement = {
  settlementId: string;
  rideId: string;
  amount: number;
  currency: string;
  status: string;
  platformFeeRate: number;
  platformFeeAmount: number;
  rail: "fiat" | "crypto";
  cryptoAllowed: boolean;
  attestationUnlockRequired: boolean;
  slaDeadlineAt: string;
  bankFloatBaselineHours: number;
};

export type DemoDispute = {
  disputeId: string;
  rideId: string;
  reason: string;
  status: string;
  deadlineAt: string;
  ownerEvidence: string;
  riderEvidence: string;
};

export type DemoCanvasFit = {
  canvasFitId: string;
  valueProposition: string;
  customerSegments: string[];
  channelMetrics: { channel: string; rides: number; conversion: number }[];
  costRevenueVariancePct: number;
  publishedToMatching: boolean;
  updatedAt: string;
};

export type DemoCorridor = {
  corridorId: string;
  name: string;
  metro: string;
  status: "active" | "paused";
  pausedVehicleClasses: string[];
  licensingTags: string[];
  pauseReason?: string;
};

export const demoYieldForesight = {
  vehicleId: "veh_demo_01",
  expectedNetYieldPerHour: 18.4,
  platformFeeRate: 0.12,
  currency: "AED",
  taxiBenchmarkPerHour: 22.0,
};

export const demoVehicles: DemoVehicle[] = [
  {
    vehicleId: "veh_demo_01",
    ownerId: "own_fleet_a",
    status: "available",
    licensingTags: ["RTA-AV-CLASS-B", "DXB-CORRIDOR"],
    corridorId: "cor_dxb_marina",
    expectedNetYieldPerHour: 18.4,
    platformFeeRate: 0.12,
    sensorsHealthy: true,
    availabilityLabel: "Today 14:00–22:00",
  },
  {
    vehicleId: "veh_demo_02",
    ownerId: "own_fleet_a",
    status: "on_ride",
    licensingTags: ["RTA-AV-CLASS-B"],
    corridorId: "cor_dxb_marina",
    expectedNetYieldPerHour: 16.1,
    platformFeeRate: 0.12,
    sensorsHealthy: true,
    availabilityLabel: "Listed · matched",
  },
  {
    vehicleId: "veh_demo_03",
    ownerId: "own_fleet_b",
    status: "paused",
    licensingTags: ["RTA-AV-CLASS-C"],
    corridorId: "cor_dxb_downtown",
    expectedNetYieldPerHour: 0,
    platformFeeRate: 0.12,
    sensorsHealthy: false,
    availabilityLabel: "Pulled — sensor fault",
  },
];

export const demoRides: DemoRide[] = [
  {
    rideId: "ride_demo_01",
    vehicleId: "veh_demo_02",
    riderId: "rider_8841",
    ownerId: "own_fleet_a",
    status: "matched",
    pickup: "Marina Walk Gate 3",
    dropoff: "DIFC Gate Village",
    corridorId: "cor_dxb_marina",
    channel: "app",
    priceBand: { low: 28, mid: 34, high: 41, taxiBenchmark: 38, currency: "AED" },
    attestationHold: false,
    ledger: [
      { at: "2026-09-14T12:01:00Z", actor: "system", event: "requested", detail: "Rider requested via app" },
      { at: "2026-09-14T12:02:10Z", actor: "matcher", event: "matched", detail: "veh_demo_02 within taxi band" },
      { at: "2026-09-14T12:02:40Z", actor: "iot", event: "pre_attest_pass", detail: "lock+heartbeat ok" },
    ],
    createdAt: "2026-09-14T12:01:00Z",
  },
  {
    rideId: "ride_demo_02",
    vehicleId: "veh_demo_01",
    riderId: "rider_2209",
    ownerId: "own_fleet_a",
    status: "completed",
    pickup: "JBR Walk",
    dropoff: "Bluewaters",
    corridorId: "cor_dxb_marina",
    channel: "oem",
    priceBand: { low: 18, mid: 22, high: 26, taxiBenchmark: 24, currency: "AED" },
    attestationHold: true,
    ledger: [
      { at: "2026-09-14T09:10:00Z", actor: "system", event: "requested", detail: "OEM channel" },
      { at: "2026-09-14T09:11:00Z", actor: "matcher", event: "matched", detail: "veh_demo_01" },
      { at: "2026-09-14T09:40:00Z", actor: "iot", event: "post_attest_hold", detail: "fault chip amber" },
      { at: "2026-09-14T09:41:00Z", actor: "system", event: "completed", detail: "Payout blocked pending clear" },
    ],
    createdAt: "2026-09-14T09:10:00Z",
  },
];

export const demoAttestations: DemoAttestation[] = [
  {
    attestationId: "att_demo_01",
    rideId: "ride_demo_02",
    vehicleId: "veh_demo_01",
    result: "hold",
    phase: "post",
    proofHash: "sha256:a1b2c3d4e5f6789012345678abcdef01",
    purposeTag: "integrity_payout_gate",
    sensorTypes: ["lock", "heartbeat", "fault"],
    holdCleared: false,
    createdAt: "2026-09-14T09:40:00Z",
  },
  {
    attestationId: "att_demo_02",
    rideId: "ride_demo_01",
    vehicleId: "veh_demo_02",
    result: "pass",
    phase: "pre",
    proofHash: "sha256:98f7e6d5c4b3a2918077665544332211",
    purposeTag: "integrity_pre_ride",
    sensorTypes: ["lock", "heartbeat"],
    holdCleared: true,
    createdAt: "2026-09-14T12:02:40Z",
  },
];

export const demoSettlements: DemoSettlement[] = [
  {
    settlementId: "stl_demo_01",
    rideId: "ride_demo_02",
    amount: 22.0,
    currency: "AED",
    status: "held",
    platformFeeRate: 0.12,
    platformFeeAmount: 2.64,
    rail: "fiat",
    cryptoAllowed: true,
    attestationUnlockRequired: true,
    slaDeadlineAt: "2026-09-14T15:00:00Z",
    bankFloatBaselineHours: 48,
  },
  {
    settlementId: "stl_demo_02",
    rideId: "ride_demo_01",
    amount: 34.0,
    currency: "AED",
    status: "pending",
    platformFeeRate: 0.12,
    platformFeeAmount: 4.08,
    rail: "fiat",
    cryptoAllowed: true,
    attestationUnlockRequired: false,
    slaDeadlineAt: "2026-09-14T18:00:00Z",
    bankFloatBaselineHours: 48,
  },
];

export const demoDisputes: DemoDispute[] = [
  {
    disputeId: "dsp_demo_01",
    rideId: "ride_demo_02",
    reason: "integrity_fault_after_complete",
    status: "open",
    deadlineAt: "2026-09-16T09:41:00Z",
    ownerEvidence: "Post-ride fault chip; ledger append-only hash chain intact.",
    riderEvidence: "Trip completed; cabin telemetry not requested (purpose-limited).",
  },
];

export const demoCanvasFit: DemoCanvasFit = {
  canvasFitId: "cvs_demo_01",
  valueProposition:
    "Idle AV hours convert to peer-settled rides only when IoT integrity unlocks payout.",
  customerSegments: ["Fleet owners with idle windows", "Corporate corridor riders"],
  channelMetrics: [
    { channel: "app", rides: 128, conversion: 0.42 },
    { channel: "oem", rides: 64, conversion: 0.31 },
    { channel: "corporate", rides: 41, conversion: 0.55 },
  ],
  costRevenueVariancePct: -4.2,
  publishedToMatching: true,
  updatedAt: "2026-09-01T08:00:00Z",
};

export const demoCorridors: DemoCorridor[] = [
  {
    corridorId: "cor_dxb_marina",
    name: "Dubai Marina AV lane",
    metro: "Dubai",
    status: "active",
    pausedVehicleClasses: [],
    licensingTags: ["RTA-AV-CLASS-B", "DXB-CORRIDOR"],
  },
  {
    corridorId: "cor_dxb_downtown",
    name: "Downtown / DIFC",
    metro: "Dubai",
    status: "paused",
    pausedVehicleClasses: ["class_c"],
    licensingTags: ["RTA-AV-CLASS-C"],
    pauseReason: "Sensor class recall — non-destructive pause",
  },
];

export function demoRideById(id: string): DemoRide | undefined {
  return demoRides.find((r) => r.rideId === id) ?? demoRides[0];
}
