import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, Package, DollarSign, ShoppingCart } from "lucide-react";
import ProductsManagement from "@/features/adminProduct/ProductsManagement";
import UserManagement from "./UserManagement";
import PaymentList from "./PaymentList";
import StatsCard from "./StatsCard";
import RecentOrders from "./RecentOrders";
import useGetUsers from "./useGetUsers";
import useGetProducts from "../products/useGetProducts";
import useGetAllOrders from "./useGetAllOrders";
import LoadingSpinner from "@/components/Spinner";
import useGetRevenueData from "./useGetRevenueData";
import useGetMonthlyStat from "./useGetMonthlyStat";
import { Link, useSearchParams } from "react-router-dom";
import { FaPlus } from "react-icons/fa";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const stats = [
  {
    title: "Total Revenue",
    value: "$12,345",
    increase: true,
    percentage: "12%",
    icon: DollarSign,
  },
  {
    title: "Total Orders",
    value: "456",
    increase: false,
    percentage: "8%",
    icon: ShoppingCart,
  },
  {
    title: "Total Users",
    value: "789",
    increase: true,
    percentage: "3%",
    icon: Users,
  },
  {
    title: "Total Products",
    value: "123",
    increase: true,
    percentage: "5%",
    icon: Package,
  },
];

const AdminDashboard = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState(
    searchParams.get("tab") || "overview"
  );
  const limit = Number(searchParams.get("limit")) || 5;
  const sort = searchParams.get("sort") || "-price";
  const search = searchParams.get("search") || "";
  const currentPage = Number(searchParams.get("page")) || 1;

  const { total: totalUsers, isLoading: isLoadingUsers } = useGetUsers({
    page: null,
    limit: null,
    sort: null,
  });
  const { orders, isLoading: isLoadingOrder } = useGetAllOrders();
  const { isLoading: isLoadingRevenueData, revenueData } = useGetRevenueData();
  const { isLoading: isLoadingMonthlyStat, monthlyStat } = useGetMonthlyStat();
  const { total: totalProducts, isLoading: isLoadingProducts } = useGetProducts(
    {
      page: null,
      limit: null,
      sort: null,
    }
  );

  useEffect(() => {
    setSearchParams({
      page: currentPage,
      limit: limit.toString(),
      sort,
      search,
      tab: activeTab,
    });
  }, [activeTab, setSearchParams, limit, sort, currentPage, search]);

  if (
    isLoadingOrder ||
    isLoadingProducts ||
    isLoadingUsers ||
    isLoadingRevenueData
  ) {
    return <LoadingSpinner />;
  }

  const totalRevenue = orders.reduce((prev, acc) => prev + acc.totalPrice, 0);
  stats[0].value = `$${totalRevenue}`;
  stats[1].value = `${orders.length}`;
  stats[2].value = `${totalUsers}`;
  stats[3].value = `${totalProducts}`;

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      <div className="flex space-x-4 mb-4">
        <Link
          data-test-id="add-product"
          to="add-product"
          className="bg-dribbble-primary hover:bg-dribbble-secondary flex items-center gap-2 px-4 py-2 rounded-md text-white fixed top-20 right-8 z-50"
        >
          <FaPlus /> Add New Product
        </Link>
      </div>
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-6"
      >
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5 mb-8">
          <TabsTrigger
            value="overview"
            onClick={() => setActiveTab("overview")}
          >
            Overview
          </TabsTrigger>
          <TabsTrigger value="orders" onClick={() => setActiveTab("orders")}>
            Recent Orders
          </TabsTrigger>
          <TabsTrigger
            value="products"
            data-test-id="product-tab"
            onClick={() => setActiveTab("products")}
          >
            Products
          </TabsTrigger>
          <TabsTrigger value="users" onClick={() => setActiveTab("users")}>
            Users
          </TabsTrigger>
          <TabsTrigger
            value="payments"
            onClick={() => setActiveTab("payments")}
          >
            Payments
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Sales Chart */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Sales Overview</h3>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={monthlyStat}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="sales" fill="#9b87f5" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>

            {/* Revenue by Category */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Revenue by Category
              </h3>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={revenueData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="totalRevenue"
                    >
                      {revenueData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="orders">
          <RecentOrders />
        </TabsContent>

        <TabsContent value="products">
          <ProductsManagement />
        </TabsContent>

        <TabsContent value="users">
          <UserManagement />
        </TabsContent>

        <TabsContent value="payments">
          <PaymentList />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;
