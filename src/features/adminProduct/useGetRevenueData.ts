import { getOrdersStatus } from "@/services/apiOrder";
import { useQuery } from "@tanstack/react-query";

function useGetRevenueData() {
  const { isLoading, data: revenueData } = useQuery({
    queryKey: ["revenueData"],
    queryFn: () => getOrdersStatus(),
  });

  return { isLoading, revenueData };
}

export default useGetRevenueData;
