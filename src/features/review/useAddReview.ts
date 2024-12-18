import { addReview as addReviewApi } from "@/services/apiReview";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

function useAddReview() {
  const queryClient = useQueryClient();
  const { isPending: isAddingReview, mutate: addReview } = useMutation({
    mutationKey: ["review"],
    mutationFn: addReviewApi,
    onSuccess: (data) => {
      queryClient.invalidateQueries(["product", data.product]);
      toast.success("review added successfully");
    },
    onError: (error) => {
      toast.error(
        "there are an error while adding a review or you reviewed the product "
      );
    },
  });

  return { addReview, isAddingReview };
}

export default useAddReview;
