import { useMutation } from "@tanstack/react-query";
import { forgotPassword as forgotPasswordApi } from "./../../services/apiAuth";
import { useToast } from "@/hooks/use-toast";
function useForgetPassword() {
  const { toast } = useToast();

  const { isPending, mutate: forgotPassword } = useMutation({
    mutationFn: forgotPasswordApi,
    mutationKey: ["forgotPassword"],
    onSuccess: (data) => {
      toast({
        title: "Reset link sent!",
        description: "Please check your email for password reset instructions.",
      });
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    },
  });

  return { isPending, forgotPassword };
}

export default useForgetPassword;
