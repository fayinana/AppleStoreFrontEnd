// module import
import { useEffect, useState } from "react";
// third party import
import { useQueryClient } from "@tanstack/react-query";
// project import
import { UpworkPagination } from "@/components/UpworkPagination";
import useGetProducts from "@/features/products/useGetProducts";
import SingleProduct from "@/features/products/SingleProduct";
import LoadingSpinner from "@/components/Spinner";

export default function ProductsPage({ title }: { title: string }) {
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);
  const limit = 5;
  const sort = "-price";
  const search = "";
  useEffect(() => {
    queryClient.invalidateQueries({
      queryKey: ["products"],
    });
  }, [page, limit, search, sort, queryClient]);

  const {
    isLoading,
    data: products,
    total,
  } = useGetProducts({
    limit,
    page,
    sort,
    search,
  });
  const totalPages = Math.ceil(total / limit) || 1;
  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold text-dribbble-heading mb-8">{title}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => (
          <SingleProduct key={product._id} product={product} />
        ))}
      </div>

      <UpworkPagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </div>
  );
}
