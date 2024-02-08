"use client";
import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import ProductListingContainer from "@/components/ProductListing/container/ProductListingContainer";
import NotFound from "@/components/common/NotFound";
import FilterContainer from "@/components/filter/container/FilterContainer";

export default function ProductList({
  collectionSlug,
  facetsResponse,
  plpContent,
}: {
  collectionSlug: any;
  facetsResponse: object;
  plpContent: Function;
}) {
  const [response, setResponse] = useState<any>();
  const param = useParams();
  const searchParam = useSearchParams();
  const filter = searchParam.get("filter");

  const getProducts = (filter: never[]) => {
    plpContent(collectionSlug, filter).then(
      (res: React.SetStateAction<undefined>) => {
        setResponse(res);
      }
    );
  };

  useEffect(() => {
    if (!filter) {
      getProducts([]);
    }
  }, [param]);

  return response?.search?.items.length > 0 ? (
    <div className="grid grid-cols-12">
      <div className="col-span-2">
        <FilterContainer
          facetsResponse={facetsResponse}
          getProducts={getProducts}
        />
      </div>
      <div className="col-span-10 mt-14">
        <ProductListingContainer
          response={response}
          facetsResponse={facetsResponse}
        />
      </div>
    </div>
  ) : (
    response && <NotFound />
  );
}
