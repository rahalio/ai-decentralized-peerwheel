/**
 * Vehicles Domain Types
 *
 * Auto-generated from OpenAPI spec
 * Generator: types-generator v2.0.0
 *
 * This file re-exports types from generated OpenAPI types and adds
 * convenient type aliases for handlers (response types, etc.)
 *
 * ⚠️ DO NOT EDIT MANUALLY - this file is auto-generated
 */

import type { components, operations } from "../openapi/vehicles.openapi.types";

// ============================================================================
// Domain Types Export - Domain-specific types only (excludes components/operations)
// ============================================================================
// This file exports domain-specific types for use in main index.ts
// components and operations are NOT exported here to avoid duplicate export errors
// Access components/operations via namespace: domain.types.components

// ============================================================================
// Convenient Type Aliases for Schemas
// ============================================================================

export type AvailabilityWindow = components["schemas"]["AvailabilityWindow"];
export type AvailabilityWindowCreate = components["schemas"]["AvailabilityWindowCreate"];
export type AvailabilityWindowId = components["schemas"]["AvailabilityWindowId"];
export type AvailabilityWindowListData = components["schemas"]["AvailabilityWindowListData"];
export type SensorBinding = components["schemas"]["SensorBinding"];
export type Vehicle = components["schemas"]["Vehicle"];
export type VehicleCreate = components["schemas"]["VehicleCreate"];
export type VehicleId = components["schemas"]["VehicleId"];
export type VehicleListData = components["schemas"]["VehicleListData"];
export type VehicleStatus = components["schemas"]["VehicleStatus"];
export type VehicleUpdate = components["schemas"]["VehicleUpdate"];
export type YieldForesight = components["schemas"]["YieldForesight"];
export type Availability = operations["listAvailabilityWindows"]["responses"]["200"]["content"]["application/json"]["data"];


// ============================================================================
// Operation Input Types (Request Bodies)
// ============================================================================

// These types represent the input data for create/update operations

export type RegisterVehicleRequestInput = NonNullable<operations["registerVehicle"]["requestBody"]>["content"]["application/json"];
export type UpdateVehicleRequestInput = NonNullable<operations["updateVehicle"]["requestBody"]>["content"]["application/json"];
export type UpdateVehicleRequest = UpdateVehicleRequestInput;
export type PublishAvailabilityRequestInput = NonNullable<operations["publishAvailability"]["requestBody"]>["content"]["application/json"];


// ============================================================================
// Operation Parameter Types (Query/Path Parameters)
// ============================================================================

// These types represent parameters for operations without request bodies.
// Aligned with get_input_schema_or_type_name for consistent naming across generators.

export type ListVehiclesParams = NonNullable<operations["listVehicles"]["parameters"]["query"]>;
export type GetVehicleParams = operations["getVehicle"]["parameters"]["path"];
export type UpdateVehicleParams = operations["updateVehicle"]["parameters"]["path"];
export type ListAvailabilityWindowsParams = NonNullable<operations["listAvailabilityWindows"]["parameters"]["query"]>;
export type PublishAvailabilityParams = operations["publishAvailability"]["parameters"]["path"];
export type PullAvailabilityParams = operations["pullAvailability"]["parameters"]["path"];
export type GetYieldForesightParams = operations["getYieldForesight"]["parameters"]["path"];


// ============================================================================
// Operation Response Types
// ============================================================================

// These types are used by handlers for type-safe response envelopes

export type ListVehiclesResponse = operations["listVehicles"]["responses"]["200"]["content"]["application/json"];
export type RegisterVehicleResponse = operations["registerVehicle"]["responses"]["201"]["content"]["application/json"];
export type GetVehicleResponse = operations["getVehicle"]["responses"]["200"]["content"]["application/json"];
export type UpdateVehicleResponse = operations["updateVehicle"]["responses"]["200"]["content"]["application/json"];
export type ListAvailabilityWindowsResponse = operations["listAvailabilityWindows"]["responses"]["200"]["content"]["application/json"];
export type PublishAvailabilityResponse = operations["publishAvailability"]["responses"]["201"]["content"]["application/json"];
export type PullAvailabilityResponse = operations["pullAvailability"]["responses"]["200"]["content"]["application/json"];
export type GetYieldForesightResponse = operations["getYieldForesight"]["responses"]["200"]["content"]["application/json"];


