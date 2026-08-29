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

// Default to RoyaleAPI proxy (128.199.220.7) for zero-config Vercel + Local compatibility
const BASE_URL = process.env.CLASH_API_BASE_URL || "https://cocproxy.royaleapi.dev/v1";
const API_TOKEN = process.env.CLASH_API_TOKEN;

// Rate limit: max requests per minute per instance
const RATE_LIMIT_PER_MINUTE = 30;
const RATE_LIMIT_KEY = "coc_api_rate_limit";

// ─── Internal fetch helper ────────────────────────────────────

async function cocFetch<T>(path: string): Promise<CocApiResult<T>> {
  if (!API_TOKEN || API_TOKEN.includes("your_clash_api_token_here")) {
    return {
      success: false,
      error: { reason: "Configuration error", message: "CLASH_API_TOKEN tanımlanmamış veya geçersiz." },
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
        error: { reason: "rate_limit", message: "Çok fazla istek yapıldı. Lütfen biraz bekleyin." },
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
        Authorization: `Bearer ${API_TOKEN.trim()}`,
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

      const reason = errorBody.reason ?? mapStatusToReason(response.status);
      const message = errorBody.message ?? response.statusText;

      return {
        success: false,
        error: {
          reason,
          message: `${reason}: ${message} (Hedef URL: ${url})`,
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
        message: error instanceof Error ? error.message : "Ağ bağlantı hatası",
      },
      statusCode: 0,
    };
  }
}

function mapStatusToReason(status: number): string {
  switch (status) {
    case 400: return "bad_request";
    case 403: return "accessDenied";
    case 404: return "not_found";
    case 429: return "throttled";
    case 500: return "server_error";
    case 503: return "service_unavailable";
    default: return `http_${status}`;
  }
}

// ─── Public API functions ─────────────────────────────────────

export async function fetchPlayer(tag: string): Promise<CocApiResult<CocPlayer>> {
  const encoded = encodeURIComponent(tag.startsWith("#") ? tag : `#${tag}`);
  return cocFetch<CocPlayer>(`/players/${encoded}`);
}

export async function fetchClan(tag: string): Promise<CocApiResult<CocClan>> {
  const encoded = encodeURIComponent(tag.startsWith("#") ? tag : `#${tag}`);
  return cocFetch<CocClan>(`/clans/${encoded}`);
}

export async function fetchCurrentWar(clanTag: string): Promise<CocApiResult<CocCurrentWar>> {
  const encoded = encodeURIComponent(clanTag.startsWith("#") ? clanTag : `#${clanTag}`);
  return cocFetch<CocCurrentWar>(`/clans/${encoded}/currentwar`);
}

export async function fetchCwlGroup(clanTag: string): Promise<CocApiResult<unknown>> {
  const encoded = encodeURIComponent(clanTag.startsWith("#") ? clanTag : `#${clanTag}`);
  return cocFetch<unknown>(`/clans/${encoded}/currentwar/leaguegroup`);
}

export async function fetchCapitalRaidSeasons(clanTag: string): Promise<CocApiResult<{ items: CocCapitalRaidSeason[] }>> {
  const encoded = encodeURIComponent(clanTag.startsWith("#") ? clanTag : `#${clanTag}`);
  return cocFetch<{ items: CocCapitalRaidSeason[] }>(`/clans/${encoded}/capitalraidseasons?limit=5`);
}

// ─── User-friendly error messages ────────────────────────────

export function getApiErrorMessage(reason: string, type: "player" | "clan" = "player", rawMessage?: string): string {
  const reasonLower = (reason || "").toLowerCase();

  if (reasonLower.includes("not_found") || reasonLower.includes("notfound")) {
    return type === "player"
      ? "Bu oyuncu bulunamadı. Tag'i kontrol edin (# ve harfler/sayılar)."
      : "Bu klan bulunamadı. Tag'i kontrol edin.";
  }

  if (reasonLower.includes("accessdenied") || reasonLower.includes("forbidden") || reasonLower.includes("403")) {
    return `API Anahtarı IP Kısıtlaması Hatası (HTTP 403 Access Denied): Clash of Clans API token'ınız istek atılan IP adresi ile eşleşmiyor. [Detay: ${rawMessage || reason}]`;
  }

  if (reasonLower.includes("throttled") || reasonLower.includes("rate_limit") || reasonLower.includes("429")) {
    return "Çok fazla istek yapıldı. Lütfen 1 dakika bekleyip tekrar deneyin.";
  }

  if (reasonLower.includes("configuration error")) {
    return "API Token Yapılandırma Hatası: .env.local veya Vercel ortam değişkenlerinde CLASH_API_TOKEN tanımlı değil.";
  }

  return rawMessage
    ? `API Hatası: ${rawMessage}`
    : `API Bağlantı Hatası (${reason}). Lütfen IP adresinizi ve API Token'ınızı kontrol edin.`;
}
