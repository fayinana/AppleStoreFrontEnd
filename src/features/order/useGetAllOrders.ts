import { getAllOrders } from "@/services/apiOrder";
import { Order } from "@/types";
import { useQuery } from "@tanstack/react-query";

function useGetMyOrders() {
  const { isLoading: isLoadingMyOrder, data: orders } = useQuery({
    queryKey: ["myOrder"],
    queryFn: getAllOrders,
  });

  return { isLoadingMyOrder, orders };
}

export default useGetMyOrders;
