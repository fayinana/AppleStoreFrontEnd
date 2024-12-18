import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addToCart as addToCartApi } from "@/services/apiCart";
import toast from "react-hot-toast";

function useAddToCart(id: string) {
  const queryClient = useQueryClient();
  const { isPending: isAddingToCart, mutate: addToCart } = useMutation({
    mutationFn: addToCartApi,
    mutationKey: ["cart", id],
    onSuccess: () => {
      toast.success("Product added to cart successfully");
      queryClient.invalidateQueries(["cart"]);
    },
    onError: () => {
      toast.error("There was an error adding the product");
    },
  });

  return { isAddingToCart, addToCart };
}

export default useAddToCart;
