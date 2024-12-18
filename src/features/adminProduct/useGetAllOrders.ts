import { getAllOrders } from "@/services/apiOrder";
import { useQuery } from "@tanstack/react-query";

function useGetAllOrders() {
  const { isLoading, data: orders } = useQuery({
    queryKey: ["orders"],
    queryFn: getAllOrders,
  });

  return { isLoading, orders };
}

export default useGetAllOrders;
