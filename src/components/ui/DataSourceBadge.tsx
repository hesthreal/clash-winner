import type { DataSource } from "@/types/analytics";
import { Database, Cpu, Sparkles, CheckCircle2, AlertTriangle, HelpCircle } from "lucide-react";

interface DataSourceBadgeProps {
  source: DataSource;
  label?: string;
  size?: "sm" | "md";
}

export function DataSourceBadge({ source, label, size = "sm" }: DataSourceBadgeProps) {
  const config = getSourceConfig(source);
  const Icon = config.icon;

  const sizeClasses = size === "sm" 
    ? "text-[10px] px-2 py-0.5" 
    : "text-xs px-2.5 py-1";

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full font-semibold border ${config.bg} ${config.text} ${config.border} ${sizeClasses}`}
      title={config.tooltip}
    >
      <Icon className={size === "sm" ? "w-3 h-3" : "w-3.5 h-3.5"} />
      {label || config.defaultLabel}
    </span>
  );
}

function getSourceConfig(source: DataSource) {
  switch (source) {
    case "official_api":
      return {
        defaultLabel: "Resmi API",
        icon: CheckCircle2,
        bg: "bg-emerald-500/10",
        text: "text-emerald-400",
        border: "border-emerald-500/30",
        tooltip: "Bu veri doğrudan resmi Clash of Clans Developer API'sinden çekilmiştir.",
      };
    case "static_game_db":
      return {
        defaultLabel: "Oyun Veritabanı",
        icon: Database,
        bg: "bg-blue-500/10",
        text: "text-blue-400",
        border: "border-blue-500/30",
        tooltip: "Bu veri uygulamamızın static oyun veritabanından (max level kapsama alanı) alınmıştır.",
      };
    case "calculated":
      return {
        defaultLabel: "Hesaplanmış Veri",
        icon: Cpu,
        bg: "bg-amber-500/10",
        text: "text-amber-400",
        border: "border-amber-500/30",
        tooltip: "Bu veri API verisi ve oyun veritabanımız birleştirilerek algoritma ile hesaplanmıştır.",
      };
    case "ai_generated":
      return {
        defaultLabel: "AI Üretimi",
        icon: Sparkles,
        bg: "bg-purple-500/10",
        text: "text-purple-400",
        border: "border-purple-500/30",
        tooltip: "Bu analiz/açıklama doğrulanmış structured veriler üzerinden AI tarafından üretilmiştir.",
      };
    case "partial":
      return {
        defaultLabel: "Kısmi Tahmin",
        icon: AlertTriangle,
        bg: "bg-orange-500/10",
        text: "text-orange-400",
        border: "border-orange-500/30",
        tooltip: "Resmi API bazı verileri sağlamadığı için bu hesaplama kısmi varsayımlara dayanır.",
      };
    case "unavailable":
    default:
      return {
        defaultLabel: "API Desteklemiyor",
        icon: HelpCircle,
        bg: "bg-slate-500/10",
        text: "text-slate-400",
        border: "border-slate-500/30",
        tooltip: "Resmi Clash of Clans API'si bu veri kategorisini (örn. bina/savunma seviyeleri) sağlamamaktadır.",
      };
  }
}
