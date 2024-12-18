import moment from "moment";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useGetOrder from "./useGetOrder";
import { useParams } from "react-router-dom";
import LoadingSpinner from "@/components/Spinner";
import BackButton from "@/components/BackButton";

interface Product {
  price: number;
  product: {
    _id: string;
    name: string;
    image: string;
    price: number;
    category: string;
  };
  quantity: number;
  total: number;
  _id: string;
}

interface OrderDetail {
  _id: string;
  createdAt: string;
  updatedAt: string;
  paymentIntentId: string;
  paymentStatus: string;
  products: Product[];
  shippingStatus: string;
  status: string;
  totalPrice: number;
  user: {
    fullName: string;
    email: string;
  };
}

export default function OrderDetail() {
  const { id } = useParams();
  const { isLoading, order } = useGetOrder(id);

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <BackButton />
      <Card className="shadow-lg rounded-lg">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-gray-800">
            Order Details
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-8 md:grid-cols-2">
            {/* Order Information */}
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">
                Order Information
              </h3>
              <p>
                <span className="font-semibold">Order ID:</span> {order._id}
              </p>
              <p>
                <span className="font-semibold">Created On:</span>{" "}
                {moment(order.createdAt).format("MMMM DD, YYYY")}
              </p>
              <p>
                <span className="font-semibold">Updated On:</span>{" "}
                {moment(order.updatedAt).format("MMMM DD, YYYY")}
              </p>
              <p>
                <span className="font-semibold">Customer:</span>{" "}
                {order.user.fullName} ({order.user.email})
              </p>
            </div>

            {/* Status Section */}
            <div className="space-y-2 space-x-3">
              <Badge
                variant={
                  order.status === "processing" ? "default" : "secondary"
                }
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  order.status === "processing"
                    ? "bg-gradient-to-r from-green-400 to-green-600 text-white shadow-sm"
                    : "bg-gradient-to-r from-gray-400 to-gray-600 text-white shadow-sm"
                }`}
              >
                {order.status}
              </Badge>
              <Badge
                variant={
                  order.paymentStatus === "pending" ? "destructive" : "default"
                }
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  order.paymentStatus === "pending"
                    ? "bg-gradient-to-r from-red-400 to-red-600 text-white shadow-sm"
                    : "bg-gradient-to-r from-blue-400 to-blue-600 text-white shadow-sm"
                }`}
              >
                Payment: {order.paymentStatus}
              </Badge>
              <Badge
                variant={
                  order.shippingStatus === "not_shipped"
                    ? "destructive"
                    : "default"
                }
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  order.shippingStatus === "not_shipped"
                    ? "bg-gradient-to-r from-orange-400 to-orange-600 text-white shadow-sm"
                    : "bg-gradient-to-r from-purple-400 to-purple-600 text-white shadow-sm"
                }`}
              >
                Shipping: {order.shippingStatus}
              </Badge>
            </div>
          </div>

          <Separator className="my-6" />

          {/* Products Table */}
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Products</h3>
          <div className="overflow-x-auto">
            <Table className="w-full text-sm text-left">
              <TableHeader>
                <TableRow>
                  <TableHead className="text-gray-600">Product</TableHead>
                  <TableHead className="text-gray-600">Category</TableHead>
                  <TableHead className="text-gray-600">Quantity</TableHead>
                  <TableHead className="text-gray-600">Price</TableHead>
                  <TableHead className="text-gray-600">Shipping</TableHead>
                  <TableHead className="text-gray-600">Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {order.products.map((product) => (
                  <TableRow key={product._id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <img
                          src={product.product.coverImage}
                          alt={product.product.name}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <span className="font-medium">
                          {product.product.name}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>{product.product.category}</TableCell>
                    <TableCell>{product.quantity}</TableCell>
                    <TableCell>${product.product.price.toFixed(2)}</TableCell>
                    <TableCell>$5.00</TableCell>
                    <TableCell>${product.total.toFixed(2)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="mt-6 text-right">
            <p className="text-xl font-semibold">
              Total Price: ${(order.totalPrice + 5).toFixed(2)}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
