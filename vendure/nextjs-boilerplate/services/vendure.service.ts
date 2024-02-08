import {
  ApolloClient,
  ApolloQueryResult,
  gql,
  InMemoryCache,
} from "@apollo/client";
import { myCartQuery } from "../queries/my-cart.query";
import { productDetailsBySlug } from "../queries/product-details.query";
import { productSlug } from "../queries/product-slug.query";
import { productListing } from "../queries/product.queries";
import { collectionlist } from "../queries/collection.query";
import { CollectionProductsList } from "@/queries/collectionProductList.query";
import { FacetsList } from "@/queries/facets.query";
import { addItemToOrderMutation } from "@/queries/mutations/add-item-to-order";
import { query } from "./client";
import { GET_ACTIVE_ORDER } from "@/queries/active-order.query";
import { promises } from "dns";
import { AdjustOrderLine } from "@/queries/adjustOrderLine.query";
import { removeItemFromOrderMutation } from "@/queries/mutations/remove-from-cart.mutation";
import { availableCountries } from "@/queries/availableCountries";
import { eligibleShippingMethods } from "@/queries/eligibleShippingMethods";
import { eligiblePaymentMethods } from "@/queries/eligiblePaymentMethods";
import { setCustomerForOrder } from "@/queries/mutations/setCustomerForOrder";
import { Input } from "postcss";
import { setOrderShippingAddress } from "@/queries/mutations/setOrderShippingAddress";
import { setOrderShippingMethod } from "@/queries/mutations/set-shipping-method.mutation";
import { CreateStripePaymentIntent } from "@/queries/mutations/CreateStripePaymentIntent";
import { TransitionToState } from "@/queries/mutations/transitionToState";
import { AddPaymentToOrder } from "@/queries/mutations/addPaymentToOrder";
import { getOrderByCode } from "@/queries/getOrderByCode";
import { register } from "@/queries/mutations/register";
import { productSearch } from "@/queries/mutations/product-search";

export class VendureService {

  private __client;

  constructor() {
    this.__client = new ApolloClient({
      uri: process.env.NEXT_PUBLIC_VENDURE_URL,
      cache: new InMemoryCache(),
    });
  }

  public fetchProducts = async (): Promise<ApolloQueryResult<any>> => {
    const response = await this.__client.query({
      query: productListing,
    });
    return response;
  };

  public fetchProductSlugs = async (): Promise<ApolloQueryResult<any>> => {
    const response = await this.__client.query({
      query: productSlug,
    });
    return response;
  };

  public fetchProductBySlugs = async (
    slug: string
  ): Promise<ApolloQueryResult<any>> => {
    const response = await this.__client.query({
      query: productDetailsBySlug,
      variables: { slug },
    });
    return response;
  };

  public fetchCollection = async (): Promise<ApolloQueryResult<any>> => {
    const response = await this.__client.query({
      query: collectionlist,
      fetchPolicy: "no-cache",
    });
    return response.data;
  };

  public fetchCollectionProducts = async (
    slug: String,
    ids: any
  ): Promise<ApolloQueryResult<any>> => {
    const response = await this.__client.query({
      query: CollectionProductsList,
      variables: {
        slug,
        ids,
      },
      fetchPolicy: "no-cache",
    });
    return response.data;
  };

  public fetchfacets = async (
    slug: String
  ): Promise<ApolloQueryResult<any>> => {
    const response = await this.__client.query({
      query: FacetsList,
      variables: { slug },
      fetchPolicy: "no-cache",
    });
    return response.data;
  };

  public fetchProductDetails = async (
    slug: String
  ): Promise<ApolloQueryResult<any>> => {
    const response = await this.__client.query({
      query: productDetailsBySlug,
      variables: { slug },
      fetchPolicy: "no-cache",
    });
    return response.data;
  };

  public addTocart = async (
    productVariantId: String,
    quantity: Number
  ): Promise<ApolloQueryResult<any>> => {
    const response = await query(addItemToOrderMutation, {
      productVariantId,
      quantity,
    });
    return response.data;
  };
  public adjustOrderLine = async (orderLineId: String, quantity: Number) => {
    const response = await query(AdjustOrderLine, {
      orderLineId,
      quantity,
    });
    return response.data;
  };

  public removeItemFromOrderMutation = async (orderLineId: String) => {
    const response = await query(removeItemFromOrderMutation, {
      orderLineId,
    });
    return response.data;
  };

  public availableCountries = async () => {
    const response = await query(availableCountries, {});
    return response.data;
  };

  public eligibleShippingMethods = async () => {
    const response = await query(eligibleShippingMethods);
    return response.data;
  };

  public eligiblePaymentMethods = async () => {
    const response = await query(eligiblePaymentMethods);
    return response.data;
  };

  public setCustomerForOrder = async (input) => {
    const response = await query(setCustomerForOrder,{input});
    return response.data;
  };

  public setOrderShippingAddress = async (input) =>{
    const response = await query(setOrderShippingAddress,{input});
    return response.data;
  }
  public setOrderShippingMethod = async (id) =>{
    const response = await query(setOrderShippingMethod,{id});
    return response.data;
  }

  public createStripePaymentIntent = async () =>{
    const response = await query(CreateStripePaymentIntent,);
    return response.data;
  }

  public  TransitionToState = async ()=>  {
    const response = await query(TransitionToState,{state:"ArrangingPayment"});
    return response.data;
}

public AddPaymentToOrder = async () =>{
const input={
  "method": "cash-on-delivery",
  "metadata": {
    "shouldDecline": false,
    "shouldError": false,
    "shouldErrorOnSettle": false,
  }
};
  const response = await query(AddPaymentToOrder,{input});
  return response.data.addPaymentToOrder;
}

public getOrderByCode = async (code) =>{
  const response = await query(getOrderByCode,{code});
  return response.data.orderByCode;
}


public setCustomerRegister = async (input) =>{
  const response = await query(register,{input});
  return response.data;
}

public getProductSearch = async (
  term: string
): Promise<ApolloQueryResult<any>> => {
  const response = await this.__client.query({
    query: productSearch,
    variables: {term},
    fetchPolicy: "no-cache",
  });
  return response.data;
};
  
}
  