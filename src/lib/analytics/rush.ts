/**
 * Rush Score Calculator
 * 
 * Detects how "rushed" a player is by comparing their actual
 * upgrade completion against expected minimums for their TH level.
 * 
 * Data source: CALCULATED (from API data + static game database)
 */

import type { CocPlayer } from "@/types/coc-api";
import type { RushAnalysis, RushCategory, RushRisk } from "@/types/analytics";
import { RUSH_THRESHOLDS } from "@/config/scoring-weights";
import {
  calculateHeroProgress,
  calculateTroopProgress,
  calculateSpellProgress,
  calculateEquipmentProgress,
} from "./progress";

export function calculateRushScore(player: CocPlayer): RushAnalysis {
  const th = player.townHallLevel;
  const thresholds = RUSH_THRESHOLDS[th];

  if (!thresholds) {
    // TH 1-7 — no rush concept yet
    return {
      score: 0,
      risk: "VERY_LOW",
      categories: [],
      summary: "Bu Town Hall seviyesinde rush analizi uygulanmaz.",
      source: "calculated",
    };
  }

  const heroProgress = calculateHeroProgress(player.heroes, th);
  const troopProgress = calculateTroopProgress(player.troops, th);
  const spellProgress = calculateSpellProgress(player.spells, th);
  const equipProgress = calculateEquipmentProgress(player.heroEquipment, th);

  const categories: RushCategory[] = [
    buildRushCategory("Heroes", heroProgress.completionPercent, thresholds.heroes),
    buildRushCategory("Troops", troopProgress.completionPercent, thresholds.troops),
    buildRushCategory("Spells", spellProgress.completionPercent, thresholds.spells),
    buildRushCategory("Equipment", equipProgress.completionPercent, thresholds.equipment),
  ];

  // Score calculation:
  // Average deficit across rushed categories, mapped 0-100
  const rushedCategories = categories.filter((c) => c.isRushed);

  let score = 0;
  if (rushedCategories.length > 0) {
    const avgDeficit = rushedCategories.reduce((sum, c) => sum + Math.abs(c.deficit), 0) / rushedCategories.length;
    // Map deficit of 0-50% range to 0-100 score
    score = Math.min(100, Math.round((avgDeficit / 50) * 100));
    // Bonus penalty for having many rushed categories
    score = Math.min(100, score + rushedCategories.length * 5);
  }

  const risk = getRushRisk(score);

  const summary = buildSummary(score, risk, rushedCategories, th);

  return {
    score,
    risk,
    categories,
    summary,
    source: "calculated",
  };
}

function buildRushCategory(
  category: string,
  actualPercent: number,
  expectedMinPercent: number
): RushCategory {
  const deficit = expectedMinPercent - actualPercent;
  return {
    category,
    expectedMinPercent,
    actualPercent: Math.round(actualPercent),
    deficit: Math.round(deficit),
    isRushed: deficit > 10, // More than 10% below expected = rushed
  };
}

function getRushRisk(score: number): RushRisk {
  if (score <= 10) return "VERY_LOW";
  if (score <= 25) return "LOW";
  if (score <= 50) return "MEDIUM";
  if (score <= 75) return "HIGH";
  return "VERY_HIGH";
}

function buildSummary(
  score: number,
  risk: RushRisk,
  rushedCategories: RushCategory[],
  th: number
): string {
  if (rushedCategories.length === 0) {
    return `TH${th} için köyün dengeli görünüyor. Önemli bir rush tespit edilmedi.`;
  }

  const catNames = rushedCategories.map((c) => c.category).join(", ");

  if (risk === "VERY_HIGH") {
    return `Yüksek derecede rush tespit edildi. ${catNames} TH${th} beklentilerinin çok gerisinde.`;
  }
  if (risk === "HIGH") {
    return `Önemli rush tespit edildi. ${catNames} alanlarında eksik yükseltme mevcut.`;
  }
  if (risk === "MEDIUM") {
    return `Orta seviye rush. ${catNames} biraz geride ama telafi edilebilir.`;
  }
  return `Hafif rush. ${catNames} alanlarında küçük eksikler var.`;
}
