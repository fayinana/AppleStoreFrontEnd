import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function SingleProduct({ product }) {
  return (
    <div
      key={product.id}
      className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
    >
      <img
        src={product.coverImage}
        alt={product.name}
        className="w-full h-48 object-cover rounded-lg mb-4"
      />
      <h3 className="text-xl font-semibold text-dribbble-heading">
        {product.name}
      </h3>
      <p className="text-dribbble-text mt-2">{product.description}</p>
      <p className="text-dribbble-primary font-bold mt-4">${product.price}</p>
      <Button
        asChild
        variant="outline"
        className="text-dribbble-primary border-dribbble-primary hover:bg-dribbble-primary hover:text-white"
      >
        <Link to={`/products/${product.id}`}>View Details</Link>
      </Button>
    </div>
  );
}
