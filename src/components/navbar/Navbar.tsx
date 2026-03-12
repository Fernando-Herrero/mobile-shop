"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import "./Navbar.css";

export default function Navbar() {
    const [cart, setCart] = useState(0);
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
                    src="/icons/cart-empty.svg"
                    alt="Carrito de compras"
                    width={18}
                    height={18}
                />
                <span className="cart-number-nav">{cart}</span>
            </Link>
        </nav>
    );
}
