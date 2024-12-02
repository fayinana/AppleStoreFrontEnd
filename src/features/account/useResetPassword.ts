import { useToast } from "@/hooks/use-toast";
import { resetPassword as resetPasswordApi } from "@/services/apiAuth";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

function useResetPassword() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { isPending, mutate: resetPassword } = useMutation({
    mutationFn: resetPasswordApi,
    mutationKey: ["resetPassword"],

    onSuccess: (data) => {
      toast({
        title: "Password Changed Successfully",
        description: "Password Is Changed.",
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

  return { isPending, resetPassword };
}
export default useResetPassword;
