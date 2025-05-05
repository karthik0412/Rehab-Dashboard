import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  CartesianGrid,
  Tooltip,
  Label,
} from "recharts";
import { Skeleton } from "@/components/ui/skeleton";

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 border border-neutral-200 shadow-sm rounded-md text-xs">
        <p className="font-semibold mb-1">{payload[0]?.payload?.time || 'Unknown time'}</p>
        <div className="flex items-center">
          <div className="w-2 h-2 rounded-full mr-2 bg-orange-500" />
          <span className="font-medium">Force:</span>
          <span className="ml-1">{payload[0].value?.toFixed(2) ?? '0.00'} N</span>
        </div>
      </div>
    );
  }
  return null;
};

export default function ForceChart({ data, loading }) {
  const [history, setHistory] = useState([]);
  const [dataError, setDataError] = useState(false);

  useEffect(() => {
    try {
      if (Array.isArray(data)) {
        const newHistory = data.map(entry => {
          const date = new Date(entry.timestamp);
          const timeStr = date.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: false,
          });

          return {
            time: timeStr,
            force: parseFloat(entry.force) || 0
          };
        });

        setHistory(newHistory.slice(-50)); // Keep last 50 points
        setDataError(false);
      }
    } catch (error) {
      console.error("[ForceChart] Data processing error:", error);
      setDataError(true);
    }
  }, [data]);

  if (loading) {
    return (
      <Card className="bg-white rounded-lg shadow-card p-4 pb-2 mb-6">
        <Skeleton className="w-full h-[300px]" />
      </Card>
    );
  }

  if (dataError) {
    return (
      <Card className="bg-white rounded-lg shadow-card p-4 pb-2 mb-6">
        <div className="h-[300px] flex items-center justify-center text-red-500">
          <p>Error processing force data</p>
        </div>
      </Card>
    );
  }

  if (history.length === 0) {
    return (
      <Card className="bg-white rounded-lg shadow-card p-4 pb-2 mb-6">
        <div className="h-[300px] flex items-center justify-center">
          <p className="text-neutral-500">Waiting for force data...</p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="bg-white rounded-lg shadow-card p-4 pb-2 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-neutral-900">Real-time Force Sensor Data</h3>
        <span className="text-xs text-neutral-500">
          {history.length} readings
        </span>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={history}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis
            dataKey="time"
            tick={{ fontSize: 10 }}
            interval="preserveEnd"
            label={{
              value: "Time",
              offset: -5,
              position: "insideBottom",
              fontSize: 12,
            }}
          />
          <YAxis
            domain={['auto', 'auto']}
            tick={{ fontSize: 10 }}
            label={{
              value: "Force (N)",
              angle: -90,
              position: "insideLeft",
              style: { textAnchor: "middle" },
              fontSize: 12,
            }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Line
            type="monotone"
            dataKey="force"
            stroke="#fb923c"
            name="Force"
            dot={false}
            isAnimationActive={false}
            strokeWidth={1.5}
          />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
}