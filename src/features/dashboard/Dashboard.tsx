import { Link } from "react-router-dom";
import {
  ShoppingBag,
  Package,
  CreditCard,
  Apple,
  Heart,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
import moment from "moment";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import useGetMyOrders from "../order/useGetMyOrders";
import LoadingSpinner from "@/components/Spinner";
import useGetMyCart from "../cart/useGetMyCart";
import { FaCartPlus } from "react-icons/fa";

export default function Dashboard() {
  const { myOrders, isLoadingMyOrder } = useGetMyOrders();
  const { isLoading: isLoadingCart, cart } = useGetMyCart();

  const payment = { pending: 0, succeeded: 0, failed: 0, canceled: 0 };
  const shipping = {
    not_shipped: 0,
    shipped: 0,
    delivered: 0,
    returned: 0,
    canceled: 0,
  };
  let totalPrice = 0;

  if (isLoadingMyOrder || isLoadingCart) return <LoadingSpinner />;

  const recentOrders = myOrders.slice(0, 4);
  myOrders.forEach((order) => {
    payment[order.paymentStatus]++;
    shipping[order.shippingStatus]++;
    totalPrice += order.totalPrice;
  });
  const paymentChartData = [
    { name: "Pending", value: payment.pending },
    { name: "Succeeded", value: payment.succeeded },
    { name: "Failed", value: payment.failed },
    { name: "Canceled", value: payment.canceled },
  ];

  const shippingChartData = [
    { name: "Not Shipped", value: shipping.not_shipped },
    { name: "Delivered", value: shipping.delivered },
    { name: "Shipped", value: shipping.shipped },
    { name: "Returned", value: shipping.returned },
    { name: "Canceled", value: shipping.canceled },
  ];

  const COLORS = ["#FFCE56", "#4BC0C0", "#FF6384", "#36A2EB", "#1abb48"];

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Welcome to Your Apple Dashboard
      </h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          {
            title: "Total Spent",
            value: `$${totalPrice.toFixed(2)}`,
            icon: (
              <ShoppingBag className="h-4 w-4 text-muted-foreground text-pink-600" />
            ),
            note: "+20.1% from last month",
          },
          {
            title: "Active Orders",
            value: myOrders?.length,
            icon: (
              <Package className="h-4 w-4 text-muted-foreground text-pink-600" />
            ),
            note: `${shipping.shipped} shipped, ${shipping.not_shipped} not-shipped`,
            link: "/order",
          },
          {
            title: "Reward Points",
            value: `${(totalPrice / 115).toFixed(2)}`,
            icon: (
              <Apple className="h-4 w-4 text-muted-foreground text-pink-600" />
            ),
            note: "Redeem for discounts",
          },
          {
            title: "Cart Items",
            value: `${cart?.products?.length || 0}`,
            icon: (
              <FaCartPlus className="h-4 w-4 text-muted-foreground text-pink-600" />
            ),
            note: "3 items on sale",
            link: "/cart",
          },
        ].map((card, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {card.title}
              </CardTitle>
              {card.icon}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{card.value}</div>
              <div className="flex items-center justify-between ">
                <p className="text-xs text-muted-foreground">{card.note}</p>
                <span className="text-pink-600 bg-pink-100 p-1 rounded-full">
                  {card.link ? (
                    <Link to={card?.link}>
                      <ArrowRight />
                    </Link>
                  ) : null}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Orders */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div
                  key={order._id}
                  className="flex items-center justify-between bg-gray-100 p-4 rounded-md"
                >
                  <div>
                    {order.products.map((product) => (
                      <p key={product._id} className="font-medium">
                        {product._id || "Apple Product"}
                      </p>
                    ))}
                    <p className="text-sm text-muted-foreground">
                      {moment(order.createdAt).format("MMMM DD, YYYY")}
                    </p>
                  </div>
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      order.shippingStatus === "delivered"
                        ? "bg-green-100 text-green-800"
                        : order.shippingStatus === "shipped"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {order.shippingStatus}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div
                  key={order._id}
                  className="flex items-center justify-between bg-gray-100 p-4 rounded-md"
                >
                  <div>
                    {order.products.map((product) => (
                      <p key={product._id} className="font-medium">
                        {product.product.name || "Apple Product"}
                      </p>
                    ))}
                    <p className="text-sm text-muted-foreground">
                      {moment(order.createdAt).format("MMMM DD, YYYY")}
                    </p>
                  </div>
                  <span className="px-2 py-1 rounded-full text-md text-black font-bold">
                    {order.totalPrice}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Payment and Shipping Status */}
        {[
          {
            title: "Payment Status",
            data: paymentChartData,
          },
          {
            title: "Shipping Status",
            data: shippingChartData,
          },
        ].map((chart, index) => (
          <Card className="col-span-1" key={index}>
            <CardHeader>
              <CardTitle>{chart.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={chart.data}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                  >
                    {chart.data.map((_, i) => (
                      <Cell
                        key={`cell-${i}`}
                        fill={COLORS[i % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
