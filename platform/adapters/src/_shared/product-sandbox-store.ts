/**
 * In-memory product domain store for Peerwheel sandbox.
 */

import { sandboxId, nowIso, responseMeta } from './sandbox-store.js';

export type Vehicle = {
  vehicleId: string;
  ownerId: string;
  licensingTags: string[];
  status: 'active' | 'paused' | 'recalled';
  telematicsEndpoint?: string;
  sensors: Array<{ sensorType: string; endpoint: string; healthy?: boolean }>;
  corridorId?: string;
  createdAt: string;
  updatedAt: string;
};

export type AvailabilityWindow = {
  availabilityWindowId: string;
  vehicleId: string;
  startAt: string;
  endAt: string;
  expectedNetYieldPerHour?: number;
  platformFeeRate?: number;
  pulled?: boolean;
  createdAt: string;
};

export type Ride = {
  rideId: string;
  vehicleId?: string;
  riderId?: string;
  ownerId?: string;
  status: string;
  pickup?: string;
  dropoff?: string;
  corridorId?: string;
  channel: string;
  priceBand?: { currency: string; low: number; high: number; taxiBenchmark: number };
  ledger: Array<{ at: string; event: string; actor: string; detail?: string }>;
  attestationHold?: boolean;
  createdAt: string;
  updatedAt: string;
  completedAt?: string;
};

export type Attestation = {
  attestationId: string;
  rideId: string;
  vehicleId?: string;
  result: 'passed' | 'failed' | 'hold';
  phase: 'pre' | 'during' | 'post';
  proofHash?: string;
  purposeTag: string;
  sensorTypes?: string[];
  holdCleared?: boolean;
  createdAt: string;
};

export type Settlement = {
  settlementId: string;
  rideId: string;
  amount: number;
  currency: string;
  status: 'pending' | 'executed' | 'blocked' | 'failed';
  platformFeeRate: number;
  platformFeeAmount?: number;
  rail: 'fiat' | 'crypto';
  cryptoAllowed?: boolean;
  attestationUnlockRequired?: boolean;
  slaDeadlineAt?: string;
  bankFloatBaselineHours?: number;
  executedAt?: string;
  createdAt: string;
  updatedAt: string;
};

export type Dispute = {
  disputeId: string;
  rideId: string;
  reason: string;
  status: 'open' | 'resolved' | 'expired';
  evidence?: Record<string, unknown>;
  resolution?: string;
  deadlineAt: string;
  resolvedAt?: string;
  createdAt: string;
  updatedAt: string;
};

export type CanvasFit = {
  canvasFitId: string;
  valueProposition: string;
  customerSegments: string[];
  channelMetrics?: Array<{ channel: string; rides: number; conversionRate: number; revenue?: number }>;
  costRevenuePlan?: Record<string, unknown>;
  revisions?: Array<Record<string, unknown>>;
  publishedToMatching?: boolean;
  updatedAt: string;
};

export type Corridor = {
  corridorId: string;
  name: string;
  metro?: string;
  status: 'active' | 'paused';
  pausedVehicleClasses?: string[];
  licensingTags?: string[];
  pauseReason?: string;
  pausedAt?: string;
  createdAt: string;
  updatedAt: string;
};

export const vehiclesById = new Map<string, Vehicle>();
export const availabilityById = new Map<string, AvailabilityWindow>();
export const ridesById = new Map<string, Ride>();
export const attestationsById = new Map<string, Attestation>();
export const settlementsById = new Map<string, Settlement>();
export const disputesById = new Map<string, Dispute>();
export const corridorsById = new Map<string, Corridor>();
let canvasFit: CanvasFit | null = null;

function seed() {
  if (vehiclesById.size > 0) return;
  const now = nowIso();
  const vehId = 'veh_01hPEERWHEEL00000000000001';
  // Use valid ULID-ish ids - simplify with sandboxId
  const v1 = sandboxId('veh');
  const v2 = sandboxId('veh');
  const r1 = sandboxId('rid');
  const r2 = sandboxId('rid');
  const a1 = sandboxId('att');
  const s1 = sandboxId('stl');
  const s2 = sandboxId('stl');
  const d1 = sandboxId('dsp');
  const c1 = sandboxId('cor');
  const w1 = sandboxId('avw');

  vehiclesById.set(v1, {
    vehicleId: v1,
    ownerId: 'usr_owner_demo',
    licensingTags: ['dubai-corridor-av', 'passenger'],
    status: 'active',
    telematicsEndpoint: 'https://telematics.demo/peerwheel/v1',
    sensors: [
      { sensorType: 'lock', endpoint: 'sensor://lock', healthy: true },
      { sensorType: 'heartbeat', endpoint: 'sensor://hb', healthy: true },
      { sensorType: 'fault', endpoint: 'sensor://fault', healthy: true },
    ],
    corridorId: c1,
    createdAt: now,
    updatedAt: now,
  });
  vehiclesById.set(v2, {
    vehicleId: v2,
    ownerId: 'usr_owner_demo',
    licensingTags: ['dubai-corridor-av'],
    status: 'paused',
    sensors: [{ sensorType: 'lock', endpoint: 'sensor://lock', healthy: false }],
    corridorId: c1,
    createdAt: now,
    updatedAt: now,
  });

  availabilityById.set(w1, {
    availabilityWindowId: w1,
    vehicleId: v1,
    startAt: now,
    endAt: new Date(Date.now() + 4 * 3600_000).toISOString(),
    expectedNetYieldPerHour: 42.5,
    platformFeeRate: 0.08,
    pulled: false,
    createdAt: now,
  });

  ridesById.set(r1, {
    rideId: r1,
    vehicleId: v1,
    riderId: 'usr_rider_demo',
    ownerId: 'usr_owner_demo',
    status: 'completed',
    pickup: 'DIFC Gate',
    dropoff: 'Marina Walk',
    corridorId: c1,
    channel: 'app',
    priceBand: { currency: 'AED', low: 28, high: 36, taxiBenchmark: 34 },
    ledger: [
      { at: now, event: 'requested', actor: 'rider' },
      { at: now, event: 'matched', actor: 'system' },
      { at: now, event: 'completed', actor: 'system' },
    ],
    attestationHold: false,
    createdAt: now,
    updatedAt: now,
    completedAt: now,
  });
  ridesById.set(r2, {
    rideId: r2,
    vehicleId: v1,
    riderId: 'usr_rider_demo',
    ownerId: 'usr_owner_demo',
    status: 'matched',
    pickup: 'Business Bay',
    dropoff: 'Downtown',
    corridorId: c1,
    channel: 'oem_deeplink',
    priceBand: { currency: 'AED', low: 22, high: 30, taxiBenchmark: 28 },
    ledger: [
      { at: now, event: 'requested', actor: 'rider' },
      { at: now, event: 'matched', actor: 'system' },
    ],
    attestationHold: true,
    createdAt: now,
    updatedAt: now,
  });

  attestationsById.set(a1, {
    attestationId: a1,
    rideId: r2,
    vehicleId: v1,
    result: 'hold',
    phase: 'pre',
    proofHash: 'sha256:peerwheel-demo-proof',
    purposeTag: 'integrity_proof',
    sensorTypes: ['lock', 'heartbeat'],
    holdCleared: false,
    createdAt: now,
  });

  settlementsById.set(s1, {
    settlementId: s1,
    rideId: r1,
    amount: 32,
    currency: 'AED',
    status: 'executed',
    platformFeeRate: 0.08,
    platformFeeAmount: 2.56,
    rail: 'fiat',
    cryptoAllowed: true,
    attestationUnlockRequired: false,
    slaDeadlineAt: new Date(Date.now() + 3600_000).toISOString(),
    bankFloatBaselineHours: 48,
    executedAt: now,
    createdAt: now,
    updatedAt: now,
  });
  settlementsById.set(s2, {
    settlementId: s2,
    rideId: r2,
    amount: 26,
    currency: 'AED',
    status: 'blocked',
    platformFeeRate: 0.08,
    platformFeeAmount: 2.08,
    rail: 'fiat',
    cryptoAllowed: true,
    attestationUnlockRequired: true,
    slaDeadlineAt: new Date(Date.now() + 1800_000).toISOString(),
    bankFloatBaselineHours: 48,
    createdAt: now,
    updatedAt: now,
  });

  disputesById.set(d1, {
    disputeId: d1,
    rideId: r1,
    reason: 'fare_disagreement',
    status: 'open',
    evidence: { rideLedgerRef: r1, attestationIds: [a1], ownerNotes: 'Fare matched band', riderNotes: 'Expected lower' },
    deadlineAt: new Date(Date.now() + 72 * 3600_000).toISOString(),
    createdAt: now,
    updatedAt: now,
  });

  corridorsById.set(c1, {
    corridorId: c1,
    name: 'Dubai Marina–DIFC',
    metro: 'Dubai',
    status: 'active',
    pausedVehicleClasses: [],
    licensingTags: ['rta-av-pilot'],
    createdAt: now,
    updatedAt: now,
  });

  canvasFit = {
    canvasFitId: sandboxId('cvs'),
    valueProposition: 'Trustworthy on-demand AV rides with peer settlement and IoT integrity proofs',
    customerSegments: ['AV fleet operators', 'Private AV owners', 'Corridor riders'],
    channelMetrics: [
      { channel: 'app', rides: 120, conversionRate: 0.18, revenue: 4100 },
      { channel: 'oem_deeplink', rides: 40, conversionRate: 0.12, revenue: 1300 },
      { channel: 'corporate', rides: 22, conversionRate: 0.25, revenue: 980 },
    ],
    costRevenuePlan: {
      period: '2026-09',
      plannedCost: 8000,
      plannedRevenue: 12000,
      actualCost: 9200,
      actualRevenue: 6380,
      costVariance: 1200,
      revenueVariance: -5620,
    },
    revisions: [],
    publishedToMatching: true,
    updatedAt: now,
  };

  void vehId;
}
seed();

export function ensureSeeded() {
  seed();
}

export function getCanvasFit(): CanvasFit {
  ensureSeeded();
  return canvasFit!;
}

export function setCanvasFit(next: CanvasFit) {
  canvasFit = next;
}

export { responseMeta, sandboxId, nowIso };
