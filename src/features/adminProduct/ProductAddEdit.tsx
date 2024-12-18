import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { useForm, useFieldArray } from "react-hook-form";
import { Product } from "@/types";
import { Avatar, AvatarFallback } from "@radix-ui/react-avatar";
import { PencilIcon, Trash } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import useAddProduct from "./useAddProduct";
import useGetProduct from "../products/useGetProduct";
import { useParams } from "react-router-dom";
import LoadingSpinner from "@/components/Spinner";
import useEditProduct from "./useEditProduct";
import BackButton from "@/components/BackButton";

export default function ProductAddEdit() {
  const { isEditingProduct, editProduct } = useEditProduct();
  const { isPending, addProduct } = useAddProduct();
  const { id } = useParams();
  const [initialProduct, setInitialProduct] = useState({});
  const { isLoading: isLoadingInitialProduct, product } = useGetProduct(id);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<Product>({
    defaultValues: {
      name: "",
      category: "",
      description: "",
      price: 0,
      stock: 0,
      specifications: [],
      images: [],
    },
  });
  // FieldArray for specifications
  const {
    fields: specFields,
    append: appendSpec,
    remove: removeSpec,
  } = useFieldArray({
    control,
    name: "specifications",
  });

  // FieldArray for product images
  const {
    fields: imageFields,
    append: appendImage,
    remove: removeImage,
  } = useFieldArray({
    control,
    name: "images",
  });

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imagePreviews, setImagePreviews] = useState<Record<number, string>>(
    {}
  );
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const fileInputRefs = useRef<HTMLInputElement[]>([]);

  const handleIconClick = () => {
    fileInputRef.current?.click();
  };
  useEffect(() => {
    if (product) {
      reset({
        name: product.name || "",
        category: product.category || "",
        description: product.description || "",
        price: product.price || 0,
        stock: product.stock || 0,
        specifications: product.specifications || [],
        images: product.images || [],
      });

      // Set cover image preview if available
      if (product.coverImage) {
        setImagePreview(product.coverImage);
      }

      // Set additional image previews
      if (product.images) {
        const previews = product.images.reduce(
          (acc: Record<number, string>, img: string, index: number) => {
            acc[index] = img;
            return acc;
          },
          {}
        );
        setImagePreviews(previews);
      }
    }
  }, [product, reset]);

  // Handle cover image preview
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile && selectedFile.type.startsWith("image/")) {
      const urlImage = URL.createObjectURL(selectedFile);
      setImagePreview(urlImage);
    } else {
      console.error("Selected file is not an image");
    }
  };
  // Handle additional images preview
  const handleImagesChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile && selectedFile.type.startsWith("image/")) {
      const urlImage = URL.createObjectURL(selectedFile);
      setImagePreviews((prev) => ({ ...prev, [index]: urlImage }));
    } else {
      console.error("Selected file is not an image");
    }
  };
  const onSubmit = (data: any) => {
    const formData = new FormData();

    // Append cover image
    if (fileInputRef.current?.files?.[0]) {
      formData.append("coverImage", fileInputRef.current.files[0]);
    }

    // Append additional images
    fileInputRefs.current.forEach((fileInput) => {
      if (fileInput?.files?.[0]) {
        formData.append("images", fileInput.files[0]);
      }
    });

    // Add other product details
    formData.append("name", data.name);
    formData.append("category", data.category);
    formData.append("description", data.description);
    formData.append("price", data.price);
    formData.append("stock", data.stock);

    // Add specifications
    data.specifications?.forEach(
      (spec: { key: string; value: string }, index: number) => {
        formData.append(`specifications[${index}][key]`, spec.key);
        formData.append(`specifications[${index}][value]`, spec.value);
      }
    );

    if (id) {
      editProduct({ id, data: formData });
    } else {
      addProduct(formData);
    }
  };
  if (isLoadingInitialProduct) return <LoadingSpinner />;

  return (
    <div className="bg-gray-50 min-h-screen flex justify-center items-center p-4">
      <div className="bg-white shadow-lg rounded-lg max-w-md lg:max-w-2xl w-full p-6">
        <BackButton />

        <h3 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          {id ? "Edit Product" : "Add Product"}
        </h3>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-6">
          {/* Product Details */}
          <div className="grid gap-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                {...register("name", { required: "Product Name is required" })}
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
                placeholder="Enter product description"
                className="w-full border rounded-md"
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
            {/* Cover Image */}
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
                    <AvatarFallback className="bg-gray-200 flex items-center justify-center">
                      No Image
                    </AvatarFallback>
                  </Avatar>
                )}
                <label
                  onClick={handleIconClick}
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

            {/* Additional Images */}
            <div>
              <h4 className="text-lg font-medium mb-2">Product Images</h4>
              {imageFields.map((imageField, index) => (
                <div
                  key={imageField.id}
                  className="flex items-center space-x-2 mb-2"
                >
                  <div className="relative w-24 h-24 border rounded overflow-hidden">
                    {imagePreviews[index] ? (
                      <img
                        src={imagePreviews[index]}
                        alt="Preview"
                        className="w-full h-full"
                      />
                    ) : (
                      <Avatar>
                        <AvatarFallback>No Image</AvatarFallback>
                      </Avatar>
                    )}
                  </div>
                  <Input
                    type="file"
                    accept="image/*"
                    ref={(el) => (fileInputRefs.current[index] = el!)}
                    onChange={(e) => handleImagesChange(e, index)}
                  />
                  <Button type="button" onClick={() => removeImage(index)}>
                    <Trash className="text-red-600" />
                  </Button>
                </div>
              ))}
              <Button type="button" onClick={() => appendImage({ file: "" })}>
                Add Image
              </Button>
            </div>

            {/* Specifications */}
            <div>
              <h4 className="text-lg font-medium mb-2">Specifications</h4>
              {specFields.map((field, index) => (
                <div
                  key={field.id}
                  className="flex items-center space-x-2 mb-2"
                >
                  <Input
                    placeholder="Key"
                    {...register(`specifications.${index}.key`, {
                      required: true,
                    })}
                  />
                  <Input
                    placeholder="Value"
                    {...register(`specifications.${index}.value`, {
                      required: true,
                    })}
                  />
                  <Button type="button" onClick={() => removeSpec(index)}>
                    <Trash className="text-red-600" />
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                onClick={() => appendSpec({ key: "", value: "" })}
              >
                Add Specification
              </Button>
            </div>
          </div>

          {/* Submit Button */}
          <Button type="submit">
            {id
              ? !isEditingProduct
                ? "Edit Product"
                : "Editing..."
              : !isPending
              ? "Add Product"
              : "Adding..."}
          </Button>
        </form>
      </div>
    </div>
  );
}
