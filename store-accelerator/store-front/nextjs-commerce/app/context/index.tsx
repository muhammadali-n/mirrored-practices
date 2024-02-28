'use client'
import { addToCart, createCart } from "@/integrations/shopify/shopify-integration";
import { cookies } from "next/headers";
import React, { createContext, useEffect, useState } from "react";

export const Context = createContext<{
  cartItems: any[];
  cartItemCount: number;
  handleAddToCart: (getCurrectItem: any) => void;
  handleRemoveFromCart: (itemId: string) => void;
} | null>(null);

function GlobalState({ children }: { children: any }) {
  const [cartItems, setCartItems] = useState(() => {
    const savedCartItems = localStorage.getItem("cartItems");
    return savedCartItems ? JSON.parse(savedCartItems) : {};
  });


  // const merchandiseId = 'gid://shopify/Product/8254140973278'
  // const cartId = 'gid://shopify/Cart/Z2NwLXVzLWNlbnRyYWwxOjAxSFEzMVZCUE43NFpGMzJRMlRRRUtURVlW'

  // let cartId = cookies().get('cartId')?.value;


  const [cartItemCount, setCartItemCount] = useState(0);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    let count = 0;
    for (let item in cartItems) {
      count += cartItems[item].quantity;
    }
    setCartItemCount(count);
  }, [cartItems]);

  async function handleAddToCart(getCurrectItem: any) {

    // const merchandiseId = {
    //   selectedVariantId: 'gid://shopify/ProductVariant/44673050869982',
    //   quantity: 1
    // };
    const itemId = getCurrectItem.id;

    if (cartItems.hasOwnProperty(itemId)) {
      const updatedCart = {
        ...cartItems,
        [itemId]: { ...cartItems[itemId], quantity: cartItems[itemId].quantity + 1 },
      };
      setCartItems(updatedCart);

      // let cartId = cookies().get('cartId')?.value;
      // let cart;

      // if (cartId) {
      //   cart = await getCart(cartId);
      // }

      // if (!cartId || !cart) {
      //   cart = await createCart();
      //   cartId = cart.id;
      //   cookies().set('cartId', cartId);
      // }

      // if (!selectedVariantId) {
      //   return 'Missing product variant ID';
      // }

      // try {
      //   await addToCart(cartId, [{ merchandiseId: 'gid://shopify/ProductVariant/44673050869982', quantity: 1 }]);
      // } catch (e) {
      //   return 'Error adding item to cart';
      // }




      // addToCart(cartId, [lineItem])
    } else {
      setCartItems({ ...cartItems, [itemId]: { ...getCurrectItem, quantity: 1 } });
    }
  }

  function handleRemoveFromCart(itemId: string,) {
    const updatedCart = { ...cartItems };

    if (updatedCart.hasOwnProperty(itemId)) {
      if (updatedCart[itemId].quantity > 1) {
        updatedCart[itemId].quantity -= 1;
      } else {
        delete updatedCart[itemId];
      }

      setCartItems(updatedCart);
    }
  }

  return <Context.Provider value={{ cartItems, cartItemCount, handleAddToCart, handleRemoveFromCart }}>{children}</Context.Provider>;
}

export default GlobalState;

