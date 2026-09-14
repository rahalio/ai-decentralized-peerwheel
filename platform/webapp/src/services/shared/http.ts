export type ProblemLike = {
  title?: string;
  detail?: string;
  status?: number;
  type?: string;
};

export function formatProblem(err: unknown): string {
  if (!(err instanceof Error)) return 'Unexpected error';
  return err.message;
}

export async function unwrap<T>(promise: Promise<{ data: unknown }>): Promise<T> {
  const res = await promise;
  const payload = res.data;
  if (payload && typeof payload === 'object' && 'data' in (payload as object)) {
    return (payload as { data: T }).data;
  }
  return payload as T;
}

export function asItems(data: unknown): Record<string, unknown>[] {
  if (Array.isArray(data)) return data as Record<string, unknown>[];
  if (data && typeof data === 'object' && Array.isArray((data as { items?: unknown }).items)) {
    return (data as { items: Record<string, unknown>[] }).items;
  }
  return [];
}
