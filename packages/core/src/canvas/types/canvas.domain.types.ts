/**
 * Canvas Domain Types
 *
 * Auto-generated from OpenAPI spec
 * Generator: types-generator v2.0.0
 *
 * This file re-exports types from generated OpenAPI types and adds
 * convenient type aliases for handlers (response types, etc.)
 *
 * ⚠️ DO NOT EDIT MANUALLY - this file is auto-generated
 */

import type { components, operations } from "../openapi/canvas.openapi.types";

// ============================================================================
// Domain Types Export - Domain-specific types only (excludes components/operations)
// ============================================================================
// This file exports domain-specific types for use in main index.ts
// components and operations are NOT exported here to avoid duplicate export errors
// Access components/operations via namespace: domain.types.components

// ============================================================================
// Convenient Type Aliases for Schemas
// ============================================================================

export type CanvasFit = components["schemas"]["CanvasFit"];
export type CanvasFitId = components["schemas"]["CanvasFitId"];
export type CanvasFitUpdate = components["schemas"]["CanvasFitUpdate"];
export type CanvasRevision = components["schemas"]["CanvasRevision"];
export type ChannelMetric = components["schemas"]["ChannelMetric"];
export type CostRevenuePlan = components["schemas"]["CostRevenuePlan"];


// ============================================================================
// Operation Input Types (Request Bodies)
// ============================================================================

// These types represent the input data for create/update operations

export type UpdateCanvasFitRequestInput = NonNullable<operations["updateCanvasFit"]["requestBody"]>["content"]["application/json"];
export type UpdateCanvasFitRequest = UpdateCanvasFitRequestInput;



// ============================================================================
// Operation Response Types
// ============================================================================

// These types are used by handlers for type-safe response envelopes

export type GetCanvasFitResponse = operations["getCanvasFit"]["responses"]["200"]["content"]["application/json"];
export type UpdateCanvasFitResponse = operations["updateCanvasFit"]["responses"]["200"]["content"]["application/json"];


