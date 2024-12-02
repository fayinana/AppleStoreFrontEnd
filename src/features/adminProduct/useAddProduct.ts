import { useMutation } from "@tanstack/react-query";
import { addProduct as addProductApi } from "./../../services/apiProduct";
// import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
function useAddProduct() {
  const { toast } = useToast();
  //   const navigate = useNavigate();
  const { isPending, mutate: addProduct } = useMutation({
    mutationFn: addProductApi,
    mutationKey: ["product"],
    onSuccess: (data) => {
      toast({
        title: "Password Updated",
        description: `product ${data.name} is added successfully`,
      });
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    },
  });
  return { isPending, addProduct };
}

export default useAddProduct;
