import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { useForm, useFieldArray } from "react-hook-form";
import { Product } from "@/types";
import { Avatar, AvatarFallback } from "@radix-ui/react-avatar";
import { PencilIcon } from "lucide-react";
import { useRef, useState } from "react";
import useAddProduct from "./useAddProduct";

export default function ProductAddEdit() {
  const { isPending, addProduct } = useAddProduct();
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<Product>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "specifications", // Ensure this matches the Product interface field
  });

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleIconClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile && selectedFile.type.startsWith("image/")) {
      const urlImage = URL.createObjectURL(selectedFile);
      setImagePreview(urlImage);
    } else {
      console.error("Selected file is not an image");
    }
  };

  const onSubmit = (data: any) => {
    const formData = new FormData();

    if (fileInputRef.current?.files?.[0]) {
      formData.append("coverImage", fileInputRef.current.files[0]);
    }

    formData.append("name", data.name);
    formData.append("category", data.category);
    formData.append("description", data.description);
    formData.append("price", data.price);
    formData.append("stock", data.stock);

    data.specifications?.forEach(
      (spec: { key: string; value: string }, index: number) => {
        formData.append(`specifications[${index}][key]`, spec.key);
        formData.append(`specifications[${index}][value]`, spec.value);
      }
    );

    console.log("Product Data Submitted:", Array.from(formData.entries()));
    addProduct(formData);
  };

  return (
    <div className="bg-gray-50 min-h-screen flex justify-center items-center p-4">
      <div className="bg-white shadow-lg rounded-lg max-w-md lg:max-w-2xl w-full p-6">
        <h3 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Add Product
        </h3>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-6">
          <div className="grid gap-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                {...register("name", { required: "Product Name is required" })}
                className="w-full"
                placeholder="Enter product name"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="category">Category</Label>
              <Input
                id="category"
                {...register("category", {
                  required: "Product Category is required",
                })}
                className="w-full"
                placeholder="Enter category"
              />
              {errors.category && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.category.message}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <textarea
                id="description"
                {...register("description", {
                  maxLength: {
                    value: 150,
                    message: "Description must be at most 150 characters",
                  },
                })}
                rows={4}
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter product description"
              ></textarea>
              {errors.description && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.description.message}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-2 md:flex-row md:gap-4">
              <div className="w-full">
                <Label htmlFor="price">Price</Label>
                <Input
                  id="price"
                  type="number"
                  {...register("price", {
                    required: "Product Price is required",
                  })}
                  className="w-full"
                  placeholder="Enter price"
                />
                {errors.price && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.price.message}
                  </p>
                )}
              </div>
              <div className="w-full">
                <Label htmlFor="stock">Stock</Label>
                <Input
                  id="stock"
                  type="number"
                  {...register("stock", {
                    required: "Product Stock is required",
                  })}
                  className="w-full"
                  placeholder="Enter stock quantity"
                />
                {errors.stock && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.stock.message}
                  </p>
                )}
              </div>
            </div>
            <div>
              <Label htmlFor="imageInput">Product Image</Label>
              <div className="relative w-40 h-40 border border-gray-300 rounded-md overflow-hidden mx-auto">
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Product"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Avatar>
                    <AvatarFallback className="bg-gray-200 text-gray-600 flex items-center justify-center">
                      No Image
                    </AvatarFallback>
                  </Avatar>
                )}
                <label
                  onClick={handleIconClick}
                  htmlFor="imageInput"
                  className="absolute bottom-2 right-2 bg-gray-700 text-white p-2 rounded-full cursor-pointer hover:bg-gray-800"
                >
                  <PencilIcon className="h-5 w-5" />
                </label>
                <Input
                  ref={fileInputRef}
                  id="imageInput"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </div>
            </div>
            <div>
              <h4 className="text-lg font-medium text-gray-700 mb-2">
                Specifications
              </h4>
              {fields.map((spec, index) => (
                <div key={spec.id} className="flex items-center space-x-2 mb-2">
                  <Input
                    placeholder="Key"
                    {...register(`specifications.${index}.key`, {
                      required: "Key is required",
                    })}
                    className="w-1/2"
                  />
                  <Input
                    placeholder="Value"
                    {...register(`specifications.${index}.value`, {
                      required: "Value is required",
                    })}
                    className="w-1/2"
                  />
                  <Button
                    onClick={() => remove(index)}
                    className="text-red-500"
                    type="button"
                    data-test-id="remove-specification"
                  >
                    Remove
                  </Button>
                </div>
              ))}
              <Button
                onClick={() => append({ key: "", value: "" })}
                type="button"
                className="w-full mt-2 bg-blue-950"
                data-test-id="add-specification"
              >
                Add Specification
              </Button>
            </div>
          </div>
          <Button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
          >
            {isPending ? "Adding Product..." : "Add Product"}
          </Button>
        </form>
      </div>
    </div>
  );
}
