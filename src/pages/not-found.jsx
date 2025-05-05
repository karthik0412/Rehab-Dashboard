import { Link } from "wouter";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4">
      <div className="text-6xl font-bold text-primary mb-4">404</div>
      <h1 className="text-2xl font-semibold mb-2">Page Not Found</h1>
      <p className="text-muted-foreground mb-6 text-center">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link href="/">
        <a className="bg-primary text-white px-4 py-2 rounded-md font-medium hover:bg-primary/90">
          Go back to dashboard
        </a>
      </Link>
    </div>
  );
}