"use client";

import Image from "next/image";
import Link from "next/link";
import "./Navbar.css";
<<<<<<< HEAD
<<<<<<< Updated upstream
import { useCart } from "@/hooks/useCart";

export default function Navbar() {
    const { totalItems } = useCart();
=======
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";

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
    const pathname = usePathname();
    const isCartPage = pathname === "/cart";

>>>>>>> Stashed changes
=======
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
>>>>>>> develop
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

<<<<<<< Updated upstream
            <Link
                href="/cart"
                aria-label="Carrito de compras"
                className="cart-link-nav"
            >
                <CartCounter />
            </Link>
=======
            {!isCartPage && (
                <Link
                    href="/cart"
                    aria-label="Carrito de compras"
                    className="cart-link-nav"
                >
                    <CartCounter />
                </Link>
            )}
>>>>>>> Stashed changes
        </nav>
    );
}
