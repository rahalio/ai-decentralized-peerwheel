/**
 * Rides Domain Types
 *
 * Auto-generated from OpenAPI spec
 * Generator: types-generator v2.0.0
 *
 * This file re-exports types from generated OpenAPI types and adds
 * convenient type aliases for handlers (response types, etc.)
 *
 * ⚠️ DO NOT EDIT MANUALLY - this file is auto-generated
 */

import type { components, operations } from "../openapi/rides.openapi.types";

// ============================================================================
// Re-export all generated types
// ============================================================================
// Note: components and operations are exported here but should be accessed via namespace
// in main index.ts to avoid duplicate export errors (e.g., blockchain.types.components)

export type { components, operations };


// ============================================================================
// Convenient Type Aliases for Schemas
// ============================================================================

export type PriceBand = components["schemas"]["PriceBand"];
export type Ride = components["schemas"]["Ride"];
export type RideChannel = components["schemas"]["RideChannel"];
export type RideCreate = components["schemas"]["RideCreate"];
export type RideId = components["schemas"]["RideId"];
export type RideLedgerEntry = components["schemas"]["RideLedgerEntry"];
export type RideListData = components["schemas"]["RideListData"];
export type RideStatus = components["schemas"]["RideStatus"];
export type RideMatchRequest = components["schemas"]["RideMatchRequest"];


// ============================================================================
// Operation Input Types (Request Bodies)
// ============================================================================

// These types represent the input data for create/update operations

export type RequestRideRequestInput = NonNullable<operations["requestRide"]["requestBody"]>["content"]["application/json"];
export type MatchRideRequestInput = NonNullable<operations["matchRide"]["requestBody"]>["content"]["application/json"];


// ============================================================================
// Operation Parameter Types (Query/Path Parameters)
// ============================================================================

// These types represent parameters for operations without request bodies.
// Aligned with get_input_schema_or_type_name for consistent naming across generators.

export type ListRidesParams = NonNullable<operations["listRides"]["parameters"]["query"]>;
export type GetRideParams = operations["getRide"]["parameters"]["path"];
export type MatchRideParams = operations["matchRide"]["parameters"]["path"];
export type CompleteRideParams = operations["completeRide"]["parameters"]["path"];
export type RefuseRideParams = operations["refuseRide"]["parameters"]["path"];


// ============================================================================
// Operation Response Types
// ============================================================================

// These types are used by handlers for type-safe response envelopes

export type ListRidesResponse = operations["listRides"]["responses"]["200"]["content"]["application/json"];
export type RequestRideResponse = operations["requestRide"]["responses"]["201"]["content"]["application/json"];
export type GetRideResponse = operations["getRide"]["responses"]["200"]["content"]["application/json"];
export type MatchRideResponse = operations["matchRide"]["responses"]["200"]["content"]["application/json"];
export type CompleteRideResponse = operations["completeRide"]["responses"]["200"]["content"]["application/json"];
export type RefuseRideResponse = operations["refuseRide"]["responses"]["200"]["content"]["application/json"];


