"use client"
import { createContext, ReactNode, useState } from 'react';

interface CartContextProps {
    cart: number;
    updateToCart: (item: number) => void;
    // removeFromCart: (itemId: number) => void;
    // clearCart: () => void;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [cart, setCart] = useState<number>(1);

    const updateToCart = (item: number) => {
        setCart(item);
    };

    // const removeFromCart = (itemId: number) => {
    //   setCart((prevCart) => prevCart.filter((item) => item.id !== itemId));
    // };

    // const clearCart = () => {
    //   setCart("");
    // };

    return (
        <CartContext.Provider value={{ cart, updateToCart }}>
            {children}
        </CartContext.Provider>
    );
};

export default CartContext;
