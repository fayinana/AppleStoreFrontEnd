// module import
// third party import
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
// project import
import ProductsPage from "@/features/products/ProductsPage";

export default function Index() {
  return (
    <div className="flex flex-col min-h-screen  bg-gray-50">
      <section className="relative h-[90vh] flex justify-center items-center overflow-hidden px-12">
        <div className="md:w-1/2 md:relative absolute h-full  w-full -translate-x-1/2 -translate-y-1/2 md:-translate-x-0 md:-translate-y-0 top-1/2 left-1/2 md:top-0 md:left-0">
          <img
            src="/banner-image.png"
            className="object-fill"
            alt="Apple Store"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/70 to-[#0f0f0f]" />
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 animate-fade-in-up">
            Apple-Store Electronics
          </h1>
          <p className="text-xl sm:text-2xl text-gray-200 mb-8 max-w-2xl mx-auto animate-fade-in-up animation-delay-200">
            Experience the future of technology with our cutting-edge devices.
          </p>
          <div className="space-x-4 animate-fade-in-up animation-delay-400 gap-4 flex flex-wrap justify-center items-center">
            <Button
              asChild
              className="bg-dribbble-primary hover:bg-dribbble-primary text-white px-8 py-3 rounded-lg transition duration-300 ease-in-out transform "
            >
              <Link to="/products">Explore Now</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="text-dribbble-secondary border-white hover:bg-white hover:text-blue-900 px-8 py-3 rounded-lg transition duration-300 ease-in-out transform  m-0"
            >
              <Link to="/products">New Arrivals</Link>
            </Button>
          </div>
        </div>
      </section>
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <ProductsPage title="Featured Products" />
      </section>
    </div>
  );
}
