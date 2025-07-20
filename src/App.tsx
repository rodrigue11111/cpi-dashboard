import { useState } from "react";
import { Languages } from "lucide-react";
import { useTranslation } from "react-i18next";
import i18n from "./i18n";

import GlassCard from "./components/GlassCard";
import LineCpiChart from "./components/LineCpiChart";
import BarCpiSnapshot from "./components/BarCpiSnapshot";
import AboutCpiCard from "./components/AboutCpiCard";
import useCpiData from "./hooks/useCpiData";

export default function App() {
  const { t } = useTranslation();
  const data = useCpiData();

  // default month
  const [month, setMonth] = useState("2023-05");

  // build dropdown list
  const months = Array.from(
    new Set(data.map((d) => d.date.toISOString().slice(0, 7)))
  );

  return (
    <main className="max-w-6xl mx-auto px-6 py-12 space-y-10">
      {/* ---------- HERO ---------- */}
      <section className="text-center space-y-4">
        <h1 className="text-5xl font-playfair font-bold text-slate-800">
          {t("title")}
        </h1>
        <p className="text-slate-600">{t("subtitle")}</p>

        {/* language pills */}
        <div className="inline-flex items-center gap-2">
          <Languages size={18} className="text-slate-400" />
          {["en", "fr"].map((lng) => (
            <button
              key={lng}
              onClick={() => {
                i18n.changeLanguage(lng);
                localStorage.setItem("lang", lng);
              }}
              className={`px-3 py-1 rounded-full text-sm border transition
                ${
                  i18n.language === lng
                    ? "bg-indigo-600 text-white border-indigo-600 shadow"
                    : "bg-white/70 text-slate-700 backdrop-blur border-slate-300 hover:bg-indigo-50"
                }`}
            >
              {lng.toUpperCase()}
            </button>
          ))}
        </div>
      </section>

      {/* ---------- ABOUT CPI ---------- */}
      <AboutCpiCard />

      {/* ---------- LINE CHART ---------- */}
      <GlassCard>
        <h2 className="text-xl font-semibold mb-4">{t("lineChartTitle")}</h2>
        <LineCpiChart />
      </GlassCard>

      {/* ---------- MONTH SELECT + BAR CHART ---------- */}
      <div className="space-y-4">
        <label className="block text-sm font-medium text-slate-700">
          {t("selectMonth")}
        </label>

        <select
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          className="w-full sm:w-60 appearance-none px-4 py-2 pr-10 rounded-full border
                     border-slate-300 bg-white/80 backdrop-blur shadow
                     focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          {months.map((m) => (
            <option key={m} value={m}>
              {new Date(m).toLocaleDateString(i18n.language, {
                month: "long",
                year: "numeric",
              })}
            </option>
          ))}
        </select>

        <GlassCard>
          <h2 className="text-xl font-semibold mb-4">
            {t("barChartTitle", { month })}
          </h2>
          <BarCpiSnapshot selectedMonth={month} />
        </GlassCard>
      </div>

      {/* ---------- FOOTER LINK TO my PORTFOLIO ---------- */}
      <footer className="text-center text-xs text-slate-500 pt-10">
        <a
          href="https://rodrigue11111.github.io/my-portfolio/"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-indigo-600"
        >
          {t("portfolioLink")}
        </a>
      </footer>
    </main>
  );
}
