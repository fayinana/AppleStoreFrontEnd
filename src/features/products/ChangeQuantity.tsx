import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";
import useUpdateCart from "../cart/useUpdateCart";
import { Cart, CartProduct } from "@/types";
import { useDeleteMyCart } from "../cart/useDeleteCart";

export default function ChangeQuantity({
  product,
  cart,
}: {
  product: CartProduct;
  cart: Cart;
}) {
  const { isUpdating, updateCart } = useUpdateCart();
  const { deleteCart, isDeletingCart } = useDeleteMyCart();

  function handleQuantityChange(productId: string, newQuantity: number) {
    if (newQuantity === 0) {
      const updatedProduct = cart.products.filter((product) => {
        if (product.product.id !== productId) {
          return product;
        }
      });

      cart.products = updatedProduct;
      updateCart({ id: cart.id, cart });
    } else {
      const updatedProduct = cart.products.map((product) => {
        if (product.product.id === productId) {
          product.quantity = newQuantity;
        }
        return product;
      });

      cart.products = updatedProduct;
      updateCart({ id: cart.id, cart });
    }
  }
  return (
    <div className="flex items-center">
      <Button
        variant="outline"
        size="icon"
        onClick={() =>
          handleQuantityChange(product.product.id, product.quantity - 1)
        }
      >
        <Minus className="h-3 w-3" />
      </Button>
      <span className="mx-2 w-8 text-center">{product.quantity}</span>
      <Button
        variant="outline"
        size="icon"
        onClick={() =>
          handleQuantityChange(product.product.id, product.quantity + 1)
        }
      >
        <Plus className="h-3 w-3" />
      </Button>
    </div>
  );
}
