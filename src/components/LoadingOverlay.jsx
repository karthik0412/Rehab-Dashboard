export default function LoadingOverlay() {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full mx-4">
        <div className="flex flex-col items-center">
          <div className="loader mb-4"></div>
          <h3 className="text-lg font-semibold text-neutral-900 mb-1">Processing Data</h3>
          <p className="text-neutral-600 text-center">
            Please wait while we process your request...
          </p>
        </div>
      </div>
    </div>
  );
}
