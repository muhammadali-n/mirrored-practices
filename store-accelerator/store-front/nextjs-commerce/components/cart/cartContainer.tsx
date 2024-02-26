import React, { useCallback, useContext, useEffect, useState } from 'react'
import { Context } from "../../app/context";
import { useRouter } from 'next/navigation'
import { getContent } from '@/integrations/common-integration'
import { fetchCartPage, fetchShipment } from '@/integrations/sanity/sanity-integration';
import Cart from './cart';
import { addItem, removeItem } from './handle';
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

export default async function CartContainer({ }: Props) {
  const [quantity, setQuantity] = useState(1);
  const { cartItems } = useContext<any>(Context);
  const [totalPrice, setTotalPrice] = useState("")
  const [sanityContent, setSanityContent] = useState("")
  const [cartProducts, setCartProducts] = useState("")
  const [Products, setProducts] = useState<any>()
  const [price, setPrice] = useState<any>()

  // const contextValue = useContext(Context)

  // const { handleRemoveFromCart } = contextValue as {
  //   cartItems: any[];
  //   handleRemoveFromCart: (itemId: string) => void;
  // };
  // const removeFromCart = useCallback((productId: string) => {
  //   handleRemoveFromCart(productId);
  // }, [handleRemoveFromCart]);

  let cartId = getCookie('cartId');
  let cart;
  const removeItemFromCart = useCallback(async (lineId:string) => {
    await removeItem(lineId);
  }, [removeItem]);

  
  useEffect(() => {
    const fetchData = async () => {
      if (cartId) {
        cart = await getCart(cartId);
        const products = cart?.products
        const price = cart?.cost
        setProducts(products)
        setPrice(price)
      }
      const response = await getContent(fetchCartPage)
      setSanityContent(response)
    }
    // if (cartItems) {
    //   const total = Object.values(cartItems).reduce((acc, item) => {
    //     return acc + item.price * item.quantity;
    //   }, 0);
    //   setTotalPrice(total);
    // }
    fetchData()
  }, [cartItems, cartId]);

  const router = useRouter();
  const handleClick = () => {
    router.push('/search/all');
  };


  return (

    <Cart
      cartProducts={cartProducts}
      sanityContent={sanityContent}
      removeItemFromCart={removeItemFromCart}
      handleClick={handleClick}
      totalPrice={totalPrice}
      products={Products}
      price={price}
    />
  )
}