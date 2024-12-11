import { useAuth } from "@/contexts/AuthContext";
// import { useToast } from "@/hooks/use-toast";
import { login as loginApi, logout as logoutApi } from "@/services/apiAuth";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
function useLogin() {
  const navigate = useNavigate();
  // const { toast } = useToast();
  const { setUser } = useAuth();
  const location = useLocation();
  const { isPending, mutate: login } = useMutation({
    mutationFn: loginApi,
    mutationKey: ["user"],
    onSuccess: (data) => {
      const redirectPath = location.state?.from?.pathname || "/";
      setUser(data);
      localStorage.setItem("user", JSON.stringify(data));
      toast.success("You've successfully logged in.");
      navigate(redirectPath);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { isPending, login };
}

export function useLogout() {
  const { setUser } = useAuth();
  const navigate = useNavigate();
  const { isPending: isLogout, mutate: logout } = useMutation({
    mutationFn: logoutApi,
    mutationKey: ["user"],
    onSuccess: () => {
      toast.success("You've successfully logged out.");
      setUser(null);
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.setItem("isAuthenticated", "false");
      navigate("/login");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { isLogout, logout };
}

export default useLogin;
