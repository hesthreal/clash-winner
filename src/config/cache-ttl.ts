/**
 * Cache TTL configuration.
 * All values in seconds. Adjustable via environment variables.
 */

export const CACHE_TTL = {
  // Player profile cache — CoC API allows profile to change, 5min is reasonable
  player: parseInt(process.env.CACHE_TTL_PLAYER ?? "300"),

  // Clan profile — slightly longer
  clan: parseInt(process.env.CACHE_TTL_CLAN ?? "600"),

  // Active war — short TTL since attacks happen rapidly
  currentWar: parseInt(process.env.CACHE_TTL_WAR ?? "120"),

  // Ended war — can cache longer
  warEnded: 30 * 60,

  // CWL — changes daily during season
  cwl: 10 * 60,

  // Capital raid seasons
  capitalRaid: 30 * 60,

  // Meta data — very stable, changes only with game updates
  meta: parseInt(process.env.CACHE_TTL_META ?? "86400"),

  // Game static data — changes only with patches
  gameData: 7 * 24 * 60 * 60,

  // AI explanations — tied to player state
  aiExplanation: 30 * 60,
} as const;

export type CacheTtlKey = keyof typeof CACHE_TTL;
