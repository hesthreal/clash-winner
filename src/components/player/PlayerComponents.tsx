"use client";

import { useState } from "react";
import type { PlayerAnalysis } from "@/types/analytics";
import { DataSourceBadge } from "@/components/ui/DataSourceBadge";
import { 
  Trophy, Shield, Swords, Star, Award, ChevronRight, 
  Sparkles, AlertCircle, Info, Lock, Flame, ShieldAlert,
  Layers, Hammer, RefreshCw
} from "lucide-react";

// Helper for clan role Turkish translation
function getRoleTurkish(role?: string): string {
  switch (role) {
    case "leader": return "Lider";
    case "coLeader": return "Yardımcı Lider";
    case "admin": return "Klan Kıdemlisi";
    case "member": return "Üye";
    default: return role || "Üye";
  }
}

// ─── 1. PLAYER HEADER SUMMARY ──────────────────────────────────

export function PlayerHeaderSummary({ analysis }: { analysis: PlayerAnalysis }) {
  const { player } = analysis;

  return (
    <div className="cw-card p-6 relative overflow-hidden bg-gradient-to-r from-[var(--cw-bg-card)] via-[var(--cw-bg-surface)] to-[var(--cw-bg-card)] border-l-4 border-l-[var(--cw-gold)]">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        
        {/* Basic Info */}
        <div className="flex items-start gap-4">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-amber-500/20 via-yellow-500/10 to-amber-700/30 border border-amber-500/40 flex flex-col items-center justify-center shrink-0 shadow-[0_0_20px_rgba(245,200,66,0.15)]">
            <span className="text-xs font-mono font-bold text-amber-300 uppercase">Belediye Binası</span>
            <span className="text-2xl sm:text-3xl font-extrabold text-amber-400 font-mono">TH {player.townHallLevel}</span>
          </div>

          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[var(--cw-text-primary)] tracking-tight">
                {player.name}
              </h1>
              <span className="font-mono text-sm px-2.5 py-0.5 rounded-md bg-[var(--cw-bg-elevated)] text-[var(--cw-text-muted)] border border-[var(--cw-border)]">
                {player.tag}
              </span>
              <DataSourceBadge source="official_api" />
            </div>

            <div className="flex items-center gap-4 mt-2 text-xs text-[var(--cw-text-secondary)] flex-wrap">
              {player.clan && (
                <div className="flex items-center gap-1.5 font-medium text-amber-300/90">
                  <Shield className="w-3.5 h-3.5 text-amber-400" />
                  <span>{player.clan.name}</span>
                  <span className="text-[var(--cw-text-muted)]">({getRoleTurkish(player.role)})</span>
                </div>
              )}

              <div className="flex items-center gap-1">
                <span className="cw-dot-online"></span>
                <span>Level {player.expLevel} XP</span>
              </div>

              {player.league && (
                <div className="flex items-center gap-1 text-sky-400">
                  <Trophy className="w-3.5 h-3.5" />
                  <span>{player.league.name}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="bg-[var(--cw-bg-elevated)] p-3 rounded-xl border border-[var(--cw-border)]">
            <div className="text-[10px] uppercase font-bold text-[var(--cw-text-muted)] flex items-center gap-1">
              <Trophy className="w-3 h-3 text-amber-400" /> Kupalar
            </div>
            <div className="text-lg font-bold font-mono text-amber-400 mt-0.5">
              {player.trophies.toLocaleString()}
            </div>
            <div className="text-[10px] text-[var(--cw-text-muted)]">En İyi: {player.bestTrophies.toLocaleString()}</div>
          </div>

          <div className="bg-[var(--cw-bg-elevated)] p-3 rounded-xl border border-[var(--cw-border)]">
            <div className="text-[10px] uppercase font-bold text-[var(--cw-text-muted)] flex items-center gap-1">
              <Star className="w-3 h-3 text-yellow-400" /> Savaş Yıldızları
            </div>
            <div className="text-lg font-bold font-mono text-yellow-400 mt-0.5">
              {player.warStars.toLocaleString()}
            </div>
            <div className="text-[10px] text-[var(--cw-text-muted)]">Kazanılan Savaş</div>
          </div>

          <div className="bg-[var(--cw-bg-elevated)] p-3 rounded-xl border border-[var(--cw-border)]">
            <div className="text-[10px] uppercase font-bold text-[var(--cw-text-muted)] flex items-center gap-1">
              <Swords className="w-3 h-3 text-emerald-400" /> Saldırı Zaferleri
            </div>
            <div className="text-lg font-bold font-mono text-emerald-400 mt-0.5">
              {player.attackWins.toLocaleString()}
            </div>
            <div className="text-[10px] text-[var(--cw-text-muted)]">Savunma: {player.defenseWins}</div>
          </div>

          <div className="bg-[var(--cw-bg-elevated)] p-3 rounded-xl border border-[var(--cw-border)]">
            <div className="text-[10px] uppercase font-bold text-[var(--cw-text-muted)] flex items-center gap-1">
              <Award className="w-3 h-3 text-purple-400" /> Bağışlar
            </div>
            <div className="text-lg font-bold font-mono text-purple-400 mt-0.5">
              {player.donations.toLocaleString()}
            </div>
            <div className="text-[10px] text-[var(--cw-text-muted)]">Alınan: {player.donationsReceived}</div>
          </div>
        </div>

      </div>
    </div>
  );
}

// ─── 2. PROGRESS OVERVIEW CARD ─────────────────────────────────

export function ProgressOverviewCard({ analysis }: { analysis: PlayerAnalysis }) {
  const { progress } = analysis;

  return (
    <div className="cw-card p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-lg font-bold text-[var(--cw-text-primary)] flex items-center gap-2">
            <Layers className="w-5 h-5 text-amber-400" /> TH{analysis.player.townHallLevel} Maxlanma İlerlemesi
          </h2>
          <p className="text-xs text-[var(--cw-text-muted)]">
            Oyuncunun mevcut Town Hall seviyesindeki maksimum kapasiteye göre hesaplanan durumu
          </p>
        </div>
        <DataSourceBadge source="calculated" label="Scoring Engine" />
      </div>

      {/* Main Overall Meter */}
      <div className="bg-[var(--cw-bg-surface)] p-4 rounded-xl border border-[var(--cw-border)] mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-semibold text-[var(--cw-text-primary)]">Genel Köy Maxlanma Skoru</span>
          <span className="text-2xl font-extrabold font-mono text-amber-400">{progress.overall}%</span>
        </div>
        <div className="cw-progress-track h-3">
          <div 
            className="cw-progress-fill cw-progress-gold h-full" 
            style={{ width: `${progress.overall}%` }}
          />
        </div>
        <div className="flex justify-between text-[11px] text-[var(--cw-text-muted)] mt-1.5">
          <span>Ağırlıklı Skor (Kahramanlar %25, Birlikler %20, Büyüler %15, Ekipman %15, Petler %10)</span>
          <span>Hedef: %100</span>
        </div>
      </div>

      {/* Category Breakdown Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        
        {/* Heroes */}
        <div className="bg-[var(--cw-bg-elevated)] p-4 rounded-xl border border-[var(--cw-border)]">
          <div className="flex justify-between text-xs font-semibold mb-1">
            <span className="text-amber-300">Kahramanlar</span>
            <span className="font-mono text-amber-400">{progress.heroes.completionPercent}%</span>
          </div>
          <div className="cw-progress-track h-2 mb-2">
            <div className="cw-progress-fill cw-progress-gold h-full" style={{ width: `${progress.heroes.completionPercent}%` }} />
          </div>
          <div className="text-[11px] text-[var(--cw-text-muted)] flex justify-between">
            <span>{progress.heroes.maxedItems} / {progress.heroes.totalItems} Max Seviye</span>
            <span>Ağırlık: %25</span>
          </div>
        </div>

        {/* Troops */}
        <div className="bg-[var(--cw-bg-elevated)] p-4 rounded-xl border border-[var(--cw-border)]">
          <div className="flex justify-between text-xs font-semibold mb-1">
            <span className="text-sky-300">Birlikler</span>
            <span className="font-mono text-sky-400">{progress.troops.completionPercent}%</span>
          </div>
          <div className="cw-progress-track h-2 mb-2">
            <div className="cw-progress-fill cw-progress-blue h-full" style={{ width: `${progress.troops.completionPercent}%` }} />
          </div>
          <div className="text-[11px] text-[var(--cw-text-muted)] flex justify-between">
            <span>{progress.troops.maxedItems} / {progress.troops.totalItems} Max Seviye</span>
            <span>Ağırlık: %20</span>
          </div>
        </div>

        {/* Spells */}
        <div className="bg-[var(--cw-bg-elevated)] p-4 rounded-xl border border-[var(--cw-border)]">
          <div className="flex justify-between text-xs font-semibold mb-1">
            <span className="text-purple-300">Büyüler</span>
            <span className="font-mono text-purple-400">{progress.spells.completionPercent}%</span>
          </div>
          <div className="cw-progress-track h-2 mb-2">
            <div className="cw-progress-fill cw-progress-purple h-full" style={{ width: `${progress.spells.completionPercent}%` }} />
          </div>
          <div className="text-[11px] text-[var(--cw-text-muted)] flex justify-between">
            <span>{progress.spells.maxedItems} / {progress.spells.totalItems} Max Seviye</span>
            <span>Ağırlık: %15</span>
          </div>
        </div>

        {/* Equipment */}
        <div className="bg-[var(--cw-bg-elevated)] p-4 rounded-xl border border-[var(--cw-border)]">
          <div className="flex justify-between text-xs font-semibold mb-1">
            <span className="text-emerald-300">Hero Equipment (Ekipmanlar)</span>
            <span className="font-mono text-emerald-400">{progress.equipment.completionPercent}%</span>
          </div>
          <div className="cw-progress-track h-2 mb-2">
            <div className="cw-progress-fill cw-progress-green h-full" style={{ width: `${progress.equipment.completionPercent}%` }} />
          </div>
          <div className="text-[11px] text-[var(--cw-text-muted)] flex justify-between">
            <span>{progress.equipment.maxedItems} / {progress.equipment.totalItems} Max Seviye</span>
            <span>Ağırlık: %15</span>
          </div>
        </div>

        {/* Pets */}
        <div className="bg-[var(--cw-bg-elevated)] p-4 rounded-xl border border-[var(--cw-border)]">
          <div className="flex justify-between text-xs font-semibold mb-1">
            <span className="text-pink-300">Evcil Hayvanlar (Pets)</span>
            <span className="font-mono text-pink-400">{progress.pets.completionPercent}%</span>
          </div>
          <div className="cw-progress-track h-2 mb-2">
            <div className="cw-progress-fill bg-pink-500 h-full" style={{ width: `${progress.pets.completionPercent}%` }} />
          </div>
          <div className="text-[11px] text-[var(--cw-text-muted)] flex justify-between">
            <span>{progress.pets.maxedItems} / {progress.pets.totalItems} Max Seviye</span>
            <span>Ağırlık: %10</span>
          </div>
        </div>

        {/* Defenses / Walls API Limitation Notice */}
        <div className="bg-amber-950/20 p-4 rounded-xl border border-amber-500/20 opacity-85">
          <div className="flex items-center justify-between mb-1 text-xs font-semibold text-amber-400">
            <span>Savunma & Duvarlar</span>
            <DataSourceBadge source="unavailable" label="API Vermiyor" />
          </div>
          <p className="text-[11px] text-[var(--cw-text-muted)] leading-normal mt-1">
            Resmi Supercell API&apos;si bina/savunma seviyelerini dışarıya sunmamaktadır. Bu kategoriler genel puana katılmaz.
          </p>
        </div>

      </div>
    </div>
  );
}

// ─── 3. RUSH ANALYSIS CARD ─────────────────────────────────────

function translateRushCategory(cat: string): string {
  switch (cat) {
    case "Heroes": return "Kahramanlar";
    case "Troops": return "Birlikler";
    case "Spells": return "Büyüler";
    case "Equipment": return "Hero Ekipmanları";
    default: return cat;
  }
}

export function RushAnalysisCard({ analysis }: { analysis: PlayerAnalysis }) {
  const { rush } = analysis;

  const riskColor = 
    rush.risk === "VERY_HIGH" || rush.risk === "HIGH" ? "cw-badge-red" :
    rush.risk === "MEDIUM" ? "cw-badge-gold" : "cw-badge-green";

  const riskText =
    rush.risk === "VERY_HIGH" ? "ÇOK YÜKSEK RİSK" :
    rush.risk === "HIGH" ? "YÜKSEK RİSK" :
    rush.risk === "MEDIUM" ? "ORTA RİSK" :
    rush.risk === "LOW" ? "DÜŞÜK RİSK" : "RİSK YOK";

  return (
    <div className="cw-card p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-lg font-bold text-[var(--cw-text-primary)] flex items-center gap-2">
            <Flame className="w-5 h-5 text-orange-400" /> Rush Analiz Motoru
          </h2>
          <p className="text-xs text-[var(--cw-text-muted)]">
            Köyün TH seviyesine göre beklenen minimum seviyeler ile kıyaslaması
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className={`cw-badge ${riskColor}`}>
            RİSK: {riskText}
          </span>
          <DataSourceBadge source="calculated" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div className="bg-[var(--cw-bg-elevated)] p-4 rounded-xl border border-[var(--cw-border)] flex flex-col items-center justify-center text-center">
          <div className="text-xs uppercase font-bold text-[var(--cw-text-muted)]">Rush Skoru</div>
          <div className="text-4xl font-extrabold font-mono text-orange-400 my-1">{rush.score}/100</div>
          <div className="text-[10px] text-[var(--cw-text-muted)]">0 = Dengeli | 100 = Aşırı Rushed</div>
        </div>

        <div className="md:col-span-2 bg-[var(--cw-bg-elevated)] p-4 rounded-xl border border-[var(--cw-border)] flex flex-col justify-center">
          <div className="text-xs font-bold text-amber-300 mb-1">Analiz Özeti</div>
          <p className="text-sm text-[var(--cw-text-secondary)] leading-relaxed">
            {rush.summary}
          </p>
        </div>
      </div>

      {/* Categories deficit */}
      {rush.categories.length > 0 && (
        <div className="space-y-2 mt-4 pt-4 border-t border-[var(--cw-border)]">
          <div className="text-xs font-semibold text-[var(--cw-text-muted)] uppercase tracking-wider mb-2">
            Kategori Bazlı Rush Detayları
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {rush.categories.map((cat) => (
              <div key={cat.category} className="bg-[var(--cw-bg-surface)] p-3 rounded-lg flex items-center justify-between text-xs border border-[var(--cw-border)]">
                <div>
                  <span className="font-semibold text-[var(--cw-text-primary)]">{translateRushCategory(cat.category)}</span>
                  <div className="text-[10px] text-[var(--cw-text-muted)]">
                    Mevcut: %{cat.actualPercent} | Beklenen Min: %{cat.expectedMinPercent}
                  </div>
                </div>
                {cat.isRushed ? (
                  <span className="cw-badge cw-badge-red text-[10px]">
                    -%{cat.deficit} Geride
                  </span>
                ) : (
                  <span className="cw-badge cw-badge-green text-[10px]">
                    Dengeli
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── 4. HERO & EQUIPMENT SECTION ───────────────────────────────

export function HeroAndEquipmentSection({ analysis }: { analysis: PlayerAnalysis }) {
  const { player } = analysis;
  const heroes = player.heroes.filter(h => h.village === "home");

  return (
    <div className="cw-card p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-bold text-[var(--cw-text-primary)] flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-400" /> Kahramanlar & Hero Equipment
          </h2>
          <p className="text-xs text-[var(--cw-text-muted)]">
            Mevcut seviyeler ve TH{player.townHallLevel} max sınırları
          </p>
        </div>
        <DataSourceBadge source="official_api" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {heroes.map((hero) => {
          const isMax = hero.level >= hero.maxLevel;
          const percent = Math.min(100, Math.round((hero.level / hero.maxLevel) * 100));

          return (
            <div key={hero.name} className="bg-[var(--cw-bg-elevated)] p-4 rounded-xl border border-[var(--cw-border)] relative">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="font-bold text-[var(--cw-text-primary)] text-base flex items-center gap-2">
                    {hero.name}
                    {isMax && <span className="cw-badge cw-badge-gold text-[10px]">MAX SEVİYE</span>}
                  </h3>
                  <div className="text-xs text-[var(--cw-text-muted)]">
                    Seviye <span className="font-mono text-amber-300 font-bold">{hero.level}</span> / {hero.maxLevel}
                  </div>
                </div>
                <div className="font-mono font-bold text-lg text-amber-400">{percent}%</div>
              </div>

              <div className="cw-progress-track h-2 mb-4">
                <div 
                  className={`cw-progress-fill h-full ${percent >= 100 ? 'cw-progress-gold' : 'cw-progress-blue'}`}
                  style={{ width: `${percent}%` }} 
                />
              </div>

              {/* Equipped Hero Equipment */}
              {hero.equipment && hero.equipment.length > 0 && (
                <div className="mt-3 pt-3 border-t border-[var(--cw-border)]">
                  <div className="text-[11px] font-semibold text-[var(--cw-text-muted)] mb-2 uppercase">
                    Kuşanılan Ekipmanlar
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {hero.equipment.map((eq) => (
                      <div key={eq.name} className="bg-[var(--cw-bg-surface)] p-2 rounded-lg border border-[var(--cw-border)] text-xs flex items-center justify-between">
                        <span className="font-medium text-[var(--cw-text-primary)] truncate" title={eq.name}>
                          {eq.name}
                        </span>
                        <span className="font-mono font-bold text-amber-400 text-[11px]">
                          Lvl {eq.level}/{eq.maxLevel}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── 5. BUILDING & DEFENSE DISCLAIMER CARD ─────────────────────

export function BuildingDisclaimerCard() {
  return (
    <div className="cw-card p-6 bg-gradient-to-r from-amber-950/20 via-[var(--cw-bg-card)] to-[var(--cw-bg-card)] border-l-4 border-l-amber-500">
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center shrink-0 text-amber-400">
          <Info className="w-5 h-5" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-sm text-[var(--cw-text-primary)]">
              Bina & Savunma Analizi Hakkında Bilgilendirme
            </h3>
            <DataSourceBadge source="unavailable" label="API Sınırlaması" />
          </div>
          <p className="text-xs text-[var(--cw-text-secondary)] mt-1 leading-relaxed">
            Resmi Supercell Clash of Clans Developer API&apos;si güvenlik ve performans nedenleriyle oyuncuların bina, savunma (Top, Okçu Kulesi vb.), tuzak ve duvar seviye verilerini <strong>sunmamaktadır</strong>.
          </p>
          <div className="mt-3 flex items-center gap-4 text-xs font-semibold text-amber-400 flex-wrap">
            <span>✓ Birlikler, Kahramanlar ve Ekipmanlar %100 Gerçektir</span>
            <span>✓ Gelecekte Manuel Görsel Yükleme Desteği Eklenecektir</span>
          </div>
        </div>
      </div>
    </div>
  );
}
