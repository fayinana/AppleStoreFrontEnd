import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { login as loginApi } from "@/services/apiAuth";
import { useMutation } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router-dom";
import { User } from "@/types";
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
    onError: () => {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Invalid email or password",
      });
    },
  });

  return { isPending, login };
}

export default useLogin;
