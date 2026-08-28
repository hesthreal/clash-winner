import { Metadata } from "next";
import { Header, Footer } from "@/components/layout/HeaderFooter";
import { BookOpen, Flame, Award, Shield, Swords, Sparkles, Layers, CheckCircle2, ArrowRight } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Strateji & Gelişim Rehberleri — ClashWinner",
  description: "Clash of Clans Town Hall geliştirme öncelikleri, rush kurtarma rehberi, Hero Equipment öncelikleri ve savaş stratejileri.",
};

export default function GuidesPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--cw-bg-base)]">
      <Header />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        
        {/* Header */}
        <div className="cw-card p-8 border-l-4 border-l-[var(--cw-gold)] bg-gradient-to-r from-[var(--cw-bg-card)] via-[var(--cw-bg-surface)] to-[var(--cw-bg-card)]">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center font-bold">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-4xl font-extrabold text-[var(--cw-text-primary)]">
                Clash of Clans Strateji & Gelişim Rehberleri
              </h1>
              <p className="text-xs sm:text-sm text-[var(--cw-text-secondary)] mt-1">
                Köyünüzü en verimli şekilde maxlamak ve savaşlarda 3 yıldız almak için uzman tavsiyeleri
              </p>
            </div>
          </div>
        </div>

        {/* GUIDES GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Guide 1: Upgrade Priority */}
          <div className="cw-card p-6 space-y-4 border-t-2 border-t-amber-500">
            <div className="flex items-center justify-between">
              <span className="cw-badge cw-badge-gold text-[10px]">GELİŞİM STRATEJİSİ</span>
              <span className="text-[11px] font-mono text-[var(--cw-text-muted)]">5 Dakika Okuma</span>
            </div>

            <h2 className="text-xl font-bold text-[var(--cw-text-primary)]">
              Town Hall Yükseltme Sırası & Öncelik Rehberi
            </h2>

            <p className="text-xs text-[var(--cw-text-secondary)] leading-relaxed">
              Yeni bir Town Hall seviyesine geçtiğinizde inşaatçılarınızı ve laboratuvarınızı nasıl kullanmalısınız? En yüksek verim sağlayan sıralama:
            </p>

            <ul className="space-y-2 text-xs text-[var(--cw-text-primary)]">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>1. Laboratuvar & Klan Kalesi:</strong> İksir ve ordu kapasitenizi anında artırır.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>2. Kahramanlar & Hero Hall:</strong> Saldırı gücünüzün %40&apos;ını kahramanlar oluşturur.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>3. Ordu Kampları & Blacksmith:</strong> Ordu sayısını ve Hero Equipment kaplarını artırır.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>4. Kilit Savunmalar:</strong> Giga Infernolar, Eagle Artillery ve Scattershot.</span>
              </li>
            </ul>
          </div>

          {/* Guide 2: Hero Equipment */}
          <div className="cw-card p-6 space-y-4 border-t-2 border-t-purple-500">
            <div className="flex items-center justify-between">
              <span className="cw-badge cw-badge-purple text-[10px]">HERO EQUIPMENT</span>
              <span className="text-[11px] font-mono text-[var(--cw-text-muted)]">4 Dakika Okuma</span>
            </div>

            <h2 className="text-xl font-bold text-[var(--cw-text-primary)]">
              Hero Equipment Cevher (Ore) Harcama Önceliği
            </h2>

            <p className="text-xs text-[var(--cw-text-secondary)] leading-relaxed">
              Starry Ore ve Glowy Ore kaynakları sınırlıdır. Hangi ekipmanlara öncelik vermelisiniz?
            </p>

            <div className="space-y-3 text-xs">
              <div className="bg-[var(--cw-bg-elevated)] p-3 rounded-lg border border-[var(--cw-border)]">
                <div className="font-bold text-amber-300">Barbarian King:</div>
                <div className="text-[var(--cw-text-secondary)]">Giant Gauntlet (Epic) & Spiky Ball (Epic) önceliklidir.</div>
              </div>

              <div className="bg-[var(--cw-bg-elevated)] p-3 rounded-lg border border-[var(--cw-border)]">
                <div className="font-bold text-sky-300">Archer Queen:</div>
                <div className="text-[var(--cw-text-secondary)]">Action Figure (Epic) & Frozen Arrow (Epic) en yüksek meta skoruna sahiptir.</div>
              </div>

              <div className="bg-[var(--cw-bg-elevated)] p-3 rounded-lg border border-[var(--cw-border)]">
                <div className="font-bold text-purple-300">Grand Warden:</div>
                <div className="text-[var(--cw-text-secondary)]">Eternal Tome (Common max lvl 18) & Fireball (Epic).</div>
              </div>
            </div>
          </div>

          {/* Guide 3: Rush Recovery */}
          <div className="cw-card p-6 space-y-4 border-t-2 border-t-orange-500">
            <div className="flex items-center justify-between">
              <span className="cw-badge cw-badge-red text-[10px]">RUSH KURTARMA</span>
              <span className="text-[11px] font-mono text-[var(--cw-text-muted)]">6 Dakika Okuma</span>
            </div>

            <h2 className="text-xl font-bold text-[var(--cw-text-primary)]">
              Rushed (Erken Yükseltilmiş) Köyü Toparlama Rehberi
            </h2>

            <p className="text-xs text-[var(--cw-text-secondary)] leading-relaxed">
              Köyünüz yüksek Rush Skoru verdiyse endişelenmeyin! Adım adım dengelenme stratejisi:
            </p>

            <ol className="space-y-2 text-xs text-[var(--cw-text-primary)] list-decimal pl-4">
              <li><strong>Town Hall Yükseltmeyi Durdurun:</strong> Kahramanlar ve ana ordunuz maxlanana kadar TH yükseltmeyin.</li>
              <li><strong>Tek Bir Ana Ordu Seçin:</strong> Laboratuvarda sadece 1 kupa/ganimet ordusunu max seviyeye getirin.</li>
              <li><strong>Kahramanları Kesintisiz Yükseltin:</strong> İnşaatçıların en az 2 tanesini sürekli kahramanlara ayırın.</li>
              <li><strong>Ganimet Çiftçiliği (Farming):</strong> Sneaky Goblin kullanarak ganimeti hızla toplayın.</li>
            </ol>
          </div>

          {/* Guide 4: CWL Strategy */}
          <div className="cw-card p-6 space-y-4 border-t-2 border-t-blue-500">
            <div className="flex items-center justify-between">
              <span className="cw-badge cw-badge-blue text-[10px]">CWL & SAVAŞ</span>
              <span className="text-[11px] font-mono text-[var(--cw-text-muted)]">5 Dakika Okuma</span>
            </div>

            <h2 className="text-xl font-bold text-[var(--cw-text-primary)]">
              Klan Savaş Ligi (CWL) Kadro & Saldırı Stratejisi
            </h2>

            <p className="text-xs text-[var(--cw-text-secondary)] leading-relaxed">
              CWL liglerinde maksimum madalya ve terfi almak için dikkat edilmesi gerekenler:
            </p>

            <ul className="space-y-2 text-xs text-[var(--cw-text-primary)]">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                <span><strong>TH Eşleşme Analizi:</strong> Rakip yüksek TH ise 2 Yıldız emniyet stratejisi uygulayın.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                <span><strong>Saldırı Haklarını Ziyan Etmeyin:</strong> %100 katılım lig terfisinde en kritik faktördür.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                <span><strong>Hero Equipment Kontrolü:</strong> Savaş öncesi kahraman ekipman seviyelerini kontrol edin.</span>
              </li>
            </ul>
          </div>

        </div>

      </main>

      <Footer />
    </div>
  );
}
