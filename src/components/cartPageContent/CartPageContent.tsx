"use client";

import dynamic from "next/dynamic";

const CartClient = dynamic(() => import("../cartClient/CartClient"), {
    ssr: false,
    loading: () => <div className="shop-container"></div>,
});

export default function CartPageContent() {
    return <CartClient />;
}
