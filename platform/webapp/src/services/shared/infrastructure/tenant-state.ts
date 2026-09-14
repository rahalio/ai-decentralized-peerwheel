export function getEffectiveOrgId(): string {
  if (typeof window === 'undefined') return 'tnt_demo';
  return window.localStorage.getItem('peerwheel_tenant_id') || 'tnt_demo';
}
