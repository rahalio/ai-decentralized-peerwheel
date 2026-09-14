import { makeApi, Zodios, type ZodiosOptions } from '@zodios/core';
import { z } from 'zod';

const requestRide_Body = z
  .object({
    riderId: z.string(),
    pickup: z.string(),
    dropoff: z.string().optional(),
    corridorId: z.string().optional(),
    channel: z.enum(['app', 'oem_deeplink', 'corporate']).optional(),
  })
  .passthrough();
const matchRide_Body = z
  .object({ vehicleId: z.string(), forceReassign: z.boolean() })
  .partial()
  .passthrough();
const RideStatus = z.enum([
  'requested',
  'matched',
  'in_progress',
  'completed',
  'cancelled',
  'refused',
]);
const RideChannel = z.enum(['app', 'oem_deeplink', 'corporate']);
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
const RideId = z.string();
const PriceBand = z
  .object({
    currency: z.string(),
    low: z.number(),
    high: z.number(),
    taxiBenchmark: z.number(),
  })
  .passthrough();
const RideLedgerEntry = z
  .object({
    at: z.string().datetime({ offset: true }),
    event: z.string(),
    actor: z.enum(['owner', 'rider', 'system', 'ops']),
    detail: z.string().optional(),
  })
  .passthrough();
const Ride = z
  .object({
    rideId: z.string().regex(/^rid_[0-9A-HJKMNP-TV-Z]{26}$/),
    vehicleId: z.string().optional(),
    riderId: z.string().optional(),
    ownerId: z.string().optional(),
    status: z.enum([
      'requested',
      'matched',
      'in_progress',
      'completed',
      'cancelled',
      'refused',
    ]),
    pickup: z.string().optional(),
    dropoff: z.string().optional(),
    corridorId: z.string().optional(),
    channel: z.enum(['app', 'oem_deeplink', 'corporate']),
    priceBand: z
      .object({
        currency: z.string(),
        low: z.number(),
        high: z.number(),
        taxiBenchmark: z.number(),
      })
      .passthrough()
      .optional(),
    ledger: z
      .array(
        z
          .object({
            at: z.string().datetime({ offset: true }),
            event: z.string(),
            actor: z.enum(['owner', 'rider', 'system', 'ops']),
            detail: z.string().optional(),
          })
          .passthrough()
      )
      .optional(),
    attestationHold: z.boolean().optional(),
    createdAt: z.string().datetime({ offset: true }),
    updatedAt: z.string().datetime({ offset: true }),
    completedAt: z.string().datetime({ offset: true }).optional(),
  })
  .passthrough();
const RideListData = z
  .object({
    items: z.array(
      z
        .object({
          rideId: z.string().regex(/^rid_[0-9A-HJKMNP-TV-Z]{26}$/),
          vehicleId: z.string().optional(),
          riderId: z.string().optional(),
          ownerId: z.string().optional(),
          status: z.enum([
            'requested',
            'matched',
            'in_progress',
            'completed',
            'cancelled',
            'refused',
          ]),
          pickup: z.string().optional(),
          dropoff: z.string().optional(),
          corridorId: z.string().optional(),
          channel: z.enum(['app', 'oem_deeplink', 'corporate']),
          priceBand: z
            .object({
              currency: z.string(),
              low: z.number(),
              high: z.number(),
              taxiBenchmark: z.number(),
            })
            .passthrough()
            .optional(),
          ledger: z
            .array(
              z
                .object({
                  at: z.string().datetime({ offset: true }),
                  event: z.string(),
                  actor: z.enum(['owner', 'rider', 'system', 'ops']),
                  detail: z.string().optional(),
                })
                .passthrough()
            )
            .optional(),
          attestationHold: z.boolean().optional(),
          createdAt: z.string().datetime({ offset: true }),
          updatedAt: z.string().datetime({ offset: true }),
          completedAt: z.string().datetime({ offset: true }).optional(),
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
const RideListResponse = z
  .object({
    data: z
      .object({
        items: z.array(
          z
            .object({
              rideId: z.string().regex(/^rid_[0-9A-HJKMNP-TV-Z]{26}$/),
              vehicleId: z.string().optional(),
              riderId: z.string().optional(),
              ownerId: z.string().optional(),
              status: z.enum([
                'requested',
                'matched',
                'in_progress',
                'completed',
                'cancelled',
                'refused',
              ]),
              pickup: z.string().optional(),
              dropoff: z.string().optional(),
              corridorId: z.string().optional(),
              channel: z.enum(['app', 'oem_deeplink', 'corporate']),
              priceBand: z
                .object({
                  currency: z.string(),
                  low: z.number(),
                  high: z.number(),
                  taxiBenchmark: z.number(),
                })
                .passthrough()
                .optional(),
              ledger: z
                .array(
                  z
                    .object({
                      at: z.string().datetime({ offset: true }),
                      event: z.string(),
                      actor: z.enum(['owner', 'rider', 'system', 'ops']),
                      detail: z.string().optional(),
                    })
                    .passthrough()
                )
                .optional(),
              attestationHold: z.boolean().optional(),
              createdAt: z.string().datetime({ offset: true }),
              updatedAt: z.string().datetime({ offset: true }),
              completedAt: z.string().datetime({ offset: true }).optional(),
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
const RideCreate = z
  .object({
    riderId: z.string(),
    pickup: z.string(),
    dropoff: z.string().optional(),
    corridorId: z.string().optional(),
    channel: z.enum(['app', 'oem_deeplink', 'corporate']).optional(),
  })
  .passthrough();
const RideResponse = z
  .object({
    data: z
      .object({
        rideId: z.string().regex(/^rid_[0-9A-HJKMNP-TV-Z]{26}$/),
        vehicleId: z.string().optional(),
        riderId: z.string().optional(),
        ownerId: z.string().optional(),
        status: z.enum([
          'requested',
          'matched',
          'in_progress',
          'completed',
          'cancelled',
          'refused',
        ]),
        pickup: z.string().optional(),
        dropoff: z.string().optional(),
        corridorId: z.string().optional(),
        channel: z.enum(['app', 'oem_deeplink', 'corporate']),
        priceBand: z
          .object({
            currency: z.string(),
            low: z.number(),
            high: z.number(),
            taxiBenchmark: z.number(),
          })
          .passthrough()
          .optional(),
        ledger: z
          .array(
            z
              .object({
                at: z.string().datetime({ offset: true }),
                event: z.string(),
                actor: z.enum(['owner', 'rider', 'system', 'ops']),
                detail: z.string().optional(),
              })
              .passthrough()
          )
          .optional(),
        attestationHold: z.boolean().optional(),
        createdAt: z.string().datetime({ offset: true }),
        updatedAt: z.string().datetime({ offset: true }),
        completedAt: z.string().datetime({ offset: true }).optional(),
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
const RideMatchRequest = z
  .object({ vehicleId: z.string(), forceReassign: z.boolean() })
  .partial()
  .passthrough();

export const schemas: any = {
  requestRide_Body,
  matchRide_Body,
  RideStatus,
  RideChannel,
  Problem,
  RideId,
  PriceBand,
  RideLedgerEntry,
  Ride,
  RideListData,
  ResponseMeta,
  RideListResponse,
  RideCreate,
  RideResponse,
  RideMatchRequest,
};

const endpoints = makeApi([
  {
    method: 'get',
    path: '/v1/rides',
    alias: 'listRides',
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
        schema: z
          .enum([
            'requested',
            'matched',
            'in_progress',
            'completed',
            'cancelled',
            'refused',
          ])
          .optional(),
      },
      {
        name: 'channel',
        type: 'Query',
        schema: z.enum(['app', 'oem_deeplink', 'corporate']).optional(),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            items: z.array(
              z
                .object({
                  rideId: z.string().regex(/^rid_[0-9A-HJKMNP-TV-Z]{26}$/),
                  vehicleId: z.string().optional(),
                  riderId: z.string().optional(),
                  ownerId: z.string().optional(),
                  status: z.enum([
                    'requested',
                    'matched',
                    'in_progress',
                    'completed',
                    'cancelled',
                    'refused',
                  ]),
                  pickup: z.string().optional(),
                  dropoff: z.string().optional(),
                  corridorId: z.string().optional(),
                  channel: z.enum(['app', 'oem_deeplink', 'corporate']),
                  priceBand: z
                    .object({
                      currency: z.string(),
                      low: z.number(),
                      high: z.number(),
                      taxiBenchmark: z.number(),
                    })
                    .passthrough()
                    .optional(),
                  ledger: z
                    .array(
                      z
                        .object({
                          at: z.string().datetime({ offset: true }),
                          event: z.string(),
                          actor: z.enum(['owner', 'rider', 'system', 'ops']),
                          detail: z.string().optional(),
                        })
                        .passthrough()
                    )
                    .optional(),
                  attestationHold: z.boolean().optional(),
                  createdAt: z.string().datetime({ offset: true }),
                  updatedAt: z.string().datetime({ offset: true }),
                  completedAt: z.string().datetime({ offset: true }).optional(),
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
    path: '/v1/rides',
    alias: 'requestRide',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: requestRide_Body,
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
            rideId: z.string().regex(/^rid_[0-9A-HJKMNP-TV-Z]{26}$/),
            vehicleId: z.string().optional(),
            riderId: z.string().optional(),
            ownerId: z.string().optional(),
            status: z.enum([
              'requested',
              'matched',
              'in_progress',
              'completed',
              'cancelled',
              'refused',
            ]),
            pickup: z.string().optional(),
            dropoff: z.string().optional(),
            corridorId: z.string().optional(),
            channel: z.enum(['app', 'oem_deeplink', 'corporate']),
            priceBand: z
              .object({
                currency: z.string(),
                low: z.number(),
                high: z.number(),
                taxiBenchmark: z.number(),
              })
              .passthrough()
              .optional(),
            ledger: z
              .array(
                z
                  .object({
                    at: z.string().datetime({ offset: true }),
                    event: z.string(),
                    actor: z.enum(['owner', 'rider', 'system', 'ops']),
                    detail: z.string().optional(),
                  })
                  .passthrough()
              )
              .optional(),
            attestationHold: z.boolean().optional(),
            createdAt: z.string().datetime({ offset: true }),
            updatedAt: z.string().datetime({ offset: true }),
            completedAt: z.string().datetime({ offset: true }).optional(),
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
    path: '/v1/rides/:rideId',
    alias: 'getRide',
    requestFormat: 'json',
    parameters: [
      {
        name: 'rideId',
        type: 'Path',
        schema: z.string().regex(/^rid_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            rideId: z.string().regex(/^rid_[0-9A-HJKMNP-TV-Z]{26}$/),
            vehicleId: z.string().optional(),
            riderId: z.string().optional(),
            ownerId: z.string().optional(),
            status: z.enum([
              'requested',
              'matched',
              'in_progress',
              'completed',
              'cancelled',
              'refused',
            ]),
            pickup: z.string().optional(),
            dropoff: z.string().optional(),
            corridorId: z.string().optional(),
            channel: z.enum(['app', 'oem_deeplink', 'corporate']),
            priceBand: z
              .object({
                currency: z.string(),
                low: z.number(),
                high: z.number(),
                taxiBenchmark: z.number(),
              })
              .passthrough()
              .optional(),
            ledger: z
              .array(
                z
                  .object({
                    at: z.string().datetime({ offset: true }),
                    event: z.string(),
                    actor: z.enum(['owner', 'rider', 'system', 'ops']),
                    detail: z.string().optional(),
                  })
                  .passthrough()
              )
              .optional(),
            attestationHold: z.boolean().optional(),
            createdAt: z.string().datetime({ offset: true }),
            updatedAt: z.string().datetime({ offset: true }),
            completedAt: z.string().datetime({ offset: true }).optional(),
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
    path: '/v1/rides/:rideId/complete',
    alias: 'completeRide',
    requestFormat: 'json',
    parameters: [
      {
        name: 'rideId',
        type: 'Path',
        schema: z.string().regex(/^rid_[0-9A-HJKMNP-TV-Z]{26}$/),
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
            rideId: z.string().regex(/^rid_[0-9A-HJKMNP-TV-Z]{26}$/),
            vehicleId: z.string().optional(),
            riderId: z.string().optional(),
            ownerId: z.string().optional(),
            status: z.enum([
              'requested',
              'matched',
              'in_progress',
              'completed',
              'cancelled',
              'refused',
            ]),
            pickup: z.string().optional(),
            dropoff: z.string().optional(),
            corridorId: z.string().optional(),
            channel: z.enum(['app', 'oem_deeplink', 'corporate']),
            priceBand: z
              .object({
                currency: z.string(),
                low: z.number(),
                high: z.number(),
                taxiBenchmark: z.number(),
              })
              .passthrough()
              .optional(),
            ledger: z
              .array(
                z
                  .object({
                    at: z.string().datetime({ offset: true }),
                    event: z.string(),
                    actor: z.enum(['owner', 'rider', 'system', 'ops']),
                    detail: z.string().optional(),
                  })
                  .passthrough()
              )
              .optional(),
            attestationHold: z.boolean().optional(),
            createdAt: z.string().datetime({ offset: true }),
            updatedAt: z.string().datetime({ offset: true }),
            completedAt: z.string().datetime({ offset: true }).optional(),
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
    path: '/v1/rides/:rideId/match',
    alias: 'matchRide',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: matchRide_Body.optional(),
      },
      {
        name: 'rideId',
        type: 'Path',
        schema: z.string().regex(/^rid_[0-9A-HJKMNP-TV-Z]{26}$/),
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
            rideId: z.string().regex(/^rid_[0-9A-HJKMNP-TV-Z]{26}$/),
            vehicleId: z.string().optional(),
            riderId: z.string().optional(),
            ownerId: z.string().optional(),
            status: z.enum([
              'requested',
              'matched',
              'in_progress',
              'completed',
              'cancelled',
              'refused',
            ]),
            pickup: z.string().optional(),
            dropoff: z.string().optional(),
            corridorId: z.string().optional(),
            channel: z.enum(['app', 'oem_deeplink', 'corporate']),
            priceBand: z
              .object({
                currency: z.string(),
                low: z.number(),
                high: z.number(),
                taxiBenchmark: z.number(),
              })
              .passthrough()
              .optional(),
            ledger: z
              .array(
                z
                  .object({
                    at: z.string().datetime({ offset: true }),
                    event: z.string(),
                    actor: z.enum(['owner', 'rider', 'system', 'ops']),
                    detail: z.string().optional(),
                  })
                  .passthrough()
              )
              .optional(),
            attestationHold: z.boolean().optional(),
            createdAt: z.string().datetime({ offset: true }),
            updatedAt: z.string().datetime({ offset: true }),
            completedAt: z.string().datetime({ offset: true }).optional(),
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
  {
    method: 'post',
    path: '/v1/rides/:rideId/refuse',
    alias: 'refuseRide',
    requestFormat: 'json',
    parameters: [
      {
        name: 'rideId',
        type: 'Path',
        schema: z.string().regex(/^rid_[0-9A-HJKMNP-TV-Z]{26}$/),
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
            rideId: z.string().regex(/^rid_[0-9A-HJKMNP-TV-Z]{26}$/),
            vehicleId: z.string().optional(),
            riderId: z.string().optional(),
            ownerId: z.string().optional(),
            status: z.enum([
              'requested',
              'matched',
              'in_progress',
              'completed',
              'cancelled',
              'refused',
            ]),
            pickup: z.string().optional(),
            dropoff: z.string().optional(),
            corridorId: z.string().optional(),
            channel: z.enum(['app', 'oem_deeplink', 'corporate']),
            priceBand: z
              .object({
                currency: z.string(),
                low: z.number(),
                high: z.number(),
                taxiBenchmark: z.number(),
              })
              .passthrough()
              .optional(),
            ledger: z
              .array(
                z
                  .object({
                    at: z.string().datetime({ offset: true }),
                    event: z.string(),
                    actor: z.enum(['owner', 'rider', 'system', 'ops']),
                    detail: z.string().optional(),
                  })
                  .passthrough()
              )
              .optional(),
            attestationHold: z.boolean().optional(),
            createdAt: z.string().datetime({ offset: true }),
            updatedAt: z.string().datetime({ offset: true }),
            completedAt: z.string().datetime({ offset: true }).optional(),
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
]);

export const api: any = new Zodios(
  'https://api.ddd-codegen-starter.local/v1',
  endpoints
);

export function createApiClient(baseUrl: string, options?: ZodiosOptions): any {
  return new Zodios(baseUrl, endpoints, options);
}
