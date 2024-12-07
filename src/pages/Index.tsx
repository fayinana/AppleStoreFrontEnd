// module import
// third party import
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
// project import
import ProductsPage from "@/features/products/ProductsPage";

export default function Index() {
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
      <section className="py-16 px-4">
        <ProductsPage title="Feature Products" />
      </section>
    </div>
  );
}
