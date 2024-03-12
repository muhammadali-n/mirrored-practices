import React, { useCallback, useContext, useEffect, useState } from 'react'
import { Context } from "../../app/context";
import { useRouter } from 'next/navigation'
import { getContent, performCommonIntegration, performIntegration } from '@/integrations/common-integration'
import { fetchCart, fetchCartPage, fetchShipment } from '@/integrations/sanity/sanity-integration';
import Cart from './cart';
import { addItem, removeItem, updateItemQuantity } from './handle';
import { getCookie } from '@/utils/cookieUtils';
import { getCart } from '@/integrations/shopify/shopify-integration';
interface Product {
  id: string;
  title: string;
  quantity: number;
  price: string;
  currencyCode: string;
  images: string[];
}

interface Cost {
  totalAmount: {
    amount: string;
    currencyCode: string;
  };
  subtotalAmount: {
    amount: string;
    currencyCode: string;
  };
  totalTaxAmount: {
    amount: string;
    currencyCode: string;
  };
  totalDutyAmount: null | string;
}

interface Props {
  products: Product[];
  cost: Cost;
}

interface CartItem {
  description: string;
  handle: string;
  id: string;
  imageSrc: string;
  price: string;
  quantity: number;
  title: string;
}

export default async function CartContainer() {
  const { cartItems } = useContext<any>(Context);
  const [sanityContent, setSanityContent] = useState("")
  const [Products, setProducts] = useState<any>()
  const [price, setPrice] = useState<any>()
  const [reload, setReload] = useState(false);
  const [transformedCart, setTransformedCart] = useState({});

  let cartId = getCookie('cartId');
  let cart;

  const fetchData = useCallback(async () => {
    fetchCartResponse();
    const sanityCart = await getContent(fetchCart);
    setSanityContent(sanityCart);
    // console.log("sanityCart", sanityCart);
  },[]);
  
  const removeItemFromCart = useCallback(async (lineId: string) => {
    await removeItem(lineId);
    fetchCartResponse();
    // updateCart(); // Update the cart data after an item is removed
  }, [removeItem]);
  
  const removeQuantityFromCart = useCallback(async (variantId,cartLineId,quantity) => {
    try {
      const payload = {
        lineId: cartLineId,
        variantId: variantId,
        quantity: quantity - 1
      };
      await updateItemQuantity(payload);
      fetchCartResponse();
      //await updateCart(); // Update the cart data after the quantity is updated
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  }, [updateItemQuantity]);

  const addQuantityFromCart = useCallback(async (variantId,cartLineId,quantity) => {
    try {
      const payload = {
        lineId:cartLineId,
        variantId: variantId,
        quantity: quantity + 1
      };
      await updateItemQuantity(payload);
      fetchCartResponse();
      //await updateCart(); // Update the cart data after the quantity is updated
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  }, [updateItemQuantity]);
  
  
  useEffect(() => {
    fetchData();
    fetchCartResponse();
  }, [fetchData]);
  
  const fetchCartResponse = async () => {
    const cartResponse = await performIntegration("getCart",cartId);
    setTransformedCart(cartResponse["current"]);
 }
  const router = useRouter();
  const handleClick = () => {
    router.push('/search/all');
  };

  return (
    <Cart
      sanityContent={sanityContent}
      removeItemFromCart={removeItemFromCart}
      handleClick={handleClick}
      products={Products}
      price={price}
      removeQuantityFromCart={removeQuantityFromCart}
      addQuantityFromCart={addQuantityFromCart}
      transformedCart={transformedCart}
    />
  )
}