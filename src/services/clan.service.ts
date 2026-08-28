/**
 * Clan Service — Business logic for Clan Analyzer
 * Fetches clan profile, war state, capital data & calculates clan power score
 */

import { fetchClan, fetchCurrentWar, getApiErrorMessage } from "@/lib/coc-api/client";
import { getCached, cacheKey } from "@/lib/cache/redis";
import { CACHE_TTL } from "@/config/cache-ttl";
import { validateClanTag } from "@/lib/validation/tags";
import type { CocClan, CocCurrentWar } from "@/types/coc-api";

export interface ClanPowerScore {
  overall: number;          // 0-100
  memberCount: number;      // 0-50
  totalPoints: number;
  warWinRate: number;       // %
  thDistribution: Record<string, number>;
  activityScore: number;
}

export interface ClanAnalysisResult {
  clan: CocClan;
  currentWar?: CocCurrentWar;
  powerScore: ClanPowerScore;
  analyzedAt: Date;
  cached: boolean;
  cachedAt?: Date;
}

export type ClanServiceResponse = 
  | { success: true; analysis: ClanAnalysisResult }
  | { success: false; error: string; statusCode?: number };

export async function analyzeClan(rawTag: string): Promise<ClanServiceResponse> {
  const validation = validateClanTag(rawTag);
  if (!validation.valid || !validation.normalized) {
    return { success: false, error: validation.error ?? "Geçersiz klan tag'i", statusCode: 400 };
  }

  const tag = validation.normalized;
  const key = cacheKey.clan(tag);

  try {
    const result = await getCached(
      key,
      async () => {
        const clanRes = await fetchClan(tag);
        if (!clanRes.success) return { success: false as const, error: clanRes.error, statusCode: clanRes.statusCode };

        const warRes = await fetchCurrentWar(tag);
        const currentWar = warRes.success ? warRes.data : undefined;

        return {
          success: true as const,
          clan: clanRes.data,
          currentWar,
        };
      },
      CACHE_TTL.clan
    );

    if (!result.data.success) {
      return {
        success: false,
        error: getApiErrorMessage(result.data.error.reason, "clan"),
        statusCode: result.data.statusCode,
      };
    }

    const { clan, currentWar } = result.data;

    // Calculate Town Hall distribution from member list
    const thDistribution: Record<string, number> = {};
    if (clan.memberList) {
      for (const m of clan.memberList) {
        const th = m.townHallLevel || 1;
        thDistribution[th] = (thDistribution[th] || 0) + 1;
      }
    }

    // Calculate War Win Rate
    const totalWars = (clan.warWins || 0) + (clan.warLosses || 0) + (clan.warTies || 0);
    const warWinRate = totalWars > 0 ? Math.round(((clan.warWins || 0) / totalWars) * 100) : 0;

    // Calculate Clan Power Score (0-100)
    // Weighted by clan level, points, member count, war win streak
    const levelScore = Math.min(30, (clan.clanLevel / 30) * 30);
    const memberScore = Math.min(20, (clan.members / 50) * 20);
    const winStreakBonus = Math.min(15, (clan.warWinStreak || 0) * 2);
    const pointsScore = Math.min(35, ((clan.clanPoints || 0) / 70000) * 35);

    const overallPower = Math.min(100, Math.round(levelScore + memberScore + winStreakBonus + pointsScore));

    const powerScore: ClanPowerScore = {
      overall: overallPower,
      memberCount: clan.members,
      totalPoints: clan.clanPoints || 0,
      warWinRate,
      thDistribution,
      activityScore: Math.min(100, Math.round((clan.members / 50) * 80 + (clan.clanLevel > 10 ? 20 : 10))),
    };

    return {
      success: true,
      analysis: {
        clan,
        currentWar,
        powerScore,
        analyzedAt: new Date(),
        cached: result.cached,
        cachedAt: result.cachedAt,
      },
    };
  } catch (error) {
    console.error("[ClanService] Error analyzing clan:", error);
    return { success: false, error: "Klan analizi sırasında bir hata oluştu.", statusCode: 500 };
  }
}
