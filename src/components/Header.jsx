export default function Header({ selectedPatient, onPatientChange }) {
    return (
      <header className="bg-white border-b border-neutral-200">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-primary mr-2">FlexiMetrics</h1>
              <span className="text-xs px-2 py-0.5 bg-primary/10 text-primary rounded-md font-medium">Hand Rehab</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <button className="flex items-center text-neutral-600 hover:text-neutral-900">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-bell"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>
                </button>
              </div>
              
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-neutral-200 flex items-center justify-center text-neutral-700 font-medium">
                  DR
                </div>
                <span className="text-sm font-medium text-neutral-800">Dr. Roberts</span>
              </div>
            </div>
          </div>
        </div>
      </header>
    );
  }