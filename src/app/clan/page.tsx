import { Metadata } from "next";
import { Header, Footer } from "@/components/layout/HeaderFooter";
import { Shield, Search, Users, Swords, Award, Trophy, ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Klan Analizörü & Clan Intelligence — ClashWinner",
  description: "Clash of Clans klan etiketi ile klan güç skorunu, Town Hall dağılım dengesini ve üye kadrosunu analiz edin.",
};

export default function ClanLandingPage() {
  async function handleSearch(formData: FormData) {
    "use server";
    const tag = formData.get("clanTag") as string;
    if (tag && tag.trim()) {
      const clean = tag.trim().startsWith("#") ? tag.trim() : `#${tag.trim()}`;
      redirect(`/clan/${encodeURIComponent(clean)}`);
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-[var(--cw-bg-base)] cw-hero-bg cw-grid-pattern">
      <Header />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        
        {/* HERO SECTION */}
        <div className="text-center max-w-3xl mx-auto mb-12 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-semibold mb-6">
            <Shield className="w-3.5 h-3.5" /> Clan Intelligence Platform
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-[var(--cw-text-primary)] tracking-tight leading-tight">
            Klanını Gerçek Verilerle <br />
            <span className="cw-gradient-text-blue">Derinlemesine Analiz Et</span>
          </h1>

          <p className="text-sm sm:text-base text-[var(--cw-text-secondary)] mt-4 leading-relaxed">
            Klan etiketini girerek Clan Power Score, Town Hall kadro dengesi, savaş kazanma oranı ve tüm üyelerin gelişim seviyelerini tek tıkla görün.
          </p>
        </div>

        {/* CLAN SEARCH FORM */}
        <div className="max-w-xl mx-auto mb-16">
          <div className="cw-card p-6 sm:p-8 border-t-4 border-t-[var(--cw-blue)] shadow-[0_0_30px_rgba(59,130,246,0.15)]">
            <form action={handleSearch} className="space-y-4">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-[var(--cw-text-muted)] block mb-1">
                  Klan Etiketi (Clan Tag)
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="clanTag"
                    required
                    placeholder="Örn: #XYZ123ABC"
                    className="cw-input font-mono uppercase text-lg py-3 pl-10"
                  />
                  <Shield className="w-5 h-5 text-[var(--cw-text-muted)] absolute left-3 top-3.5" />
                </div>
              </div>
              
              <button type="submit" className="cw-btn-blue w-full justify-center text-base py-3.5 shadow-lg">
                <Search className="w-5 h-5" /> Klanı Analiz Et
              </button>
            </form>

            <div className="mt-4 pt-4 border-t border-[var(--cw-border)] text-xs text-[var(--cw-text-muted)] flex items-center justify-between">
              <span>Format: <code className="text-sky-300 font-mono"># ile başlayın</code></span>
              <span className="text-emerald-400 font-semibold">✓ Resmi API Verisi</span>
            </div>
          </div>
        </div>

        {/* CLAN FEATURES GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="cw-card p-6 border-t-2 border-t-blue-500">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center mb-4 font-bold">
              <Trophy className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-[var(--cw-text-primary)] mb-2">Clan Power Score</h3>
            <p className="text-xs text-[var(--cw-text-secondary)] leading-relaxed">
              Klan seviyesi, toplam kupa puanı, savaş kazanma serisi ve üye doluluğu ile hesaplanan 0-100 klan gücü.
            </p>
          </div>

          <div className="cw-card p-6 border-t-2 border-t-purple-500">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center mb-4 font-bold">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-[var(--cw-text-primary)] mb-2">Town Hall Dağılımı</h3>
            <p className="text-xs text-[var(--cw-text-secondary)] leading-relaxed">
              Klandaki üyelerin Town Hall seviyelerine göre görsel kadro dengesi ve CWL rotasyon analizi.
            </p>
          </div>

          <div className="cw-card p-6 border-t-2 border-t-emerald-500">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-4 font-bold">
              <Swords className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-[var(--cw-text-primary)] mb-2">Filtrelenebilir Üye Tablosu</h3>
            <p className="text-xs text-[var(--cw-text-secondary)] leading-relaxed">
              Tüm üyelerin kupaları, rolleri, bağış miktarları ve tek tıkla oyuncu analizi bağlantısı.
            </p>
          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
}
