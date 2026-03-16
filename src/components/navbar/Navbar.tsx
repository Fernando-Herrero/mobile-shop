"use client";

import Image from "next/image";
import Link from "next/link";
import "./Navbar.css";
import dynamic from "next/dynamic";

const CartCounter = dynamic(() => import("../cartCounter/CartCounter"), {
    ssr: false,
    loading: () => (
        <Image
            src="/icons/cart-empty.svg"
            alt="Cargando..."
            width={18}
            height={18}
        />
    ),
});

export default function Navbar() {
    return (
        <nav className="navbar">
            <Link href="/">
                <Image
                    src="/icons/home.svg"
                    alt="Ir a inicio"
                    width={74}
                    height={24}
                    loading="eager"
                />
            </Link>

            <Link
                href="/cart"
                aria-label="Carrito de compras"
                className="cart-link-nav"
            >
                <CartCounter />
            </Link>
        </nav>
    );
}
