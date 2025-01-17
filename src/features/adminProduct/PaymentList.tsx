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
import LoadingSpinner from "@/components/Spinner";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import FilterHeader from "@/components/HeaderFunctionality";
import { UpworkPagination } from "@/components/UpworkPagination";
import useGetProducts from "../products/useGetProducts";

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
const sortArray = [
  { value: "createdAt", text: "CreatedAt (New - Old)" },
  { value: "-createdAt", text: "CreatedAt (Old - New)" },
  { value: "-value", text: "Value (Low to High)" },
  { value: "value", text: "Value (High to Low)" },
];
const limitArray = [
  { value: 5, text: "5 item" },
  { value: 10, text: "10 item" },
  { value: 15, text: "15 item" },
  { value: 20, text: "20 item" },
];
const PaymentList = () => {
  const queryClient = useQueryClient();
  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 5;
  const sort = searchParams.get("sort") || "-price";
  const search = searchParams.get("search") || "";
  const activeTab = searchParams.get("tab") || "overview";

  const {
    isLoading,
    data: products,
    total,
  } = useGetProducts({
    limit,
    page: currentPage,
    sort,
  });
  const totalPages = Math.ceil(total / limit) || 1;

  useEffect(() => {
    if (currentPage < 1 || currentPage > totalPages) {
      setSearchParams({
        page: "1",
        limit: limit.toString(),
        sort,
        search,
      });
    }
  }, [currentPage, totalPages, limit, sort, search, setSearchParams]);

  useEffect(() => {
    if (currentPage < 1 || currentPage > totalPages) {
      setSearchParams({
        page: "1",
        limit: limit.toString(),
        sort,
        search,
        tab: activeTab,
      });
    }
  }, [
    currentPage,
    totalPages,
    limit,
    sort,
    search,
    setSearchParams,
    activeTab,
  ]);

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ["products"] });
  }, [currentPage, limit, search, sort, queryClient]);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setSearchParams({
        page: newPage.toString(),
        limit: limit.toString(),
        sort,
        search,
        tab: activeTab,
      });
    }
  };

  const handleSearchChange = (newSearch: string) => {
    setSearchParams({
      page: "1",
      limit: limit.toString(),
      sort,
      search: newSearch,
      tab: activeTab,
    });
    const newUsers = products.filter((user) => {
      if (user.name.toLowerCase().includes(newSearch.toLowerCase())) {
        return user;
      }
    });
  };

  const handleLimitChange = (newLimit: number) => {
    setSearchParams({
      page: "1",
      limit: newLimit.toString(),
      sort,
      search,
      tab: activeTab,
    });
  };

  const handleSortChange = (newSort: string) => {
    setSearchParams({
      page: "1",
      limit: limit.toString(),
      sort: newSort,
      search,
      tab: activeTab,
    });
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <Card>
      <div className="p-6">
        <h3 className="text-lg font-semibold mb-4">Payment List</h3>
        <FilterHeader
          sortArray={sortArray}
          limitArray={limitArray}
          onSortChange={handleSortChange}
          onSearch={handleSearchChange}
          onLimitChange={handleLimitChange}
        />
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
            {initialPayments.map((payment) => (
              <TableRow key={payment.id}>
                <TableCell className="font-medium">#{payment.id}</TableCell>
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
        {total <= limit ? null : (
          <UpworkPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </Card>
  );
};

export default PaymentList;
