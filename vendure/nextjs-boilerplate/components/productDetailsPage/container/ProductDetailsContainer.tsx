"use client";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import ProductDetailsLayout from "../layout/ProductDetailsLayout";
import { VendureService } from "@/services/vendure.service";
import { useGlobalContext } from "@/app/store";
import { toast } from "sonner";
import { log } from "console";

export default function ProductDetailsContainer({
  response,
}: {
  response: any;
}) {
  const searchParam = useSearchParams();
  const path = usePathname();
  const router = useRouter();
  const varient = searchParam.get("id");
  const [productDetails, setProductDetails] = useState({});
  const [selectedVariant, setSelectedVariant] = useState();
  const [quantity, setQuantity] = useState(1);
  const { cartItemCount, setCartItemCount } = useGlobalContext();

  useEffect(() => {
    const productInfo = response.product;
    if (varient) {
      const variant = productInfo.variants.find(
        (item: { id: string }) => item.id === varient
      );
      setSelectedVariant(variant);
      setProductDetails({
        ...variant,
        variants: productInfo.variants,
        description: productInfo.description,
        imageUrl: productInfo?.featuredAsset?.preview,
      });
      return;
    }
    setSelectedVariant(productInfo.variants[0]);
    setProductDetails({
      ...productInfo.variants[0],
      variants: productInfo.variants,
      description: productInfo.description,
      imageUrl: productInfo?.featuredAsset?.preview,
    });
  }, [response, path]);

  const handleVariantChange = (variant: { id: any }) => {
    router.push(path + `?id=${variant.id}`);
  };

  const increaseQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };
  const addToCart = async () => {
    const gqService = new VendureService();
    const res: any = await gqService.addTocart(
      varient || response.product.variants[0].id,
      quantity
    );
    if (res.addItemToOrder.code) {
      setCartItemCount(res?.addItemToOrder?.totalQuantity);
      toast.success("Added to cart");
    } else {
      toast.error(res.addItemToOrder.message);
    }
  };

  return (
    Object.keys(productDetails).length > 0 && (
      <div>
        <ProductDetailsLayout
          quantity={quantity}
          increaseQuantity={increaseQuantity}
          decreaseQuantity={decreaseQuantity}
          productDetails={productDetails}
          handleVariantChange={handleVariantChange}
          selectedVariant={selectedVariant}
          addToCart={addToCart}
        />
      </div>
    )
  );
}
