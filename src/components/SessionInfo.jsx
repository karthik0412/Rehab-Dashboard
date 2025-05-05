import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function SessionInfo({ sessionData, onEndSession, loading }) {
  return (
    <Card className="bg-white rounded-lg shadow-card p-4 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-neutral-900">Current Session</h3>
        <button
          onClick={onEndSession}
          className="bg-red-50 text-red-600 px-3 py-1 rounded text-sm font-medium hover:bg-red-100 transition-colors"
        >
          End Session
        </button>
      </div>
      
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-16 w-full" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-neutral-50 rounded-md p-3 border border-neutral-100">
            <div className="flex items-center mb-1">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-timer text-primary mr-2"><path d="M10 2h4"/><path d="M12 14v-4"/><path d="M12 14v-4"/><circle cx="12" cy="14" r="8"/></svg>
              <span className="text-sm font-medium text-neutral-600">Duration</span>
            </div>
            <p className="text-lg font-semibold text-neutral-900">{sessionData?.duration || "00:00"}</p>
          </div>
          
          <div className="bg-neutral-50 rounded-md p-3 border border-neutral-100">
            <div className="flex items-center mb-1">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-activity text-primary mr-2"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
              <span className="text-sm font-medium text-neutral-600">Data Points</span>
            </div>
            <p className="text-lg font-semibold text-neutral-900">{sessionData?.dataPoints || 0}</p>
          </div>
          
          <div className="bg-neutral-50 rounded-md p-3 border border-neutral-100">
            <div className="flex items-center mb-1">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-wifi text-primary mr-2"><path d="M12 20h.01"/><path d="M17.71 15.29a6 6 0 0 0-8.42 0"/><path d="M5.64 7.64a12 12 0 0 1 16.72 0"/></svg>
              <span className="text-sm font-medium text-neutral-600">Signal Quality</span>
            </div>
            <p className="text-lg font-semibold text-neutral-900">{sessionData?.signalQuality || "Unknown"}</p>
          </div>
          
          <div className="bg-neutral-50 rounded-md p-3 border border-neutral-100">
            <div className="flex items-center mb-1">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-info text-primary mr-2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
              <span className="text-sm font-medium text-neutral-600">Status</span>
            </div>
            <p className={`text-lg font-semibold ${
              sessionData?.status === "Active" ? "text-green-600" : 
              sessionData?.status === "Paused" ? "text-amber-600" : "text-neutral-900"
            }`}>
              {sessionData?.status || "Unknown"}
            </p>
          </div>
        </div>
      )}
    </Card>
  );
}