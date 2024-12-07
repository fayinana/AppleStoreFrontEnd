import { useEffect, useState } from "react";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import useGetProduct from "./useGetProduct";
import LoadingSpinner from "@/components/Spinner";
import { useParams } from "react-router-dom";
import useAddToCart from "../cart/useAddToCart";
import useGetMyCart from "../cart/useGetMyCart";

const relatedProducts = [
  {
    name: "AirPods Pro",
    price: "$249.00",
    image:
      "https://raw.githubusercontent.com/fayinana/HomeTradeNetwork-API-/refs/heads/main/file/image/product/user-674c32b124d596621b908385-1733144967705.jpeg",
  },
  {
    name: "iPhone Case",
    price: "$49.00",
    image:
      "https://raw.githubusercontent.com/fayinana/HomeTradeNetwork-API-/refs/heads/main/file/image/product/user-674c32b124d596621b908385-1733144967705.jpeg",
  },
  {
    name: "Apple Watch",
    price: "$399.00",
    image:
      "https://raw.githubusercontent.com/fayinana/HomeTradeNetwork-API-/refs/heads/main/file/image/product/user-674c32b124d596621b908385-1733144967705.jpeg",
  },
  {
    name: "MagSafe Charger",
    price: "$39.00",
    image:
      "https://raw.githubusercontent.com/fayinana/HomeTradeNetwork-API-/refs/heads/main/file/image/product/user-674c32b124d596621b908385-1733144967705.jpeg",
  },
];

export default function AppleProductDetail() {
  const { cart } = useGetMyCart();

  const productsId = cart.products.map((product) => product.product.id);
  const { id } = useParams();
  const { isAddingToCart, addToCart } = useAddToCart();
  const [selectedImage, setSelectedImage] = useState("");
  const { isLoading, product } = useGetProduct(id as string);
  const [showAllSpecs, setShowAllSpecs] = useState(false);

  useEffect(() => {
    if (product?.coverImage) {
      setSelectedImage(product.coverImage);
    }
  }, [product]);

  if (isLoading) return <LoadingSpinner />;

  const {
    images,
    coverImage,
    name,
    reviews,
    ratingsAverage,
    ratingsQuantity,
    price,
    specifications,
    description,
    _id,
  } = product;
  function handleAddToCart() {
    console.log("addToCart");
    addToCart({ id, price, quantity: 1, product: _id });
  }
  const displayedSpecs = showAllSpecs
    ? specifications
    : specifications.slice(0, 3);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <div className="space-y-4">
          <div className="relative aspect-square">
            <img
              src={selectedImage}
              alt="Product image"
              className="object-cover rounded-lg w-full h-full"
            />
          </div>
          <div className="flex gap-2 overflow-auto pb-2">
            {[coverImage, ...images].map((thumb, i) => (
              <button
                key={i}
                onClick={() => setSelectedImage(thumb)}
                className="relative w-20 aspect-square flex-shrink-0"
              >
                <img
                  src={thumb}
                  alt={`Thumbnail ${i + 1}`}
                  className={`object-cover rounded-md w-full h-full ${
                    selectedImage === thumb ? "ring-2 ring-primary" : ""
                  }`}
                />
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <p className="text-sm text-muted-foreground">Apple</p>
            <h1 className="text-3xl font-bold">{name}</h1>
            <div className="flex items-center gap-4 mt-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.round(ratingsAverage)
                        ? "fill-primary text-primary"
                        : "fill-muted text-muted-foreground"
                    }`}
                  />
                ))}
              </div>
              <p className="text-sm text-muted-foreground">
                ({ratingsAverage.toFixed(1)}) {ratingsQuantity} Reviews
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <p className="text-2xl font-bold">{price}</p>
            </div>

            <div className="space-y-2">
              <p className="font-medium">Available Colors</p>
              <div className="flex gap-2">
                {[
                  "bg-purple-600",
                  "bg-yellow-400",
                  "bg-black",
                  "bg-white border",
                ].map((color) => (
                  <div
                    key={color}
                    className={`w-6 h-6 rounded-full ${color} cursor-pointer`}
                  />
                ))}
              </div>
            </div>

            {/* Specifications */}
            <div className="mt-10">
              <h2 className="text-2xl font-semibold mb-4">Specifications</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {displayedSpecs.map((spec) => (
                  <div
                    key={spec.key}
                    className="p-3 bg-gray-50 border border-gray-200 rounded-md shadow-sm"
                  >
                    <p className="text-sm font-semibold text-gray-700">
                      {spec.key}
                    </p>
                    <p className="text-sm text-gray-600">{spec.value}</p>
                  </div>
                ))}
              </div>
              {specifications.length > 3 && (
                <Button
                  variant="link"
                  onClick={() => setShowAllSpecs(!showAllSpecs)}
                  className="mt-4"
                >
                  {showAllSpecs ? "See Less" : "See More"}
                </Button>
              )}
            </div>

            <Button
              disabled={productsId.includes(_id)}
              className="w-full"
              onClick={handleAddToCart}
            >
              {isAddingToCart ? " Adding To Cart" : "Add To Cart"}
            </Button>
          </div>

          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-xl font-bold mb-4">You might also like</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {relatedProducts.map((product, i) => (
            <Card key={i}>
              <CardContent className="p-2">
                <div className="relative aspect-square mb-2">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="object-cover rounded-md w-full h-full"
                  />
                </div>
                <p className="font-medium">{product.name}</p>
                <p className="text-sm text-muted-foreground">{product.price}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
