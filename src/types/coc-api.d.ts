/**
 * CoC API Type Definitions
 * Based on official API v1 documentation.
 * Only fields actually returned by the API are defined here.
 */

// ─── Shared ───────────────────────────────────────────────────

export interface IconUrls {
  small?: string;
  medium?: string;
  large?: string;
  tiny?: string;
}

export interface Label {
  id: number;
  name: string;
  iconUrls: IconUrls;
}

export interface League {
  id: number;
  name: string;
  iconUrls: IconUrls;
}

export interface Location {
  id: number;
  name: string;
  isCountry: boolean;
  countryCode?: string;
}

// ─── Player API Response ─────────────────────────────────────

export interface CocTroop {
  name: string;
  level: number;
  maxLevel: number;
  village: "home" | "builderBase";
  superTroopIsActive?: boolean;
}

export interface CocHeroEquipment {
  name: string;
  level: number;
  maxLevel: number;
}

export interface CocHero {
  name: string;
  level: number;
  maxLevel: number;
  village: "home" | "builderBase";
  equipment?: CocHeroEquipment[];
}

export interface CocAchievement {
  name: string;
  stars: number;
  value: number;
  target: number;
  info: string;
  completionInfo?: string;
  village: "home" | "builderBase";
}

export interface CocPlayerHouse {
  elements: Array<{
    type: string;
    id: number;
  }>;
}

export interface CocClanMinimal {
  tag: string;
  name: string;
  clanLevel: number;
  badgeUrls: IconUrls;
}

export interface CocPlayer {
  tag: string;
  name: string;
  expLevel: number;
  trophies: number;
  bestTrophies: number;
  warStars: number;
  attackWins: number;
  defenseWins: number;
  townHallLevel: number;
  townHallWeaponLevel?: number;
  builderHallLevel?: number;
  builderBaseTrophies?: number;
  bestBuilderBaseTrophies?: number;
  versusBattleWins?: number;
  donations: number;
  donationsReceived: number;
  clanCapitalContributions: number;
  clan?: CocClanMinimal;
  league?: League;
  builderBaseLeague?: League;
  role?: "member" | "admin" | "coLeader" | "leader";
  labels: Label[];
  achievements: CocAchievement[];
  troops: CocTroop[];
  heroes: CocHero[];
  heroEquipment: CocHeroEquipment[];
  spells: CocTroop[];
  playerHouse?: CocPlayerHouse;
}

// ─── Clan API Response ───────────────────────────────────────

export interface CocWarLeague {
  id: number;
  name: string;
}

export interface CocCapitalLeague {
  id: number;
  name: string;
}

export interface CocClanMember {
  tag: string;
  name: string;
  role: "member" | "admin" | "coLeader" | "leader";
  expLevel: number;
  league?: League;
  trophies: number;
  builderBaseTrophies?: number;
  clanRank: number;
  previousClanRank: number;
  donations: number;
  donationsReceived: number;
  playerHouse?: CocPlayerHouse;
  townHallLevel: number;
  builderHallLevel?: number;
}

export interface CocClan {
  tag: string;
  name: string;
  type: "open" | "inviteOnly" | "closed";
  description?: string;
  location?: Location;
  isFamilyFriendly: boolean;
  badgeUrls: IconUrls;
  clanLevel: number;
  clanPoints: number;
  clanBuilderBasePoints?: number;
  clanCapitalPoints?: number;
  clanVersusPoints?: number;
  requiredTrophies: number;
  requiredBuilderBaseTrophies?: number;
  requiredTownhallLevel?: number;
  warFrequency: "always" | "moreThanOncePerWeek" | "oncePerWeek" | "lessThanOncePerWeek" | "never" | "unknown";
  warWinStreak: number;
  warWins: number;
  warTies?: number;
  warLosses?: number;
  isWarLogPublic: boolean;
  warLeague?: CocWarLeague;
  capitalLeague?: CocCapitalLeague;
  members: number;
  memberList: CocClanMember[];
  labels: Label[];
  chatLanguage?: { id: number; name: string; languageCode: string };
}

// ─── War API Response ────────────────────────────────────────

export interface CocWarAttack {
  attackerTag: string;
  defenderTag: string;
  stars: number;
  destructionPercentage: number;
  order: number;
  duration: number;
}

export interface CocWarMember {
  tag: string;
  name: string;
  townhallLevel: number;
  mapPosition: number;
  attacks?: CocWarAttack[];
  bestOpponentAttack?: CocWarAttack;
  opponentAttacks?: number;
}

export interface CocWarClan {
  tag: string;
  name: string;
  badgeUrls: IconUrls;
  clanLevel: number;
  attacks: number;
  stars: number;
  destructionPercentage: number;
  expEarned?: number;
  members: CocWarMember[];
}

export type CocWarState =
  | "notInWar"
  | "preparation"
  | "inWar"
  | "warEnded";

export interface CocCurrentWar {
  state: CocWarState;
  teamSize?: number;
  attacksPerMember?: number;
  preparationStartTime?: string;
  startTime?: string;
  endTime?: string;
  clan?: CocWarClan;
  opponent?: CocWarClan;
}

// ─── Capital Raid API Response ───────────────────────────────

export interface CocCapitalRaidMember {
  tag: string;
  name: string;
  attacks: number;
  attackLimit: number;
  bonusAttackLimit: number;
  capitalResourcesLooted: number;
}

export interface CocCapitalRaidDistrict {
  id: number;
  name: string;
  stars: number;
  attackCount: number;
  totalLooted: number;
  destructionPercent: number;
}

export interface CocCapitalRaidAttackLog {
  defender: { tag: string; name: string; level: number; badgeUrls: IconUrls };
  attackCount: number;
  districtCount: number;
  districtsDestroyed: number;
  districts: CocCapitalRaidDistrict[];
}

export interface CocCapitalRaidSeason {
  state: "ongoing" | "ended";
  startTime: string;
  endTime: string;
  capitalTotalLoot: number;
  raidsCompleted: number;
  totalAttacks: number;
  enemyDistrictsDestroyed: number;
  offensiveReward: number;
  defensiveReward: number;
  members?: CocCapitalRaidMember[];
  attackLog?: CocCapitalRaidAttackLog[];
  defenseLog?: CocCapitalRaidAttackLog[];
}

// ─── API Error ───────────────────────────────────────────────

export interface CocApiError {
  reason: string;
  message?: string;
}

export type CocApiResult<T> =
  | { success: true; data: T; cached: boolean; cachedAt?: Date }
  | { success: false; error: CocApiError; statusCode: number };
