import { Link, useParams } from "react-router-dom";
import { ArrowLeft, CheckCircle, Package, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import useGetOrder from "../order/useGetOrder";
import LoadingSpinner from "@/components/Spinner";

export default function CheckoutSuccessPage() {
  const { id } = useParams();

  const { isLoading, order } = useGetOrder(id);
  if (isLoading) return <LoadingSpinner />;
  const { status, totalPrice, _id } = order;
  return (
    <div className="min-h-screen bg-dribbble-light flex flex-col">
      <Link
        to="/"
        className="p-4 text-dribbble-primary hover:text-dribbble-secondary transition-colors inline-flex items-center"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Home
      </Link>

      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8 bg-white p-8 rounded-xl shadow-lg">
          <div className="text-center">
            <CheckCircle className="mx-auto h-12 w-12 text-green-500" />
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-dribbble-heading">
              Order Confirmed!
            </h2>
            <p className="mt-2 text-sm text-dribbble-text">
              Thank you for your purchase. Your order has been successfully
              placed.
            </p>
          </div>

          <div className="mt-8 space-y-6">
            <div className="border-t border-b border-gray-200 py-4">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium text-dribbble-heading">
                  Order number
                </span>
                <span className="text-dribbble-text">#ORD-{_id}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium text-dribbble-heading">
                  Total amount
                </span>
                <span className="text-dribbble-text">${totalPrice}</span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center">
                <Package className="h-5 w-5 text-dribbble-primary mr-2" />
                <span className="text-sm text-dribbble-text">
                  Your order is being processed
                </span>
              </div>
              <div className="flex items-center">
                <Truck className="h-5 w-5 text-dribbble-primary mr-2" />
                <span className="text-sm text-dribbble-text">
                  Estimated delivery: 3-5 business days
                </span>
              </div>
            </div>

            <div className="space-y-4">
              <Link to={`/order/${id}`}>
                <Button
                  className="w-full bg-dribbble-primary hover:bg-dribbble-secondary
              text-white"
                >
                  View Order Details
                </Button>
              </Link>
              <Link to="/products">
                <Button className="m-auto text-center bg-[#d1d1d1] text-dribbble-primary">
                  Continue Shopping
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
