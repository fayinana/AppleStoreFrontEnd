import { useToast } from "@/hooks/use-toast";
import { signup as signupApi } from "@/services/apiAuth";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

function useSignup() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { isPending, mutate: signup } = useMutation({
    mutationFn: signupApi,
    mutationKey: ["user"],
    onSuccess: () => {
      toast({
        title: "Welcome back!",
        description: "You've successfully registered in.",
      });
      navigate("/login");
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    },
  });

  return { isPending, signup };
}

export default useSignup;
