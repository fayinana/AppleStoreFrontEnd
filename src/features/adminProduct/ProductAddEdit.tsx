import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { useState } from "react";

interface Specification {
  key: string;
  value: string;
}

export default function ProductAddEdit() {
  const [productData, setProductData] = useState({
    name: "",
    category: "",
    description: "",
    price: 0,
    stock: 0,
    coverImage: "",
    specifications: [{ key: "", value: "" }],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  const handleSpecificationChange = (
    index: number,
    field: keyof Specification,
    value: string
  ) => {
    const updatedSpecifications = [...productData.specifications];
    updatedSpecifications[index][field] = value;
    setProductData({ ...productData, specifications: updatedSpecifications });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Product Data: ", productData);
  };

  return (
    <div className="p-6 bg-white">
      <h3 className="text-lg font-semibold mb-4">Add Product</h3>
      <form
        onSubmit={handleSubmit}
        className="grid gap-6 max-h-[80vh] overflow-y-auto"
      >
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              name="name"
              value={productData.name}
              onChange={handleChange}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="category">Category</Label>
            <Input
              id="category"
              name="category"
              value={productData.category}
              onChange={handleChange}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              name="description"
              value={productData.description}
              onChange={handleChange}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="price">Price</Label>
            <Input
              id="price"
              name="price"
              type="number"
              value={productData.price}
              onChange={handleChange}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="stock">Stock</Label>
            <Input
              id="stock"
              name="stock"
              type="number"
              value={productData.stock}
              onChange={handleChange}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="coverImage">Cover Image</Label>
            <Input
              id="coverImage"
              name="coverImage"
              value={productData.coverImage}
              onChange={handleChange}
            />
          </div>
          {productData.specifications.map((spec, index) => (
            <div key={index} className="grid gap-2">
              <Label htmlFor={`spec-${index}-key`}>
                Specification {index + 1}
              </Label>
              <div className="flex space-x-4">
                <Input
                  id={`spec-${index}-key`}
                  placeholder="Key"
                  value={spec.key}
                  onChange={(e) =>
                    handleSpecificationChange(index, "key", e.target.value)
                  }
                />
                <Input
                  id={`spec-${index}-value`}
                  placeholder="Value"
                  value={spec.value}
                  onChange={(e) =>
                    handleSpecificationChange(index, "value", e.target.value)
                  }
                />
              </div>
            </div>
          ))}
          <Button type="submit">Add Product</Button>
        </div>
      </form>
    </div>
  );
}
