import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { User } from "@/types";

interface AuthContextType {
  user: User | null;
  setUser: (user: User) => void;
  // login: (email: string, password: string) => Promise<void>;
  // signup: (name: string, email: string, password: string) => Promise<void>;
  // logout: () => Promise<void>;
  // loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  // const [loading, setLoading] = useState(true);
  // const navigate = useNavigate();
  // const { toast } = useToast();
  // useEffect(() => {
  //   const checkAuth = async () => {
  //     try {
  //       const response = await fetch("/api/me");
  //       if (response.ok) {
  //         const userData = await response.json();
  //         setUser(userData);
  //       }
  //     } catch (error) {
  //       console.error("Auth check failed:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   checkAuth();
  // }, []);

  // const login = async (email: string, password: string) => {
  //   try {
  //     const response = await fetch("/api/login", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ email, password }),
  //     });

  //     if (!response.ok) throw new Error("Login failed");

  //     const userData = await response.json();
  //     setUser(userData);
  //     navigate("/");
  //     toast({
  //       title: "Welcome back!",
  //       description: "You've successfully logged in.",
  //     });
  //   } catch (error) {
  //     toast({
  //       variant: "destructive",
  //       title: "Error",
  //       description: "Invalid email or password",
  //     });
  //     throw error;
  //   }
  // };

  // const signup = async (name: string, email: string, password: string) => {
  //   try {
  //     const response = await fetch("/api/register", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ name, email, password }),
  //     });

  //     if (!response.ok) throw new Error("Signup failed");

  //     const userData = await response.json();
  //     setUser(userData);
  //     navigate("/");
  //     toast({
  //       title: "Welcome!",
  //       description: "Your account has been created successfully.",
  //     });
  //   } catch (error) {
  //     toast({
  //       variant: "destructive",
  //       title: "Error",
  //       description: "Failed to create account",
  //     });
  //     throw error;
  //   }
  // };

  // const logout = async () => {
  //   try {
  //     await fetch("/api/logout", { method: "POST" });
  //     setUser(null);
  //     navigate("/login");
  //     toast({
  //       title: "Goodbye!",
  //       description: "You've been logged out successfully.",
  //     });
  //   } catch (error) {
  //     toast({
  //       variant: "destructive",
  //       title: "Error",
  //       description: "Failed to logout",
  //     });
  //     throw error;
  //   }
  // };

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
