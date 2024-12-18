import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useGetAllOrders from "./useGetAllOrders";
import LoadingSpinner from "@/components/Spinner";

const RecentOrders = () => {
  const { isLoading, orders } = useGetAllOrders();

  if (isLoading) return <LoadingSpinner />;

  const recentOrders = orders.slice(0, 5);

  return (
    <Card>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order ID</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Product</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {recentOrders.map((order, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">#{index + 1}</TableCell>
              <TableCell>{order.user.fullName}</TableCell>
              <TableCell>
                {order.products.map((prod, index) => (
                  <span key={index}>{prod.product.name}</span>
                ))}
              </TableCell>
              <TableCell>${order.totalPrice}</TableCell>
              <TableCell>
                <Badge
                  variant={
                    order.paymentStatus === "completed"
                      ? "default"
                      : order.paymentStatus === "pending"
                      ? "secondary"
                      : "outline"
                  }
                >
                  {order.paymentStatus}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
};

export default RecentOrders;
