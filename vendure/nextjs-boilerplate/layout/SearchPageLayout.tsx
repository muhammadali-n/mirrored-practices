"use client";
import React, { useState } from "react";
import { VendureService } from "@/services/vendure.service";
import ProductCardContainer from "@/components/productCard/container/ProductCardContainer";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function SearchPageLayout() {
  const gqService = new VendureService();
  const [searchResults, setSearchResults] = useState();
  const router = useRouter();
  console.log("router", router);

  const handleSearchClick = async (e) => {
    if (e.target?.value) {
      const response: any = await gqService.getProductSearch(e.target.value);
      setSearchResults(response?.search);
    }
  };

  const handleClose = () => {
    router.back();
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-90 z-50">
      <span
        className="absolute top-2 right-3 text-3xl cursor-pointer text-white z-10"
        onClick={handleClose}
        title="Close Overlay"
      >
        &times;
      </span>
      <div className="absolute top-1 w-full">
        <div className="flex justify-center">
          <form action="/product-list" className="flex w-full justify-center">
            <input
              type="text"
              placeholder="Search.."
              name="search"
              className="w-3/4 p-3 border border-gray-300 rounded-l-lg focus:outline-none"
              onChange={handleSearchClick}
            />
            <button
              type="submit"
              onClick={handleSearchClick}
              className="w-20 bg-gray-300 rounded-r-lg"
            >
              <div className="flex justify-center">
              <Image
                src="/images/searchIcon.svg"
                alt="Logo"
                width={20}
                height={20}
                className="relative"
              />
              </div>
            </button>
          </form>
        </div>
        {searchResults && searchResults.items.length > 0 && (
          <>
            <h4 className="text-white flex justify-center mb-8 mt-8">
              {" "}
              Top Results
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {searchResults.items.map(
                (product: { id: React.Key | null | undefined }) => (
                  <ProductCardContainer key={product.id} product={product} />
                )
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
