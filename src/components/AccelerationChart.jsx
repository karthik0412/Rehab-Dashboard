// AccelerationChart.jsx
import { useMemo } from "react";
import { Card } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { Skeleton } from "@/components/ui/skeleton";

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 border border-neutral-200 shadow-sm rounded-md text-xs">
        <p className="font-semibold mb-1">{payload[0]?.payload?.time || 'Unknown time'}</p>
        {payload.map((entry) => (
          <div key={entry.name} className="flex items-center">
            <div
              className="w-2 h-2 rounded-full mr-2"
              style={{ backgroundColor: entry.color }}
            />
            <span className="font-medium">{entry.name}:</span>
            <span className="ml-1">{entry.value?.toFixed(2) ?? '0.00'} m/s²</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export default function AccelerationChart({ data = [], loading }) {
  const chartData = useMemo(() => {
    if (!Array.isArray(data)) return [];
    return data.map((entry) => ({
      ...entry,
      time: new Date(entry.timestamp).toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      }),
    }));
  }, [data]);

  const yAxisDomain = useMemo(() => {
    if (chartData.length === 0) return ['auto', 'auto'];
    const values = chartData.flatMap(({ x, y, z }) => [x, y, z]);
    const min = Math.min(...values);
    const max = Math.max(...values);
    return [Math.floor(min) - 1, Math.ceil(max) + 1];
  }, [chartData]);

  if (loading) {
    return (
      <Card className="bg-white rounded-lg shadow-card p-4 pb-2 mb-6">
        <Skeleton className="w-full h-[300px]" />
      </Card>
    );
  }

  return (
    <Card className="bg-white rounded-lg shadow-card p-4 pb-2 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-neutral-900">Real-time Acceleration Data</h3>
        <span className="text-xs text-neutral-500">{chartData.length} readings</span>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="time" tick={{ fontSize: 10 }} label={{ value: "Time", offset: -5, position: "insideBottom", fontSize: 12 }} />
          <YAxis domain={yAxisDomain} tick={{ fontSize: 10 }} label={{ value: "Acceleration (m/s²)", angle: -90, position: "insideLeft", fontSize: 12, style: { textAnchor: "middle" } }} />
          <Tooltip content={<CustomTooltip />} />
          <Line type="monotone" dataKey="x" stroke="#8884d8" name="X-axis" dot={false} isAnimationActive={false} strokeWidth={1.5} />
          <Line type="monotone" dataKey="y" stroke="#82ca9d" name="Y-axis" dot={false} isAnimationActive={false} strokeWidth={1.5} />
          <Line type="monotone" dataKey="z" stroke="#ffc658" name="Z-axis" dot={false} isAnimationActive={false} strokeWidth={1.5} />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
}