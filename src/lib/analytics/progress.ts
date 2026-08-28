/**
 * Analytics Engine — Progress Calculator
 * 
 * Calculates completion percentages for heroes, troops, spells, pets, equipment.
 * 
 * Data sources used:
 * - OFFICIAL API: Current levels (from player.heroes, player.troops, etc.)
 * - STATIC GAME DB: Max levels by TH (from th-data.ts)
 * - CALCULATED: Percentage, weighted score
 * - UNAVAILABLE (API limitation): Defenses, walls, buildings
 */

import type {
  CocPlayer,
  CocTroop,
  CocHero,
  CocHeroEquipment,
} from "@/types/coc-api";
import type {
  CategoryProgress,
  ItemProgress,
  OverallProgress,
} from "@/types/analytics";
import {
  getHeroMaxLevel,
  getTroopMaxLevel,
  getEquipmentInfo,
  HERO_EQUIPMENT,
} from "@/lib/game-data/th-data";
import { PROGRESS_WEIGHTS } from "@/config/scoring-weights";

// ─── Pet detection ────────────────────────────────────────────

const PET_NAMES = new Set([
  "L.A.S.S.I", "Electro Owl", "Mighty Yak", "Unicorn",
  "Frosty", "Diggy", "Poison Lizard", "Phoenix",
  "Spirit Fox", "Angry Jelly", "Sneezy", "Manticore",
]);

const SIEGE_NAMES = new Set([
  "Wall Wrecker", "Battle Blimp", "Stone Slammer",
  "Siege Barracks", "Log Launcher", "Flame Flinger", "Battle Drill",
]);

// ─── Hero Progress ────────────────────────────────────────────

export function calculateHeroProgress(heroes: CocHero[], thLevel: number): CategoryProgress {
  const items: ItemProgress[] = [];

  for (const hero of heroes) {
    if (hero.village !== "home") continue;

    const maxAtTh = getHeroMaxLevel(hero.name, thLevel);
    if (maxAtTh === null) continue; // Hero not unlocked at this TH

    const percent = Math.min(100, Math.round((hero.level / maxAtTh) * 100));
    items.push({
      name: hero.name,
      apiName: hero.name,
      currentLevel: hero.level,
      maxLevel: maxAtTh,
      completionPercent: percent,
      isMaxed: hero.level >= maxAtTh,
      village: "home",
      category: "hero",
    });
  }

  return buildCategoryProgress("Heroes", items, "calculated");
}

// ─── Troop Progress ───────────────────────────────────────────

export function calculateTroopProgress(troops: CocTroop[], thLevel: number): CategoryProgress {
  const items: ItemProgress[] = [];

  for (const troop of troops) {
    if (troop.village !== "home") continue;
    if (PET_NAMES.has(troop.name)) continue; // Pets handled separately
    if (SIEGE_NAMES.has(troop.name)) continue; // Siege handled separately
    // Super troops — use their base troop name for comparison
    if (troop.name.startsWith("Super ")) continue;

    const maxAtTh = getTroopMaxLevel(troop.name, thLevel);
    if (maxAtTh === null) {
      // Unknown troop — use API's maxLevel as fallback (may not be TH-specific)
      const percent = Math.min(100, Math.round((troop.level / troop.maxLevel) * 100));
      items.push({
        name: troop.name,
        apiName: troop.name,
        currentLevel: troop.level,
        maxLevel: troop.maxLevel,
        completionPercent: percent,
        isMaxed: troop.level >= troop.maxLevel,
        village: "home",
        category: "troop",
      });
      continue;
    }

    const percent = Math.min(100, Math.round((troop.level / maxAtTh) * 100));
    items.push({
      name: troop.name,
      apiName: troop.name,
      currentLevel: troop.level,
      maxLevel: maxAtTh,
      completionPercent: percent,
      isMaxed: troop.level >= maxAtTh,
      village: "home",
      category: "troop",
    });
  }

  return buildCategoryProgress("Troops", items, "calculated");
}

// ─── Spell Progress ───────────────────────────────────────────

export function calculateSpellProgress(spells: CocTroop[], thLevel: number): CategoryProgress {
  const items: ItemProgress[] = [];

  for (const spell of spells) {
    if (spell.village !== "home") continue;

    const maxAtTh = getTroopMaxLevel(spell.name, thLevel);
    const effectiveMax = maxAtTh ?? spell.maxLevel;
    const percent = Math.min(100, Math.round((spell.level / effectiveMax) * 100));

    items.push({
      name: spell.name,
      apiName: spell.name,
      currentLevel: spell.level,
      maxLevel: effectiveMax,
      completionPercent: percent,
      isMaxed: spell.level >= effectiveMax,
      village: "home",
      category: "spell",
    });
  }

  return buildCategoryProgress("Spells", items, "calculated");
}

// ─── Pet Progress ─────────────────────────────────────────────

export function calculatePetProgress(troops: CocTroop[], thLevel: number): CategoryProgress {
  const items: ItemProgress[] = [];

  for (const troop of troops) {
    if (!PET_NAMES.has(troop.name)) continue;

    const maxAtTh = getTroopMaxLevel(troop.name, thLevel);
    const effectiveMax = maxAtTh ?? troop.maxLevel;
    const percent = Math.min(100, Math.round((troop.level / effectiveMax) * 100));

    items.push({
      name: troop.name,
      apiName: troop.name,
      currentLevel: troop.level,
      maxLevel: effectiveMax,
      completionPercent: percent,
      isMaxed: troop.level >= effectiveMax,
      village: "home",
      category: "pet",
    });
  }

  return buildCategoryProgress("Pets", items, "calculated");
}

// ─── Equipment Progress ───────────────────────────────────────

export function calculateEquipmentProgress(
  heroEquipment: CocHeroEquipment[],
  thLevel: number
): CategoryProgress {
  const items: ItemProgress[] = [];

  for (const eq of heroEquipment) {
    const info = getEquipmentInfo(eq.name);
    if (!info) {
      // Unknown equipment — use API maxLevel as fallback
      const percent = Math.min(100, Math.round((eq.level / eq.maxLevel) * 100));
      items.push({
        name: eq.name,
        apiName: eq.name,
        currentLevel: eq.level,
        maxLevel: eq.maxLevel,
        completionPercent: percent,
        isMaxed: eq.level >= eq.maxLevel,
        category: "equipment",
      });
      continue;
    }

    // Equipment unlock check
    if (info.unlockTh > thLevel) continue;

    const percent = Math.min(100, Math.round((eq.level / info.maxLevel) * 100));
    items.push({
      name: eq.name,
      apiName: eq.name,
      currentLevel: eq.level,
      maxLevel: info.maxLevel,
      completionPercent: percent,
      isMaxed: eq.level >= info.maxLevel,
      category: "equipment",
    });
  }

  return buildCategoryProgress("Equipment", items, "calculated");
}

// ─── Overall Progress ─────────────────────────────────────────

export function calculateOverallProgress(player: CocPlayer): OverallProgress {
  const th = player.townHallLevel;

  const heroes = calculateHeroProgress(player.heroes, th);
  const troops = calculateTroopProgress(player.troops, th);
  const spells = calculateSpellProgress(player.spells, th);
  const pets = calculatePetProgress(player.troops, th);
  const equipment = calculateEquipmentProgress(player.heroEquipment, th);

  // Weighted overall score (only categories with API data)
  const weighted =
    heroes.completionPercent * PROGRESS_WEIGHTS.heroes +
    troops.completionPercent * PROGRESS_WEIGHTS.troops +
    equipment.completionPercent * PROGRESS_WEIGHTS.equipment +
    spells.completionPercent * PROGRESS_WEIGHTS.spells +
    pets.completionPercent * PROGRESS_WEIGHTS.pets;

  // Normalize to account for TH levels where pets/equipment aren't unlocked
  let totalWeight = 0;
  if (heroes.totalItems > 0) totalWeight += PROGRESS_WEIGHTS.heroes;
  if (troops.totalItems > 0) totalWeight += PROGRESS_WEIGHTS.troops;
  if (equipment.totalItems > 0) totalWeight += PROGRESS_WEIGHTS.equipment;
  if (spells.totalItems > 0) totalWeight += PROGRESS_WEIGHTS.spells;
  if (pets.totalItems > 0) totalWeight += PROGRESS_WEIGHTS.pets;

  const overall = totalWeight > 0 ? Math.round(weighted / totalWeight) : 0;

  return {
    overall,
    heroes,
    troops,
    spells,
    pets,
    equipment,
    defenses: {
      value: null,
      source: "unavailable",
      note: "Resmi CoC API bina/savunma seviyelerini sağlamıyor.",
    },
    walls: {
      value: null,
      source: "unavailable",
      note: "Resmi CoC API duvar seviyelerini sağlamıyor.",
    },
  };
}

// ─── Helpers ──────────────────────────────────────────────────

function buildCategoryProgress(
  category: string,
  items: ItemProgress[],
  source: "calculated" | "static_game_db"
): CategoryProgress {
  if (items.length === 0) {
    return {
      category,
      completionPercent: 0,
      totalItems: 0,
      maxedItems: 0,
      source,
      items: [],
    };
  }

  const maxedItems = items.filter((i) => i.isMaxed).length;
  const avgPercent = Math.round(
    items.reduce((sum, i) => sum + i.completionPercent, 0) / items.length
  );

  return {
    category,
    completionPercent: avgPercent,
    totalItems: items.length,
    maxedItems,
    source,
    items: items.sort((a, b) => b.completionPercent - a.completionPercent),
  };
}
