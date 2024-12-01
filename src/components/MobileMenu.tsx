import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

export function MobileMenu() {
  const { user } = useAuth();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>
        <div className="mt-4 flex flex-col space-y-4">
          <Link
            to="/products"
            className="text-lg font-medium hover:text-dribbble-primary"
          >
            Products
          </Link>
          <Link
            to="/support"
            className="text-lg font-medium hover:text-dribbble-primary"
          >
            Support
          </Link>
          {user ? (
            <>
              <Link
                to="/dashboard"
                className="text-lg font-medium hover:text-dribbble-primary"
              >
                Dashboard
              </Link>
              <Link
                to="/profile"
                className="text-lg font-medium hover:text-dribbble-primary"
              >
                Profile
              </Link>
              {user.role === "admin" && (
                <Link
                  to="/admin"
                  className="text-lg font-medium hover:text-dribbble-primary"
                >
                  Admin Panel
                </Link>
              )}
              <button
                onClick={() => logout()}
                className="text-lg font-medium text-left hover:text-dribbble-primary"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="text-lg font-medium hover:text-dribbble-primary"
            >
              Sign In
            </Link>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
