import { Card } from "@/components/ui/card";

export default function MetricCard({
  title = "Metric",
  value = 0,
  unit = "",
  icon = "monitor_heart",
  iconBgColor = "bg-blue-100",
  iconColor = "text-blue-600",
  changeValue,
  changeDirection
}) {
  const safeValue = typeof value === 'number' ? value : parseFloat(value) || 0;
  
  return (
    <Card className="metric-card bg-white rounded-lg shadow-card p-4 border-0">
      <div className="flex items-start">
        <div className={`flex items-center justify-center w-10 h-10 rounded-full ${iconBgColor} mr-3`}>
          <span className={`material-icons ${iconColor}`}>{icon}</span>
        </div>
        <div className="flex-1">
          <h3 className="text-sm font-medium text-neutral-600">{title}</h3>
          <div className="flex items-baseline mt-1">
            <p className="text-2xl font-semibold text-neutral-900">
              {safeValue.toFixed(1)}{unit}
            </p>
            {changeValue && (
              <span className={`ml-2 text-xs font-medium ${
                changeDirection === "up" ? "text-green-600" : "text-red-600"
              }`}>
                <span className="flex items-center">
                  {changeDirection === "up" ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-trend-up mr-0.5"><path d="m3 3 7.07 16.97 2.51-7.39 7.39-2.51L3 3z"/><path d="m13 13 6 6"/><path d="m13 19h6v-6"/></svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-trend-down mr-0.5"><path d="m3 3 7.07 16.97 2.51-7.39 7.39-2.51L3 3z"/><path d="m13 13 6 6"/><path d="m19 13v6h-6"/></svg>
                  )}
                  {changeValue}%
                </span>
              </span>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}