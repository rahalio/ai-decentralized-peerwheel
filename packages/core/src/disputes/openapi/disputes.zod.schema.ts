import { makeApi, Zodios, type ZodiosOptions } from '@zodios/core';
import { z } from 'zod';

const openDispute_Body = z
  .object({
    rideId: z.string(),
    reason: z.enum(['no_show', 'unsafe_vehicle', 'fare_disagreement', 'other']),
    evidence: z
      .object({
        rideLedgerRef: z.string(),
        attestationIds: z.array(z.string()),
        ownerNotes: z.string(),
        riderNotes: z.string(),
      })
      .partial()
      .passthrough()
      .optional(),
  })
  .passthrough();
const DisputeStatus = z.enum(['open', 'resolved', 'expired']);
const Problem = z
  .object({
    type: z.string().url(),
    title: z.string(),
    status: z.number().int(),
    detail: z.string(),
    instance: z.string().url(),
    code: z.string(),
  })
  .partial()
  .passthrough();
const DisputeId = z.string();
const DisputeReason = z.enum([
  'no_show',
  'unsafe_vehicle',
  'fare_disagreement',
  'other',
]);
const DisputeEvidence = z
  .object({
    rideLedgerRef: z.string(),
    attestationIds: z.array(z.string()),
    ownerNotes: z.string(),
    riderNotes: z.string(),
  })
  .partial()
  .passthrough();
const Dispute = z
  .object({
    disputeId: z.string().regex(/^dsp_[0-9A-HJKMNP-TV-Z]{26}$/),
    rideId: z.string(),
    reason: z.enum(['no_show', 'unsafe_vehicle', 'fare_disagreement', 'other']),
    status: z.enum(['open', 'resolved', 'expired']),
    evidence: z
      .object({
        rideLedgerRef: z.string(),
        attestationIds: z.array(z.string()),
        ownerNotes: z.string(),
        riderNotes: z.string(),
      })
      .partial()
      .passthrough()
      .optional(),
    resolution: z.string().optional(),
    deadlineAt: z.string().datetime({ offset: true }),
    resolvedAt: z.string().datetime({ offset: true }).optional(),
    createdAt: z.string().datetime({ offset: true }),
    updatedAt: z.string().datetime({ offset: true }),
  })
  .passthrough();
const DisputeListData = z
  .object({
    items: z.array(
      z
        .object({
          disputeId: z.string().regex(/^dsp_[0-9A-HJKMNP-TV-Z]{26}$/),
          rideId: z.string(),
          reason: z.enum([
            'no_show',
            'unsafe_vehicle',
            'fare_disagreement',
            'other',
          ]),
          status: z.enum(['open', 'resolved', 'expired']),
          evidence: z
            .object({
              rideLedgerRef: z.string(),
              attestationIds: z.array(z.string()),
              ownerNotes: z.string(),
              riderNotes: z.string(),
            })
            .partial()
            .passthrough()
            .optional(),
          resolution: z.string().optional(),
          deadlineAt: z.string().datetime({ offset: true }),
          resolvedAt: z.string().datetime({ offset: true }).optional(),
          createdAt: z.string().datetime({ offset: true }),
          updatedAt: z.string().datetime({ offset: true }),
        })
        .passthrough()
    ),
    nextCursor: z.string().optional(),
  })
  .passthrough();
const ResponseMeta = z
  .object({
    requestId: z.string().uuid(),
    correlationId: z.string(),
    generatedAt: z.string().datetime({ offset: true }),
  })
  .partial()
  .passthrough();
const DisputeListResponse = z
  .object({
    data: z
      .object({
        items: z.array(
          z
            .object({
              disputeId: z.string().regex(/^dsp_[0-9A-HJKMNP-TV-Z]{26}$/),
              rideId: z.string(),
              reason: z.enum([
                'no_show',
                'unsafe_vehicle',
                'fare_disagreement',
                'other',
              ]),
              status: z.enum(['open', 'resolved', 'expired']),
              evidence: z
                .object({
                  rideLedgerRef: z.string(),
                  attestationIds: z.array(z.string()),
                  ownerNotes: z.string(),
                  riderNotes: z.string(),
                })
                .partial()
                .passthrough()
                .optional(),
              resolution: z.string().optional(),
              deadlineAt: z.string().datetime({ offset: true }),
              resolvedAt: z.string().datetime({ offset: true }).optional(),
              createdAt: z.string().datetime({ offset: true }),
              updatedAt: z.string().datetime({ offset: true }),
            })
            .passthrough()
        ),
        nextCursor: z.string().optional(),
      })
      .passthrough(),
    meta: z
      .object({
        requestId: z.string().uuid(),
        correlationId: z.string(),
        generatedAt: z.string().datetime({ offset: true }),
      })
      .partial()
      .passthrough()
      .optional(),
  })
  .passthrough();
const DisputeCreate = z
  .object({
    rideId: z.string(),
    reason: z.enum(['no_show', 'unsafe_vehicle', 'fare_disagreement', 'other']),
    evidence: z
      .object({
        rideLedgerRef: z.string(),
        attestationIds: z.array(z.string()),
        ownerNotes: z.string(),
        riderNotes: z.string(),
      })
      .partial()
      .passthrough()
      .optional(),
  })
  .passthrough();
const DisputeResponse = z
  .object({
    data: z
      .object({
        disputeId: z.string().regex(/^dsp_[0-9A-HJKMNP-TV-Z]{26}$/),
        rideId: z.string(),
        reason: z.enum([
          'no_show',
          'unsafe_vehicle',
          'fare_disagreement',
          'other',
        ]),
        status: z.enum(['open', 'resolved', 'expired']),
        evidence: z
          .object({
            rideLedgerRef: z.string(),
            attestationIds: z.array(z.string()),
            ownerNotes: z.string(),
            riderNotes: z.string(),
          })
          .partial()
          .passthrough()
          .optional(),
        resolution: z.string().optional(),
        deadlineAt: z.string().datetime({ offset: true }),
        resolvedAt: z.string().datetime({ offset: true }).optional(),
        createdAt: z.string().datetime({ offset: true }),
        updatedAt: z.string().datetime({ offset: true }),
      })
      .passthrough(),
    meta: z
      .object({
        requestId: z.string().uuid(),
        correlationId: z.string(),
        generatedAt: z.string().datetime({ offset: true }),
      })
      .partial()
      .passthrough()
      .optional(),
  })
  .passthrough();
const DisputeResolveRequest = z
  .object({ resolution: z.string().min(1) })
  .passthrough();
const DisputeExtendRequest = z
  .object({ newDeadlineAt: z.string().datetime({ offset: true }) })
  .passthrough();
const DisputeCasePack = z
  .object({
    disputeId: z.string().regex(/^dsp_[0-9A-HJKMNP-TV-Z]{26}$/),
    exportedAt: z.string().datetime({ offset: true }),
    payload: z.object({}).partial().passthrough(),
  })
  .passthrough();
const DisputeCasePackResponse = z
  .object({
    data: z
      .object({
        disputeId: z.string().regex(/^dsp_[0-9A-HJKMNP-TV-Z]{26}$/),
        exportedAt: z.string().datetime({ offset: true }),
        payload: z.object({}).partial().passthrough(),
      })
      .passthrough(),
    meta: z
      .object({
        requestId: z.string().uuid(),
        correlationId: z.string(),
        generatedAt: z.string().datetime({ offset: true }),
      })
      .partial()
      .passthrough()
      .optional(),
  })
  .passthrough();

export const schemas: any = {
  openDispute_Body,
  DisputeStatus,
  Problem,
  DisputeId,
  DisputeReason,
  DisputeEvidence,
  Dispute,
  DisputeListData,
  ResponseMeta,
  DisputeListResponse,
  DisputeCreate,
  DisputeResponse,
  DisputeResolveRequest,
  DisputeExtendRequest,
  DisputeCasePack,
  DisputeCasePackResponse,
};

const endpoints = makeApi([
  {
    method: 'get',
    path: '/v1/disputes',
    alias: 'listDisputes',
    requestFormat: 'json',
    parameters: [
      {
        name: 'cursor',
        type: 'Query',
        schema: z.string().optional(),
      },
      {
        name: 'status',
        type: 'Query',
        schema: z.enum(['open', 'resolved', 'expired']).optional(),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            items: z.array(
              z
                .object({
                  disputeId: z.string().regex(/^dsp_[0-9A-HJKMNP-TV-Z]{26}$/),
                  rideId: z.string(),
                  reason: z.enum([
                    'no_show',
                    'unsafe_vehicle',
                    'fare_disagreement',
                    'other',
                  ]),
                  status: z.enum(['open', 'resolved', 'expired']),
                  evidence: z
                    .object({
                      rideLedgerRef: z.string(),
                      attestationIds: z.array(z.string()),
                      ownerNotes: z.string(),
                      riderNotes: z.string(),
                    })
                    .partial()
                    .passthrough()
                    .optional(),
                  resolution: z.string().optional(),
                  deadlineAt: z.string().datetime({ offset: true }),
                  resolvedAt: z.string().datetime({ offset: true }).optional(),
                  createdAt: z.string().datetime({ offset: true }),
                  updatedAt: z.string().datetime({ offset: true }),
                })
                .passthrough()
            ),
            nextCursor: z.string().optional(),
          })
          .passthrough(),
        meta: z
          .object({
            requestId: z.string().uuid(),
            correlationId: z.string(),
            generatedAt: z.string().datetime({ offset: true }),
          })
          .partial()
          .passthrough()
          .optional(),
      })
      .passthrough(),
    errors: [
      {
        status: 401,
        description: `Missing or invalid API key`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
    ],
  },
  {
    method: 'post',
    path: '/v1/disputes',
    alias: 'openDispute',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: openDispute_Body,
      },
      {
        name: 'Idempotency-Key',
        type: 'Header',
        schema: z.string().min(1).max(128),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            disputeId: z.string().regex(/^dsp_[0-9A-HJKMNP-TV-Z]{26}$/),
            rideId: z.string(),
            reason: z.enum([
              'no_show',
              'unsafe_vehicle',
              'fare_disagreement',
              'other',
            ]),
            status: z.enum(['open', 'resolved', 'expired']),
            evidence: z
              .object({
                rideLedgerRef: z.string(),
                attestationIds: z.array(z.string()),
                ownerNotes: z.string(),
                riderNotes: z.string(),
              })
              .partial()
              .passthrough()
              .optional(),
            resolution: z.string().optional(),
            deadlineAt: z.string().datetime({ offset: true }),
            resolvedAt: z.string().datetime({ offset: true }).optional(),
            createdAt: z.string().datetime({ offset: true }),
            updatedAt: z.string().datetime({ offset: true }),
          })
          .passthrough(),
        meta: z
          .object({
            requestId: z.string().uuid(),
            correlationId: z.string(),
            generatedAt: z.string().datetime({ offset: true }),
          })
          .partial()
          .passthrough()
          .optional(),
      })
      .passthrough(),
    errors: [
      {
        status: 400,
        description: `Malformed request`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
      {
        status: 401,
        description: `Missing or invalid API key`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
    ],
  },
  {
    method: 'get',
    path: '/v1/disputes/:disputeId',
    alias: 'getDispute',
    requestFormat: 'json',
    parameters: [
      {
        name: 'disputeId',
        type: 'Path',
        schema: z.string().regex(/^dsp_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            disputeId: z.string().regex(/^dsp_[0-9A-HJKMNP-TV-Z]{26}$/),
            rideId: z.string(),
            reason: z.enum([
              'no_show',
              'unsafe_vehicle',
              'fare_disagreement',
              'other',
            ]),
            status: z.enum(['open', 'resolved', 'expired']),
            evidence: z
              .object({
                rideLedgerRef: z.string(),
                attestationIds: z.array(z.string()),
                ownerNotes: z.string(),
                riderNotes: z.string(),
              })
              .partial()
              .passthrough()
              .optional(),
            resolution: z.string().optional(),
            deadlineAt: z.string().datetime({ offset: true }),
            resolvedAt: z.string().datetime({ offset: true }).optional(),
            createdAt: z.string().datetime({ offset: true }),
            updatedAt: z.string().datetime({ offset: true }),
          })
          .passthrough(),
        meta: z
          .object({
            requestId: z.string().uuid(),
            correlationId: z.string(),
            generatedAt: z.string().datetime({ offset: true }),
          })
          .partial()
          .passthrough()
          .optional(),
      })
      .passthrough(),
    errors: [
      {
        status: 401,
        description: `Missing or invalid API key`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
      {
        status: 404,
        description: `Resource not found`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
    ],
  },
  {
    method: 'post',
    path: '/v1/disputes/:disputeId/export',
    alias: 'exportDisputeCasePack',
    requestFormat: 'json',
    parameters: [
      {
        name: 'disputeId',
        type: 'Path',
        schema: z.string().regex(/^dsp_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
      {
        name: 'Idempotency-Key',
        type: 'Header',
        schema: z.string().min(1).max(128),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            disputeId: z.string().regex(/^dsp_[0-9A-HJKMNP-TV-Z]{26}$/),
            exportedAt: z.string().datetime({ offset: true }),
            payload: z.object({}).partial().passthrough(),
          })
          .passthrough(),
        meta: z
          .object({
            requestId: z.string().uuid(),
            correlationId: z.string(),
            generatedAt: z.string().datetime({ offset: true }),
          })
          .partial()
          .passthrough()
          .optional(),
      })
      .passthrough(),
    errors: [
      {
        status: 401,
        description: `Missing or invalid API key`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
      {
        status: 404,
        description: `Resource not found`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
    ],
  },
  {
    method: 'post',
    path: '/v1/disputes/:disputeId/extend',
    alias: 'extendDispute',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: z
          .object({ newDeadlineAt: z.string().datetime({ offset: true }) })
          .passthrough(),
      },
      {
        name: 'disputeId',
        type: 'Path',
        schema: z.string().regex(/^dsp_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
      {
        name: 'Idempotency-Key',
        type: 'Header',
        schema: z.string().min(1).max(128),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            disputeId: z.string().regex(/^dsp_[0-9A-HJKMNP-TV-Z]{26}$/),
            rideId: z.string(),
            reason: z.enum([
              'no_show',
              'unsafe_vehicle',
              'fare_disagreement',
              'other',
            ]),
            status: z.enum(['open', 'resolved', 'expired']),
            evidence: z
              .object({
                rideLedgerRef: z.string(),
                attestationIds: z.array(z.string()),
                ownerNotes: z.string(),
                riderNotes: z.string(),
              })
              .partial()
              .passthrough()
              .optional(),
            resolution: z.string().optional(),
            deadlineAt: z.string().datetime({ offset: true }),
            resolvedAt: z.string().datetime({ offset: true }).optional(),
            createdAt: z.string().datetime({ offset: true }),
            updatedAt: z.string().datetime({ offset: true }),
          })
          .passthrough(),
        meta: z
          .object({
            requestId: z.string().uuid(),
            correlationId: z.string(),
            generatedAt: z.string().datetime({ offset: true }),
          })
          .partial()
          .passthrough()
          .optional(),
      })
      .passthrough(),
    errors: [
      {
        status: 401,
        description: `Missing or invalid API key`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
      {
        status: 404,
        description: `Resource not found`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
    ],
  },
  {
    method: 'post',
    path: '/v1/disputes/:disputeId/resolve',
    alias: 'resolveDispute',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: z.object({ resolution: z.string().min(1) }).passthrough(),
      },
      {
        name: 'disputeId',
        type: 'Path',
        schema: z.string().regex(/^dsp_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
      {
        name: 'Idempotency-Key',
        type: 'Header',
        schema: z.string().min(1).max(128),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            disputeId: z.string().regex(/^dsp_[0-9A-HJKMNP-TV-Z]{26}$/),
            rideId: z.string(),
            reason: z.enum([
              'no_show',
              'unsafe_vehicle',
              'fare_disagreement',
              'other',
            ]),
            status: z.enum(['open', 'resolved', 'expired']),
            evidence: z
              .object({
                rideLedgerRef: z.string(),
                attestationIds: z.array(z.string()),
                ownerNotes: z.string(),
                riderNotes: z.string(),
              })
              .partial()
              .passthrough()
              .optional(),
            resolution: z.string().optional(),
            deadlineAt: z.string().datetime({ offset: true }),
            resolvedAt: z.string().datetime({ offset: true }).optional(),
            createdAt: z.string().datetime({ offset: true }),
            updatedAt: z.string().datetime({ offset: true }),
          })
          .passthrough(),
        meta: z
          .object({
            requestId: z.string().uuid(),
            correlationId: z.string(),
            generatedAt: z.string().datetime({ offset: true }),
          })
          .partial()
          .passthrough()
          .optional(),
      })
      .passthrough(),
    errors: [
      {
        status: 401,
        description: `Missing or invalid API key`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
      {
        status: 404,
        description: `Resource not found`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
      {
        status: 409,
        description: `Idempotency key reuse with different body, or state conflict`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
    ],
  },
]);

export const api: any = new Zodios(
  'https://api.ddd-codegen-starter.local/v1',
  endpoints
);

export function createApiClient(baseUrl: string, options?: ZodiosOptions): any {
  return new Zodios(baseUrl, endpoints, options);
}
