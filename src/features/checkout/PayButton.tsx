import axios from "axios";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";

export default function PayButton({ cartItems }) {
  const { user } = useAuth();
  async function handleCheckout() {
    try {
      const token = JSON.parse(localStorage.getItem("token"));

      const res = await axios.post(
        `http://127.0.0.1:3700/api/v1/create-checkout-session`,
        {
          cartItems,
          userId: user.id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data.url) {
        window.location.href = res.data.url;
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Button
      onClick={() => handleCheckout()}
      className="w-full mt-6 bg-slate-900"
      size="lg"
    >
      Proceed to Checkout
    </Button>
  );
}
