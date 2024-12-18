import { getUsers } from "@/services/apiUsers";
import { useQuery } from "@tanstack/react-query";

function useGetUsers({ page, sort, limit }) {
  const { isLoading, data } = useQuery({
    queryKey: ["users"],
    queryFn: () => getUsers({ page, sort, limit }),
  });

  return { isLoading, users: data?.data || [], total: data?.total || 0 };
}

export default useGetUsers;
