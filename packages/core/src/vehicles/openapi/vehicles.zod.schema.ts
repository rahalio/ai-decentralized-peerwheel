import { makeApi, Zodios, type ZodiosOptions } from '@zodios/core';
import { z } from 'zod';

const registerVehicle_Body = z
  .object({
    ownerId: z.string(),
    licensingTags: z.array(z.string()).optional(),
    telematicsEndpoint: z.string().optional(),
    sensors: z
      .array(
        z
          .object({
            sensorType: z.enum(['lock', 'heartbeat', 'fault']),
            endpoint: z.string().min(1),
            healthy: z.boolean().optional(),
          })
          .passthrough()
      )
      .optional(),
    corridorId: z.string().optional(),
  })
  .passthrough();
const updateVehicle_Body = z
  .object({
    licensingTags: z.array(z.string()),
    telematicsEndpoint: z.string(),
    sensors: z.array(
      z
        .object({
          sensorType: z.enum(['lock', 'heartbeat', 'fault']),
          endpoint: z.string().min(1),
          healthy: z.boolean().optional(),
        })
        .passthrough()
    ),
    status: z.enum(['active', 'paused', 'recalled']),
    corridorId: z.string(),
  })
  .partial()
  .passthrough();
const publishAvailability_Body = z
  .object({
    startAt: z.string().datetime({ offset: true }),
    endAt: z.string().datetime({ offset: true }),
    expectedNetYieldPerHour: z.number().optional(),
    platformFeeRate: z.number().optional(),
  })
  .passthrough();
const VehicleStatus = z.enum(['active', 'paused', 'recalled']);
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
const VehicleId = z.string();
const SensorBinding = z
  .object({
    sensorType: z.enum(['lock', 'heartbeat', 'fault']),
    endpoint: z.string().min(1),
    healthy: z.boolean().optional(),
  })
  .passthrough();
const Vehicle = z
  .object({
    vehicleId: z.string().regex(/^veh_[0-9A-HJKMNP-TV-Z]{26}$/),
    ownerId: z.string(),
    licensingTags: z.array(z.string()).optional(),
    status: z.enum(['active', 'paused', 'recalled']),
    telematicsEndpoint: z.string().optional(),
    sensors: z
      .array(
        z
          .object({
            sensorType: z.enum(['lock', 'heartbeat', 'fault']),
            endpoint: z.string().min(1),
            healthy: z.boolean().optional(),
          })
          .passthrough()
      )
      .optional(),
    corridorId: z.string().optional(),
    createdAt: z.string().datetime({ offset: true }),
    updatedAt: z.string().datetime({ offset: true }),
  })
  .passthrough();
const VehicleListData = z
  .object({
    items: z.array(
      z
        .object({
          vehicleId: z.string().regex(/^veh_[0-9A-HJKMNP-TV-Z]{26}$/),
          ownerId: z.string(),
          licensingTags: z.array(z.string()).optional(),
          status: z.enum(['active', 'paused', 'recalled']),
          telematicsEndpoint: z.string().optional(),
          sensors: z
            .array(
              z
                .object({
                  sensorType: z.enum(['lock', 'heartbeat', 'fault']),
                  endpoint: z.string().min(1),
                  healthy: z.boolean().optional(),
                })
                .passthrough()
            )
            .optional(),
          corridorId: z.string().optional(),
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
const VehicleListResponse = z
  .object({
    data: z
      .object({
        items: z.array(
          z
            .object({
              vehicleId: z.string().regex(/^veh_[0-9A-HJKMNP-TV-Z]{26}$/),
              ownerId: z.string(),
              licensingTags: z.array(z.string()).optional(),
              status: z.enum(['active', 'paused', 'recalled']),
              telematicsEndpoint: z.string().optional(),
              sensors: z
                .array(
                  z
                    .object({
                      sensorType: z.enum(['lock', 'heartbeat', 'fault']),
                      endpoint: z.string().min(1),
                      healthy: z.boolean().optional(),
                    })
                    .passthrough()
                )
                .optional(),
              corridorId: z.string().optional(),
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
const VehicleCreate = z
  .object({
    ownerId: z.string(),
    licensingTags: z.array(z.string()).optional(),
    telematicsEndpoint: z.string().optional(),
    sensors: z
      .array(
        z
          .object({
            sensorType: z.enum(['lock', 'heartbeat', 'fault']),
            endpoint: z.string().min(1),
            healthy: z.boolean().optional(),
          })
          .passthrough()
      )
      .optional(),
    corridorId: z.string().optional(),
  })
  .passthrough();
const VehicleResponse = z
  .object({
    data: z
      .object({
        vehicleId: z.string().regex(/^veh_[0-9A-HJKMNP-TV-Z]{26}$/),
        ownerId: z.string(),
        licensingTags: z.array(z.string()).optional(),
        status: z.enum(['active', 'paused', 'recalled']),
        telematicsEndpoint: z.string().optional(),
        sensors: z
          .array(
            z
              .object({
                sensorType: z.enum(['lock', 'heartbeat', 'fault']),
                endpoint: z.string().min(1),
                healthy: z.boolean().optional(),
              })
              .passthrough()
          )
          .optional(),
        corridorId: z.string().optional(),
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
const VehicleUpdate = z
  .object({
    licensingTags: z.array(z.string()),
    telematicsEndpoint: z.string(),
    sensors: z.array(
      z
        .object({
          sensorType: z.enum(['lock', 'heartbeat', 'fault']),
          endpoint: z.string().min(1),
          healthy: z.boolean().optional(),
        })
        .passthrough()
    ),
    status: z.enum(['active', 'paused', 'recalled']),
    corridorId: z.string(),
  })
  .partial()
  .passthrough();
const AvailabilityWindowId = z.string();
const AvailabilityWindow = z
  .object({
    availabilityWindowId: z.string().regex(/^avw_[0-9A-HJKMNP-TV-Z]{26}$/),
    vehicleId: z.string().regex(/^veh_[0-9A-HJKMNP-TV-Z]{26}$/),
    startAt: z.string().datetime({ offset: true }),
    endAt: z.string().datetime({ offset: true }),
    expectedNetYieldPerHour: z.number().optional(),
    platformFeeRate: z.number().optional(),
    pulled: z.boolean().optional(),
    createdAt: z.string().datetime({ offset: true }),
  })
  .passthrough();
const AvailabilityWindowListData = z
  .object({
    items: z.array(
      z
        .object({
          availabilityWindowId: z
            .string()
            .regex(/^avw_[0-9A-HJKMNP-TV-Z]{26}$/),
          vehicleId: z.string().regex(/^veh_[0-9A-HJKMNP-TV-Z]{26}$/),
          startAt: z.string().datetime({ offset: true }),
          endAt: z.string().datetime({ offset: true }),
          expectedNetYieldPerHour: z.number().optional(),
          platformFeeRate: z.number().optional(),
          pulled: z.boolean().optional(),
          createdAt: z.string().datetime({ offset: true }),
        })
        .passthrough()
    ),
    nextCursor: z.string().optional(),
  })
  .passthrough();
const AvailabilityWindowListResponse = z
  .object({
    data: z
      .object({
        items: z.array(
          z
            .object({
              availabilityWindowId: z
                .string()
                .regex(/^avw_[0-9A-HJKMNP-TV-Z]{26}$/),
              vehicleId: z.string().regex(/^veh_[0-9A-HJKMNP-TV-Z]{26}$/),
              startAt: z.string().datetime({ offset: true }),
              endAt: z.string().datetime({ offset: true }),
              expectedNetYieldPerHour: z.number().optional(),
              platformFeeRate: z.number().optional(),
              pulled: z.boolean().optional(),
              createdAt: z.string().datetime({ offset: true }),
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
const AvailabilityWindowCreate = z
  .object({
    startAt: z.string().datetime({ offset: true }),
    endAt: z.string().datetime({ offset: true }),
    expectedNetYieldPerHour: z.number().optional(),
    platformFeeRate: z.number().optional(),
  })
  .passthrough();
const AvailabilityWindowResponse = z
  .object({
    data: z
      .object({
        availabilityWindowId: z.string().regex(/^avw_[0-9A-HJKMNP-TV-Z]{26}$/),
        vehicleId: z.string().regex(/^veh_[0-9A-HJKMNP-TV-Z]{26}$/),
        startAt: z.string().datetime({ offset: true }),
        endAt: z.string().datetime({ offset: true }),
        expectedNetYieldPerHour: z.number().optional(),
        platformFeeRate: z.number().optional(),
        pulled: z.boolean().optional(),
        createdAt: z.string().datetime({ offset: true }),
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
const YieldForesight = z
  .object({
    vehicleId: z.string().regex(/^veh_[0-9A-HJKMNP-TV-Z]{26}$/),
    expectedNetYieldPerHour: z.number(),
    platformFeeRate: z.number(),
    currency: z.string(),
    taxiBenchmarkPerHour: z.number().optional(),
  })
  .passthrough();
const YieldForesightResponse = z
  .object({
    data: z
      .object({
        vehicleId: z.string().regex(/^veh_[0-9A-HJKMNP-TV-Z]{26}$/),
        expectedNetYieldPerHour: z.number(),
        platformFeeRate: z.number(),
        currency: z.string(),
        taxiBenchmarkPerHour: z.number().optional(),
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
  registerVehicle_Body,
  updateVehicle_Body,
  publishAvailability_Body,
  VehicleStatus,
  Problem,
  VehicleId,
  SensorBinding,
  Vehicle,
  VehicleListData,
  ResponseMeta,
  VehicleListResponse,
  VehicleCreate,
  VehicleResponse,
  VehicleUpdate,
  AvailabilityWindowId,
  AvailabilityWindow,
  AvailabilityWindowListData,
  AvailabilityWindowListResponse,
  AvailabilityWindowCreate,
  AvailabilityWindowResponse,
  YieldForesight,
  YieldForesightResponse,
};

const endpoints = makeApi([
  {
    method: 'get',
    path: '/v1/vehicles',
    alias: 'listVehicles',
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
        schema: z.enum(['active', 'paused', 'recalled']).optional(),
      },
      {
        name: 'ownerId',
        type: 'Query',
        schema: z.string().optional(),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            items: z.array(
              z
                .object({
                  vehicleId: z.string().regex(/^veh_[0-9A-HJKMNP-TV-Z]{26}$/),
                  ownerId: z.string(),
                  licensingTags: z.array(z.string()).optional(),
                  status: z.enum(['active', 'paused', 'recalled']),
                  telematicsEndpoint: z.string().optional(),
                  sensors: z
                    .array(
                      z
                        .object({
                          sensorType: z.enum(['lock', 'heartbeat', 'fault']),
                          endpoint: z.string().min(1),
                          healthy: z.boolean().optional(),
                        })
                        .passthrough()
                    )
                    .optional(),
                  corridorId: z.string().optional(),
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
    path: '/v1/vehicles',
    alias: 'registerVehicle',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: registerVehicle_Body,
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
            vehicleId: z.string().regex(/^veh_[0-9A-HJKMNP-TV-Z]{26}$/),
            ownerId: z.string(),
            licensingTags: z.array(z.string()).optional(),
            status: z.enum(['active', 'paused', 'recalled']),
            telematicsEndpoint: z.string().optional(),
            sensors: z
              .array(
                z
                  .object({
                    sensorType: z.enum(['lock', 'heartbeat', 'fault']),
                    endpoint: z.string().min(1),
                    healthy: z.boolean().optional(),
                  })
                  .passthrough()
              )
              .optional(),
            corridorId: z.string().optional(),
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
    path: '/v1/vehicles/:vehicleId',
    alias: 'getVehicle',
    requestFormat: 'json',
    parameters: [
      {
        name: 'vehicleId',
        type: 'Path',
        schema: z.string().regex(/^veh_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            vehicleId: z.string().regex(/^veh_[0-9A-HJKMNP-TV-Z]{26}$/),
            ownerId: z.string(),
            licensingTags: z.array(z.string()).optional(),
            status: z.enum(['active', 'paused', 'recalled']),
            telematicsEndpoint: z.string().optional(),
            sensors: z
              .array(
                z
                  .object({
                    sensorType: z.enum(['lock', 'heartbeat', 'fault']),
                    endpoint: z.string().min(1),
                    healthy: z.boolean().optional(),
                  })
                  .passthrough()
              )
              .optional(),
            corridorId: z.string().optional(),
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
    method: 'patch',
    path: '/v1/vehicles/:vehicleId',
    alias: 'updateVehicle',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: updateVehicle_Body,
      },
      {
        name: 'vehicleId',
        type: 'Path',
        schema: z.string().regex(/^veh_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            vehicleId: z.string().regex(/^veh_[0-9A-HJKMNP-TV-Z]{26}$/),
            ownerId: z.string(),
            licensingTags: z.array(z.string()).optional(),
            status: z.enum(['active', 'paused', 'recalled']),
            telematicsEndpoint: z.string().optional(),
            sensors: z
              .array(
                z
                  .object({
                    sensorType: z.enum(['lock', 'heartbeat', 'fault']),
                    endpoint: z.string().min(1),
                    healthy: z.boolean().optional(),
                  })
                  .passthrough()
              )
              .optional(),
            corridorId: z.string().optional(),
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
    method: 'get',
    path: '/v1/vehicles/:vehicleId/availability',
    alias: 'listAvailabilityWindows',
    requestFormat: 'json',
    parameters: [
      {
        name: 'vehicleId',
        type: 'Path',
        schema: z.string().regex(/^veh_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
      {
        name: 'cursor',
        type: 'Query',
        schema: z.string().optional(),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            items: z.array(
              z
                .object({
                  availabilityWindowId: z
                    .string()
                    .regex(/^avw_[0-9A-HJKMNP-TV-Z]{26}$/),
                  vehicleId: z.string().regex(/^veh_[0-9A-HJKMNP-TV-Z]{26}$/),
                  startAt: z.string().datetime({ offset: true }),
                  endAt: z.string().datetime({ offset: true }),
                  expectedNetYieldPerHour: z.number().optional(),
                  platformFeeRate: z.number().optional(),
                  pulled: z.boolean().optional(),
                  createdAt: z.string().datetime({ offset: true }),
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
    path: '/v1/vehicles/:vehicleId/availability',
    alias: 'publishAvailability',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: publishAvailability_Body,
      },
      {
        name: 'vehicleId',
        type: 'Path',
        schema: z.string().regex(/^veh_[0-9A-HJKMNP-TV-Z]{26}$/),
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
            availabilityWindowId: z
              .string()
              .regex(/^avw_[0-9A-HJKMNP-TV-Z]{26}$/),
            vehicleId: z.string().regex(/^veh_[0-9A-HJKMNP-TV-Z]{26}$/),
            startAt: z.string().datetime({ offset: true }),
            endAt: z.string().datetime({ offset: true }),
            expectedNetYieldPerHour: z.number().optional(),
            platformFeeRate: z.number().optional(),
            pulled: z.boolean().optional(),
            createdAt: z.string().datetime({ offset: true }),
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
    path: '/v1/vehicles/:vehicleId/availability/:availabilityWindowId/pull',
    alias: 'pullAvailability',
    requestFormat: 'json',
    parameters: [
      {
        name: 'vehicleId',
        type: 'Path',
        schema: z.string().regex(/^veh_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
      {
        name: 'availabilityWindowId',
        type: 'Path',
        schema: z.string().regex(/^avw_[0-9A-HJKMNP-TV-Z]{26}$/),
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
            availabilityWindowId: z
              .string()
              .regex(/^avw_[0-9A-HJKMNP-TV-Z]{26}$/),
            vehicleId: z.string().regex(/^veh_[0-9A-HJKMNP-TV-Z]{26}$/),
            startAt: z.string().datetime({ offset: true }),
            endAt: z.string().datetime({ offset: true }),
            expectedNetYieldPerHour: z.number().optional(),
            platformFeeRate: z.number().optional(),
            pulled: z.boolean().optional(),
            createdAt: z.string().datetime({ offset: true }),
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
    method: 'get',
    path: '/v1/vehicles/:vehicleId/yield-foresight',
    alias: 'getYieldForesight',
    requestFormat: 'json',
    parameters: [
      {
        name: 'vehicleId',
        type: 'Path',
        schema: z.string().regex(/^veh_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            vehicleId: z.string().regex(/^veh_[0-9A-HJKMNP-TV-Z]{26}$/),
            expectedNetYieldPerHour: z.number(),
            platformFeeRate: z.number(),
            currency: z.string(),
            taxiBenchmarkPerHour: z.number().optional(),
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
