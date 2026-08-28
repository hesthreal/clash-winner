/**
 * Scoring weights configuration.
 * Controls how categories contribute to the overall progress score.
 * Adjustable without code changes — update here and redeploy.
 */

export const PROGRESS_WEIGHTS = {
  heroes: 0.25,     // 25% — most important for war/attack
  troops: 0.20,     // 20%
  equipment: 0.15,  // 15% — increasingly important meta
  spells: 0.15,     // 15%
  pets: 0.10,       // 10%
  // NOTE: defenses (10%) and walls (5%) excluded from main score
  // because API does not provide this data. They are shown
  // separately as "partial" / "unavailable" estimates.
} as const;

// Minimum expected progress for each TH level (to detect rushing)
// Key = TH level, Value = minimum expected % for heroes to not be "rushed"
export const RUSH_THRESHOLDS: Record<number, {
  heroes: number;
  troops: number;
  spells: number;
  equipment: number;
}> = {
  8:  { heroes: 0,    troops: 60,  spells: 50,  equipment: 0   },
  9:  { heroes: 40,   troops: 65,  spells: 55,  equipment: 0   },
  10: { heroes: 50,   troops: 70,  spells: 60,  equipment: 0   },
  11: { heroes: 55,   troops: 72,  spells: 65,  equipment: 0   },
  12: { heroes: 60,   troops: 75,  spells: 68,  equipment: 0   },
  13: { heroes: 65,   troops: 78,  spells: 70,  equipment: 30  },
  14: { heroes: 70,   troops: 80,  spells: 75,  equipment: 40  },
  15: { heroes: 72,   troops: 82,  spells: 78,  equipment: 50  },
  16: { heroes: 75,   troops: 84,  spells: 80,  equipment: 55  },
  17: { heroes: 78,   troops: 85,  spells: 82,  equipment: 60  },
  18: { heroes: 80,   troops: 87,  spells: 84,  equipment: 65  },
};

// War readiness weights
export const WAR_READINESS_WEIGHTS = {
  heroes: 0.40,
  equipment: 0.25,
  troops: 0.20,
  spells: 0.15,
} as const;

// Upgrade priority scoring factors (each 0-1)
export const PRIORITY_FACTORS = {
  completionGap: 0.30,      // How far from max (bigger gap = lower priority)
  metaRelevance: 0.25,      // How relevant to current meta
  warImportance: 0.20,      // Importance in war context
  offensiveValue: 0.15,     // Offensive contribution
  upgradeDuration: 0.10,    // Prefer faster upgrades when close
} as const;
