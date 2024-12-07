import { getProduct } from "@/services/apiProduct";
import { useQuery } from "@tanstack/react-query";

function useGetProduct(id: string) {
  const { isLoading, data: product } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getProduct(id),
  });

  return { isLoading, product };
}

export default useGetProduct;
