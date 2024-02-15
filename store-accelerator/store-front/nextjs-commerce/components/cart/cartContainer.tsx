import React, { useContext, useEffect, useState } from 'react'
import { Context } from "../../app/context";
import { useRouter } from 'next/navigation'
import { getContent } from '@/integrations/common-integration'
import { fetchProceedToCheckoutButton } from '@/integrations/sanity/sanity-integration';
import Cart from './cart';
type Props = {}

interface CartItem {
  description: string;
  handle: string;
  id: string;
  imageSrc: string;
  price: string;
  quantity: number;
  title: string;
}

export default function CartContainer({}: Props) {
    const [quantity, setQuantity] = useState(1);
    const { cartItems } = useContext(Context);
    const [totalPrice, setTotalPrice] = useState("")
    const [CheckoutButton, setCheckoutButton] = useState("")
    const [cartProducts, setCartProducts]= useState("")
    const contextValue = useContext(Context)
    const { handleRemoveFromCart } = contextValue as {
      cartItems: any[];
      handleRemoveFromCart: (itemId: string) => void;
    };
    const removeFromCart = (productId: string) => {
      handleRemoveFromCart(productId);
    };
  
    useEffect(() => {
      console.log("Updated", cartItems);
      setCartProducts({
        ...cartItems
      });
      const fetchData = async () => {
        const button = await getContent(fetchProceedToCheckoutButton)
        setCheckoutButton(button)
      }
      if (cartItems) {
        const total = Object.values(cartItems).reduce((acc, item) => {
          return acc + item.price * item.quantity;
        }, 0);
        setTotalPrice(total);
      }
      fetchData()
    }, [cartItems]);
    console.log("cart", cartProducts);
    console.log("cartItems", cartItems);


    console.log("CheckoutButton", CheckoutButton);
  
    const router = useRouter();
    const handleClick = () => {
      router.push('/search/all');
    };
  

    
  return (

    <Cart 
    cartProducts={cartProducts}
    CheckoutButton={CheckoutButton}
    removeFromCart={removeFromCart}
    handleClick={handleClick}
    totalPrice={totalPrice}
    // setCartProducts={setCartProducts}
    />
  )
}