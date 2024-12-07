import { getProducts } from "@/services/apiProduct";
import { useQuery } from "@tanstack/react-query";

export default function useGetProducts({ search, page, sort, limit }) {
  const { isLoading, data } = useQuery({
    queryKey: ["products", page, limit, sort, search],
    queryFn: () => getProducts({ search, page, sort, limit }),
  });

  return { isLoading, data: data?.data || [], total: data?.total || 1 };
}
