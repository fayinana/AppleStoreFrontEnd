import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
export default function UnauthorizedPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <main className="flex-grow flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 text-center">
          <div>
            <img
              src="/placeholder.svg?height=200&width=200"
              alt="Unauthorized"
              width={200}
              height={200}
              className="mx-auto"
            />
            <h1 className="mt-6 text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Access Denied
            </h1>
            <p className="mt-2 text-sm text-gray-600 sm:text-base">
              Oops! It seems you don't have permission to access this page.
            </p>
          </div>
          <div className="mt-8 space-y-4">
            <p className="text-sm text-gray-500">
              If you believe this is an error, please contact our support team.
            </p>
            <Button
              asChild
              className="w-full bg-dribbble-secondary hover:bg-dribbble-primary text-white py-3 rounded-lg transition duration-300 ease-in-out transform"
            >
              <Link to="/">Return to Home</Link>
            </Button>
          </div>
        </div>
      </main>
      <footer className="py-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Your Electronics Store. All rights
        reserved.
      </footer>
    </div>
  );
}
