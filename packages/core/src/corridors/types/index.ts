/**
 * Corridors Domain Types
 *
 * Auto-generated from OpenAPI spec
 * Generator: types-generator v2.0.0
 *
 * This file re-exports types from generated OpenAPI types and adds
 * convenient type aliases for handlers (response types, etc.)
 *
 * ⚠️ DO NOT EDIT MANUALLY - this file is auto-generated
 */

import type { components, operations } from "../openapi/corridors.openapi.types";

// ============================================================================
// Re-export all generated types
// ============================================================================
// Note: components and operations are exported here but should be accessed via namespace
// in main index.ts to avoid duplicate export errors (e.g., blockchain.types.components)

export type { components, operations };


// ============================================================================
// Convenient Type Aliases for Schemas
// ============================================================================

export type Corridor = components["schemas"]["Corridor"];
export type CorridorId = components["schemas"]["CorridorId"];
export type CorridorLicensingUpdate = components["schemas"]["CorridorLicensingUpdate"];
export type CorridorListData = components["schemas"]["CorridorListData"];
export type CorridorStatus = components["schemas"]["CorridorStatus"];
export type VehicleClass = components["schemas"]["VehicleClass"];
export type CorridorPauseRequest = components["schemas"]["CorridorPauseRequest"];
export type CorridorResumeRequest = components["schemas"]["CorridorResumeRequest"];


// ============================================================================
// Operation Input Types (Request Bodies)
// ============================================================================

// These types represent the input data for create/update operations

export type PauseCorridorRequestInput = NonNullable<operations["pauseCorridor"]["requestBody"]>["content"]["application/json"];
export type ResumeCorridorRequestInput = NonNullable<operations["resumeCorridor"]["requestBody"]>["content"]["application/json"];
export type UpdateCorridorLicensingRequestInput = NonNullable<operations["updateCorridorLicensing"]["requestBody"]>["content"]["application/json"];
export type UpdateCorridorLicensingRequest = UpdateCorridorLicensingRequestInput;


// ============================================================================
// Operation Parameter Types (Query/Path Parameters)
// ============================================================================

// These types represent parameters for operations without request bodies.
// Aligned with get_input_schema_or_type_name for consistent naming across generators.

export type ListCorridorsParams = NonNullable<operations["listCorridors"]["parameters"]["query"]>;
export type GetCorridorParams = operations["getCorridor"]["parameters"]["path"];
export type PauseCorridorParams = operations["pauseCorridor"]["parameters"]["path"];
export type ResumeCorridorParams = operations["resumeCorridor"]["parameters"]["path"];
export type UpdateCorridorLicensingParams = operations["updateCorridorLicensing"]["parameters"]["path"];


// ============================================================================
// Operation Response Types
// ============================================================================

// These types are used by handlers for type-safe response envelopes

export type ListCorridorsResponse = operations["listCorridors"]["responses"]["200"]["content"]["application/json"];
export type GetCorridorResponse = operations["getCorridor"]["responses"]["200"]["content"]["application/json"];
export type PauseCorridorResponse = operations["pauseCorridor"]["responses"]["200"]["content"]["application/json"];
export type ResumeCorridorResponse = operations["resumeCorridor"]["responses"]["200"]["content"]["application/json"];
export type UpdateCorridorLicensingResponse = operations["updateCorridorLicensing"]["responses"]["200"]["content"]["application/json"];


