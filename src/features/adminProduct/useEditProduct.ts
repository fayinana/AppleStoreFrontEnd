import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editProduct as editProductApi } from "@/services/apiProduct";
import toast from "react-hot-toast";
function useEditProduct() {
  const queryClient = useQueryClient();
  const { isPending: isEditingProduct, mutate: editProduct } = useMutation({
    mutationFn: editProductApi,
    mutationKey: ["product"],
    onSuccess: () => {
      toast.success("Product Edited Successfully");
      queryClient.invalidateQueries(["products"]);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { editProduct, isEditingProduct };
}

export default useEditProduct;
