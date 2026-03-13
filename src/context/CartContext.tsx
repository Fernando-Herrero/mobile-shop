"use client";

import { useCart } from "@/hooks/useCart";
import { CartContextType } from "@/types/cart.types";
import { createContext, ReactNode, useContext } from "react";

const CartContext = createContext<CartContextType | null>(null);

interface CartProviderProps {
    children: ReactNode;
}

export function CartProvider({ children }: CartProviderProps) {
    const cartHook = useCart();

    return (
        <CartContext.Provider value={cartHook}>{children}</CartContext.Provider>
    );
}

export const useCartContext = () => {
    const context = useContext(CartContext);
    if (!context) throw new Error("useCart must be used within a CartProvider");
    return context;
};
