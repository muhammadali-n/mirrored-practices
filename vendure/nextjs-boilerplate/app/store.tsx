"use client"

import { Context } from '@apollo/client';
import { createContext, useContext, Dispatch, SetStateAction, useState } from 'react';
type DataType = {
    cartItemCount:string
}
interface ContextProps {
    cartItemCount: string,
    setCartItemCount:Dispatch<SetStateAction<string>>,
}

const GlobalContext = createContext<ContextProps> ({
    cartItemCount: "",
    setCartItemCount: (): number => 0,
})

export const GlobalContextProvider = ({ children }: { children :any}) => {
    const [cartItemCount, setCartItemCount] = useState("");
    return (
        <GlobalContext.Provider value={{ cartItemCount, setCartItemCount }}>
            {children}
        </GlobalContext.Provider>
    )
}

export const useGlobalContext = () => useContext(GlobalContext);