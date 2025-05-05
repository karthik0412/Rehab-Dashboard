import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { formatDate } from "@/lib/utils";

export default function RecentReports({ reports, loading }) {
  return (
    <Card className="bg-white rounded-lg shadow-card p-4 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-neutral-900">Recent Reports</h3>
        <button className="text-primary hover:text-primary/80 text-sm font-medium">
          View All
        </button>
      </div>
      
      {loading ? (
        <div className="space-y-3">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-16 w-full" />
          ))}
        </div>
      ) : reports.length > 0 ? (
        <div className="divide-y divide-neutral-100">
          {reports.slice(0, 5).map((report) => (
            <div key={report.id} className="py-3 px-1 flex items-center">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-file-text"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" x2="8" y1="13" y2="13"/><line x1="16" x2="8" y1="17" y2="17"/><line x1="10" x2="8" y1="9" y2="9"/></svg>
              </div>
              <div className="ml-4 flex-1">
                <h4 className="font-medium text-neutral-900">{report.name}</h4>
                <p className="text-sm text-neutral-500">{formatDate(report.createdAt)}</p>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                  report.status === 'Completed' ? 'bg-green-100 text-green-700' :
                  report.status === 'In Progress' ? 'bg-amber-100 text-amber-700' :
                  'bg-neutral-100 text-neutral-700'
                }`}>
                  {report.status}
                </span>
                <button className="p-1 text-neutral-400 hover:text-neutral-700">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-more-vertical"><circle cx="12" cy="12" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/></svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="py-8 text-center text-neutral-500">
          No reports available
        </div>
      )}
    </Card>
  );
}