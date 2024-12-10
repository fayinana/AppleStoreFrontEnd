import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCart as updateCartApi } from "@/services/apiCart";
function useUpdateCart() {
  const queryClient = useQueryClient();
  const { isPending: isUpdating, mutate: updateCart } = useMutation({
    mutationFn: updateCartApi,
    mutationKey: ["cart"],
    onSuccess: () => {
      queryClient.invalidateQueries(["cart"]);
    },
  });

  return { isUpdating, updateCart };
}

export default useUpdateCart;
