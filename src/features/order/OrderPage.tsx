import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import useGetMyOrders from "./useGetMyOrders";
import LoadingSpinner from "@/components/Spinner";
import BackButton from "@/components/BackButton";

export default function OrderPage() {
  const { isLoadingMyOrder, myOrders } = useGetMyOrders();
  if (isLoadingMyOrder) return <LoadingSpinner />;
  return (
    <div className="container mx-auto py-8 px-4">
      <BackButton />

      <h1 className="text-3xl font-bold text-dribbble-heading mb-8">
        Your Orders
      </h1>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Total Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {myOrders.map((order) => (
                <TableRow key={order._id}>
                  <TableCell className="font-medium">#{order._id}</TableCell>
                  <TableCell>{order.createdAt}</TableCell>
                  <TableCell>${order.totalPrice}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        order.paymentStatus === "completed"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {order.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Button asChild variant="ghost" size="sm">
                      <Link to={`/order/${order._id}`}>View Details</Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
