import { createContext, useContext, useState, ReactNode } from "react";
import { User } from "@/types";
interface AuthContextType {
  user: User | null;
  setUser: (user: User) => void;
}
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(
    JSON.parse(localStorage.getItem("user")) || null
  );
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
