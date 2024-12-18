import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCart as updateCartApi } from "@/services/apiCart";
import toast from "react-hot-toast";
function useUpdateCart() {
  const queryClient = useQueryClient();
  const { isPending: isUpdating, mutate: updateCart } = useMutation({
    mutationFn: updateCartApi,
    mutationKey: ["cart"],
    onSuccess: () => {
      queryClient.invalidateQueries(["cart"]);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { isUpdating, updateCart };
}

export default useUpdateCart;
