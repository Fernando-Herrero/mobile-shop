"use client";

import {
    ColorOption,
    ProductDetail,
    StorageOption,
} from "@/types/products.types";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import "./ProductDetails.css";
import { useCartContext } from "@/context/CartContext";
import PhoneCard from "@/components/phoneCard/PhoneCard";

interface ProductDetailsProps {
    product: ProductDetail;
}

export default function ProductDetails({ product }: ProductDetailsProps) {
    const isXiaomi = product.brand.toLowerCase() === "xiaomi";
    const { addToCart } = useCartContext();
    const [selectedColor, setSelectedColor] = useState<ColorOption | null>(
        null,
    );
    const [selectedStorage, setSelectedStorage] =
        useState<StorageOption | null>(null);
    const displayPrice = selectedStorage?.price || product.basePrice;
    const displayImage =
        selectedColor?.imageUrl || product.colorOptions[0]?.imageUrl;

    const handleAddToCart = () => {
        if (selectedColor && selectedStorage) {
            addToCart({
                id: `${product.id}-${selectedColor.name}-${selectedStorage.capacity}`,
                name: product.name,
                image: selectedColor.imageUrl,
                price: selectedStorage.price,
                color: selectedColor.name,
                storage: selectedStorage.capacity,
            });
        }
    };

    const scrollRef = useRef<HTMLDivElement>(null);
    const thumbRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const scrollContainer = scrollRef.current;
        const thumb = thumbRef.current;

        if (!scrollContainer || !thumb) return;

        const handleScroll = () => {
            const scrollPercentage =
                (scrollContainer.scrollLeft /
                    (scrollContainer.scrollWidth -
                        scrollContainer.clientWidth)) *
                100;
            thumb.style.left = `${scrollPercentage * 0.7}%`;
        };

        scrollContainer.addEventListener("scroll", handleScroll);
        return () =>
            scrollContainer.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <section className="product-details-container">
            <div className="product-details-phone">
                <div
                    className={`product-details-img ${isXiaomi ? "reduce-image" : ""} `}
                >
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

                <div className="product-details-phone-info">
                    <div className="product-details-info">
                        <h1 className="shop-text fs-20">{product.name}</h1>
                        <p className="shop-text fs-14">{displayPrice}eur</p>
                    </div>

                    <div className="product-storage-color">
                        <div className="product-details-selector">
                            <p className="shop-text fs-12">
                                storage¿how much space do you need
                            </p>
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
                        className={
                            selectedColor && selectedStorage
                                ? "shop-btn shop-text fs-12 add-to-cart-btn"
                                : "shop-btn shop-text fs-12 disabled-btn"
                        }
                        disabled={!selectedColor && !selectedStorage}
                        onClick={handleAddToCart}
                    >
                        añadir
                    </button>
                </div>
            </div>
            <div className="product-details-specs">
                <h2 className="shop-text fs-20">specifications</h2>
                <div className="specs-container">
                    <div className="spec-container">
                        <span className="shop-text fs-12">BRAND</span>
                        <span className="shop-text fs-12">{product.brand}</span>
                    </div>

                    <div className="spec-container">
                        <span className="shop-text fs-12">NAME</span>
                        <span className="shop-text fs-12">{product.name}</span>
                    </div>

                    {Object.entries(product.specs).map(([key, value]) => (
                        <div key={key} className="spec-container">
                            <span className="shop-text fs-12">{key}</span>
                            <span className="shop-text fs-12 second-spec">
                                {value}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
            <div className="similar-items-section">
                <h2 className="shop-text fs-20 similar-title">SIMILAR ITEMS</h2>

                <div className="similar-scroll-container" ref={scrollRef}>
                    {product.similarProducts.map((similar, index) => (
                        <div
                            key={similar.id}
                            className="similar-card-wrapper"
                            style={{
                                borderRight:
                                    index === product.similarProducts.length - 1
                                        ? "none"
                                        : "0.5px solid #000",
                            }}
                        >
                            <PhoneCard phone={similar} />
                        </div>
                    ))}
                </div>

                <div className="custom-scrollbar-container">
                    <div className="custom-scrollbar-bg">
                        <div
                            className="custom-scrollbar-thumb"
                            ref={thumbRef}
                        ></div>
                    </div>
                </div>
            </div>
        </section>
    );
}
