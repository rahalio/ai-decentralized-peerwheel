export function unwrapDataEnvelope<T>(payload: unknown): T {
  if (payload && typeof payload === 'object' && 'data' in (payload as object)) {
    return (payload as { data: T }).data;
  }
  return payload as T;
}

export function validateApiResponse<T>(
  schema: { parse: (v: unknown) => T } | undefined,
  data: unknown
): T {
  if (!schema) return data as T;
  return schema.parse(data);
}

export function formatValidationError(err: unknown): string {
  if (err instanceof Error) return err.message;
  return 'Validation failed';
}
