import { getMyCart } from "@/services/apiCart";
import { useQuery } from "@tanstack/react-query";

function useGetMyCart() {
  const { isLoading, data: cart } = useQuery({
    queryKey: ["cart"],
    queryFn: getMyCart,
  });

  return { cart, isLoading };
}

export default useGetMyCart;
