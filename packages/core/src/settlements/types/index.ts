/**
 * Settlements Domain Types
 *
 * Auto-generated from OpenAPI spec
 * Generator: types-generator v2.0.0
 *
 * This file re-exports types from generated OpenAPI types and adds
 * convenient type aliases for handlers (response types, etc.)
 *
 * ⚠️ DO NOT EDIT MANUALLY - this file is auto-generated
 */

import type { components, operations } from "../openapi/settlements.openapi.types";

// ============================================================================
// Re-export all generated types
// ============================================================================
// Note: components and operations are exported here but should be accessed via namespace
// in main index.ts to avoid duplicate export errors (e.g., blockchain.types.components)

export type { components, operations };


// ============================================================================
// Convenient Type Aliases for Schemas
// ============================================================================

export type Settlement = components["schemas"]["Settlement"];
export type SettlementId = components["schemas"]["SettlementId"];
export type SettlementListData = components["schemas"]["SettlementListData"];
export type SettlementRail = components["schemas"]["SettlementRail"];
export type SettlementStatus = components["schemas"]["SettlementStatus"];
export type SettlementExecuteRequest = components["schemas"]["SettlementExecuteRequest"];


// ============================================================================
// Operation Input Types (Request Bodies)
// ============================================================================

// These types represent the input data for create/update operations

export type ExecuteSettlementRequestInput = NonNullable<operations["executeSettlement"]["requestBody"]>["content"]["application/json"];
export type RetrySettlementRequestInput = NonNullable<operations["retrySettlement"]["requestBody"]>["content"]["application/json"];


// ============================================================================
// Operation Parameter Types (Query/Path Parameters)
// ============================================================================

// These types represent parameters for operations without request bodies.
// Aligned with get_input_schema_or_type_name for consistent naming across generators.

export type ListSettlementsParams = NonNullable<operations["listSettlements"]["parameters"]["query"]>;
export type GetSettlementParams = operations["getSettlement"]["parameters"]["path"];
export type ExecuteSettlementParams = operations["executeSettlement"]["parameters"]["path"];
export type RetrySettlementParams = operations["retrySettlement"]["parameters"]["path"];


// ============================================================================
// Operation Response Types
// ============================================================================

// These types are used by handlers for type-safe response envelopes

export type ListSettlementsResponse = operations["listSettlements"]["responses"]["200"]["content"]["application/json"];
export type GetSettlementResponse = operations["getSettlement"]["responses"]["200"]["content"]["application/json"];
export type ExecuteSettlementResponse = operations["executeSettlement"]["responses"]["200"]["content"]["application/json"];
export type RetrySettlementResponse = operations["retrySettlement"]["responses"]["200"]["content"]["application/json"];


