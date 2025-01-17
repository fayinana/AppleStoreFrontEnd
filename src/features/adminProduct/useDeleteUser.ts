import { deleteUser as deleteUserApi } from "@/services/apiUsers";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

function useDeleteUser() {
  const queryClient = useQueryClient();
  const { mutate: deleteUser, isPending: isDeletingUser } = useMutation({
    mutationFn: deleteUserApi,
    onSuccess: () => {
      toast.success("User Deleted Successfully");
      queryClient.invalidateQueries("users");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return { isDeletingUser, deleteUser };
}

export default useDeleteUser;
