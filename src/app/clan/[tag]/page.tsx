import { Metadata } from "next";
import { analyzeClan } from "@/services/clan.service";
import { Header, Footer } from "@/components/layout/HeaderFooter";
import {
  ClanHeaderSummary,
  ClanPowerScoreCard,
  ClanWarLiveCard,
  ClanCapitalCard,
  ClanThBalanceCard,
  ClanMemberTable,
} from "@/components/clan/ClanComponents";
import { AlertCircle, Search, ArrowLeft } from "lucide-react";
import Link from "next/link";

interface ClanPageProps {
  params: Promise<{ tag: string }>;
}

export async function generateMetadata({ params }: ClanPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const tag = decodeURIComponent(resolvedParams.tag);
  return {
    title: `${tag} Klan Analizi — ClashWinner`,
    description: `${tag} etiketli Clash of Clans klanının güç skoru, üye kadrosu, aktif savaşı ve Clan Capital baskın analizi.`,
  };
}

export default async function ClanPage({ params }: ClanPageProps) {
  const resolvedParams = await params;
  const rawTag = decodeURIComponent(resolvedParams.tag);

  const result = await analyzeClan(rawTag);

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
              Klan Analizi Başarısız
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
            {/* Clan Header Summary */}
            <ClanHeaderSummary analysis={result.analysis} />

            {/* Main Grid */}
            <div className="space-y-6">
              
              {/* Clan Power Score */}
              <ClanPowerScoreCard analysis={result.analysis} />

              {/* Live Current War Status */}
              <ClanWarLiveCard analysis={result.analysis} />

              {/* Clan Capital Raid Weekend Performance */}
              <ClanCapitalCard analysis={result.analysis} />

              {/* Town Hall Distribution */}
              <ClanThBalanceCard analysis={result.analysis} />

              {/* Clan Member Table */}
              <ClanMemberTable analysis={result.analysis} />

            </div>
          </>
        )}

      </main>

      <Footer />
    </div>
  );
}
