"use client";

import { useCartContext } from "@/context/CartContext";
import Image from "next/image";

export default function CartCounter() {
    const { totalItems } = useCartContext();

    return (
        <>
            <Image
                src={
                    totalItems > 0
                        ? "/icons/cart-fill.svg"
                        : "/icons/cart-empty.svg"
                }
                alt="Carrito de compras"
                width={18}
                height={18}
            />
            {totalItems > 0 && (
                <span className="cart-number-nav">{totalItems}</span>
            )}
        </>
    );
}
