/**
 * Redis cache service using ioredis.
 * Singleton pattern for Next.js hot reload safety.
 */

import Redis from "ioredis";

const globalForRedis = global as unknown as { redis?: Redis };

function createRedisClient(): Redis {
  const client = new Redis(process.env.REDIS_URL ?? "redis://localhost:6379", {
    maxRetriesPerRequest: 3,
    enableReadyCheck: true,
    lazyConnect: true,
    retryStrategy(times) {
      if (times > 5) return null; // Stop retrying after 5 attempts
      return Math.min(times * 100, 2000);
    },
  });

  client.on("error", (err) => {
    // Don't crash the app if Redis is unavailable
    if (process.env.NODE_ENV === "development") {
      console.warn("[Redis] Connection error:", err.message);
    }
  });

  return client;
}

export const redis: Redis =
  globalForRedis.redis ?? createRedisClient();

if (process.env.NODE_ENV !== "production") {
  globalForRedis.redis = redis;
}

// ─── Cache Helpers ───────────────────────────────────────────

/**
 * Get cached data or fetch and cache it.
 * Returns null if Redis is unavailable (graceful degradation).
 */
export async function getCached<T>(
  key: string,
  fetcher: () => Promise<T>,
  ttlSeconds: number
): Promise<{ data: T; cached: boolean; cachedAt?: Date }> {
  try {
    const cached = await redis.get(key);
    if (cached) {
      const parsed = JSON.parse(cached) as { data: T; cachedAt: string };
      return {
        data: parsed.data,
        cached: true,
        cachedAt: new Date(parsed.cachedAt),
      };
    }
  } catch {
    // Redis unavailable — fall through to fetcher
  }

  const data = await fetcher();

  try {
    await redis.setex(
      key,
      ttlSeconds,
      JSON.stringify({ data, cachedAt: new Date().toISOString() })
    );
  } catch {
    // Redis unavailable — just return fresh data
  }

  return { data, cached: false };
}

/**
 * Invalidate a cache key.
 */
export async function invalidateCache(key: string): Promise<void> {
  try {
    await redis.del(key);
  } catch {
    // Ignore
  }
}

/**
 * Build standardized cache keys.
 */
export const cacheKey = {
  player: (tag: string) => `player:${tag.toUpperCase()}`,
  clan: (tag: string) => `clan:${tag.toUpperCase()}`,
  currentWar: (clanTag: string) => `war:${clanTag.toUpperCase()}`,
  cwlGroup: (clanTag: string) => `cwl:${clanTag.toUpperCase()}`,
  capitalRaid: (clanTag: string) => `capital:${clanTag.toUpperCase()}`,
  aiPlayer: (tag: string) => `ai:player:${tag.toUpperCase()}`,
  aiClan: (tag: string) => `ai:clan:${tag.toUpperCase()}`,
};
