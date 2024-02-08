import Image from "next/image";
import React from "react";

interface ProductCartCardProps {
  product: {
    featuredAsset: {
      preview: string;
    };
    productVariant: {
      name: string;
    };
    id: string;
    quantity: number;
    linePriceWithTax: number;
  };
  handleDecrease: (id: string, quantity: number) => void;
  handleIncrease: (id: string, quantity: number) => void;
  handleDelete: (id: string) => void;
  currencyCode: string;
}

const ProductCartCard: React.FC<ProductCartCardProps> = ({
  product,
  handleDecrease,
  handleIncrease,
  handleDelete,
  currencyCode,
}) => {
  const {
    featuredAsset,
    productVariant,
    id,
    quantity,
    linePriceWithTax,
  } = product;

  return (
    <div className="bg-white ml-6 flex mt-4 mb-4  rounded-lg pb-7">
      <div className="flex items-center">
        <Image
          src={featuredAsset.preview}
          alt={productVariant?.name}
          width={170}
          height={160}
          className="mr-4 w-36 h-36" // Adjust 'w-20' and 'h-20' as needed
        />
        <div>
          <h2 className="text-lg font-semibold">{productVariant?.name}</h2>
          <p className="text-black">
            Price: {currencyCode} {linePriceWithTax / 100}
          </p>
          <div className="grid grid-cols-12">
            <div className="mt-4 col-span-5 items-center">
              <button
                type="button"
                onClick={() => handleDecrease(id, quantity)}
                className="bg-black text-white px-3 py-1 rounded"
              >
                -
              </button>
              <span className="mx-2">{quantity}</span>
              <button
                type="button"
                onClick={() => handleIncrease(id, quantity)}
                className="bg-black text-white px-3 py-1 rounded"
              >
                +
              </button>
            </div>
            <div className="col-span-7 mt-4 ml-3">
              <button
                onClick={() => handleDelete(id)}
                className="ml-5 text-blaxck"
              >
                <Image
                  src="/images/trash.svg"
                  alt="Logo"
                  width={"30"}
                  height={"300"}
                  className="relative"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCartCard;
