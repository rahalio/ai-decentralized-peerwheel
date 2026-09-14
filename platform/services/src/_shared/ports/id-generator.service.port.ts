/**
 * IdGeneratorService Port — Peerwheel domain prefixes.
 */

import type { DomainCode } from '@peerwheel/core/_shared/helpers';

export interface IdGeneratorService {
  tntId(): string;
  keyId(): string;
  idnId(): string;
  autId(): string;
  vehId(): string;
  avwId(): string;
  ridId(): string;
  attId(): string;
  stlId(): string;
  dspId(): string;
  cvsId(): string;
  corId(): string;
  generateIdForDomain(domainCode: DomainCode): string;
}
