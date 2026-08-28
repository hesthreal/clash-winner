/**
 * Static Game Data — TH Max Levels (August 2026, TH18 is max)
 * 
 * DATA SOURCES:
 * - Official CoC API maxLevel fields (verified against API responses)
 * - Community databases: clashrecord.com, coc.guide (cross-referenced)
 * 
 * This data is maintained separately from the database for performance.
 * For production, this should be seeded into the DB via the seed script.
 * 
 * IMPORTANT: Update this file with each game patch.
 * Current game version: August 2026 (TH18 era)
 */

// ─── Heroes Max Levels by TH ─────────────────────────────────
// Key = TH level, Value = max hero level at that TH

export const HERO_MAX_LEVELS: Record<string, Record<number, number>> = {
  "Barbarian King": {
    9: 10, 10: 20, 11: 30, 12: 40, 13: 50, 14: 65, 15: 75, 16: 85, 17: 100, 18: 110,
  },
  "Archer Queen": {
    9: 10, 10: 20, 11: 30, 12: 40, 13: 50, 14: 65, 15: 75, 16: 85, 17: 100, 18: 110,
  },
  "Grand Warden": {
    11: 5, 12: 15, 13: 25, 14: 40, 15: 50, 16: 60, 17: 70, 18: 85,
  },
  "Royal Champion": {
    13: 5, 14: 25, 15: 35, 16: 40, 17: 50, 18: 55,
  },
  "Minion Prince": {
    17: 40, 18: 95,
  },
  "Dragon Duke": {
    18: 25,
  },
};

// ─── Troop Max Levels by TH ──────────────────────────────────
// API returns name + maxLevel; this is our reference for TH-specific maxes

export const TROOP_MAX_LEVELS: Record<string, Record<number, number>> = {
  // Home Village — Elixir Troops
  "Barbarian":     { 1:2, 2:3, 3:4, 4:5, 5:6, 6:7, 7:8, 8:9, 9:10, 10:11, 11:12, 12:13, 13:14, 14:15, 15:16, 16:17, 17:18, 18:19 },
  "Archer":        { 1:2, 2:3, 3:4, 4:5, 5:6, 6:7, 7:8, 8:9, 9:10, 10:11, 11:12, 12:13, 13:14, 14:15, 15:16, 16:17, 17:18, 18:19 },
  "Giant":         { 1:1, 2:2, 3:3, 4:4, 5:5, 6:6, 7:7, 8:8, 9:9, 10:10, 11:11, 12:12, 13:13, 14:14, 15:15, 16:16, 17:17, 18:18 },
  "Goblin":        { 1:1, 2:2, 3:3, 4:4, 5:5, 6:6, 7:7, 8:8, 9:9, 10:10, 11:11, 12:12, 13:13, 14:14, 15:15, 16:16, 17:17, 18:18 },
  "Wall Breaker":  { 2:2, 3:3, 4:4, 5:5, 6:6, 7:7, 8:8, 9:9, 10:10, 11:11, 12:12, 13:13, 14:14, 15:15, 16:16, 17:17, 18:18 },
  "Balloon":       { 2:3, 3:4, 4:5, 5:6, 6:7, 7:8, 8:9, 9:10, 10:11, 11:12, 12:13, 13:14, 14:15, 15:16, 16:17, 17:18, 18:19 },
  "Wizard":        { 3:2, 4:3, 5:4, 6:5, 7:6, 8:7, 9:8, 10:9, 11:10, 12:11, 13:12, 14:13, 15:14, 16:15, 17:16, 18:17 },
  "Healer":        { 3:1, 4:2, 5:3, 6:4, 7:5, 8:6, 9:7, 10:8, 11:9, 12:10, 13:11, 14:12, 15:13, 16:14, 17:15, 18:16 },
  "Dragon":        { 4:3, 5:4, 6:5, 7:6, 8:7, 9:8, 10:9, 11:10, 12:11, 13:12, 14:13, 15:14, 16:15, 17:16, 18:17 },
  "P.E.K.K.A":     { 8:5, 9:6, 10:7, 11:8, 12:9, 13:10, 14:11, 15:12, 16:13, 17:14, 18:15 },
  "Baby Dragon":   { 9:5, 10:6, 11:7, 12:8, 13:9, 14:10, 15:11, 16:12, 17:13, 18:14 },
  "Miner":         { 10:5, 11:6, 12:7, 13:8, 14:9, 15:10, 16:11, 17:12, 18:13 },
  "Electro Dragon":{ 11:4, 12:5, 13:6, 14:7, 15:8, 16:9, 17:10, 18:11 },
  "Yeti":          { 12:3, 13:4, 14:5, 15:6, 16:7, 17:8, 18:9 },
  "Dragon Rider":  { 13:2, 14:4, 15:5, 16:6, 17:7, 18:8 },
  "Electro Titan": { 14:3, 15:4, 16:5, 17:6, 18:7 },
  "Root Rider":    { 15:3, 16:4, 17:5, 18:6 },
  "Thrower":       { 16:3, 17:4, 18:5 },

  // Home Village — Dark Elixir Troops
  "Minion":        { 7:4, 8:5, 9:6, 10:7, 11:8, 12:9, 13:10, 14:11, 15:12, 16:13, 17:14, 18:15 },
  "Hog Rider":     { 7:5, 8:6, 9:7, 10:8, 11:9, 12:10, 13:11, 14:12, 15:13, 16:14, 17:15, 18:16 },
  "Valkyrie":      { 8:4, 9:5, 10:6, 11:7, 12:8, 13:9, 14:10, 15:11, 16:12, 17:13, 18:14 },
  "Golem":         { 8:3, 9:5, 10:6, 11:7, 12:8, 13:9, 14:10, 15:11, 16:12, 17:13, 18:14 },
  "Witch":         { 9:3, 10:4, 11:5, 12:6, 13:7, 14:8, 15:9, 16:10, 17:11, 18:12 },
  "Lava Hound":    { 9:3, 10:4, 11:5, 12:6, 13:7, 14:8, 15:9, 16:10, 17:11, 18:12 },
  "Bowler":        { 10:3, 11:4, 12:5, 13:6, 14:7, 15:8, 16:9, 17:10, 18:11 },
  "Ice Golem":     { 11:5, 12:6, 13:7, 14:8, 15:9, 16:10, 17:11, 18:12 },
  "Headhunter":    { 12:4, 13:5, 14:6, 15:7, 16:8, 17:9, 18:10 },
  "Apprentice Warden": { 13:5, 14:7, 15:9, 16:11, 17:13, 18:15 },
  "Druid":         { 14:4, 15:6, 16:8, 17:10, 18:12 },
};

// ─── Spell Max Levels by TH ──────────────────────────────────

export const SPELL_MAX_LEVELS: Record<string, Record<number, number>> = {
  // Elixir Spells
  "Lightning Spell":  { 5:6, 6:7, 7:8, 8:9, 9:10, 10:10, 11:11, 12:12, 13:13, 14:14, 15:15, 16:16, 17:17, 18:18 },
  "Healing Spell":    { 5:5, 6:6, 7:7, 8:8, 9:9, 10:9, 11:10, 12:11, 13:12, 14:13, 15:14, 16:15, 17:16, 18:17 },
  "Rage Spell":       { 5:4, 6:5, 7:6, 8:7, 9:8, 10:8, 11:9, 12:10, 13:11, 14:12, 15:13, 16:14, 17:15, 18:16 },
  "Freeze Spell":     { 7:4, 8:5, 9:6, 10:7, 11:8, 12:9, 13:10, 14:11, 15:12, 16:13, 17:14, 18:15 },
  "Earthquake Spell": { 7:4, 8:5, 9:5, 10:5, 11:5, 12:5, 13:5, 14:5, 15:5, 16:5, 17:5, 18:5 },
  "Haste Spell":      { 9:5, 10:5, 11:5, 12:5, 13:5, 14:5, 15:5, 16:5, 17:5, 18:5 },
  "Clone Spell":      { 9:5, 10:6, 11:7, 12:8, 13:9, 14:10, 15:11, 16:12, 17:13, 18:14 },
  "Invisibility Spell":{ 11:4, 12:5, 13:6, 14:7, 15:8, 16:9, 17:10, 18:11 },
  "Recall Spell":     { 14:5, 15:6, 16:7, 17:8, 18:9 },
  "Revive Spell":     { 15:3, 16:4, 17:5, 18:6 },

  // Dark Spells
  "Poison Spell":     { 8:5, 9:6, 10:7, 11:8, 12:9, 13:10, 14:10, 15:11, 16:12, 17:13, 18:14 },
  "Earthquake Spell (Dark)": { 8:5, 9:5, 10:5, 11:5, 12:5, 13:5, 14:5, 15:5, 16:5, 17:5, 18:5 },
  "Haste Spell (Dark)":{ 9:5, 10:5, 11:5, 12:5, 13:5, 14:5, 15:5, 16:5, 17:5, 18:5 },
  "Bat Spell":        { 10:4, 11:5, 12:6, 13:7, 14:8, 15:9, 16:10, 17:11, 18:12 },
  "Skeleton Spell":   { 9:5, 10:6, 11:7, 12:8, 13:9, 14:10, 15:11, 16:12, 17:13, 18:14 },
  "Overgrowth Spell": { 13:4, 14:5, 15:6, 16:7, 17:8, 18:9 },
};

// ─── Hero Equipment Max Levels ───────────────────────────────
// Common equipment = max 18, Epic = max 27

export type EquipmentRarity = "COMMON" | "EPIC";

export interface EquipmentInfo {
  hero: string;
  rarity: EquipmentRarity;
  maxLevel: number;
  unlockTh: number;
  metaScore: number; // 0-100
}

export const HERO_EQUIPMENT: Record<string, EquipmentInfo> = {
  // Barbarian King
  "Giant Gauntlet":    { hero: "Barbarian King", rarity: "EPIC", maxLevel: 27, unlockTh: 8, metaScore: 90 },
  "Spiky Ball":        { hero: "Barbarian King", rarity: "EPIC", maxLevel: 27, unlockTh: 8, metaScore: 88 },
  "Barbarian Puppet":  { hero: "Barbarian King", rarity: "COMMON", maxLevel: 18, unlockTh: 8, metaScore: 55 },
  "Rage Vial":         { hero: "Barbarian King", rarity: "COMMON", maxLevel: 18, unlockTh: 8, metaScore: 60 },
  "Earthquake Boots":  { hero: "Barbarian King", rarity: "COMMON", maxLevel: 18, unlockTh: 8, metaScore: 65 },
  "Vampstache":        { hero: "Barbarian King", rarity: "COMMON", maxLevel: 18, unlockTh: 9, metaScore: 55 },
  "Snake Bracelet":    { hero: "Barbarian King", rarity: "EPIC", maxLevel: 27, unlockTh: 12, metaScore: 72 },
  "Haste Vial":        { hero: "Barbarian King", rarity: "COMMON", maxLevel: 18, unlockTh: 11, metaScore: 58 },
  "Rocket Spear":      { hero: "Barbarian King", rarity: "COMMON", maxLevel: 18, unlockTh: 16, metaScore: 70 },

  // Archer Queen
  "Invisibility Vial": { hero: "Archer Queen", rarity: "COMMON", maxLevel: 18, unlockTh: 9, metaScore: 72 },
  "Giant Arrow":       { hero: "Archer Queen", rarity: "EPIC", maxLevel: 27, unlockTh: 9, metaScore: 85 },
  "Healer Puppet":     { hero: "Archer Queen", rarity: "COMMON", maxLevel: 18, unlockTh: 9, metaScore: 65 },
  "Frozen Arrow":      { hero: "Archer Queen", rarity: "EPIC", maxLevel: 27, unlockTh: 11, metaScore: 78 },
  "Magic Mirror":      { hero: "Archer Queen", rarity: "EPIC", maxLevel: 27, unlockTh: 13, metaScore: 80 },
  "Archer Puppet":     { hero: "Archer Queen", rarity: "COMMON", maxLevel: 18, unlockTh: 9, metaScore: 55 },
  "Action Figure":     { hero: "Archer Queen", rarity: "EPIC", maxLevel: 27, unlockTh: 14, metaScore: 92 },

  // Grand Warden
  "Eternal Tome":      { hero: "Grand Warden", rarity: "COMMON", maxLevel: 18, unlockTh: 11, metaScore: 80 },
  "Life Gem":          { hero: "Grand Warden", rarity: "COMMON", maxLevel: 18, unlockTh: 11, metaScore: 68 },
  "Rage Gem":          { hero: "Grand Warden", rarity: "COMMON", maxLevel: 18, unlockTh: 11, metaScore: 72 },
  "Healing Tome":      { hero: "Grand Warden", rarity: "COMMON", maxLevel: 18, unlockTh: 12, metaScore: 65 },
  "Fireball":          { hero: "Grand Warden", rarity: "EPIC", maxLevel: 27, unlockTh: 14, metaScore: 90 },
  "Lavaloon Puppet":   { hero: "Grand Warden", rarity: "EPIC", maxLevel: 27, unlockTh: 13, metaScore: 82 },
  "Warden Puppet":     { hero: "Grand Warden", rarity: "COMMON", maxLevel: 18, unlockTh: 11, metaScore: 55 },

  // Royal Champion
  "Royal Gem":         { hero: "Royal Champion", rarity: "COMMON", maxLevel: 18, unlockTh: 13, metaScore: 70 },
  "Seeking Shield":    { hero: "Royal Champion", rarity: "EPIC", maxLevel: 27, unlockTh: 13, metaScore: 85 },
  "Hog Rider Puppet": { hero: "Royal Champion", rarity: "COMMON", maxLevel: 18, unlockTh: 13, metaScore: 60 },
  "Electro Boots":     { hero: "Royal Champion", rarity: "EPIC", maxLevel: 27, unlockTh: 15, metaScore: 82 },
  "Champion Puppet":   { hero: "Royal Champion", rarity: "COMMON", maxLevel: 18, unlockTh: 13, metaScore: 55 },

  // Minion Prince (TH17+)
  "Dark Orb":          { hero: "Minion Prince", rarity: "EPIC", maxLevel: 27, unlockTh: 17, metaScore: 85 },
  "Minion Prince Puppet": { hero: "Minion Prince", rarity: "COMMON", maxLevel: 18, unlockTh: 17, metaScore: 55 },

  // Dragon Duke (TH18)
  "Fire Heart":        { hero: "Dragon Duke", rarity: "EPIC", maxLevel: 27, unlockTh: 18, metaScore: 88 },
  "Dragon Duke Puppet":{ hero: "Dragon Duke", rarity: "COMMON", maxLevel: 18, unlockTh: 18, metaScore: 55 },
};

// ─── Pet Max Levels ──────────────────────────────────────────

export const PET_MAX_LEVELS: Record<string, Record<number, number>> = {
  "L.A.S.S.I":        { 14: 10, 15: 10, 16: 10, 17: 10, 18: 10 },
  "Electro Owl":      { 14: 10, 15: 10, 16: 10, 17: 10, 18: 10 },
  "Mighty Yak":       { 14: 10, 15: 10, 16: 10, 17: 10, 18: 10 },
  "Unicorn":          { 14: 10, 15: 10, 16: 10, 17: 10, 18: 10 },
  "Frosty":           { 15: 10, 16: 10, 17: 10, 18: 10 },
  "Diggy":            { 15: 10, 16: 10, 17: 10, 18: 10 },
  "Poison Lizard":    { 15: 10, 16: 10, 17: 10, 18: 10 },
  "Phoenix":          { 15: 10, 16: 10, 17: 10, 18: 10 },
  "Spirit Fox":       { 16: 10, 17: 10, 18: 10 },
  "Angry Jelly":      { 16: 10, 17: 10, 18: 10 },
  "Sneezy":           { 17: 10, 18: 10 },
  "Manticore":        { 17: 10, 18: 10 },
};

// ─── Siege Machine Max Levels ────────────────────────────────

export const SIEGE_MAX_LEVELS: Record<string, Record<number, number>> = {
  "Wall Wrecker":  { 12: 4, 13: 4, 14: 4, 15: 5, 16: 5, 17: 6, 18: 6 },
  "Battle Blimp":  { 12: 4, 13: 4, 14: 4, 15: 5, 16: 5, 17: 6, 18: 6 },
  "Stone Slammer": { 12: 4, 13: 4, 14: 4, 15: 5, 16: 5, 17: 6, 18: 6 },
  "Siege Barracks":{ 13: 4, 14: 4, 15: 5, 16: 5, 17: 6, 18: 6 },
  "Log Launcher":  { 13: 4, 14: 4, 15: 5, 16: 5, 17: 6, 18: 6 },
  "Flame Flinger": { 13: 4, 14: 4, 15: 5, 16: 5, 17: 6, 18: 6 },
  "Battle Drill":  { 14: 4, 15: 5, 16: 5, 17: 6, 18: 6 },
};

// ─── Helper Functions ─────────────────────────────────────────

export function getHeroMaxLevel(heroName: string, thLevel: number): number | null {
  const levels = HERO_MAX_LEVELS[heroName];
  if (!levels) return null;

  // Find max level at or below given TH
  const validThs = Object.keys(levels)
    .map(Number)
    .filter((th) => th <= thLevel);

  if (validThs.length === 0) return null;
  return levels[Math.max(...validThs)] ?? null;
}

export function getTroopMaxLevel(troopName: string, thLevel: number): number | null {
  const allMaps = [TROOP_MAX_LEVELS, SPELL_MAX_LEVELS, PET_MAX_LEVELS, SIEGE_MAX_LEVELS];
  for (const map of allMaps) {
    const levels = map[troopName];
    if (levels) {
      const validThs = Object.keys(levels)
        .map(Number)
        .filter((th) => th <= thLevel);
      if (validThs.length === 0) return null;
      return levels[Math.max(...validThs)] ?? null;
    }
  }
  return null;
}

export function getEquipmentInfo(name: string): EquipmentInfo | null {
  return HERO_EQUIPMENT[name] ?? null;
}

export const MAX_TH_LEVEL = 18;
export const MIN_TH_LEVEL = 1;
