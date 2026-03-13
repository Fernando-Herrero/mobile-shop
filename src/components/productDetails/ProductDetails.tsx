"use client";

import {
    ColorOption,
    ProductDetail,
    StorageOption,
} from "@/types/products.types";
import Image from "next/image";
import { useState } from "react";

interface ProductDetailsProps {
    product: ProductDetail;
}

export default function ProductDetails({ product }: ProductDetailsProps) {
    const [selectedColor, setSelectedColor] = useState<ColorOption | null>(
        null,
    );
    const [selectedStorage, setSelectedStorage] =
        useState<StorageOption | null>(null);
    const displayPrice = selectedStorage?.price || product.basePrice;
    const displayImage =
        selectedColor?.imageUrl || product.colorOptions[0]?.imageUrl;
    console.log(displayImage);
    return (
        <section className="product-details-container">
            <div className="product-details-img">
                {displayImage ? (
                    <Image
                        src={displayImage}
                        alt={product.name}
                        fill
                        className="product-image"
                        priority
                    />
                ) : (
                    <div className="image-placeholder" />
                )}
            </div>

            <div className="product-details-info">
                <h1>{product.name}</h1>
                <p>{displayPrice}</p>
            </div>

            <button
                className={
                    selectedColor || selectedStorage
                        ? "shop-btn add-to-cart-btn"
                        : "disabled-btn"
                }
                disabled={!selectedColor || !selectedStorage}
            >
                añadir
            </button>
        </section>
    );
}
