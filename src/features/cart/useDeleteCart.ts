import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteMyCart as deleteMyCartApi } from "@/services/apiCart";
import toast from "react-hot-toast";
export function useDeleteMyCart() {
  const queryClient = useQueryClient();
  const { isPending: isDeletingCart, mutate: deleteCart } = useMutation({
    mutationFn: deleteMyCartApi,
    mutationKey: ["cart"],
    onSuccess: () => {
      queryClient.invalidateQueries(["cart"]);
      toast.success("cart items are clear successfully");
    },
    onError: (error) => {
      toast.success(error.message);
    },
  });

  return { isDeletingCart, deleteCart };
}
