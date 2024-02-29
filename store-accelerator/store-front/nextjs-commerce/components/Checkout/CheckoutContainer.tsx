import React, { useEffect, useState } from 'react'
import Checkout from './Checkout'
import { fetchCheckout, fetchPayment, fetchShipment } from '@/integrations/sanity/sanity-integration';
import { getContent, performCommonIntegration } from '@/integrations/common-integration';
import { createCheckout, getCart } from '@/integrations/shopify/shopify-integration';
import { getCookie } from '@/utils/cookieUtils';


function CheckoutContainer() {
  const [sanityContent, setSanityContent] = useState()
  const [shipmentFromSanity, setShipmentFromSanity] = useState('')
  const [checkoutId, setCheckoutId] = useState("")
  const [Products, setProducts] = useState<any>()
  const [price, setPrice] = useState<any>()
  const [paymentMethod, setPaymentMethod] = useState('');
  const [payment, setPayment] = useState()

  let cartId = getCookie('cartId');
  let cart;

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const [selectedShippingMethod, setSelectedShippingMethod] = useState('');

  const handleShippingMethodChange = (e) => {
    setSelectedShippingMethod(e.target.value);
  };

  useEffect(() => {
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
      const payment = await getContent(fetchPayment)
      setPayment(payment)
      setSanityContent(response)
      setShipmentFromSanity(shipment)

    }
    fetchData()
  }, []);

  const handleFormSubmit = async (formData: any) => {
    const lineItems = Products && Products.map((item: any) => ({
      quantity: item.quantity,
      variantId: item.merchandise.id
    }));
    const shippingAddress = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      address1: formData.address,
      city: formData.city,
      country: formData.country,
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

    const checkoutId = await performCommonIntegration(createCheckout, inputFileds);
    setCheckoutId(checkoutId.checkoutId);

  };
  return (
    <Checkout
      sanityContent={sanityContent}
      shipmentFromSanity={shipmentFromSanity}
      onFormSubmit={handleFormSubmit}
      products={Products}
      price={price}
      handlePaymentMethodChange={handlePaymentMethodChange}
      paymentMethod={paymentMethod}
      handleShippingMethodChange={handleShippingMethodChange}
      selectedShippingMethod={selectedShippingMethod}
      payment={payment}
    />
  )
}

export default CheckoutContainer