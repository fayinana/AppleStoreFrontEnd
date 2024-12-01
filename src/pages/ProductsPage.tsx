import { useState } from "react";
import { products } from "@/data/mockData";
import { UpworkPagination } from "@/components/UpworkPagination";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

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
          <div
            key={product.id}
            className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <h3 className="text-xl font-semibold text-dribbble-heading">
              {product.name}
            </h3>
            <p className="text-dribbble-text mt-2">{product.description}</p>
            <p className="text-dribbble-primary font-bold mt-4">
              ${product.price}
            </p>
            <Button
              asChild
              variant="outline"
              className="text-dribbble-primary border-dribbble-primary hover:bg-dribbble-primary hover:text-white"
            >
              <Link to={`/products/${product.id}`}>View Details</Link>
            </Button>
          </div>
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
