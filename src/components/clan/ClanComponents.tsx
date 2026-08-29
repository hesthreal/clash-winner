"use client";

import { useState } from "react";
import type { ClanAnalysisResult } from "@/services/clan.service";
import { DataSourceBadge } from "@/components/ui/DataSourceBadge";
import { 
  Shield, Users, Trophy, Swords, Flame, Award, 
  ChevronDown, Search, Filter, AlertCircle, ExternalLink,
  Crown, Coins, Castle, Star, CheckCircle2
} from "lucide-react";
import Link from "next/link";

function translateRole(role: string): string {
  switch (role) {
    case "leader": return "Lider";
    case "coLeader": return "Yardımcı Lider";
    case "admin": return "Kıdemli Üye";
    case "member": return "Üye";
    default: return role;
  }
}

function translateType(type: string): string {
  switch (type) {
    case "open": return "Herkese Açık";
    case "inviteOnly": return "Sadece Davetle";
    case "closed": return "Kapalı";
    default: return type;
  }
}

function translateWarFreq(freq: string): string {
  switch (freq) {
    case "always": return "Sürekli (Her Zaman)";
    case "moreThanOncePerWeek": return "Haftada Birkaç Kez";
    case "oncePerWeek": return "Haftada 1 Kez";
    case "lessThanOncePerWeek": return "Seyrek";
    case "never": return "Hiçbir Zaman";
    default: return freq || "Belirtilmemiş";
  }
}

// ─── 1. CLAN HEADER SUMMARY ────────────────────────────────────

export function ClanHeaderSummary({ analysis }: { analysis: ClanAnalysisResult }) {
  const { clan } = analysis;

  return (
    <div className="cw-card p-6 border-l-4 border-l-[var(--cw-blue)] bg-gradient-to-r from-[var(--cw-bg-card)] via-[var(--cw-bg-surface)] to-[var(--cw-bg-card)]">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        
        {/* Clan Info */}
        <div className="flex items-start gap-4">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-blue-600/30 to-indigo-800/40 border border-blue-500/40 flex flex-col items-center justify-center shrink-0 shadow-[0_0_20px_rgba(59,130,246,0.2)]">
            <Shield className="w-8 h-8 text-blue-400" />
            <span className="text-[10px] font-mono font-bold text-blue-300">Seviye {clan.clanLevel}</span>
          </div>

          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[var(--cw-text-primary)]">
                {clan.name}
              </h1>
              <span className="font-mono text-sm px-2.5 py-0.5 rounded-md bg-[var(--cw-bg-elevated)] text-[var(--cw-text-muted)] border border-[var(--cw-border)]">
                {clan.tag}
              </span>
              <DataSourceBadge source="official_api" />
            </div>

            <p className="text-xs text-[var(--cw-text-secondary)] mt-1 max-w-2xl line-clamp-2">
              {clan.description || "Açıklama belirtilmemiş."}
            </p>

            <div className="flex items-center gap-4 mt-3 text-xs text-[var(--cw-text-muted)] flex-wrap">
              <span className="flex items-center gap-1 text-[var(--cw-text-secondary)] font-semibold">
                <Users className="w-3.5 h-3.5 text-blue-400" /> {clan.members}/50 Üye
              </span>
              <span>•</span>
              <span>Katılım Türü: <strong className="text-[var(--cw-text-primary)]">{translateType(clan.type)}</strong></span>
              <span>•</span>
              <span>Savaş Sıklığı: <strong className="text-[var(--cw-text-primary)]">{translateWarFreq(clan.warFrequency)}</strong></span>
            </div>
          </div>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="bg-[var(--cw-bg-elevated)] p-3 rounded-xl border border-[var(--cw-border)]">
            <div className="text-[10px] uppercase font-bold text-[var(--cw-text-muted)]">Klan Puanı</div>
            <div className="text-lg font-bold font-mono text-amber-400 mt-0.5">
              {(clan.clanPoints || 0).toLocaleString()}
            </div>
            <div className="text-[10px] text-[var(--cw-text-muted)]">Kupa</div>
          </div>

          <div className="bg-[var(--cw-bg-elevated)] p-3 rounded-xl border border-[var(--cw-border)]">
            <div className="text-[10px] uppercase font-bold text-[var(--cw-text-muted)]">Zafer Serisi</div>
            <div className="text-lg font-bold font-mono text-emerald-400 mt-0.5">
              {clan.warWinStreak || 0} Savaş
            </div>
            <div className="text-[10px] text-[var(--cw-text-muted)]">Üst Üste Kazanılan</div>
          </div>

          <div className="bg-[var(--cw-bg-elevated)] p-3 rounded-xl border border-[var(--cw-border)]">
            <div className="text-[10px] uppercase font-bold text-[var(--cw-text-muted)]">Savaş Galibiyetleri</div>
            <div className="text-lg font-bold font-mono text-sky-400 mt-0.5">
              {clan.warWins || 0}
            </div>
            <div className="text-[10px] text-[var(--cw-text-muted)]">Toplam Kazanılan</div>
          </div>

          <div className="bg-[var(--cw-bg-elevated)] p-3 rounded-xl border border-[var(--cw-border)]">
            <div className="text-[10px] uppercase font-bold text-[var(--cw-text-muted)]">Gerekli Kupa</div>
            <div className="text-lg font-bold font-mono text-purple-400 mt-0.5">
              {(clan.requiredTrophies || 0).toLocaleString()}
            </div>
            <div className="text-[10px] text-[var(--cw-text-muted)]">Katılım Sınırı</div>
          </div>
        </div>

      </div>
    </div>
  );
}

// ─── 2. CLAN POWER SCORE CARD ──────────────────────────────────

export function ClanPowerScoreCard({ analysis }: { analysis: ClanAnalysisResult }) {
  const { powerScore } = analysis;

  return (
    <div className="cw-card p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-lg font-bold text-[var(--cw-text-primary)] flex items-center gap-2">
            <Flame className="w-5 h-5 text-amber-400" /> Clan Power Score Engine
          </h2>
          <p className="text-xs text-[var(--cw-text-muted)]">
            Klan seviyesi, puanlar, üye doluluğu ve savaş performansına dayalı genel güç analizi
          </p>
        </div>
        <DataSourceBadge source="calculated" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-[var(--cw-bg-surface)] p-6 rounded-xl border border-[var(--cw-border)] text-center flex flex-col items-center justify-center">
          <div className="text-xs font-bold uppercase tracking-wider text-[var(--cw-text-muted)]">
            Genel Klan Gücü
          </div>
          <div className="text-5xl font-extrabold font-mono text-amber-400 my-2">
            {powerScore.overall}<span className="text-lg text-[var(--cw-text-muted)]">/100</span>
          </div>
          <div className="cw-progress-track w-full h-2 mb-2">
            <div className="cw-progress-fill cw-progress-gold h-full" style={{ width: `${powerScore.overall}%` }} />
          </div>
          <span className="text-[11px] text-amber-300 font-semibold">
            {powerScore.overall >= 80 ? "SÜPER KLAN" : powerScore.overall >= 60 ? "GÜÇLÜ KLAN" : "GELİŞMEKTE OLAN KLAN"}
          </span>
        </div>

        <div className="md:col-span-2 grid grid-cols-2 gap-3">
          <div className="bg-[var(--cw-bg-elevated)] p-4 rounded-xl border border-[var(--cw-border)]">
            <div className="text-xs text-[var(--cw-text-muted)]">Savaş Kazanma Oranı</div>
            <div className="text-2xl font-bold font-mono text-emerald-400 mt-1">
              %{powerScore.warWinRate}
            </div>
            <div className="cw-progress-track h-1.5 mt-2">
              <div className="cw-progress-fill cw-progress-green h-full" style={{ width: `${powerScore.warWinRate}%` }} />
            </div>
          </div>

          <div className="bg-[var(--cw-bg-elevated)] p-4 rounded-xl border border-[var(--cw-border)]">
            <div className="text-xs text-[var(--cw-text-muted)]">Klan Aktivite Skoru</div>
            <div className="text-2xl font-bold font-mono text-sky-400 mt-1">
              %{powerScore.activityScore}
            </div>
            <div className="cw-progress-track h-1.5 mt-2">
              <div className="cw-progress-fill cw-progress-blue h-full" style={{ width: `${powerScore.activityScore}%` }} />
            </div>
          </div>

          <div className="bg-[var(--cw-bg-elevated)] p-4 rounded-xl border border-[var(--cw-border)] col-span-2">
            <div className="text-xs text-[var(--cw-text-muted)] mb-1 font-semibold">CWL & Savaş Dengesi Özeti</div>
            <p className="text-xs text-[var(--cw-text-secondary)] leading-relaxed">
              {powerScore.memberCount >= 40
                ? "Klan üye sayısı yüksek. CWL için geniş bir kadro rotasyonu imkanı var."
                : "Klan üye sayısı sınırlı. Kadroyu güçlendirmek için yeni katılımlar mantıklı olabilir."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── 3. CLAN WAR LIVE CARD (API CAPABILITY EXTENSION) ──────────

export function ClanWarLiveCard({ analysis }: { analysis: ClanAnalysisResult }) {
  const { currentWar } = analysis;

  if (!currentWar || currentWar.state === "notInWar") {
    return (
      <div className="cw-card p-6 border-l-4 border-l-slate-500">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-sm text-[var(--cw-text-primary)] flex items-center gap-2">
              <Swords className="w-4 h-4 text-[var(--cw-text-muted)]" /> Aktif Klan Savaşı Durumu
            </h3>
            <p className="text-xs text-[var(--cw-text-muted)] mt-0.5">
              Klan şu an aktif bir savaşta değil veya savaş günlüğü kapalı.
            </p>
          </div>
          <DataSourceBadge source="official_api" />
        </div>
      </div>
    );
  }

  const { state, clan, opponent, teamSize } = currentWar;
  const stateLabel =
    state === "inWar" ? "SAVAŞ DEVAM EDİYOR" :
    state === "preparation" ? "SAVAŞ HAZIRLIK EVRESİ" :
    state === "warEnded" ? "SAVAŞ TAMAMLANDI" : "SAVAŞ YOK";

  const stateBadgeClass =
    state === "inWar" ? "cw-badge-red" :
    state === "preparation" ? "cw-badge-gold" : "cw-badge-gray";

  return (
    <div className="cw-card p-6 border-l-4 border-l-red-500">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-lg font-bold text-[var(--cw-text-primary)] flex items-center gap-2">
            <Swords className="w-5 h-5 text-red-400" /> Canlı Klan Savaşı Analizi ({teamSize}v{teamSize})
          </h2>
          <p className="text-xs text-[var(--cw-text-muted)]">
            Aktif savaş durumu, yıldız sayıları ve yıkım yüzdeleri
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className={`cw-badge ${stateBadgeClass}`}>{stateLabel}</span>
          <DataSourceBadge source="official_api" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* Our Clan */}
        <div className="bg-[var(--cw-bg-elevated)] p-4 rounded-xl border border-emerald-500/30">
          <div className="text-xs font-bold text-emerald-400 mb-1">{clan?.name || "Klanımız"}</div>
          <div className="flex items-center justify-between">
            <div className="text-2xl font-extrabold font-mono text-yellow-400 flex items-center gap-1">
              <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" /> {clan?.stars || 0}
            </div>
            <div className="text-right">
              <div className="text-sm font-bold font-mono text-[var(--cw-text-primary)]">
                %{Math.round(clan?.destructionPercentage || 0)} Yıkım
              </div>
              <div className="text-[10px] text-[var(--cw-text-muted)]">
                {clan?.attacks || 0} Saldırı Kullanıldı
              </div>
            </div>
          </div>
        </div>

        {/* Opponent Clan */}
        <div className="bg-[var(--cw-bg-elevated)] p-4 rounded-xl border border-red-500/30">
          <div className="text-xs font-bold text-red-400 mb-1">{opponent?.name || "Rakip Klan"}</div>
          <div className="flex items-center justify-between">
            <div className="text-2xl font-extrabold font-mono text-yellow-400 flex items-center gap-1">
              <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" /> {opponent?.stars || 0}
            </div>
            <div className="text-right">
              <div className="text-sm font-bold font-mono text-[var(--cw-text-primary)]">
                %{Math.round(opponent?.destructionPercentage || 0)} Yıkım
              </div>
              <div className="text-[10px] text-[var(--cw-text-muted)]">
                {opponent?.attacks || 0} Saldırı Kullanıldı
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

// ─── 4. CLAN CAPITAL CARD (API CAPABILITY EXTENSION) ───────────

export function ClanCapitalCard({ analysis }: { analysis: ClanAnalysisResult }) {
  const { capitalRaidSeasons } = analysis;

  if (!capitalRaidSeasons || capitalRaidSeasons.length === 0) return null;

  const latestSeason = capitalRaidSeasons[0];

  return (
    <div className="cw-card p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-lg font-bold text-[var(--cw-text-primary)] flex items-center gap-2">
            <Castle className="w-5 h-5 text-amber-400" /> Clan Capital Raid Hafta Sonu Performansı
          </h2>
          <p className="text-xs text-[var(--cw-text-muted)]">
            En son Raid hafta sonu yağmalanan Capital Gold ve tamamlanan baskınlar
          </p>
        </div>
        <DataSourceBadge source="official_api" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-[var(--cw-bg-elevated)] p-4 rounded-xl border border-[var(--cw-border)] text-center">
          <div className="text-[10px] uppercase font-bold text-[var(--cw-text-muted)] flex items-center justify-center gap-1">
            <Coins className="w-3.5 h-3.5 text-amber-400" /> Toplam Yağmalanan Altın
          </div>
          <div className="text-2xl font-extrabold font-mono text-amber-400 my-1">
            {(latestSeason.capitalTotalLoot || 0).toLocaleString()}
          </div>
          <div className="text-[10px] text-[var(--cw-text-muted)]">Capital Gold</div>
        </div>

        <div className="bg-[var(--cw-bg-elevated)] p-4 rounded-xl border border-[var(--cw-border)] text-center">
          <div className="text-[10px] uppercase font-bold text-[var(--cw-text-muted)] flex items-center justify-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Tamamlanan Baskınlar
          </div>
          <div className="text-2xl font-extrabold font-mono text-emerald-400 my-1">
            {latestSeason.raidsCompleted || 0}
          </div>
          <div className="text-[10px] text-[var(--cw-text-muted)]">Klan Baskını</div>
        </div>

        <div className="bg-[var(--cw-bg-elevated)] p-4 rounded-xl border border-[var(--cw-border)] text-center">
          <div className="text-[10px] uppercase font-bold text-[var(--cw-text-muted)] flex items-center justify-center gap-1">
            <Flame className="w-3.5 h-3.5 text-purple-400" /> Yıkılan Bölgeler
          </div>
          <div className="text-2xl font-extrabold font-mono text-purple-400 my-1">
            {latestSeason.enemyDistrictsDestroyed || 0}
          </div>
          <div className="text-[10px] text-[var(--cw-text-muted)]">Bölge (District)</div>
        </div>
      </div>
    </div>
  );
}

// ─── 5. CLAN TH BALANCE CARD ───────────────────────────────────

export function ClanThBalanceCard({ analysis }: { analysis: ClanAnalysisResult }) {
  const { thDistribution } = analysis.powerScore;
  const thLevels = Object.keys(thDistribution).map(Number).sort((a, b) => b - a);

  return (
    <div className="cw-card p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-lg font-bold text-[var(--cw-text-primary)] flex items-center gap-2">
            <Users className="w-5 h-5 text-purple-400" /> Town Hall Dağılım Mimarisi
          </h2>
          <p className="text-xs text-[var(--cw-text-muted)]">
            Klandaki üyelerin Town Hall seviyelerine göre kadro dengesi
          </p>
        </div>
        <DataSourceBadge source="calculated" />
      </div>

      <div className="space-y-3">
        {thLevels.map((th) => {
          const count = thDistribution[th];
          const percent = Math.round((count / analysis.clan.members) * 100);

          return (
            <div key={th} className="flex items-center gap-3">
              <div className="w-14 text-xs font-bold font-mono text-amber-400 shrink-0">
                TH {th}
              </div>
              <div className="flex-1 cw-progress-track h-3">
                <div 
                  className="cw-progress-fill cw-progress-purple h-full" 
                  style={{ width: `${percent}%` }}
                />
              </div>
              <div className="w-20 text-right text-xs font-mono text-[var(--cw-text-secondary)] shrink-0">
                {count} Üye (%{percent})
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── 6. CLAN MEMBER TABLE ──────────────────────────────────────

export function ClanMemberTable({ analysis }: { analysis: ClanAnalysisResult }) {
  const { memberList } = analysis.clan;
  const [filterTh, setFilterTh] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  if (!memberList || memberList.length === 0) {
    return (
      <div className="cw-card p-6 text-center text-xs text-[var(--cw-text-muted)]">
        Üye listesi bulunamadı.
      </div>
    );
  }

  const filteredMembers = memberList.filter((m) => {
    const matchesTh = filterTh === "all" || m.townHallLevel === parseInt(filterTh);
    const matchesSearch = m.name.toLowerCase().includes(searchQuery.toLowerCase()) || m.tag.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTh && matchesSearch;
  });

  return (
    <div className="cw-card p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-lg font-bold text-[var(--cw-text-primary)]">
            Klan Üyeleri Tablosu ({memberList.length})
          </h2>
          <p className="text-xs text-[var(--cw-text-muted)]">
            Tüm klan üyelerinin detaylı sıralaması
          </p>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2 flex-wrap">
          <input
            type="text"
            placeholder="İsim veya Tag ara..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="cw-input text-xs py-1.5 px-3 w-40"
          />

          <select
            value={filterTh}
            onChange={(e) => setFilterTh(e.target.value)}
            className="cw-input text-xs py-1.5 px-3 w-32 cursor-pointer"
          >
            <option value="all">Tüm TH Seviyeleri</option>
            {[18, 17, 16, 15, 14, 13, 12, 11, 10, 9, 8].map((th) => (
              <option key={th} value={th}>TH {th}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="cw-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Oyuncu</th>
              <th>TH</th>
              <th>Rol</th>
              <th>Kupalar</th>
              <th>Bağışlar</th>
              <th>Aksiyon</th>
            </tr>
          </thead>
          <tbody>
            {filteredMembers.map((m, i) => (
              <tr key={m.tag}>
                <td className="font-mono text-xs text-[var(--cw-text-muted)]">{m.clanRank || i + 1}</td>
                <td>
                  <div className="font-bold text-[var(--cw-text-primary)]">{m.name}</div>
                  <div className="font-mono text-[10px] text-[var(--cw-text-muted)]">{m.tag}</div>
                </td>
                <td>
                  <span className="cw-badge cw-badge-gold text-[10px] font-mono">
                    TH {m.townHallLevel}
                  </span>
                </td>
                <td className="text-xs text-[var(--cw-text-secondary)] font-medium">
                  {translateRole(m.role)}
                </td>
                <td className="font-mono font-bold text-amber-400">{m.trophies.toLocaleString()}</td>
                <td className="font-mono text-xs text-purple-300">
                  ↑{m.donations} / ↓{m.donationsReceived}
                </td>
                <td>
                  <Link
                    href={`/player/${encodeURIComponent(m.tag)}`}
                    className="cw-btn-secondary text-[11px] py-1 px-2.5 inline-flex items-center gap-1"
                  >
                    Analiz Et <ExternalLink className="w-3 h-3" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
