"use client";

import Image from "next/image";
import Link from "next/link";
import "./Navbar.css";
import { useCart } from "@/hooks/useCart";

export default function Navbar() {
    const { totalItems } = useCart();
    return (
        <nav className="navbar">
            <Link href="/">
                <Image
                    src="/icons/home.svg"
                    alt="Ir a inicio"
                    width={74}
                    height={24}
                />
            </Link>

            <Link
                href="/cart"
                aria-label="Carrito de compras"
                className="cart-link-nav"
            >
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
                <span className="cart-number-nav">{totalItems}</span>
            </Link>
        </nav>
    );
}
