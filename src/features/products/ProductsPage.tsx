import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { UpworkPagination } from "@/components/UpworkPagination";
import useGetProducts from "@/features/products/useGetProducts";
import SingleProduct from "@/features/products/SingleProduct";
import LoadingSpinner from "@/components/Spinner";
import FilterHeader from "@/components/HeaderFunctionality";

const limitArray = [
  { value: 6, text: "6 item" },
  { value: 9, text: "9 item" },
  { value: 12, text: "12 item" },
  { value: 18, text: "18 item" },
];
const sortArray = [
  { value: "name", text: "Name (A-Z)" },
  { value: "-name", text: "Name (Z-A)" },
  { value: "-price", text: "Price (Low to High)" },
  { value: "price", text: "Price (High to Low)" },
];

export default function ProductsPage({ title }: { title: string }) {
  const queryClient = useQueryClient();
  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 9;
  const sort = searchParams.get("sort") || "-price";
  const search = searchParams.get("search") || "";

  const {
    isLoading,
    data: products,
    total,
  } = useGetProducts({
    limit,
    page: currentPage,
    sort,
  });

  const [filteredProducts, setFilteredProduct] = useState(products);
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
    queryClient.invalidateQueries({ queryKey: ["products"] });
  }, [currentPage, limit, search, sort, queryClient]);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setSearchParams({
        page: newPage.toString(),
        limit: limit.toString(),
        sort,
        search,
      });
    }
  };

  const handleSearchChange = (newSearch: string) => {
    setSearchParams({
      page: "1",
      limit: limit.toString(),
      sort,
      search: newSearch,
    });
    const newProducts = products.filter((user) => {
      if (user.name.toLowerCase().includes(newSearch.toLowerCase())) {
        return user;
      }
    });
    setFilteredProduct(newProducts);
  };

  const handleLimitChange = (newLimit: number) => {
    setSearchParams({
      page: "1",
      limit: newLimit.toString(),
      sort,
      search,
    });
  };

  const handleSortChange = (newSort: string) => {
    setSearchParams({
      page: "1",
      limit: limit.toString(),
      sort: newSort,
      search,
    });
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold text-dribbble-heading mb-8">{title}</h1>

      <FilterHeader
        sortArray={sortArray}
        limitArray={limitArray}
        onSortChange={handleSortChange}
        onSearch={handleSearchChange}
        onLimitChange={handleLimitChange}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-6">
        {filteredProducts.map((product) => (
          <SingleProduct key={product._id} product={product} />
        ))}
      </div>

      <UpworkPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
