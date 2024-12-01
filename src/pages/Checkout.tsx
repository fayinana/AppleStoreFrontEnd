import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { Link } from "react-router-dom";

export default function Checkout() {
  const { items, clearCart } = useCart();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: items.map((item) => ({
            id: item.id,
            quantity: item.quantity,
          })),
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const { url } = await response.json();
      window.location.href = url;
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong with the checkout process.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="container mx-auto py-8">
        <div className="bg-white rounded-xl p-8 shadow-lg text-center">
          <h1 className="text-3xl font-bold text-dribbble-heading mb-4">
            Your Cart is Empty
          </h1>
          <p className="text-dribbble-text mb-4">
            Add some items to your cart before checking out.
          </p>
          <Button asChild>
            <Link to="/products">Continue Shopping</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold text-dribbble-heading mb-8">Checkout</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl p-6 shadow-lg flex gap-4"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-24 h-24 object-cover rounded-lg"
              />
              <div>
                <h3 className="text-lg font-semibold text-dribbble-heading">
                  {item.name}
                </h3>
                <p className="text-dribbble-text">Quantity: {item.quantity}</p>
                <p className="text-dribbble-primary font-bold">
                  ${item.price * item.quantity}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="bg-white rounded-xl p-6 shadow-lg h-fit">
          <h2 className="text-xl font-semibold text-dribbble-heading mb-4">
            Order Summary
          </h2>
          <div className="space-y-2 mb-4">
            <div className="flex justify-between text-dribbble-text">
              <span>Subtotal</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold text-dribbble-heading">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
          <Button
            className="w-full bg-dribbble-primary hover:bg-dribbble-secondary"
            onClick={handleCheckout}
            disabled={loading}
          >
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {loading ? "Processing..." : "Proceed to Payment"}
          </Button>
        </div>
      </div>
    </div>
  );
}