import type { Metadata } from "next";

import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
import { CartProvider } from "@/context/CartContext";

export const metadata: Metadata = {
    title: "Mobile Shop",
    description: "Catálogo de teléfonos móviles",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="es">
            <body suppressHydrationWarning={true}>
                <CartProvider>
                    <Navbar />
                    {children}
                </CartProvider>
            </body>
        </html>
    );
}
