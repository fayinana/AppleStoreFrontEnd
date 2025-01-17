import { updateUser as updateUserApi } from "./../../services/apiUsers";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

function useEditUser() {
  const queryClient = useQueryClient();
  const { mutate: updateUser, isPending: isUpdatingUser } = useMutation({
    mutationFn: updateUserApi,
    onSuccess: () => {
      toast.success("User Updated Successfully");
      queryClient.invalidateQueries(["users"]);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return { updateUser, isUpdatingUser };
}

export default useEditUser;
