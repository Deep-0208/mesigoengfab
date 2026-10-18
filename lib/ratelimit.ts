// Per-instance sliding window. Good enough to blunt form flooding on a single
// serverless instance; swap for a shared store (e.g. Upstash) if abuse appears.
const store = new Map<string, number[]>();

export function allow(key: string, limit: number, windowMs: number): boolean {
  const now = Date.now();
  const hits = (store.get(key) ?? []).filter((t) => now - t < windowMs);
  const ok = hits.length < limit;
  if (ok) hits.push(now);
  store.set(key, hits);
  return ok;
}
