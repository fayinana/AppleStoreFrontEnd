import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { products } from "@/data/mockData";
import { UpworkPagination } from "@/components/UpworkPagination";
import { useState } from "react";
import SingleProduct from "@/features/products/SingleProduct";

export default function Index() {
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
    <div className="flex flex-col min-h-screen bg-dribbble-light">
      <section className="bg-dribbble-dark text-white py-20 px-4 h-[90vh] flex justify-center items-center">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6 animate-fade-in">
            iPhone 15 Pro
          </h1>
          <p className="text-xl mb-8 text-dribbble-muted">
            Titanium. So strong. So light. So Pro.
          </p>
          <div className="space-x-4">
            <Button
              asChild
              className="bg-dribbble-primary hover:bg-dribbble-secondary"
            >
              <Link to="/products/iphone-15-pro">Learn more</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="text-white border-white hover:bg-white/10"
            >
              <Link to="/products/iphone-15-pro">Buy</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Products Grid */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-dribbble-heading text-center mb-12">
            Featured Products
          </h2>
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
      </section>
    </div>
  );
}
