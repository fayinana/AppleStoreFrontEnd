import { getOrder } from "@/services/apiOrder";
import { useQuery } from "@tanstack/react-query";

function useGetOrder(id: string) {
  const { isLoading, data: order } = useQuery({
    queryKey: ["order", id],
    queryFn: () => getOrder(id),
  });
  return { isLoading, order };
}

export default useGetOrder;
