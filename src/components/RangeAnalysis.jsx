import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { getFlexionCategoryColor } from "@/lib/utils";

// Component to render individual finger range card
const FingerRangeCard = ({ 
  finger, 
  value, 
  category, 
  maxValue = 338 
}) => {
  const percentage = (value / maxValue) * 100;
  const colorClass = getFlexionCategoryColor(category);
  
  return (
    <div className="flex flex-col bg-neutral-50 rounded-md p-3 border border-neutral-100">
      <div className="flex justify-between items-center mb-1">
        <span className="text-sm font-medium text-neutral-800">{finger}</span>
        <span className={`text-sm font-semibold ${colorClass}`}>{category}</span>
      </div>
      <div className="w-full bg-neutral-200 rounded-full h-2 mb-1">
        <div
          className={`h-2 rounded-full ${
            category === 'Neutral' ? 'bg-flexion-neutral' : 
            category === 'Mid' ? 'bg-flexion-mid' : 'bg-flexion-full'
          }`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      <span className="text-xs text-neutral-500 self-end">{value.toFixed(1)}°</span>
    </div>
  );
};

export default function RangeAnalysis({ ranges, loading }) {
  return (
    <Card className="bg-white rounded-lg shadow-card p-4 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-neutral-900">Range Analysis</h3>
        <div className="flex items-center space-x-2">
          <button 
            className="p-1 text-neutral-500 hover:text-neutral-700 rounded hover:bg-neutral-100" 
            aria-label="More options"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-more-vertical"><circle cx="12" cy="12" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/></svg>
          </button>
        </div>
      </div>
      
      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-20 w-full" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {ranges ? (
            <>
              <FingerRangeCard
                finger="Thumb"
                value={ranges.thumb.value}
                category={ranges.thumb.category}
              />
              <FingerRangeCard
                finger="Index"
                value={ranges.index.value}
                category={ranges.index.category}
              />
              <FingerRangeCard
                finger="Middle"
                value={ranges.middle.value}
                category={ranges.middle.category}
              />
              <FingerRangeCard
                finger="Ring"
                value={ranges.ring.value}
                category={ranges.ring.category}
              />
              <FingerRangeCard
                finger="Pinky"
                value={ranges.pinky.value}
                category={ranges.pinky.category}
              />
            </>
          ) : (
            <div className="col-span-5 text-center py-8 text-neutral-500">
              No range data available
            </div>
          )}
        </div>
      )}
      
      <div className="mt-4 grid grid-cols-3 text-xs text-center">
        <div className="flex flex-col items-center">
          <span className="inline-block w-3 h-3 rounded-full bg-flexion-neutral mb-1"></span>
          <span className="text-neutral-600">Neutral (0-112°)</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="inline-block w-3 h-3 rounded-full bg-flexion-mid mb-1"></span>
          <span className="text-neutral-600">Mid (113-225°)</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="inline-block w-3 h-3 rounded-full bg-flexion-full mb-1"></span>
          <span className="text-neutral-600">Full (226-338°)</span>
        </div>
      </div>
    </Card>
  );
}