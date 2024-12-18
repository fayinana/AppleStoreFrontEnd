import { updateReview as updateReviewApi } from "@/services/apiReview";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

function useUpdateReview() {
  const queryClient = useQueryClient();
  const { isPending: isUpdatingReview, mutate: updateReview } = useMutation({
    mutationKey: ["review"],
    mutationFn: updateReviewApi,
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

  return { updateReview, isUpdatingReview };
}

export default useUpdateReview;
