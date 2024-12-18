import { getMyOrders } from "@/services/apiOrder";
import { useQuery } from "@tanstack/react-query";

function useGetMyOrders() {
  const { isLoading: isLoadingMyOrder, data: myOrders } = useQuery({
    queryKey: ["myOrder"],
    queryFn: getMyOrders,
  });

  return { isLoadingMyOrder, myOrders };
}

export default useGetMyOrders;
