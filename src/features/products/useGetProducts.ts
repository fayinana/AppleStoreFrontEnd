import { getProducts } from "@/services/apiProduct";
import { QueryType } from "@/types";
import { useQuery } from "@tanstack/react-query";

export default function useGetProducts({ page, sort, limit }: QueryType) {
  const { isLoading, data } = useQuery({
    queryKey: ["products"],
    queryFn: () => getProducts({ page, sort, limit }),
  });

  return { isLoading, data: data?.data || [], total: data?.total || 1 };
}
