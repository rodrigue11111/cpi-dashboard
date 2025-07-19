import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { useTranslation } from "react-i18next";
import useCpiData from "../hooks/useCpiData";

export default function LineCpiChart() {
  const data = useCpiData();
  const { t, i18n } = useTranslation();

  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart
        data={data}
        margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
      >
        <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.15} />

        {/* X-axis: month & year */}
        <XAxis
          dataKey="date"
          tickFormatter={(d: Date) =>
            d.toLocaleDateString(i18n.language, { month: "short", year: "2-digit" })
          }
          minTickGap={20}
        />

        {/* Y-axis: percent */}
        <YAxis
          tickFormatter={(v: number) => `${v.toFixed(0)}%`}
          domain={["auto", "auto"]}
        />

        {/* Tooltip with localized date */}
        <Tooltip
          labelFormatter={(label: Date) =>
            label.toLocaleDateString(i18n.language, {
              month: "long",
              year: "numeric",
            })
          }
          formatter={(v: number) => `${v.toFixed(1)}%`}
        />

        {/* Food CPI line */}
        <Line
          type="monotone"
          dataKey="food"
          name={t("foodCpi")}
          stroke="#2563eb"
          strokeWidth={2}
          dot={{ r: 3 }}
          activeDot={{ r: 5 }}
        />

        {/* All-items CPI line */}
        <Line
          type="monotone"
          dataKey="all"
          name={t("allItemsCpi")}
          stroke="#64748b"
          strokeDasharray="4 2"
          strokeWidth={2}
          dot={{ r: 3 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
