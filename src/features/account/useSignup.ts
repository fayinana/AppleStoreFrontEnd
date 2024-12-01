import { signup as signupApi } from "@/services/apiAuth";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

function useSignup() {
  const navigate = useNavigate();
  const { isPending, mutate: signup } = useMutation({
    mutationFn: signupApi,
    mutationKey: ["user"],
    onSuccess: () => {
      navigate("/login");
    },
  });

  return { isPending, signup };
}

export default useSignup;
