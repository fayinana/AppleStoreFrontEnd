import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { Edit, MoreVertical, Trash2 } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import useGetProducts from "../products/useGetProducts";
import { UpworkPagination } from "@/components/UpworkPagination";
import LoadingSpinner from "@/components/Spinner";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import FilterHeader from "@/components/HeaderFunctionality";
const sortArray = [
  { value: "name", text: "Name (A-Z)" },
  { value: "-name", text: "Name (Z-A)" },
  { value: "-price", text: "Price (Low to High)" },
  { value: "price", text: "Price (High to Low)" },
];
const limitArray = [
  { value: 5, text: "5 item" },
  { value: 10, text: "10 item" },
  { value: 15, text: "15 item" },
  { value: 20, text: "20 item" },
];
export default function ProductsManagement() {
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
  // const [filteredProducts, setFilteredProduct] = useState(products);
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
        <h3 className="text-lg font-semibold mb-4">Product Management</h3>

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
              <TableHead></TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product._id}>
                <TableCell>
                  <img
                    className="w-[40px] h-[40px]"
                    src={product.coverImage}
                    alt={product.name}
                  />
                </TableCell>
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell>${product.price}</TableCell>
                <TableCell>{product.stock}</TableCell>
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
                        <Link
                          to={`/admin/edit-product/${product._id}`}
                          className="w-full justify-start"
                        >
                          <Button
                            variant="ghost"
                            className="w-full justify-start"
                          >
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </Button>
                        </Link>
                        <Button
                          variant="ghost"
                          className="w-full justify-start"
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
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
}
