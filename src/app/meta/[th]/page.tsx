import { Metadata } from "next";
import { Header, Footer } from "@/components/layout/HeaderFooter";
import { DataSourceBadge } from "@/components/ui/DataSourceBadge";
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
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold shrink-0 transition-colors ${
                level === thLevel
                  ? "bg-[var(--cw-gold)] text-slate-950 shadow-[0_0_12px_rgba(245,200,66,0.3)]"
                  : "bg-[var(--cw-bg-elevated)] text-[var(--cw-text-secondary)] hover:text-white"
              }`}
            >
              TH {level}
            </Link>
          ))}
        </div>

        {/* Header Summary */}
        <div className="cw-card p-6 border-l-4 border-l-[var(--cw-purple)] bg-gradient-to-r from-[var(--cw-bg-card)] via-[var(--cw-bg-surface)] to-[var(--cw-bg-card)]">
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-[var(--cw-text-primary)]">
                  Town Hall {thLevel} Meta Stratejileri
                </h1>
                <DataSourceBadge source="static_game_db" label="Meta Veritabanı" />
              </div>
              <p className="text-xs text-[var(--cw-text-secondary)] max-w-2xl">
                Ağustos 2026 oyun sürümüne göre TH{thLevel} seviyesinde en çok kazandıran saldırı orduları ve Hero Equipment kombinasyonları.
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
              <Swords className="w-5 h-5 text-amber-400" /> TH{thLevel} En Güçlü Meta Orduları
            </h2>
            <span className="text-xs text-[var(--cw-text-muted)]">3 Yıldız Saldırı Stratejileri</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Army 1 */}
            <div className="cw-card p-6 space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-lg text-[var(--cw-text-primary)]">
                      Root Rider & Druid Ezici Saldırı (Smash)
                    </h3>
                    <span className="cw-badge cw-badge-gold text-[10px]">SAVAŞ & CWL</span>
                  </div>
                  <p className="text-xs text-[var(--cw-text-muted)]">Kara Tipi / Yüksek Dayanıklılık</p>
                </div>
                <div className="text-right">
                  <div className="text-sm font-extrabold font-mono text-amber-400">96/100</div>
                  <div className="text-[10px] text-[var(--cw-text-muted)]">Meta Skoru</div>
                </div>
              </div>

              <div className="bg-[var(--cw-bg-elevated)] p-3 rounded-lg border border-[var(--cw-border)] text-xs space-y-2">
                <div>
                  <span className="font-semibold text-amber-300">Ordu Kadrosu:</span>
                  <span className="text-[var(--cw-text-secondary)] ml-2">
                    8x Kök Binici (Root Rider), 4x Büyücü Kızı (Druid), 2x Çırak Warden, 6x Kaya Atıcı (Bowler), 3x Süper Duvar Yıkıcı
                  </span>
                </div>
                <div>
                  <span className="font-semibold text-purple-300">Büyüler:</span>
                  <span className="text-[var(--cw-text-secondary)] ml-2">
                    3x Öfke Büyüsü, 2x Sarmaşık Büyüsü (Overgrowth), 2x Dondurma Büyüsü
                  </span>
                </div>
                <div>
                  <span className="font-semibold text-sky-300">Kuşatma Makinesi:</span>
                  <span className="text-[var(--cw-text-secondary)] ml-2">
                    Kuşatma Kışlası (İçinde Yeti + Bowler)
                  </span>
                </div>
              </div>

              <div className="text-xs text-[var(--cw-text-secondary)] leading-relaxed">
                <strong>Saldırı Adımları:</strong> Kuşatma Kışlası ile bir kanadı temizleyin. Kök Biniciler ile merkeze girip Overgrowth büyüsü ile kritik savunmaları dondurun. Druid iyileştirmesi ile kahramanlarınızı koruyun.
              </div>
            </div>

            {/* Army 2 */}
            <div className="cw-card p-6 space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-lg text-[var(--cw-text-primary)]">
                      Süper Ejderha & Şimşek Laloon
                    </h3>
                    <span className="cw-badge cw-badge-blue text-[10px]">HAVA / KUPA KASMA</span>
                  </div>
                  <p className="text-xs text-[var(--cw-text-muted)]">Hava Tipi / Temizlik Saldırısı</p>
                </div>
                <div className="text-right">
                  <div className="text-sm font-extrabold font-mono text-sky-400">92/100</div>
                  <div className="text-[10px] text-[var(--cw-text-muted)]">Meta Skoru</div>
                </div>
              </div>

              <div className="bg-[var(--cw-bg-elevated)] p-3 rounded-lg border border-[var(--cw-border)] text-xs space-y-2">
                <div>
                  <span className="font-semibold text-amber-300">Ordu Kadrosu:</span>
                  <span className="text-[var(--cw-text-secondary)] ml-2">
                    5x Süper Ejderha, 14x Balon, 3x Bebek Ejderha, 4x Dalkavuk (Minion)
                  </span>
                </div>
                <div>
                  <span className="font-semibold text-purple-300">Büyüler:</span>
                  <span className="text-[var(--cw-text-secondary)] ml-2">
                    6x Şimşek Büyüsü, 1x Deprem Büyüsü, 3x Dondurma Büyüsü
                  </span>
                </div>
                <div>
                  <span className="font-semibold text-sky-300">Kuşatma Makinesi:</span>
                  <span className="text-[var(--cw-text-secondary)] ml-2">
                    Savaş Balonu (İçinde Süper Büyücü)
                  </span>
                </div>
              </div>

              <div className="text-xs text-[var(--cw-text-secondary)] leading-relaxed">
                <strong>Saldırı Adımları:</strong> Şimşek + Deprem ile 1 Hava Savunması veya Inferno kulesini imha edin. Savaş Balonu ile belediye binasını indirin, hava ordusu ile kalan köyü temizleyin.
              </div>
            </div>

          </div>
        </div>

        {/* RECOMMENDED HERO EQUIPMENT */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-[var(--cw-text-primary)] flex items-center gap-2">
              <Award className="w-5 h-5 text-purple-400" /> TH{thLevel} Tavsiye Edilen Hero Equipment Kombinasyonları
            </h2>
            <span className="text-xs text-[var(--cw-text-muted)]">Savaş Metası</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            <div className="cw-card p-4 space-y-2 border-t-2 border-t-amber-500">
              <div className="text-xs font-bold text-amber-300">Barbarian King</div>
              <div className="text-sm font-extrabold text-[var(--cw-text-primary)]">
                Giant Gauntlet + Spiky Ball
              </div>
              <p className="text-[11px] text-[var(--cw-text-muted)]">
                Alan hasarı ve devasa can desteği. En popüler savaş kombinasyonu.
              </p>
            </div>

            <div className="cw-card p-4 space-y-2 border-t-2 border-t-sky-500">
              <div className="text-xs font-bold text-sky-300">Archer Queen</div>
              <div className="text-sm font-extrabold text-[var(--cw-text-primary)]">
                Action Figure + Frozen Arrow
              </div>
              <p className="text-[11px] text-[var(--cw-text-muted)]">
                Düşman savunmalarını yavaşlatır ve devasa doğrudan hasar verir.
              </p>
            </div>

            <div className="cw-card p-4 space-y-2 border-t-2 border-t-purple-500">
              <div className="text-xs font-bold text-purple-300">Grand Warden</div>
              <div className="text-sm font-extrabold text-[var(--cw-text-primary)]">
                Eternal Tome + Fireball
              </div>
              <p className="text-[11px] text-[var(--cw-text-muted)]">
                Merkez binaları Fireball ile patlatıp Eternal Tome ile koruma sağlayın.
              </p>
            </div>

            <div className="cw-card p-4 space-y-2 border-t-2 border-t-emerald-500">
              <div className="text-xs font-bold text-emerald-300">Royal Champion</div>
              <div className="text-sm font-extrabold text-[var(--cw-text-primary)]">
                Seeking Shield + Electro Boots
              </div>
              <p className="text-[11px] text-[var(--cw-text-muted)]">
                Hızlı temizlik ve savunma imha odaklı kombinasyon.
              </p>
            </div>

          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
}
