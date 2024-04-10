export type CachingClientRepo = {
  get(key: string): Promise<string | null>;
  setex(key: string, ttl: number, value: string): Promise<"OK">;
}
