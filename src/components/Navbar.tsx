import { Link } from "react-router-dom";
import { ShoppingCart, User } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { MobileMenu } from "./MobileMenu";
import LoadingSpinner from "./Spinner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLogout } from "@/features/account/useLogin";

export function Navbar() {
  const { user } = useAuth();
  const { isLogout, logout } = useLogout();

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <MobileMenu />
          <Link to="/" className="flex-shrink-0">
            <div className="w-5 h-5 rounded-full">
              <img src="/logo.png" alt="apple logo" />
            </div>
          </Link>

          <div className="hidden md:flex md:items-center md:space-x-8">
            <Link
              to="/products"
              className="text-dribbble-text hover:text-dribbble-heading transition-colors"
            >
              Products
            </Link>
            <Link
              to="/support"
              className="text-dribbble-text hover:text-dribbble-heading transition-colors"
            >
              Support
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <Link to="/cart">
              <Button
                variant="ghost"
                size="icon"
                className="text-dribbble-heading"
              >
                <ShoppingCart className="h-5 w-5" />
              </Button>
            </Link>

            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-dribbble-heading"
                  >
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Link to="/dashboard">Dashboard</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link to="/profile">Profile</Link>
                  </DropdownMenuItem>
                  {user.role === "admin" && (
                    <DropdownMenuItem>
                      <Link to="/admin">Admin Panel</Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem onClick={() => logout()}>
                    {!isLogout ? "Logout" : <LoadingSpinner size={10} />}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link to="/login">
                <Button className="bg-dribbble-primary hover:bg-dribbble-secondary text-white">
                  Sign In
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
