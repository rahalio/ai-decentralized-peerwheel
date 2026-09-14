/**
 * Attestations Domain Types
 *
 * Auto-generated from OpenAPI spec
 * Generator: types-generator v2.0.0
 *
 * This file re-exports types from generated OpenAPI types and adds
 * convenient type aliases for handlers (response types, etc.)
 *
 * ⚠️ DO NOT EDIT MANUALLY - this file is auto-generated
 */

import type { components, operations } from "../openapi/attestations.openapi.types";

// ============================================================================
// Domain Types Export - Domain-specific types only (excludes components/operations)
// ============================================================================
// This file exports domain-specific types for use in main index.ts
// components and operations are NOT exported here to avoid duplicate export errors
// Access components/operations via namespace: domain.types.components

// ============================================================================
// Convenient Type Aliases for Schemas
// ============================================================================

export type AttestationId = components["schemas"]["AttestationId"];
export type AttestationListData = components["schemas"]["AttestationListData"];
export type AttestationPhase = components["schemas"]["AttestationPhase"];
export type AttestationResult = components["schemas"]["AttestationResult"];
export type IntegrityAttestation = components["schemas"]["IntegrityAttestation"];
export type IntegrityAttestationCreate = components["schemas"]["IntegrityAttestationCreate"];
export type PurposeTag = components["schemas"]["PurposeTag"];
export type Attestation = operations["listAttestations"]["responses"]["200"]["content"]["application/json"]["data"];


// ============================================================================
// Operation Input Types (Request Bodies)
// ============================================================================

// These types represent the input data for create/update operations

export type SubmitIntegrityAttestationRequestInput = NonNullable<operations["submitIntegrityAttestation"]["requestBody"]>["content"]["application/json"];


// ============================================================================
// Operation Parameter Types (Query/Path Parameters)
// ============================================================================

// These types represent parameters for operations without request bodies.
// Aligned with get_input_schema_or_type_name for consistent naming across generators.

export type ListAttestationsParams = NonNullable<operations["listAttestations"]["parameters"]["query"]>;
export type SubmitIntegrityAttestationParams = operations["submitIntegrityAttestation"]["parameters"]["path"];
export type GetAttestationParams = operations["getAttestation"]["parameters"]["path"];
export type ClearAttestationHoldParams = operations["clearAttestationHold"]["parameters"]["path"];
export type KeepAttestationHoldParams = operations["keepAttestationHold"]["parameters"]["path"];


// ============================================================================
// Operation Response Types
// ============================================================================

// These types are used by handlers for type-safe response envelopes

export type ListAttestationsResponse = operations["listAttestations"]["responses"]["200"]["content"]["application/json"];
export type SubmitIntegrityAttestationResponse = operations["submitIntegrityAttestation"]["responses"]["201"]["content"]["application/json"];
export type GetAttestationResponse = operations["getAttestation"]["responses"]["200"]["content"]["application/json"];
export type ClearAttestationHoldResponse = operations["clearAttestationHold"]["responses"]["200"]["content"]["application/json"];
export type KeepAttestationHoldResponse = operations["keepAttestationHold"]["responses"]["200"]["content"]["application/json"];


