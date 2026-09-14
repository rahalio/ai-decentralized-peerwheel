/**
 * ID Generator Service Implementation — Peerwheel prefixes.
 */

import type { DomainCode } from '@peerwheel/core/_shared/helpers';
import { DOMAIN_PREFIX_MAP, isValidDomainId } from '@peerwheel/core';
import { ulid } from 'ulid';
import type { IdGeneratorService } from '@peerwheel/services/_shared';

export function generateIdWithPrefix(prefix: string): string {
  if (!prefix || prefix.length !== 3 || !/^[a-z]{3}$/.test(prefix)) {
    throw new Error(
      `Invalid domain prefix: "${prefix}". Must be exactly 3 lowercase letters.`
    );
  }
  const id = `${prefix}_${ulid().toLowerCase()}`;
  if (!isValidDomainId(id)) {
    throw new Error(`Generated ID "${id}" failed validation.`);
  }
  return id;
}

export class DefaultIdGeneratorService implements IdGeneratorService {
  tntId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.tenant);
  }
  keyId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.apiKey);
  }
  idnId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.identity);
  }
  autId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.auth);
  }
  vehId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.vehicles);
  }
  avwId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.availability);
  }
  ridId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.rides);
  }
  attId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.attestations);
  }
  stlId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.settlements);
  }
  dspId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.disputes);
  }
  cvsId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.canvas);
  }
  corId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.corridors);
  }
  generateIdForDomain(domainCode: DomainCode): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP[domainCode]);
  }
}

let idGeneratorService: DefaultIdGeneratorService | null = null;

export function getIdGeneratorService(): DefaultIdGeneratorService {
  if (!idGeneratorService) {
    idGeneratorService = new DefaultIdGeneratorService();
  }
  return idGeneratorService;
}
