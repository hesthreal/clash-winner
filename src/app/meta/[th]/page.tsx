import { Metadata } from "next";
import { Header, Footer } from "@/components/layout/HeaderFooter";
import { DataSourceBadge } from "@/components/ui/DataSourceBadge";
import { translateGameName } from "@/lib/game-data/translations";
import { getMetaForTownHall } from "@/lib/game-data/meta-armies";
import { 
  Compass, Swords, Award, Shield, Sparkles, 
  ArrowLeft, CheckCircle2, Flame, Layers 
} from "lucide-react";
import Link from "next/link";

interface MetaPageProps {
  params: Promise<{ th: string }>;
}

export async function generateMetadata({ params }: MetaPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const th = resolvedParams.th.replace(/\D/g, "") || "18";
  return {
    title: `TH${th} Meta Ordu & Hero Equipment Stratejileri — ClashWinner`,
    description: `Town Hall ${th} için en güçlü meta orduları, hero equipment kombinasyonları ve 3 yıldız saldırı stratejileri.`,
  };
}

export default async function MetaPage({ params }: MetaPageProps) {
  const resolvedParams = await params;
  const thLevel = parseInt(resolvedParams.th.replace(/\D/g, "")) || 18;
  const metaData = getMetaForTownHall(thLevel);

  return (
    <div className="min-h-screen flex flex-col bg-[var(--cw-bg-base)]">
      <Header />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Navigation Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-[var(--cw-text-muted)]">
          <Link href="/" className="hover:text-[var(--cw-gold)] flex items-center gap-1">
            <ArrowLeft className="w-3.5 h-3.5" /> Ana Sayfa
          </Link>
          <span>/</span>
          <span className="text-[var(--cw-text-secondary)] font-mono">Meta Merkezi (TH{thLevel})</span>
        </div>

        {/* TH Selector Tabs */}
        <div className="cw-card p-4 flex items-center gap-2 overflow-x-auto">
          <span className="text-xs font-bold text-[var(--cw-text-muted)] uppercase shrink-0 px-2">
            Town Hall Seç:
          </span>
          {[18, 17, 16, 15, 14, 13, 12, 11, 10, 9, 8].map((level) => (
            <Link
              key={level}
              href={`/meta/th${level}`}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold shrink-0 transition-all ${
                level === thLevel
                  ? "bg-[var(--cw-gold)] text-slate-950 shadow-[0_0_14px_rgba(245,200,66,0.35)] scale-105"
                  : "bg-[var(--cw-bg-elevated)] text-[var(--cw-text-secondary)] hover:text-white hover:bg-[var(--cw-bg-card-hover)]"
              }`}
            >
              TH {level}
            </Link>
          ))}
        </div>

        {/* Header Summary */}
        <div className="cw-card p-6 border-l-4 border-l-[var(--cw-purple)] bg-gradient-to-r from-[var(--cw-bg-card)] via-[var(--cw-bg-surface)] to-[var(--cw-bg-card)] shadow-lg">
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-[var(--cw-text-primary)]">
                  Town Hall {thLevel} Özel Meta Stratejileri
                </h1>
                <DataSourceBadge source="static_game_db" label="Meta Veritabanı" />
              </div>
              <p className="text-xs text-[var(--cw-text-secondary)] max-w-2xl">
                Ağustos 2026 oyun sürümüne göre TH{thLevel} seviyesinde en çok kazandıran özel saldırı orduları ve Hero Equipment kombinasyonları.
              </p>
            </div>
            <div className="px-3 py-1 rounded-md bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-semibold">
              Oyun Sürümü: 2026.08
            </div>
          </div>
        </div>

        {/* META ARMIES SECTION */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-[var(--cw-text-primary)] flex items-center gap-2">
              <Swords className="w-5 h-5 text-amber-400" /> TH{thLevel} En Güçlü Meta Orduları ({metaData.armies.length})
            </h2>
            <span className="text-xs text-[var(--cw-text-muted)]">3 Yıldız Saldırı Stratejileri</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {metaData.armies.map((army, index) => (
              <div key={army.name} className="cw-card p-6 space-y-4 hover:border-amber-500/30 transition-colors">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <h3 className="font-bold text-lg text-[var(--cw-text-primary)]">
                        {army.name}
                      </h3>
                      <span className={`cw-badge text-[10px] ${index === 0 ? "cw-badge-gold" : "cw-badge-blue"}`}>
                        {army.category}
                      </span>
                    </div>
                    <p className="text-xs text-[var(--cw-text-muted)]">{army.type}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-base font-extrabold font-mono text-amber-400">{army.metaScore}/100</div>
                    <div className="text-[10px] text-[var(--cw-text-muted)]">Meta Skoru</div>
                  </div>
                </div>

                <div className="bg-[var(--cw-bg-elevated)] p-3.5 rounded-lg border border-[var(--cw-border)] text-xs space-y-2">
                  <div>
                    <span className="font-semibold text-amber-300">Ordu Kadrosu:</span>
                    <span className="text-[var(--cw-text-secondary)] ml-2 leading-relaxed block sm:inline">
                      {army.composition}
                    </span>
                  </div>
                  <div>
                    <span className="font-semibold text-purple-300">Büyüler:</span>
                    <span className="text-[var(--cw-text-secondary)] ml-2 leading-relaxed block sm:inline">
                      {army.spells}
                    </span>
                  </div>
                  <div>
                    <span className="font-semibold text-sky-300">Kuşatma Makinesi:</span>
                    <span className="text-[var(--cw-text-secondary)] ml-2 leading-relaxed block sm:inline">
                      {army.siege}
                    </span>
                  </div>
                </div>

                <div className="text-xs text-[var(--cw-text-secondary)] leading-relaxed space-y-1">
                  <p>{army.description}</p>
                  <div className="pt-2 border-t border-[var(--cw-border)]">
                    <strong className="text-amber-400">Saldırı Adımları:</strong> {army.steps}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RECOMMENDED HERO EQUIPMENT */}
        {metaData.equipment && metaData.equipment.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-[var(--cw-text-primary)] flex items-center gap-2">
                <Award className="w-5 h-5 text-purple-400" /> TH{thLevel} Tavsiye Edilen Hero Equipment Kombinasyonları
              </h2>
              <span className="text-xs text-[var(--cw-text-muted)]">Savaş Metası</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {metaData.equipment.map((eq, i) => {
                const borderColors = ["border-t-amber-500", "border-t-sky-500", "border-t-purple-500", "border-t-emerald-500"];
                const textColors = ["text-amber-300", "text-sky-300", "text-purple-300", "text-emerald-300"];
                
                return (
                  <div key={eq.hero} className={`cw-card p-4 space-y-2 border-t-2 ${borderColors[i % 4]}`}>
                    <div className={`text-xs font-bold ${textColors[i % 4]}`}>{eq.hero}</div>
                    <div className="text-sm font-extrabold text-[var(--cw-text-primary)]">
                      {eq.pair}
                    </div>
                    <p className="text-[11px] text-[var(--cw-text-muted)] leading-relaxed">
                      {eq.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        )}

      </main>

      <Footer />
    </div>
  );
}
