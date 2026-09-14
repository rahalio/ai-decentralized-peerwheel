/**
 * Disputes Domain Types
 *
 * Auto-generated from OpenAPI spec
 * Generator: types-generator v2.0.0
 *
 * This file re-exports types from generated OpenAPI types and adds
 * convenient type aliases for handlers (response types, etc.)
 *
 * ⚠️ DO NOT EDIT MANUALLY - this file is auto-generated
 */

import type { components, operations } from "../openapi/disputes.openapi.types";

// ============================================================================
// Domain Types Export - Domain-specific types only (excludes components/operations)
// ============================================================================
// This file exports domain-specific types for use in main index.ts
// components and operations are NOT exported here to avoid duplicate export errors
// Access components/operations via namespace: domain.types.components

// ============================================================================
// Convenient Type Aliases for Schemas
// ============================================================================

export type Dispute = components["schemas"]["Dispute"];
export type DisputeCasePack = components["schemas"]["DisputeCasePack"];
export type DisputeCreate = components["schemas"]["DisputeCreate"];
export type DisputeEvidence = components["schemas"]["DisputeEvidence"];
export type DisputeId = components["schemas"]["DisputeId"];
export type DisputeListData = components["schemas"]["DisputeListData"];
export type DisputeReason = components["schemas"]["DisputeReason"];
export type DisputeStatus = components["schemas"]["DisputeStatus"];
export type DisputeExtendRequest = components["schemas"]["DisputeExtendRequest"];
export type DisputeResolveRequest = components["schemas"]["DisputeResolveRequest"];
export type Export = operations["exportDisputeCasePack"]["responses"]["200"]["content"]["application/json"]["data"];


// ============================================================================
// Operation Input Types (Request Bodies)
// ============================================================================

// These types represent the input data for create/update operations

export type OpenDisputeRequestInput = NonNullable<operations["openDispute"]["requestBody"]>["content"]["application/json"];
export type ResolveDisputeRequestInput = NonNullable<operations["resolveDispute"]["requestBody"]>["content"]["application/json"];
export type ExtendDisputeRequestInput = NonNullable<operations["extendDispute"]["requestBody"]>["content"]["application/json"];


// ============================================================================
// Operation Parameter Types (Query/Path Parameters)
// ============================================================================

// These types represent parameters for operations without request bodies.
// Aligned with get_input_schema_or_type_name for consistent naming across generators.

export type ListDisputesParams = NonNullable<operations["listDisputes"]["parameters"]["query"]>;
export type GetDisputeParams = operations["getDispute"]["parameters"]["path"];
export type ResolveDisputeParams = operations["resolveDispute"]["parameters"]["path"];
export type ExtendDisputeParams = operations["extendDispute"]["parameters"]["path"];
export type ExportDisputeCasePackParams = operations["exportDisputeCasePack"]["parameters"]["path"];


// ============================================================================
// Operation Response Types
// ============================================================================

// These types are used by handlers for type-safe response envelopes

export type ListDisputesResponse = operations["listDisputes"]["responses"]["200"]["content"]["application/json"];
export type OpenDisputeResponse = operations["openDispute"]["responses"]["201"]["content"]["application/json"];
export type GetDisputeResponse = operations["getDispute"]["responses"]["200"]["content"]["application/json"];
export type ResolveDisputeResponse = operations["resolveDispute"]["responses"]["200"]["content"]["application/json"];
export type ExtendDisputeResponse = operations["extendDispute"]["responses"]["200"]["content"]["application/json"];
export type ExportDisputeCasePackResponse = operations["exportDisputeCasePack"]["responses"]["200"]["content"]["application/json"];


