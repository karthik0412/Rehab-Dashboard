export default function Footer() {
    return (
      <footer className="bg-white border-t border-neutral-200 py-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <div className="mb-2 sm:mb-0">
              <p className="text-sm text-neutral-500">
                © 2025 FlexiMetrics. All rights reserved.
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <a href="#" className="text-sm text-neutral-500 hover:text-primary">Privacy Policy</a>
              <a href="#" className="text-sm text-neutral-500 hover:text-primary">Terms of Service</a>
              <a href="#" className="text-sm text-neutral-500 hover:text-primary">Support</a>
            </div>
          </div>
        </div>
      </footer>
    );
  }