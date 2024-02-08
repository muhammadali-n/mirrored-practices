import { log } from "console";
import Image from "next/image";
import React, { useState } from "react";
import { Toaster } from "sonner";

interface Variant {
  id: string;
  name: string;
  price: string;
  // Add other properties as needed
}

interface ProductDetailsLayoutProps {
  decreaseQuantity: () => void;
  increaseQuantity: () => void;
  handleVariantChange: (variant: Variant) => void;
  addToCart: () => void;
  quantity: number;
  selectedVariant: any;
  productDetails: any; // Assuming productDetails can be null
}

const ProductDetailsLayout: React.FC<ProductDetailsLayoutProps> = ({
  decreaseQuantity,
  increaseQuantity,
  handleVariantChange,
  addToCart,
  quantity,
  selectedVariant,
  productDetails,
}) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const handleImageChange = (index: number) => {
    setSelectedImageIndex(index);
  };

  if (!productDetails) {
    return <div>Loading...</div>; // or some other fallback behavior
  }

  const totalPrice = parseFloat(selectedVariant.price) * quantity;

  return (
    <div className="flex">
      <Toaster position="top-right" richColors duration={1000}/>

      {/* Left column for product images */}
      <div className="w-1/2">
        <div className="mt-4">
          <Image
            width={500}
            height={30}
            src={
              (productDetails.assets &&
                productDetails.assets[selectedImageIndex]?.preview) ||
              productDetails?.imageUrl ||
              ""
            }
            alt="ïmage"
            className="w-full h-full"
          />
        </div>
      </div>

      {/* Right column for product details */}
      <div className="w-1/2 bg-slate-100 mt-4 pl-6">
        <h3 className="text-lg font-semibold mt-1 mb-2">{productDetails.name}</h3>
        <div className="w-10/12">
          <p className="text-black mb-2 text-justify">
            {productDetails.description.slice(3, -4)}
          </p>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-black">
            Select Variant:
          </label>
          <select
            value={selectedVariant.id}
            onChange={(e) => {
              const selected = productDetails.variants.find(
                (v: { id: string }) => v.id === e.target.value
              );
              handleVariantChange(selected);
            }}
            className="mt-1 block w-50 p-2 border border-black rounded-md focus:outline-none focus:border-black"
          >
            {productDetails.variants.map(
              (variant: { id: string; name: string }) => (
                <option key={variant.id} value={variant.id}>
                  {variant.name}
                </option>
              )
            )}
          </select>
        </div>
        <div className="flex items-center mb-2">
          <span className="text-black font-bold mr-5">
            ${totalPrice.toFixed(2)/100}
          </span>
          <div className="flex items-center">
            <button
              className="bg-black text-white px-2 py-1 rounded-l cursor-pointer"
              onClick={decreaseQuantity}
            >
              -
            </button>
            <span className="px-4">{quantity}</span>
            <button
              className="bg-black text-white px-2 py-1 rounded-r cursor-pointer"
              onClick={increaseQuantity}
            >
              +
            </button>
          </div>
        </div>
        {/* Cart button */}
        <div className="mt-4">
          <button
            className="bg-black text-white px-4 py-2 rounded"
            type="button"
            onClick={addToCart}
          >
            Add Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsLayout;
