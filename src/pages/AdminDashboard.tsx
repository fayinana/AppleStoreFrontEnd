//TODO:
import { useState } from "react";
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
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  ArrowUpRight,
  ArrowDownRight,
  Users,
  Package,
  DollarSign,
  ShoppingCart,
  Edit,
  Trash2,
  UserPlus,
  UserMinus,
  MoreVertical,
} from "lucide-react";
import useAddProduct from "@/features/adminProduct/useAddProduct";
import ProductsManagement from "@/features/adminProduct/ProductsManagement";

// Mock data for the dashboard (unchanged)
const salesData = [
  { month: "Jan", sales: 4000 },
  { month: "Feb", sales: 3000 },
  { month: "Mar", sales: 2000 },
  { month: "Apr", sales: 2780 },
  { month: "May", sales: 1890 },
  { month: "Jun", sales: 2390 },
];

const revenueData = [
  { name: "Electronics", value: 400 },
  { name: "Clothing", value: 300 },
  { name: "Books", value: 300 },
  { name: "Home", value: 200 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const recentOrders = [
  {
    id: "1",
    customer: "John Doe",
    product: "iPhone 15 Pro",
    amount: 999,
    status: "completed",
  },
  {
    id: "2",
    customer: "Jane Smith",
    product: "MacBook Pro",
    amount: 1299,
    status: "pending",
  },
  {
    id: "3",
    customer: "Bob Johnson",
    product: "iPad Pro",
    amount: 799,
    status: "processing",
  },
];

// Mock data for products and users
const initialProducts = [
  { id: "1", name: "iPhone 15 Pro", price: 999, stock: 50 },
  { id: "2", name: "MacBook Pro", price: 1299, stock: 30 },
  { id: "3", name: "iPad Pro", price: 799, stock: 40 },
];

const initialUsers = [
  { id: "1", name: "John Doe", email: "john@example.com", role: "Customer" },
  { id: "2", name: "Jane Smith", email: "jane@example.com", role: "Admin" },
  { id: "3", name: "Bob Johnson", email: "bob@example.com", role: "Customer" },
];

// Mock data for payments
const initialPayments = [
  {
    id: "1",
    customer: "John Doe",
    amount: 999,
    date: "2023-06-01",
    status: "Completed",
  },
  {
    id: "2",
    customer: "Jane Smith",
    amount: 1299,
    date: "2023-06-02",
    status: "Pending",
  },
  {
    id: "3",
    customer: "Bob Johnson",
    amount: 799,
    date: "2023-06-03",
    status: "Failed",
  },
];

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
    increase: true,
    percentage: "8%",
    icon: ShoppingCart,
  },
  {
    title: "Total Users",
    value: "789",
    increase: false,
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
  const [activeTab, setActiveTab] = useState("overview");
  const { isPending, addProduct } = useAddProduct();
  const [products, setProducts] = useState(initialProducts);
  const [users, setUsers] = useState(initialUsers);
  const [payments, setPayments] = useState(initialPayments);
  const [editingProduct, setEditingProduct] = useState(null);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    stock: "",
  });

  const handleAddProduct = (data) => {
    addProduct(data);
    // if (newProduct.name && newProduct.price && newProduct.stock) {
    //   setProducts([...products, { id: Date.now().toString(), ...newProduct }]);
    //   setNewProduct({ name: "", price: "", stock: "" });
    // }
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
  };

  const handleUpdateProduct = () => {
    setProducts(
      products.map((p) => (p.id === editingProduct.id ? editingProduct : p))
    );
    setEditingProduct(null);
  };

  const handleDeleteProduct = (id) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  const handleDeleteUser = (id) => {
    setUsers(users.filter((u) => u.id !== id));
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <Card key={index} className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{stat.title}</p>
                <h3 className="text-2xl font-bold mt-2">{stat.value}</h3>
                <div className="flex items-center mt-2">
                  {stat.increase ? (
                    <ArrowUpRight className="w-4 h-4 text-green-500 mr-1" />
                  ) : (
                    <ArrowDownRight className="w-4 h-4 text-red-500 mr-1" />
                  )}
                  <span
                    className={`text-sm ${
                      stat.increase ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {stat.percentage}
                  </span>
                </div>
              </div>
              <div className="p-3 bg-primary/10 rounded-full">
                <stat.icon className="w-6 h-6 text-primary" />
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-6"
      >
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="orders">Recent Orders</TabsTrigger>
          <TabsTrigger value="products" data-test-id="product-tab">
            Products
          </TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="payments">Payments</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Sales Chart */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Sales Overview</h3>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={salesData}>
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
                      dataKey="value"
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
                {recentOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">#{order.id}</TableCell>
                    <TableCell>{order.customer}</TableCell>
                    <TableCell>{order.product}</TableCell>
                    <TableCell>${order.amount}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          order.status === "completed"
                            ? "default"
                            : order.status === "pending"
                            ? "secondary"
                            : "outline"
                        }
                      >
                        {order.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>

        <TabsContent value="products">
          <ProductsManagement />
        </TabsContent>

        <TabsContent value="users">
          <Card>
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-4">User Management</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.role}</TableCell>
                      <TableCell>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <span className="sr-only">Open menu</span>
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-56">
                            <div className="grid gap-4">
                              <Button
                                variant="ghost"
                                className="w-full justify-start"
                                onClick={() => {
                                  // Implement user edit functionality
                                  console.log("Edit user:", user.id);
                                }}
                              >
                                <Edit className="mr-2 h-4 w-4" />
                                Edit
                              </Button>
                              <Button
                                variant="ghost"
                                className="w-full justify-start"
                                onClick={() => handleDeleteUser(user.id)}
                              >
                                <UserMinus className="mr-2 h-4 w-4" />
                                Delete
                              </Button>
                            </div>
                          </PopoverContent>
                        </Popover>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="payments">
          <Card>
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-4">Payment List</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {payments.map((payment) => (
                    <TableRow key={payment.id}>
                      <TableCell className="font-medium">
                        #{payment.id}
                      </TableCell>
                      <TableCell>{payment.customer}</TableCell>
                      <TableCell>${payment.amount}</TableCell>
                      <TableCell>{payment.date}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            payment.status === "Completed"
                              ? "default"
                              : payment.status === "Pending"
                              ? "secondary"
                              : "destructive"
                          }
                        >
                          {payment.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;
