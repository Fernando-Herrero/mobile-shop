"use client";

import { CartItem } from "@/types/cart.types";
import { useEffect, useState } from "react";

export const useCart = () => {
    const [cart, setCart] = useState<CartItem[]>(() => {
        if (typeof window === "undefined") return [];

        try {
            const savedCart = localStorage.getItem("cart");
            return savedCart ? JSON.parse(savedCart) : [];
        } catch {
            return [];
        }
    });
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

    return {
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        totalItems: cart.length,
    };
};
