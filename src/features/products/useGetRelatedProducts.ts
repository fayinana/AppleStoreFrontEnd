import { getRelatedProducts } from "@/services/apiProduct";
import { useQuery } from "@tanstack/react-query";

function useGetRelatedProducts(category) {
  const { isLoading: isLoadingRelatedProducts, data: relatedProducts } =
    useQuery({
      queryFn: () => getRelatedProducts(category),
      queryKey: ["relatedProduct", category],
    });

  return { isLoadingRelatedProducts, relatedProducts };
}

export default useGetRelatedProducts;
