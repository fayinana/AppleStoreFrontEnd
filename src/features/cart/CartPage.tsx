import { Link } from "react-router-dom";
import { Trash2, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import LoadingSpinner from "@/components/Spinner";
import useGetMyCart from "@/features/cart/useGetMyCart";
import { useDeleteMyCart } from "./useDeleteCart";
import useUpdateCart from "./useUpdateCart";
import ChangeQuantity from "../products/ChangeQuantity";
import PayButton from "../checkout/PayButton";

export default function Cart() {
  const { isLoading, cart } = useGetMyCart();
  const { isDeletingCart, deleteCart } = useDeleteMyCart();
  const { isUpdating, updateCart } = useUpdateCart();

  if (isLoading) return <LoadingSpinner />;
  function handleClearAllCart() {
    deleteCart(cart._id);
  }
  function handleRemoveItem(productId) {
    const updatedProduct = cart.products.filter((product) => {
      if (product.product.id !== productId) {
        return product;
      }
    });

    cart.products = updatedProduct;
    updateCart({ id: cart.id, cart });
  }

  if (!cart || cart.products.length === 0) {
    return (
      <div className="container mx-auto py-16 px-4">
        <Card className="max-w-md mx-auto text-center">
          <CardContent className="pt-6 pb-8 px-8">
            <ShoppingBag className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
            <h1 className="text-2xl font-bold mb-2">Your Cart is Empty</h1>
            <p className="text-muted-foreground mb-6">
              Looks like you haven't added any items to your cart yet.
            </p>
            <Button asChild>
              <Link to="/products">Continue Shopping</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-4 px-4">
      <h1 className="text-2xl sm:text-3xl font-bold mb-8 text-center lg:text-left">
        Your Shopping Cart
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-6">
          {cart.products.map((item) => (
            <Card key={item.id} className="overflow-hidden">
              <CardContent className="p-4 sm:p-6 flex flex-col sm:flex-row gap-4">
                <div className="relative w-full max-w-[100px] sm:w-16 sm:h-16 flex-shrink-0">
                  <img
                    src={item?.product?.coverImage}
                    alt={item.product.name}
                    className="rounded-md object-cover w-full h-full"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-base sm:text-lg font-semibold truncate">
                    {item.product.name}
                  </h3>
                  <p className="text-primary font-bold mt-1">
                    ${item.price.toFixed(2)}
                  </p>
                  <div className="flex items-center gap-2 mt-4">
                    <ChangeQuantity product={item} cart={cart} />
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemoveItem(item.product.id)}
                      className="text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
          <button onClick={handleClearAllCart}>
            {isDeletingCart ? "clearing" : "clear cart"}
          </button>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <Card>
            <CardContent className="p-4 sm:p-6">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>${cart.totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Shipping</span>
                  <span>Calculated at checkout</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Tax</span>
                  <span>Calculated at checkout</span>
                </div>
              </div>
              <Separator className="my-4" />
              <div className="flex justify-between font-semibold text-lg">
                <span>Total</span>
                <span>${cart.totalPrice.toFixed(2)}</span>
              </div>

              <PayButton cartItems={cart.products} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
