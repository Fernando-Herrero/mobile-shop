"use client"; // Los archivos de error SIEMPRE deben ser client components

import { useEffect } from "react";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div
            className="shop-container"
            style={{ textAlign: "center", padding: "100px 0" }}
        >
            <h2 className="shop-text fs-20 uppercase">Algo ha salido mal</h2>
            <p className="shop-text fs-14" style={{ margin: "20px 0" }}>
                No hemos podido cargar los teléfonos. Por favor, inténtalo de
                nuevo.
            </p>
            <button
                className="shop-btn shop-text fs-12"
                onClick={() => reset()}
                style={{
                    background: "black",
                    color: "white",
                    padding: "12px 24px",
                }}
            >
                Reintentar
            </button>
        </div>
    );
}
