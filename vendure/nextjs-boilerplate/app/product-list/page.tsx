import ProductListLayout from "@/components/ProductListing/layout/ProductListLayout";
import { VendureService } from "@/services/vendure.service";
import React from "react";

export default async function page(params) {
    console.log(params);
    console.log("params?.searchParams?.search", params?.searchParams?.search);
  const gqService = new VendureService();
  
 const response: any = await gqService.getProductSearch(params?.searchParams?.search );
  return (
    <div>
      <ProductListLayout response={response} />
    </div>
  );
}
