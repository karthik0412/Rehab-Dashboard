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
            <span className="ml-1">{entry.value?.toFixed(1) ?? '0.0'}°</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export default function FlexionChart({ data, loading }) {
  const [history, setHistory] = useState([]);
  const [dataError, setDataError] = useState(false);

  useEffect(() => {
    console.log('[Flexion] New raw data:', data);

    try {
      if (data && typeof data === 'object') {
        const validData = {
          timestamp: Date.now(),  // Use current timestamp
          Thumb: Number(data.thumb || 0),
          Index: Number(data.index || 0),
          Middle: Number(data.middle || 0),
          Ring: Number(data.ring || 0),
          Pinky: Number(data.pinky || 0),
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
      console.error('[Flexion] Data processing error:', error);
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
          <p>Error processing flexion data</p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="bg-white rounded-lg shadow-card p-4 pb-2 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-neutral-900">Real-time Flexion Monitoring</h3>
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
            domain={[0, 180]}
            tick={{ fontSize: 10 }}
            label={{
              value: "Flexion (°)",
              angle: -90,
              position: "insideLeft",
              style: { textAnchor: "middle" },
              fontSize: 12,
            }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Line
            type="monotone"
            dataKey="Thumb"
            stroke="#8884d8"
            dot={false}
            isAnimationActive={false}
            strokeWidth={1.5}
          />
          <Line
            type="monotone"
            dataKey="Index"
            stroke="#82ca9d"
            dot={false}
            isAnimationActive={false}
            strokeWidth={1.5}
          />
          <Line
            type="monotone"
            dataKey="Middle"
            stroke="#ffc658"
            dot={false}
            isAnimationActive={false}
            strokeWidth={1.5}
          />
          <Line
            type="monotone"
            dataKey="Ring"
            stroke="#ff7300"
            dot={false}
            isAnimationActive={false}
            strokeWidth={1.5}
          />
          <Line
            type="monotone"
            dataKey="Pinky"
            stroke="#d0ed57"
            dot={false}
            isAnimationActive={false}
            strokeWidth={1.5}
          />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
}