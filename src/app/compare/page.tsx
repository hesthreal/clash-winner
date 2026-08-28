import { Metadata } from "next";
import { analyzePlayer } from "@/services/player.service";
import { Header, Footer } from "@/components/layout/HeaderFooter";
import { DataSourceBadge } from "@/components/ui/DataSourceBadge";
import { Swords, Trophy, Star, Award, Shield, CheckCircle2, AlertCircle, ArrowLeft, Search, Flame, Crown } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

interface ComparePageProps {
  searchParams: Promise<{ tag1?: string; tag2?: string }>;
}

export const metadata: Metadata = {
  title: "Oyuncu Karşılaştırma Motoru (Player A vs Player B) — ClashWinner",
  description: "İki Clash of Clans oyuncusunu yan yana karşılaştırın. Town Hall, maxlanma %, kahramanlar, birlikler ve rush skorları kıyaslaması.",
};

export default async function ComparePage({ searchParams }: ComparePageProps) {
  const resolvedParams = await searchParams;
  const tag1 = resolvedParams.tag1 ? decodeURIComponent(resolvedParams.tag1) : "";
  const tag2 = resolvedParams.tag2 ? decodeURIComponent(resolvedParams.tag2) : "";

  async function handleCompareForm(formData: FormData) {
    "use server";
    const t1 = formData.get("tag1") as string;
    const t2 = formData.get("tag2") as string;
    if (t1 && t2) {
      const c1 = t1.trim().startsWith("#") ? t1.trim() : `#${t1.trim()}`;
      const c2 = t2.trim().startsWith("#") ? t2.trim() : `#${t2.trim()}`;
      redirect(`/compare?tag1=${encodeURIComponent(c1)}&tag2=${encodeURIComponent(c2)}`);
    }
  }

  // If both tags are provided, fetch analysis for both
  const res1 = tag1 ? await analyzePlayer(tag1) : null;
  const res2 = tag2 ? await analyzePlayer(tag2) : null;

  const hasBothData = res1?.success && res2?.success;

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
          <span className="text-[var(--cw-text-secondary)] font-mono">Oyuncu Karşılaştırma</span>
        </div>

        {/* Header */}
        <div className="cw-card p-6 border-l-4 border-l-[var(--cw-gold)] bg-gradient-to-r from-[var(--cw-bg-card)] via-[var(--cw-bg-surface)] to-[var(--cw-bg-card)]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center font-bold shrink-0">
              <Swords className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[var(--cw-text-primary)]">
                Oyuncu Karşılaştırma Motoru
              </h1>
              <p className="text-xs text-[var(--cw-text-secondary)] mt-1">
                İki oyuncunun etiketini girerek TH seviyelerini, maxlanma % skorlarını, kahraman güçlerini ve savaş başarılarını kıyaslayın.
              </p>
            </div>
          </div>
        </div>

        {/* INPUT FORM */}
        <div className="cw-card p-6">
          <form action={handleCompareForm} className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
            <div className="md:col-span-2">
              <label className="text-xs font-bold uppercase tracking-wider text-[var(--cw-text-muted)] block mb-1">
                1. Oyuncu Etiketi (Player A)
              </label>
              <input
                type="text"
                name="tag1"
                required
                defaultValue={tag1}
                placeholder="Örn: #ABC123XYZ"
                className="cw-input font-mono uppercase text-sm"
              />
            </div>

            <div className="flex items-center justify-center py-2 md:py-0 font-bold text-amber-400 text-lg">
              VS
            </div>

            <div className="md:col-span-2">
              <label className="text-xs font-bold uppercase tracking-wider text-[var(--cw-text-muted)] block mb-1">
                2. Oyuncu Etiketi (Player B)
              </label>
              <input
                type="text"
                name="tag2"
                required
                defaultValue={tag2}
                placeholder="Örn: #XYZ789ABC"
                className="cw-input font-mono uppercase text-sm"
              />
            </div>

            <div className="md:col-span-5 mt-2">
              <button type="submit" className="cw-btn-primary w-full justify-center text-sm py-3 shadow-lg">
                <Swords className="w-4 h-4" /> Oyuncuları Karşılaştır
              </button>
            </div>
          </form>
        </div>

        {/* COMPARISON RESULTS */}
        {hasBothData && res1.success && res2.success && (
          <div className="space-y-6 animate-fade-in">
            
            {/* Header Profiles Comparison */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Player 1 Summary Card */}
              <div className={`cw-card p-6 relative overflow-hidden ${
                res1.analysis.progress.overall > res2.analysis.progress.overall ? "border-amber-500/50 shadow-[0_0_20px_rgba(245,200,66,0.15)]" : ""
              }`}>
                {res1.analysis.progress.overall > res2.analysis.progress.overall && (
                  <div className="absolute top-3 right-3 cw-badge cw-badge-gold text-[10px] flex items-center gap-1">
                    <Crown className="w-3 h-3 text-amber-400" /> DAHA GÜÇLÜ KÖY
                  </div>
                )}
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl bg-amber-500/20 border border-amber-500/40 flex flex-col items-center justify-center font-mono font-bold text-amber-300">
                    <span className="text-[10px]">TH</span>
                    <span className="text-xl">{res1.analysis.player.townHallLevel}</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[var(--cw-text-primary)]">
                      {res1.analysis.player.name}
                    </h3>
                    <div className="font-mono text-xs text-[var(--cw-text-muted)]">
                      {res1.analysis.player.tag}
                    </div>
                    <div className="text-xs text-amber-300 font-semibold mt-1">
                      {res1.analysis.player.clan?.name || "Klansız"}
                    </div>
                  </div>
                </div>
              </div>

              {/* Player 2 Summary Card */}
              <div className={`cw-card p-6 relative overflow-hidden ${
                res2.analysis.progress.overall > res1.analysis.progress.overall ? "border-amber-500/50 shadow-[0_0_20px_rgba(245,200,66,0.15)]" : ""
              }`}>
                {res2.analysis.progress.overall > res1.analysis.progress.overall && (
                  <div className="absolute top-3 right-3 cw-badge cw-badge-gold text-[10px] flex items-center gap-1">
                    <Crown className="w-3 h-3 text-amber-400" /> DAHA GÜÇLÜ KÖY
                  </div>
                )}
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl bg-sky-500/20 border border-sky-500/40 flex flex-col items-center justify-center font-mono font-bold text-sky-300">
                    <span className="text-[10px]">TH</span>
                    <span className="text-xl">{res2.analysis.player.townHallLevel}</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[var(--cw-text-primary)]">
                      {res2.analysis.player.name}
                    </h3>
                    <div className="font-mono text-xs text-[var(--cw-text-muted)]">
                      {res2.analysis.player.tag}
                    </div>
                    <div className="text-xs text-sky-300 font-semibold mt-1">
                      {res2.analysis.player.clan?.name || "Klansız"}
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* COMPARISON METRICS TABLE */}
            <div className="cw-card p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-[var(--cw-text-primary)] flex items-center gap-2">
                  <Swords className="w-5 h-5 text-amber-400" /> Karşılaştırmalı İstatistikler
                </h3>
                <DataSourceBadge source="calculated" />
              </div>

              <div className="space-y-4">
                
                {/* Metric 1: Overall Progress */}
                <CompareMetricRow
                  title="Genel Maxlanma Skoru"
                  val1={`${res1.analysis.progress.overall}%`}
                  val2={`${res2.analysis.progress.overall}%`}
                  num1={res1.analysis.progress.overall}
                  num2={res2.analysis.progress.overall}
                  name1={res1.analysis.player.name}
                  name2={res2.analysis.player.name}
                />

                {/* Metric 2: Heroes Progress */}
                <CompareMetricRow
                  title="Kahramanlar İlerlemesi"
                  val1={`${res1.analysis.progress.heroes.completionPercent}%`}
                  val2={`${res2.analysis.progress.heroes.completionPercent}%`}
                  num1={res1.analysis.progress.heroes.completionPercent}
                  num2={res2.analysis.progress.heroes.completionPercent}
                  name1={res1.analysis.player.name}
                  name2={res2.analysis.player.name}
                />

                {/* Metric 3: Troops Progress */}
                <CompareMetricRow
                  title="Birlikler İlerlemesi"
                  val1={`${res1.analysis.progress.troops.completionPercent}%`}
                  val2={`${res2.analysis.progress.troops.completionPercent}%`}
                  num1={res1.analysis.progress.troops.completionPercent}
                  num2={res2.analysis.progress.troops.completionPercent}
                  name1={res1.analysis.player.name}
                  name2={res2.analysis.player.name}
                />

                {/* Metric 4: Equipment Progress */}
                <CompareMetricRow
                  title="Hero Equipment İlerlemesi"
                  val1={`${res1.analysis.progress.equipment.completionPercent}%`}
                  val2={`${res2.analysis.progress.equipment.completionPercent}%`}
                  num1={res1.analysis.progress.equipment.completionPercent}
                  num2={res2.analysis.progress.equipment.completionPercent}
                  name1={res1.analysis.player.name}
                  name2={res2.analysis.player.name}
                />

                {/* Metric 5: Rush Score (lower is better) */}
                <CompareMetricRow
                  title="Rush Skoru (Düşük Olan Daha Dengeli)"
                  val1={`${res1.analysis.rush.score}/100 (${res1.analysis.rush.risk})`}
                  val2={`${res2.analysis.rush.score}/100 (${res2.analysis.rush.risk})`}
                  num1={100 - res1.analysis.rush.score}
                  num2={100 - res2.analysis.rush.score}
                  name1={res1.analysis.player.name}
                  name2={res2.analysis.player.name}
                />

                {/* Metric 6: Trophies */}
                <CompareMetricRow
                  title="Mevcut Kupalar"
                  val1={res1.analysis.player.trophies.toLocaleString()}
                  val2={res2.analysis.player.trophies.toLocaleString()}
                  num1={res1.analysis.player.trophies}
                  num2={res2.analysis.player.trophies}
                  name1={res1.analysis.player.name}
                  name2={res2.analysis.player.name}
                />

                {/* Metric 7: War Stars */}
                <CompareMetricRow
                  title="Kazanılan Savaş Yıldızları"
                  val1={res1.analysis.player.warStars.toLocaleString()}
                  val2={res2.analysis.player.warStars.toLocaleString()}
                  num1={res1.analysis.player.warStars}
                  num2={res2.analysis.player.warStars}
                  name1={res1.analysis.player.name}
                  name2={res2.analysis.player.name}
                />

              </div>
            </div>

          </div>
        )}

      </main>

      <Footer />
    </div>
  );
}

function CompareMetricRow({
  title,
  val1,
  val2,
  num1,
  num2,
  name1,
  name2,
}: {
  title: string;
  val1: string;
  val2: string;
  num1: number;
  num2: number;
  name1: string;
  name2: string;
}) {
  const is1Better = num1 > num2;
  const is2Better = num2 > num1;

  return (
    <div className="bg-[var(--cw-bg-elevated)] p-4 rounded-xl border border-[var(--cw-border)]">
      <div className="text-xs font-bold text-[var(--cw-text-muted)] mb-2 uppercase tracking-wider text-center">
        {title}
      </div>

      <div className="grid grid-cols-5 items-center gap-2">
        <div className="col-span-2 text-right">
          <span className={`font-mono text-base font-extrabold ${is1Better ? "text-amber-400" : "text-[var(--cw-text-secondary)]"}`}>
            {val1}
          </span>
          {is1Better && <span className="ml-1 text-[10px] text-amber-400 font-bold">★ KAZANAN</span>}
        </div>

        <div className="text-center font-bold text-xs text-[var(--cw-text-muted)]">
          VS
        </div>

        <div className="col-span-2 text-left">
          <span className={`font-mono text-base font-extrabold ${is2Better ? "text-sky-400" : "text-[var(--cw-text-secondary)]"}`}>
            {val2}
          </span>
          {is2Better && <span className="ml-1 text-[10px] text-sky-400 font-bold">★ KAZANAN</span>}
        </div>
      </div>
    </div>
  );
}
