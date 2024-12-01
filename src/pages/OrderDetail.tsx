import { useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { orders, products } from "@/data/mockData";

export default function OrderDetail() {
  const { id } = useParams();
  const order = orders.find(o => o.id === id);

  if (!order) {
    return (
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold text-dribbble-heading mb-8">Order Not Found</h1>
      </div>
    );
  }

  const orderProducts = order.products.map(item => ({
    ...products.find(p => p.id === item.productId),
    quantity: item.quantity
  }));

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold text-dribbble-heading mb-8">Order #{id}</h1>
      
      <div className="grid gap-6 md:grid-cols-2 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Order Information</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="space-y-2">
              <div className="flex justify-between">
                <dt className="font-medium">Order Date:</dt>
                <dd>{order.createdAt}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="font-medium">Status:</dt>
                <dd>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    order.status === "completed" 
                      ? "bg-green-100 text-green-800" 
                      : "bg-yellow-100 text-yellow-800"
                  }`}>
                    {order.status}
                  </span>
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="font-medium">Total Amount:</dt>
                <dd>${order.totalAmount}</dd>
              </div>
            </dl>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Order Items</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orderProducts.map((product) => (
                  <TableRow key={product?.id}>
                    <TableCell className="font-medium">{product?.name}</TableCell>
                    <TableCell>${product?.price}</TableCell>
                    <TableCell>{product?.quantity}</TableCell>
                    <TableCell>${(product?.price || 0) * (product?.quantity || 0)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}