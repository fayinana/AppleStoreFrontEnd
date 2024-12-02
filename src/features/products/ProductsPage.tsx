import { useState } from "react";
import { products } from "@/data/mockData";
import { UpworkPagination } from "@/components/UpworkPagination";
import SingleProduct from "@/features/products/SingleProduct";

export default function ProductsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 9;
  const totalPages = Math.ceil(products.length / productsPerPage);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold text-dribbble-heading mb-8">
        Our Products
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {currentProducts.map((product) => (
          <SingleProduct product={product} />
        ))}
      </div>

      <UpworkPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
