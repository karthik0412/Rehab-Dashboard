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
            <span className="ml-1">{entry.value?.toFixed(2) ?? '0.00'}°/s</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export default function GyroscopeData({ data, loading }) {
  const [history, setHistory] = useState([]);
  const [dataError, setDataError] = useState(false);

  useEffect(() => {
    console.log('[Gyroscope] New raw data:', data);

    try {
      if (Array.isArray(data) && data.length > 0) {
        const latestEntry = data[data.length - 1];
        
        const validData = {
          timestamp: latestEntry.timestamp || Date.now(),
          x: Number(latestEntry.x) || 0,
          y: Number(latestEntry.y) || 0,
          z: Number(latestEntry.z) || 0,
        };

        const timeStr = new Date(validData.timestamp).toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        });

        setHistory(prev => {
          const newHistory = [...prev, {
            time: timeStr,
            ...validData
          }].slice(-50);  // Keep last 50 entries
          return newHistory;
        });
        
        setDataError(false);
      }
    } catch (error) {
      console.error('[Gyroscope] Data processing error:', error);
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
          <p>Error processing gyroscope data</p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="bg-white rounded-lg shadow-card p-4 pb-2 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-neutral-900">Real-time Gyroscope Data</h3>
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
              value: "Angular Velocity (°/s)",
              angle: -90,
              position: "insideLeft",
              style: { textAnchor: "middle" },
              fontSize: 12,
            }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Line
            type="monotone"
            dataKey="x"
            stroke="#8884d8"
            name="X-axis"
            dot={false}
            isAnimationActive={false}
            strokeWidth={1.5}
          />
          <Line
            type="monotone"
            dataKey="y"
            stroke="#82ca9d"
            name="Y-axis"
            dot={false}
            isAnimationActive={false}
            strokeWidth={1.5}
          />
          <Line
            type="monotone"
            dataKey="z"
            stroke="#ffc658"
            name="Z-axis"
            dot={false}
            isAnimationActive={false}
            strokeWidth={1.5}
          />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
}