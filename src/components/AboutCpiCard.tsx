import { Info } from "lucide-react";
import { useTranslation } from "react-i18next";
import GlassCard from "./GlassCard";

export default function AboutCpiCard() {
  const { t } = useTranslation();

  return (
    <GlassCard>
      <div className="flex items-start gap-4">
        {/* Icon */}
        <div className="shrink-0 mt-1">
          <Info size={28} className="text-indigo-600" />
        </div>

        {/* Text */}
        <div>
          <h2 className="text-xl font-semibold mb-2">
            {t("aboutCpiTitle")}
          </h2>
          <p className="leading-relaxed text-slate-700">
            {t("aboutCpiBody")}
          </p>
        </div>
      </div>
    </GlassCard>
  );
}
