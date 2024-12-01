import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { products } from "@/data/mockData";
import { UpworkPagination } from "@/components/UpworkPagination";
import { useState } from "react";

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
      {/* Hero Section */}
      <section className="bg-dribbble-dark text-white py-20 px-4">
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
              <div
                key={product.id}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <h3 className="text-xl font-semibold text-dribbble-heading mb-2">
                  {product.name}
                </h3>
                <p className="text-dribbble-text mb-4">{product.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-dribbble-primary font-bold">
                    ${product.price}
                  </span>
                  <Button
                    asChild
                    variant="outline"
                    className="text-dribbble-primary border-dribbble-primary hover:bg-dribbble-primary hover:text-white"
                  >
                    <Link to={`/products/${product.id}`}>View Details</Link>
                  </Button>
                </div>
              </div>
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
