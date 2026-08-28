/**
 * Player Service — Business logic layer
 * Orchestrates: API fetch → cache → normalize → analyze → return
 */

import { fetchPlayer, getApiErrorMessage } from "@/lib/coc-api/client";
import { getCached, cacheKey } from "@/lib/cache/redis";
import { CACHE_TTL } from "@/config/cache-ttl";
import { calculateOverallProgress } from "@/lib/analytics/progress";
import { calculateRushScore } from "@/lib/analytics/rush";
import { validatePlayerTag } from "@/lib/validation/tags";
import type { PlayerAnalysis } from "@/types/analytics";

export type PlayerServiceResult = 
  | {
      success: true;
      analysis: PlayerAnalysis;
    }
  | {
      success: false;
      error: string;
      statusCode?: number;
    };

export async function analyzePlayer(rawTag: string): Promise<PlayerServiceResult> {
  // Validate tag
  const validation = validatePlayerTag(rawTag);
  if (!validation.valid || !validation.normalized) {
    return { success: false, error: validation.error ?? "Geçersiz tag formatı", statusCode: 400 };
  }

  const tag = validation.normalized;
  const key = cacheKey.player(tag);

  try {
    const result = await getCached(
      key,
      () => fetchPlayer(tag),
      CACHE_TTL.player
    );

    const apiResult = result.data;

    if (!apiResult.success) {
      return {
        success: false,
        error: getApiErrorMessage(apiResult.error.reason, "player"),
        statusCode: apiResult.statusCode,
      };
    }

    const player = apiResult.data;

    // Run analytics
    const progress = calculateOverallProgress(player);
    const rush = calculateRushScore(player);

    const analysis: PlayerAnalysis = {
      player,
      progress,
      rush,
      warReadiness: {
        score: 0,
        heroScore: 0,
        equipmentScore: 0,
        troopScore: 0,
        spellScore: 0,
        label: "AVERAGE",
      },
      upgradePriorities: [],
      analyzedAt: new Date(),
      cached: result.cached,
      cachedAt: result.cachedAt,
      gameVersion: "2026.08",
    };

    return { success: true, analysis };
  } catch (error) {
    console.error("[PlayerService] Error analyzing player:", error);
    return { success: false, error: "Analiz sırasında bir hata oluştu. Lütfen tekrar dene.", statusCode: 500 };
  }
}
