import Link from "next/link";
import { ShieldAlert, Zap, Users, BookOpen, Compass, Swords } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-50 cw-glass border-b border-[var(--cw-border)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--cw-gold-dark)] to-[var(--cw-gold)] flex items-center justify-center font-bold text-slate-950 text-xl shadow-[0_0_12px_rgba(245,200,66,0.3)] group-hover:scale-105 transition-transform">
            CW
          </div>
          <div>
            <span className="font-bold text-xl tracking-tight cw-gradient-text">
              ClashWinner
            </span>
            <span className="text-[10px] block font-mono text-[var(--cw-text-muted)] -mt-1">
              KÖY & KLAN ANALİZİ
            </span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-[var(--cw-text-secondary)]">
          <Link href="/" className="hover:text-[var(--cw-gold)] transition-colors flex items-center gap-1.5">
            <Zap className="w-4 h-4" /> Köy Analizörü
          </Link>
          <Link href="/clan" className="hover:text-[var(--cw-blue-light)] transition-colors flex items-center gap-1.5">
            <Users className="w-4 h-4" /> Klan Analizörü
          </Link>
          <Link href="/compare" className="hover:text-[var(--cw-gold-light)] transition-colors flex items-center gap-1.5">
            <Swords className="w-4 h-4" /> Karşılaştırma
          </Link>
          <Link href="/meta/th18" className="hover:text-[var(--cw-purple-light)] transition-colors flex items-center gap-1.5">
            <Compass className="w-4 h-4" /> Meta Merkezi
          </Link>
          <Link href="/guides" className="hover:text-[var(--cw-text-primary)] transition-colors flex items-center gap-1.5">
            <BookOpen className="w-4 h-4" /> Rehberler
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <Link href="/#analyzer" className="cw-btn-primary text-xs sm:text-sm py-2 px-4">
            Analiz Et
          </Link>
        </div>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-[var(--cw-border)] bg-[var(--cw-bg-surface)] py-10 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[var(--cw-gold-dark)] to-[var(--cw-gold)] flex items-center justify-center font-bold text-slate-950 text-sm">
                CW
              </div>
              <span className="font-bold text-lg cw-gradient-text">ClashWinner</span>
            </div>
            <p className="text-xs text-[var(--cw-text-muted)] leading-relaxed">
              Clash of Clans köy ve klan analiz platformu. Oyuncu gelişimini, savaş hazırlığını ve metayı AI destekli motorumuzla inceleyin.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--cw-text-primary)] mb-3">
              Platform
            </h4>
            <ul className="space-y-2 text-xs text-[var(--cw-text-secondary)]">
              <li><Link href="/" className="hover:text-[var(--cw-gold)]">Köy Analizörü</Link></li>
              <li><Link href="/clan" className="hover:text-[var(--cw-gold)]">Klan Analizörü</Link></li>
              <li><Link href="/compare" className="hover:text-[var(--cw-gold)]">Oyuncu Karşılaştırma</Link></li>
              <li><Link href="/meta/th18" className="hover:text-[var(--cw-gold)]">Meta Stratejileri</Link></li>
              <li><Link href="/guides" className="hover:text-[var(--cw-gold)]">Gelişim Rehberleri</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--cw-text-primary)] mb-3">
              Town Hall Metaları
            </h4>
            <ul className="space-y-2 text-xs text-[var(--cw-text-secondary)]">
              <li><Link href="/meta/th18" className="hover:text-[var(--cw-gold)]">Town Hall 18 Meta</Link></li>
              <li><Link href="/meta/th17" className="hover:text-[var(--cw-gold)]">Town Hall 17 Meta</Link></li>
              <li><Link href="/meta/th16" className="hover:text-[var(--cw-gold)]">Town Hall 16 Meta</Link></li>
              <li><Link href="/meta/th15" className="hover:text-[var(--cw-gold)]">Town Hall 15 Meta</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--cw-text-primary)] mb-3">
              Veri Şeffaflığı
            </h4>
            <p className="text-xs text-[var(--cw-text-muted)] leading-relaxed mb-2">
              Tüm oyuncu verileri resmi Clash of Clans Developer API üzerinden alınır. Hesaplamalar kendi skor analiz motorumuz ile yapılır.
            </p>
          </div>
        </div>

        {/* Supercell Fan Content Disclaimer */}
        <div className="pt-6 border-t border-[var(--cw-border)] flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-[11px] text-[var(--cw-text-muted)]">
          <div className="flex items-start gap-2 max-w-3xl">
            <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <p>
              This content is not affiliated with, endorsed, sponsored, or specifically approved by Supercell and Supercell is not responsible for it. For more information see Supercell&apos;s Fan Content Policy: <a href="https://supercell.com/en/fan-content-policy/" target="_blank" rel="noopener noreferrer" className="underline hover:text-amber-300">www.supercell.com/en/fan-content-policy</a>.
            </p>
          </div>
          <div className="shrink-0 text-right font-mono text-[10px]">
            © 2026 ClashWinner Intel System
          </div>
        </div>
      </div>
    </footer>
  );
}
