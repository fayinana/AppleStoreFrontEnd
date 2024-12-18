import { getMyCart } from "@/services/apiCart";
import { Cart } from "@/types";
import { useQuery } from "@tanstack/react-query";

function useGetMyCart() {
  const { isLoading, data: cart } = useQuery<Cart>({
    queryKey: ["cart"],
    queryFn: getMyCart,
  });

  return { cart, isLoading };
}

export default useGetMyCart;
