import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { useTranslation } from "react-i18next";
import useCpiData from "../hooks/useCpiData";

interface Props {
  selectedMonth: string; // e.g. "2023-05"
}

export default function BarCpiSnapshot({ selectedMonth }: Props) {
  const data = useCpiData();
  const { t, i18n } = useTranslation();

  // find the matching month
  const point = data.find(
    (d) => d.date.toISOString().slice(0, 7) === selectedMonth
  );

  if (!point) {
    return (
      <p className="text-center text-sm text-red-500">
        {t("noData")} {selectedMonth}
      </p>
    );
  }

  const chartData = [
    { name: t("foodCpi"), value: point.food },
    { name: t("allItemsCpi"), value: point.all },
  ];

  return (
    <ResponsiveContainer width="100%" height={250}>
      <BarChart
        data={chartData}
        margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
      >
        <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.15} />
        <XAxis dataKey="name" tick={{ fontSize: 12 }} />
        <YAxis tickFormatter={(v) => `${v.toFixed(0)}%`} />
        <Tooltip formatter={(v: number) => `${v.toFixed(1)}%`} />
        <Bar dataKey="value" fill="#60a5fa" radius={[6, 6, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
