import { Metadata } from "next";
import { analyzePlayer } from "@/services/player.service";
import { Header, Footer } from "@/components/layout/HeaderFooter";
import {
  PlayerHeaderSummary,
  ProgressOverviewCard,
  RushAnalysisCard,
  HeroAndEquipmentSection,
  BuildingDisclaimerCard,
} from "@/components/player/PlayerComponents";
import { AlertCircle, Search, ArrowLeft } from "lucide-react";
import Link from "next/link";

interface PlayerPageProps {
  params: Promise<{ tag: string }>;
}

export async function generateMetadata({ params }: PlayerPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const tag = decodeURIComponent(resolvedParams.tag);
  return {
    title: `${tag} Köy Analizi — ClashWinner`,
    description: `${tag} etiketli Clash of Clans oyuncusunun maxlanma yüzdesi, kahraman seviyeleri ve rush skoru analizi.`,
  };
}

export default async function PlayerPage({ params }: PlayerPageProps) {
  const resolvedParams = await params;
  const rawTag = decodeURIComponent(resolvedParams.tag);

  const result = await analyzePlayer(rawTag);

  return (
    <div className="min-h-screen flex flex-col bg-[var(--cw-bg-base)]">
      <Header />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        
        {/* Navigation Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-[var(--cw-text-muted)]">
          <Link href="/" className="hover:text-[var(--cw-gold)] flex items-center gap-1">
            <ArrowLeft className="w-3.5 h-3.5" /> Ana Sayfa
          </Link>
          <span>/</span>
          <span className="text-[var(--cw-text-secondary)] font-mono">{rawTag}</span>
        </div>

        {!result.success ? (
          <div className="cw-card p-12 text-center max-w-lg mx-auto my-12 border-red-500/30">
            <div className="w-12 h-12 rounded-full bg-red-500/10 text-red-400 flex items-center justify-center mx-auto mb-4 border border-red-500/30">
              <AlertCircle className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold text-[var(--cw-text-primary)] mb-2">
              Analiz Başarısız
            </h2>
            <p className="text-sm text-[var(--cw-text-secondary)] mb-6">
              {result.error}
            </p>
            <Link href="/" className="cw-btn-primary inline-flex">
              <Search className="w-4 h-4" /> Yeni Arama Yap
            </Link>
          </div>
        ) : (
          <>
            {/* Player Summary */}
            <PlayerHeaderSummary analysis={result.analysis} />

            {/* Main Grid Layout */}
            <div className="space-y-6">
              
              {/* Overall Progress */}
              <ProgressOverviewCard analysis={result.analysis} />

              {/* Rush Score */}
              <RushAnalysisCard analysis={result.analysis} />

              {/* Heroes & Equipment */}
              <HeroAndEquipmentSection analysis={result.analysis} />

              {/* Building & Defense Transparent Disclaimer */}
              <BuildingDisclaimerCard />

            </div>
          </>
        )}

      </main>

      <Footer />
    </div>
  );
}
