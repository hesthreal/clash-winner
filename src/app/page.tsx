"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Header, Footer } from "@/components/layout/HeaderFooter";
import { 
  Search, Shield, Zap, Swords, Flame, Award, 
  Sparkles, Layers, ArrowRight, CheckCircle2, TrendingUp 
} from "lucide-react";
import Link from "next/link";

export default function LandingPage() {
  const router = useRouter();
  const [playerTag, setPlayerTag] = useState("");
  const [clanTag, setClanTag] = useState("");

  const handlePlayerSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!playerTag.trim()) return;
    const clean = playerTag.trim().startsWith("#") ? playerTag.trim() : `#${playerTag.trim()}`;
    router.push(`/player/${encodeURIComponent(clean)}`);
  };

  const handleClanSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clanTag.trim()) return;
    const clean = clanTag.trim().startsWith("#") ? clanTag.trim() : `#${clanTag.trim()}`;
    router.push(`/clan/${encodeURIComponent(clean)}`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[var(--cw-bg-base)] cw-hero-bg cw-grid-pattern">
      <Header />

      {/* HERO SECTION */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold mb-6">
            <Sparkles className="w-3.5 h-3.5" /> Clash of Clans Village & Clan Intelligence
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold text-[var(--cw-text-primary)] tracking-tight leading-tight">
            Köyünü ve Klanını <br />
            <span className="cw-gradient-text">Gerçek Oyun Verileriyle</span> Analiz Et
          </h1>

          <p className="text-base sm:text-lg text-[var(--cw-text-secondary)] mt-6 leading-relaxed">
            Resmi Clash of Clans API verilerini kendi maxlanma ve rush analiz motorumuz ile birleştirerek köyünün gerçek gücünü keşfet.
          </p>
        </div>

        {/* SEARCH INPUTS DUAL CARD */}
        <div id="analyzer" className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
          
          {/* PLAYER ANALYZER CARD */}
          <div className="cw-card p-6 sm:p-8 flex flex-col justify-between border-t-4 border-t-[var(--cw-gold)]">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center font-bold">
                  <Zap className="w-4 h-4" />
                </div>
                <h2 className="text-xl font-bold text-[var(--cw-text-primary)]">Player Analyzer</h2>
              </div>
              <p className="text-xs text-[var(--cw-text-muted)] mb-6">
                Oyuncu etiketini girin. Maxlanma %, Rush Skoru, Hero Equipment ve geliştirme önceliklerini görün.
              </p>

              <form onSubmit={handlePlayerSearch} className="space-y-3">
                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-[var(--cw-text-muted)] block mb-1">
                    Player Tag (# ile)
                  </label>
                  <input
                    type="text"
                    placeholder="Örn: #ABC123XYZ"
                    value={playerTag}
                    onChange={(e) => setPlayerTag(e.target.value)}
                    className="cw-input font-mono uppercase"
                  />
                </div>
                <button type="submit" className="cw-btn-primary w-full justify-center text-sm py-3">
                  <Search className="w-4 h-4" /> Köyü Analiz Et
                </button>
              </form>
            </div>

            <div className="mt-6 pt-4 border-t border-[var(--cw-border)] text-[11px] text-[var(--cw-text-muted)] flex items-center justify-between">
              <span>Örnek Etiket: <code className="text-amber-300">#ABC123</code></span>
              <span className="text-emerald-400 font-semibold">✓ Anında Veri</span>
            </div>
          </div>

          {/* CLAN ANALYZER CARD */}
          <div className="cw-card p-6 sm:p-8 flex flex-col justify-between border-t-4 border-t-[var(--cw-blue)]">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center font-bold">
                  <Shield className="w-4 h-4" />
                </div>
                <h2 className="text-xl font-bold text-[var(--cw-text-primary)]">Clan Intelligence</h2>
              </div>
              <p className="text-xs text-[var(--cw-text-muted)] mb-6">
                Klan etiketini girin. Clan Power Score, TH dağılım dengesi ve savaş kadrosu durumunu inceleyin.
              </p>

              <form onSubmit={handleClanSearch} className="space-y-3">
                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-[var(--cw-text-muted)] block mb-1">
                    Clan Tag (# ile)
                  </label>
                  <input
                    type="text"
                    placeholder="Örn: #XYZ789CLAN"
                    value={clanTag}
                    onChange={(e) => setClanTag(e.target.value)}
                    className="cw-input font-mono uppercase"
                  />
                </div>
                <button type="submit" className="cw-btn-blue w-full justify-center text-sm py-3">
                  <Shield className="w-4 h-4" /> Klanı Analiz Et
                </button>
              </form>
            </div>

            <div className="mt-6 pt-4 border-t border-[var(--cw-border)] text-[11px] text-[var(--cw-text-muted)] flex items-center justify-between">
              <span>Örnek Klan: <code className="text-sky-300">#XYZ123</code></span>
              <span className="text-sky-400 font-semibold">✓ Kadro Düzeyi</span>
            </div>
          </div>

        </div>

        {/* POPULAR TOWN HALL METAS */}
        <div className="mb-20">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-2xl font-bold text-[var(--cw-text-primary)]">
                Popüler Town Hall Metaları
              </h3>
              <p className="text-xs text-[var(--cw-text-muted)]">
                Town Hall seviyenize göre güncel ordu ve hero equipment kombinasyonları
              </p>
            </div>
            <Link href="/meta/th18" className="cw-btn-secondary text-xs">
              Tümünü Gör <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[18, 17, 16, 15].map((th) => (
              <Link
                key={th}
                href={`/meta/th${th}`}
                className="cw-card p-5 hover:scale-[1.02] transition-transform group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-xs font-bold text-amber-400">TOWN HALL</span>
                    <span className="cw-badge cw-badge-gold text-[10px]">META</span>
                  </div>
                  <div className="text-3xl font-extrabold text-[var(--cw-text-primary)] font-mono group-hover:text-amber-400 transition-colors">
                    TH {th}
                  </div>
                </div>
                <div className="mt-4 pt-3 border-t border-[var(--cw-border)] text-[11px] text-[var(--cw-text-muted)] flex items-center justify-between">
                  <span>Ordu & Ekipman</span>
                  <ArrowRight className="w-3.5 h-3.5 text-amber-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* FEATURES GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="cw-card p-6">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-4">
              <TrendingUp className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-base text-[var(--cw-text-primary)] mb-2">Ağırlıklı Maxlanma Skoru</h4>
            <p className="text-xs text-[var(--cw-text-secondary)] leading-relaxed">
              Kahramanlar, birlikler ve ekipmanlar için ayrı ağırlıklandırma ile köyün gerçek tamamlanma yüzdesini hesaplar.
            </p>
          </div>

          <div className="cw-card p-6">
            <div className="w-10 h-10 rounded-xl bg-orange-500/10 text-orange-400 flex items-center justify-center mb-4">
              <Flame className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-base text-[var(--cw-text-primary)] mb-2">Rush Analiz Motoru</h4>
            <p className="text-xs text-[var(--cw-text-secondary)] leading-relaxed">
              Town Hall seviyene göre olması gereken minimum seviyeler ile kıyaslayarak hangi alanlarda eksik olduğunu gösterir.
            </p>
          </div>

          <div className="cw-card p-6">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center mb-4">
              <Sparkles className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-base text-[var(--cw-text-primary)] mb-2">AI Destekli Tavsiyeler</h4>
            <p className="text-xs text-[var(--cw-text-secondary)] leading-relaxed">
              Doğrulanmış verilerin üzerinden halüsinasyonsuz, akılcı gelişim ve savaş stratejisi önerileri üretir.
            </p>
          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
}
