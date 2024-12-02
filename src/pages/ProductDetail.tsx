import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { products } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/components/ui/use-toast";

const ProductDetail = () => {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);
  const { addToCart } = useCart();
  const { toast } = useToast();

  useEffect(() => {
    if (!product) {
      console.error("Product not found");
    }
  }, [product]);

  const handleAddToCart = () => {
    const cartItem = {
      ...product,
      quantity: 1,
    };
    addToCart(cartItem);
    toast({
      title: "Product added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  if (!product) return <div>Product not found</div>;

  return (
    <div className="container mx-auto py-8 max-w-80 max-h-80 m-auto">
      <h1 className="text-3xl font-bold text-dribbble-heading">
        {product.name}
      </h1>
      <img src={product.image} alt={product.name} className="my-4" />
      <p className="text-lg">{product.description}</p>
      <p className="text-2xl font-bold text-dribbble-heading">
        ${product.price}
      </p>
      <Button onClick={handleAddToCart} className="mt-4">
        Add to Cart
      </Button>
    </div>
  );
};

export default ProductDetail;
