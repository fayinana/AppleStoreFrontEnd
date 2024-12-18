import { getMonthlyStat } from "@/services/apiOrder";
import { useQuery } from "@tanstack/react-query";

function useGetMonthlyStat() {
  const { isLoading, data: monthlyStat } = useQuery({
    queryKey: ["monthlyStat"],
    queryFn: () => getMonthlyStat(),
  });

  return { isLoading, monthlyStat };
}

export default useGetMonthlyStat;
