import { client } from '@/app/lib/sanity';
import { customUi, performTransformation } from '../common-transformer';
import customPageTransformerConfig from "./sanity-transform-config.json"
import { transformSanityCartData, transformSanityPaymentData, transformSanityShipmentData } from './sanity-transformer';

const getDataByQuery = async (query: string) => {

  return await client.fetch(query);
}

export const fetchPageDataBySlug = async (slug: string) => {
  try {
    console.log('fetch data   ');
    // creating page data using slug
    const getPageData = await getDataByQuery(`*[_type == 'nav' && slug.current == "${slug}"]`);

    const { transformedData } = performTransformation(getPageData, customPageTransformerConfig)
    console.log("transformedData", transformedData);


    //fixed custom ui
    const result = customUi(transformedData);
    return result
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const fetchProductCard = async () => {
  const AddtoCart = await getDataByQuery("*[_type == 'ProductCard'  && sections._type == 'button']")
  const { transformedData } = performTransformation(AddtoCart, customPageTransformerConfig)
  return transformedData
}

export const fetchCartPage = async () => {
  const cartItemsQuery = `*[_type == 'cartItems']`;
  const cart = await getDataByQuery(cartItemsQuery)
  const transformedData = transformSanityCartData(cart)
  console.log("cartcart", transformedData);

  return transformedData
}

export const fetchHeader = async () => {

  const header = await getDataByQuery("*[_type == 'header']")
  return header
}

export const fetchFooter = async () => {
  const footer = await getDataByQuery("*[_type == 'footer']")
  return footer
}

export const fetchPlpData = async () => {
  const plpData = await getDataByQuery("*[_type == 'plpData']")
  return plpData
}

export const fetchCheckout = async () => {
  const checkout = await getDataByQuery("*[_type == 'checkout']")
  return checkout
}

export const fetchShipment = async () => {
  const shipment = await getDataByQuery("*[_type == 'shipment']")
  const transformedData = transformSanityShipmentData(shipment)
  return transformedData
}
export const fetchPdpData = async () => {
  const pdpData = await getDataByQuery("*[_type == 'pdpData']")
  return pdpData
}
export const fetchPayment = async () => {
  const payment = await getDataByQuery("*[_type == 'payment']")
  const transformedData = transformSanityPaymentData(payment)
  return transformedData
}