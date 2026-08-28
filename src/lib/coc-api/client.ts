/**
 * Official Clash of Clans API client.
 * - Server-side ONLY (API key never sent to browser)
 * - Rate limiting via Redis
 * - Structured error handling
 * - All tags URL-encoded
 */

import type {
  CocApiResult,
  CocPlayer,
  CocClan,
  CocCurrentWar,
  CocCapitalRaidSeason,
} from "@/types/coc-api";
import { redis } from "@/lib/cache/redis";

const BASE_URL = process.env.CLASH_API_BASE_URL ?? "https://api.clashofclans.com/v1";
const API_TOKEN = process.env.CLASH_API_TOKEN;

// Rate limit: max requests per minute per instance
const RATE_LIMIT_PER_MINUTE = 30;
const RATE_LIMIT_KEY = "coc_api_rate_limit";

// ─── Internal fetch helper ────────────────────────────────────

async function cocFetch<T>(path: string): Promise<CocApiResult<T>> {
  if (!API_TOKEN) {
    return {
      success: false,
      error: { reason: "Configuration error", message: "CLASH_API_TOKEN is not set" },
      statusCode: 500,
    };
  }

  // Check rate limit
  try {
    const current = await redis.incr(RATE_LIMIT_KEY);
    if (current === 1) {
      await redis.expire(RATE_LIMIT_KEY, 60);
    }
    if (current > RATE_LIMIT_PER_MINUTE) {
      return {
        success: false,
        error: { reason: "rate_limit", message: "Too many requests to Clash API. Please try again in a moment." },
        statusCode: 429,
      };
    }
  } catch {
    // If Redis is down, allow the request (graceful degradation)
  }

  try {
    const url = `${BASE_URL}${path}`;
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
        Accept: "application/json",
      },
      next: { revalidate: 0 }, // Always fresh from CoC API; we handle caching ourselves
    });

    if (!response.ok) {
      let errorBody: { reason?: string; message?: string } = {};
      try {
        errorBody = await response.json();
      } catch {
        // Non-JSON error body
      }

      return {
        success: false,
        error: {
          reason: errorBody.reason ?? mapStatusToReason(response.status),
          message: errorBody.message ?? response.statusText,
        },
        statusCode: response.status,
      };
    }

    const data = (await response.json()) as T;
    return { success: true, data, cached: false };
  } catch (error) {
    return {
      success: false,
      error: {
        reason: "network_error",
        message: error instanceof Error ? error.message : "Network request failed",
      },
      statusCode: 0,
    };
  }
}

function mapStatusToReason(status: number): string {
  switch (status) {
    case 400: return "bad_request";
    case 403: return "forbidden";
    case 404: return "not_found";
    case 429: return "throttled";
    case 500: return "server_error";
    case 503: return "service_unavailable";
    default: return "unknown_error";
  }
}

// ─── Public API functions ─────────────────────────────────────

/**
 * Fetch a player profile by tag.
 * Tag must start with # (we URL-encode it here).
 */
export async function fetchPlayer(tag: string): Promise<CocApiResult<CocPlayer>> {
  const encoded = encodeURIComponent(tag.startsWith("#") ? tag : `#${tag}`);
  return cocFetch<CocPlayer>(`/players/${encoded}`);
}

/**
 * Fetch a clan by tag.
 */
export async function fetchClan(tag: string): Promise<CocApiResult<CocClan>> {
  const encoded = encodeURIComponent(tag.startsWith("#") ? tag : `#${tag}`);
  return cocFetch<CocClan>(`/clans/${encoded}`);
}

/**
 * Fetch current war for a clan.
 * Returns notInWar state if clan is not in war.
 * Returns 403 if war log is private.
 */
export async function fetchCurrentWar(clanTag: string): Promise<CocApiResult<CocCurrentWar>> {
  const encoded = encodeURIComponent(clanTag.startsWith("#") ? clanTag : `#${clanTag}`);
  return cocFetch<CocCurrentWar>(`/clans/${encoded}/currentwar`);
}

/**
 * Fetch CWL league group for a clan.
 * Only available during CWL season.
 */
export async function fetchCwlGroup(clanTag: string): Promise<CocApiResult<unknown>> {
  const encoded = encodeURIComponent(clanTag.startsWith("#") ? clanTag : `#${clanTag}`);
  return cocFetch<unknown>(`/clans/${encoded}/currentwar/leaguegroup`);
}

/**
 * Fetch capital raid seasons.
 * Returns the most recent seasons.
 */
export async function fetchCapitalRaidSeasons(clanTag: string): Promise<CocApiResult<{ items: CocCapitalRaidSeason[] }>> {
  const encoded = encodeURIComponent(clanTag.startsWith("#") ? clanTag : `#${clanTag}`);
  return cocFetch<{ items: CocCapitalRaidSeason[] }>(`/clans/${encoded}/capitalraidseasons?limit=5`);
}

// ─── User-friendly error messages ────────────────────────────

export function getApiErrorMessage(reason: string, type: "player" | "clan" = "player"): string {
  switch (reason) {
    case "not_found":
      return type === "player"
        ? "Bu oyuncu bulunamadı. Tag'i kontrol et: büyük harf ve # ile başlamalı."
        : "Bu klan bulunamadı. Tag'i kontrol et.";
    case "forbidden":
      return "Bu veriye erişim yetkiniz yok (war log kapalı olabilir).";
    case "throttled":
    case "rate_limit":
      return "Çok fazla istek yapıldı. Lütfen bir dakika bekleyip tekrar dene.";
    case "network_error":
      return "Sunucuya bağlanılamadı. İnternet bağlantını kontrol et.";
    case "Configuration error":
      return "Sistem yapılandırma hatası. Lütfen yöneticiyle iletişime geç.";
    default:
      return "Bir hata oluştu. Lütfen tekrar dene.";
  }
}
