/**
 * Official Clash of Clans Turkish Name Translations
 * Translates API names (Heroes, Equipment, Troops, Spells, Pets, Siege, Achievements)
 * into official Turkish game names.
 */

export const HERO_TRANSLATIONS: Record<string, string> = {
  "Barbarian King": "Barbar Kral",
  "Archer Queen": "Okçu Kraliçe",
  "Grand Warden": "Büyük Koruyucu",
  "Royal Champion": "Kraliyet Şampiyonu",
  "Minion Prince": "Minyon Prens",
  "Dragon Duke": "Ejderha Dükü",
  "Battle Machine": "Savaş Makinesi",
  "Battle Copter": "Savaş Helikopteri",
};

export const EQUIPMENT_TRANSLATIONS: Record<string, string> = {
  // Barbarian King
  "Giant Gauntlet": "Dev Eldiveni",
  "Spiky Ball": "Dikenli Top",
  "Barbarian Puppet": "Barbar Kuklası",
  "Rage Vial": "Öfke Şişesi",
  "Earthquake Boots": "Deprem Çizmeleri",
  "Vampstache": "Vampir Bıyığı",
  "Snake Bracelet": "Yılan Bileziği",
  "Haste Vial": "Acele Şişesi",
  "Rocket Spear": "Roket Mızrağı",

  // Archer Queen
  "Invisibility Vial": "Görünmezlik Şişesi",
  "Giant Arrow": "Dev Ok",
  "Healer Puppet": "Şifacı Kuklası",
  "Frozen Arrow": "Buzlu Ok",
  "Magic Mirror": "Sihirli Ayna",
  "Archer Puppet": "Okçu Kuklası",
  "Action Figure": "Aksiyon Figürü",

  // Grand Warden
  "Eternal Tome": "Ebedi Kitap",
  "Life Gem": "Yaşam Mücevheri",
  "Rage Gem": "Öfke Mücevheri",
  "Healing Tome": "İyileştirme Kitabı",
  "Fireball": "Ateş Topu",
  "Lavaloon Puppet": "Lavaloon Kuklası",
  "Warden Puppet": "Koruyucu Kuklası",

  // Royal Champion
  "Royal Gem": "Kraliyet Mücevheri",
  "Seeking Shield": "Uçan Kalkan",
  "Hog Rider Puppet": "Yaban Domuzu Binicisi Kuklası",
  "Electro Boots": "Elektro Çizmeler",
  "Champion Puppet": "Şampiyon Kuklası",

  // Minion Prince & Dragon Duke
  "Dark Orb": "Karanlık Küre",
  "Minion Prince Puppet": "Minyon Prens Kuklası",
  "Fire Heart": "Ateş Kalbi",
  "Dragon Duke Puppet": "Ejderha Dükü Kuklası",
};

export const TROOP_TRANSLATIONS: Record<string, string> = {
  // Elixir Troops
  "Barbarian": "Barbar",
  "Archer": "Okçu",
  "Giant": "Dev",
  "Goblin": "Goblin",
  "Wall Breaker": "Duvar Yıkıcı",
  "Balloon": "Balon",
  "Wizard": "Büyücü",
  "Healer": "Şifacı",
  "Dragon": "Ejderha",
  "P.E.K.K.A": "P.E.K.K.A",
  "Baby Dragon": "Bebek Ejderha",
  "Miner": "Madenci",
  "Electro Dragon": "Elektro Ejderha",
  "Yeti": "Yeti",
  "Dragon Rider": "Ejderha Binicisi",
  "Electro Titan": "Elektro Titan",
  "Root Rider": "Kök Binici",
  "Thrower": "Fırlatıcı",

  // Dark Troops
  "Minion": "Dalkavuk",
  "Hog Rider": "Yaban Domuzu Binicisi",
  "Valkyrie": "Valkyrie",
  "Golem": "Golem",
  "Witch": "Cadı",
  "Lava Hound": "Lav Tazısı",
  "Bowler": "Kaya Atıcı",
  "Ice Golem": "Buz Golemi",
  "Headhunter": "Kelle Avcısı",
  "Apprentice Warden": "Çırak Koruyucu",
  "Druid": "Büyücü Kızı (Druid)",

  // Super Troops
  "Super Barbarian": "Süper Barbar",
  "Super Archer": "Süper Okçu",
  "Super Giant": "Süper Dev",
  "Super Wall Breaker": "Süper Duvar Yıkıcı",
  "Super Wizard": "Süper Büyücü",
  "Super Dragon": "Süper Ejderha",
  "Super Minion": "Süper Dalkavuk",
  "Super Valkyrie": "Süper Valkyrie",
  "Super Witch": "Süper Cadı",
  "Ice Hound": "Buz Tazısı",
  "Super Bowler": "Süper Kaya Atıcı",
  "Super Miner": "Süper Madenci",
  "Super Hog Rider": "Süper Yaban Domuzu Binicisi",
};

export const SPELL_TRANSLATIONS: Record<string, string> = {
  "Lightning Spell": "Şimşek Büyüsü",
  "Healing Spell": "İyileştirme Büyüsü",
  "Rage Spell": "Öfke Büyüsü",
  "Jump Spell": "Atlatma Büyüsü",
  "Freeze Spell": "Dondurma Büyüsü",
  "Clone Spell": "Klonlama Büyüsü",
  "Invisibility Spell": "Görünmezlik Büyüsü",
  "Recall Spell": "Geri Çağırma Büyüsü",
  "Revive Spell": "Canlandırma Büyüsü",
  "Poison Spell": "Zehir Büyüsü",
  "Earthquake Spell": "Deprem Büyüsü",
  "Haste Spell": "Acele Büyüsü",
  "Skeleton Spell": "İskelet Büyüsü",
  "Bat Spell": "Yarasa Büyüsü",
  "Overgrowth Spell": "Sarmaşık Büyüsü (Overgrowth)",
};

export const PET_TRANSLATIONS: Record<string, string> = {
  "L.A.S.S.I": "L.A.S.S.I",
  "Electro Owl": "Elektro Baykuş",
  "Mighty Yak": "Güçlü Yak",
  "Unicorn": "Tek Boynuzlu At (Unicorn)",
  "Frosty": "Buzlu (Frosty)",
  "Diggy": "Diggy",
  "Poison Lizard": "Zehirli Kertenkele",
  "Phoenix": "Anka Kuşu (Phoenix)",
  "Spirit Fox": "Ruh Tilkisi (Spirit Fox)",
  "Angry Jelly": "Öfkeli Denizanası",
  "Sneezy": "Sneezy",
  "Manticore": "Mantikor",
};

export const SIEGE_TRANSLATIONS: Record<string, string> = {
  "Wall Wrecker": "Duvar Yıkıcı Araba",
  "Battle Blimp": "Savaş Balonu",
  "Stone Slammer": "Kaya Sıçratıcı",
  "Siege Barracks": "Kuşatma Kışlası",
  "Log Launcher": "Kütük Fırlatıcı",
  "Flame Flinger": "Alev Fırlatıcı",
  "Battle Drill": "Savaş Matkabı",
};

// Main translator function
export function translateGameName(name: string): string {
  if (!name) return "";
  return (
    HERO_TRANSLATIONS[name] ||
    EQUIPMENT_TRANSLATIONS[name] ||
    TROOP_TRANSLATIONS[name] ||
    SPELL_TRANSLATIONS[name] ||
    PET_TRANSLATIONS[name] ||
    SIEGE_TRANSLATIONS[name] ||
    name
  );
}
