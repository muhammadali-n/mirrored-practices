import React, { useContext, useEffect, useState } from 'react'
import Checkout from './Checkout'
import { Context } from "../../app/context";
import { fetchCartPage, fetchCheckout, fetchShipment } from '@/integrations/sanity/sanity-integration';
import { getContent, performCommonIntegration } from '@/integrations/common-integration';
import { createCheckout, getCart, updateEmail, updateShippingAddress } from '@/integrations/shopify/shopify-integration';
import { getCookie } from '@/utils/cookieUtils';


function CheckoutContainer() {
  const { cartItems, cartItemCount } = useContext(Context);
  const [cartProducts, setCartProducts] = useState<any>()
  const [totalPrice, setTotalPrice] = useState("")
  const [sanityContent, setSanityContent] = useState()
  const [shipmentFromSanity, setShipmentFromSanity] = useState({})
  const [checkoutId, setCheckoutId] = useState("")
  const [Products, setProducts] = useState<any>()
  const [price, setPrice] = useState<any>()

  let cartId = getCookie('cartId');
  let cart;

  useEffect(() => {
    // console.log('Checkout page - cartItems:', cartItems);
    setCartProducts({
      ...cartItems
    })
    const fetchData = async () => {

      if (cartId) {
        cart = await performCommonIntegration(getCart, cartId)
        const products = cart?.products
        const price = cart?.cost
        setProducts(products)
        setPrice(price)
      }

      const response = await getContent(fetchCheckout)
      const shipment = await getContent(fetchShipment)
      setSanityContent(response)
      setShipmentFromSanity(shipment)

    }
    if (cartItems) {
      const total = Object.values(cartItems).reduce((acc, item) => {
        return acc + item.price * item.quantity;
      }, 0);
      setTotalPrice(total);
    }
    fetchData()
  }, [cartItems]);

  const getProductCount = (cartItems: any) => {
    if (cartItems.hasOwnProperty(cartItems.id)) {
      return cartItems[cartItems.id].quantity;
    }
    return 0;
  };
  const data = getProductCount(cartItems)
  // console.log("data", data);

  const handleFormSubmit = async (formData: any) => {
    // Handle the form data in the CheckoutContainer
    const lineItems = Products && Products.map(item => ({
      quantity: item.quantity,
      variantId: item.merchandise.id 
    }));
    console.log('Form data submitted:', formData);
    const shippingAddress = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      address1: formData.address,
      city: formData.city,
      country: "United States",
      province: formData.state,
      zip: formData.zipCode,
    };
    const inputFileds = {
      input: {
        lineItems,
        shippingAddress,
        email: formData.email
      }
    };
    console.log("shippingg", shippingAddress)
    const checkoutId = await performCommonIntegration(createCheckout, inputFileds);
    console.log("checkoutIddds", checkoutId)
    setCheckoutId(checkoutId.checkoutId);
    const form = await performCommonIntegration(updateShippingAddress, checkoutId, shippingAddress);
    console.log("check", form);
    const email = await performCommonIntegration(updateEmail, formData.email)
    console.log("emailemail", email);

  };
  return (
    <Checkout

      cartProducts={cartProducts}
      subTotal={totalPrice}
      sanityContent={sanityContent}
      shipmentFromSanity={shipmentFromSanity}
      onFormSubmit={handleFormSubmit}
      products={Products}
      price={price}
    />
  )
}

export default CheckoutContainer