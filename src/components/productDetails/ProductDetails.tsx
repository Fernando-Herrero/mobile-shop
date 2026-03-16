"use client";

import {
    ColorOption,
    ProductDetail,
    StorageOption,
} from "@/types/products.types";
import Image from "next/image";
import { useState } from "react";
import "./ProductDetails.css";
import { useCartContext } from "@/context/CartContext";
import PhoneCard from "@/components/phoneCard/PhoneCard";
import { getImageScaleClass } from "@/utils/product.helpers";

interface ProductDetailsProps {
    product: ProductDetail;
}

export default function ProductDetails({ product }: ProductDetailsProps) {
    const { addToCart } = useCartContext();
    const [selectedColor, setSelectedColor] = useState<ColorOption | null>(
        null,
    );
    const [selectedStorage, setSelectedStorage] =
        useState<StorageOption | null>(null);
    const displayPrice = selectedStorage?.price || product.basePrice;
    const displayImage =
        selectedColor?.imageUrl || product.colorOptions[0]?.imageUrl;
    const [isLoading, setIsLoading] = useState(false);

    const handleAddToCart = () => {
        if (selectedColor && selectedStorage) {
            setIsLoading(true);
            try {
                addToCart({
                    id: `${product.id}-${selectedColor.name}-${selectedStorage.capacity}`,
                    name: product.name,
                    image: selectedColor.imageUrl,
                    price: selectedStorage.price,
                    color: selectedColor.name,
                    storage: selectedStorage.capacity,
                });
            } catch (error) {
                console.log("Error adding phone", error);
            } finally {
                setTimeout(() => {
                    setIsLoading(false);
                }, 500);
            }
        }
    };

    const scaleClass = getImageScaleClass(product.brand, product.name);

    // Ya que no puedo controlar qué productos similares vienen, si alguno está duplicado lo eliminamos.
    // Además, filtramos para que el producto que estamos viendo actualmente no aparezca en la lista de similares por si acaso.
    const uniqueSimilarProducts = product.similarProducts.reduce(
        (acc, phone) => {
            const isDuplicate = acc.find((p) => p.id === phone.id);
            const isCurrentProduct = phone.id === product.id;

            if (!isDuplicate && !isCurrentProduct) {
                acc.push(phone);
            }
            return acc;
        },
        [] as typeof product.similarProducts,
    );

    return (
        <section className="product-details-container">
            <div className="product-details-phone">
                <div className={`product-details-img ${scaleClass} `}>
                    {displayImage ? (
                        <Image
                            src={displayImage}
                            alt={product.name}
                            fill
                            className="product-image"
                            priority
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
                        />
                    ) : (
                        <div className="image-placeholder" />
                    )}
                </div>

                <div className="product-details-phone-info">
                    <header className="product-details-info">
                        <h1 className="shop-text fs-20">{product.name}</h1>
                        <data className="shop-text fs-14" value={displayPrice}>
                            {displayPrice}eur
                        </data>
                    </header>

                    <div className="product-storage-color">
                        <div className="product-details-selector">
                            <legend className="shop-text fs-12">
                                storage¿how much space do you need?
                            </legend>
                            <div className="storage-options">
                                {product.storageOptions.map((option) => (
                                    <button
                                        key={option.capacity}
                                        onClick={() =>
                                            setSelectedStorage(option)
                                        }
                                        className={`storage-option-btn shop-text fs-12 ${
                                            selectedStorage?.capacity ===
                                            option.capacity
                                                ? "active"
                                                : ""
                                        }`}
                                        aria-label={`Storage capacity ${option.capacity}`}
                                    >
                                        {option.capacity}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="product-details-selector">
                            <p className="shop-text fs-12">
                                color. pick your favorite.
                            </p>
                            <div className="color-options-container">
                                <div className="color-options">
                                    {product.colorOptions.map((color) => (
                                        <button
                                            key={color.name}
                                            onClick={() =>
                                                setSelectedColor(color)
                                            }
                                            className={`color-option-btn ${
                                                selectedColor?.name ===
                                                color.name
                                                    ? "active"
                                                    : ""
                                            }`}
                                            style={{
                                                backgroundColor: color.hexCode,
                                            }}
                                            title={color.name}
                                        />
                                    ))}
                                </div>

                                {selectedColor && (
                                    <span className="shop-text fs-10 selected-color-name">
                                        {selectedColor.name}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>

                    <button
                        className={`shop-btn shop-text fs-12 ${
                            selectedColor && selectedStorage
                                ? "add-to-cart-btn"
                                : "disabled-btn"
                        } ${isLoading ? "loading" : ""}`}
                        disabled={
                            !selectedColor || !selectedStorage || isLoading
                        }
                        onClick={handleAddToCart}
                        aria-live="polite"
                    >
                        {isLoading ? "Añadiendo..." : "añadir"}
                    </button>
                </div>
            </div>
            <div className="product-details-specs">
                <h2 className="shop-text fs-20">specifications</h2>
                <div className="specs-container">
                    <div className="spec-container">
                        <dt className="shop-text fs-12">brand</dt>
                        <dd className="shop-text fs-12">{product.brand}</dd>
                    </div>

                    <div className="spec-container">
                        <dt className="shop-text fs-12">name</dt>
                        <dd className="shop-text fs-12">{product.name}</dd>
                    </div>

                    {Object.entries(product.specs).map(([key, value]) => (
                        <div key={key} className="spec-container">
                            <dt className="shop-text fs-12">{key}</dt>
                            <dd className="shop-text fs-12 second-spec">
                                {value}
                            </dd>
                        </div>
                    ))}
                </div>
            </div>
            <div className="similar-items-section">
                <h2 className="shop-text fs-20 similar-title">similar items</h2>

                <div className="similar-scroll-container">
                    {uniqueSimilarProducts.map((similar) => (
                        <div key={similar.id} className="similar-card-wrapper">
                            <PhoneCard phone={similar} variant="similar" />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
