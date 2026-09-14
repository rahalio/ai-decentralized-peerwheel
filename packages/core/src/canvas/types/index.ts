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
// Re-export all generated types
// ============================================================================
// Note: components and operations are exported here but should be accessed via namespace
// in main index.ts to avoid duplicate export errors (e.g., blockchain.types.components)

export type { components, operations };


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


