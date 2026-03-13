"use client";

import { CartContextType, CartItem } from "@/types/cart.types";
import {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState,
} from "react";

const CartContext = createContext<CartContextType | null>(null);

interface CartProviderProps {
    children: ReactNode;
}

export function CartProvider({ children }: CartProviderProps) {
    const [cart, setCart] = useState<CartItem[]>(() => {
        if (typeof window === "undefined") return [];

        try {
            const savedCart = localStorage.getItem("cart");
            return savedCart ? JSON.parse(savedCart) : [];
        } catch {
            return [];
        }
    });
    const [error, setError] = useState<string | null>(null);
    // Al principio use useEffect para el carrito, pero me saltó el aviso de los "cascading renders".
    // Problema que ya habia visto al pasar mi proyecto personal a next.
    // Así que lo he movido al estao inicial pa ra que no de rplemas ni re-renders.
    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    const addToCart = (item: CartItem) => {
        setCart((prev) => [...prev, item]);
    };

    const removeFromCart = (id: string) => {
        setCart((prev) => prev.filter((item) => item.id !== id));
    };

    const clearCart = () => setCart([]);

    const totalItems = cart.length;

    return (
        <CartContext.Provider
            value={{
                cart,
                setCart,
                error,
                setError,
                addToCart,
                removeFromCart,
                clearCart,
                totalItems,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export const useCartContext = () => {
    const context = useContext(CartContext);
    if (!context) throw new Error("useCart must be used within a CartProvider");
    return context;
};
