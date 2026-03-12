import type { Metadata } from "next";

import "./globals.css";
import Navbar from "@/components/navbar/Navbar";

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
            <body>
                <Navbar />
                {children}
            </body>
        </html>
    );
}
