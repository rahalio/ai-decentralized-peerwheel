const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, '') ||
  'http://127.0.0.1:4000';

function authHeaders(): HeadersInit {
  if (typeof window === 'undefined') return {};
  const token = window.localStorage.getItem('peerwheel_access_token');
  const apiKey =
    window.localStorage.getItem('peerwheel_api_key') ||
    'peerwheel_demo_local_dev_key';
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  if (token) headers.Authorization = `Bearer ${token}`;
  if (apiKey) headers['X-API-Key'] = apiKey;
  return headers;
}

type RequestOpts = {
  body?: unknown;
  headers?: HeadersInit;
  signal?: AbortSignal;
};

async function request<T = unknown>(
  method: string,
  path: string,
  options?: RequestOpts
): Promise<{ data: T }> {
  const res = await fetch(`${API_BASE}${path}`, {
    method,
    headers: { ...authHeaders(), ...(options?.headers || {}) },
    body: options?.body !== undefined ? JSON.stringify(options.body) : undefined,
    signal: options?.signal,
  });
  if (res.status === 204) return { data: undefined as T };
  const json = await res.json().catch(() => ({}));
  if (!res.ok) {
    const err = new Error(
      (json as { detail?: string; message?: string }).detail ||
        (json as { message?: string }).message ||
        `HTTP ${res.status}`
    ) as Error & { data?: unknown; status?: number };
    err.data = json;
    err.status = res.status;
    throw err;
  }
  return { data: json as T };
}

export const apiClient = {
  get: <T = unknown>(path: string, opts?: RequestOpts) =>
    request<T>('GET', path, opts),
  post: <T = unknown>(path: string, opts?: RequestOpts) =>
    request<T>('POST', path, opts),
  patch: <T = unknown>(path: string, opts?: RequestOpts) =>
    request<T>('PATCH', path, opts),
  put: <T = unknown>(path: string, opts?: RequestOpts) =>
    request<T>('PUT', path, opts),
  delete: <T = unknown>(path: string, opts?: RequestOpts) =>
    request<T>('DELETE', path, opts),
};
