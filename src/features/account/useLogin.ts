import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { login as loginApi, logout as logoutApi } from "@/services/apiAuth";
import { useMutation } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router-dom";
function useLogin() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { setUser } = useAuth();
  const location = useLocation();
  const { isPending, mutate: login } = useMutation({
    mutationFn: loginApi,
    mutationKey: ["user"],
    onSuccess: (data) => {
      const redirectPath = location.state?.from?.pathname || "/";
      setUser(data);
      toast({
        title: "Welcome back!",
        description: "You've successfully logged in.",
      });
      navigate(redirectPath);
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    },
  });

  return { isPending, login };
}

export function useLogout() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { isPending: isLogout, mutate: logout } = useMutation({
    mutationFn: logoutApi,
    mutationKey: ["user"],
    onSuccess: () => {
      toast({
        title: "Logout",
        description: "You've successfully logged out.",
      });
      navigate("/login");
      localStorage.removeItem("token");
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    },
  });

  return { isLogout, logout };
}

export default useLogin;
