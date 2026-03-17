import { CartItem } from "@/types/cart.types";
import "./PhoneCardCart.css";
import Image from "next/image";
import { useState } from "react";
import { getImageScaleClass } from "@/utils/product.helpers";

interface PhoneCardCartProps {
    phone: CartItem;
    onRemove: (id: string) => void;
}

export default function PhoneCardCart({ phone, onRemove }: PhoneCardCartProps) {
    const [isRemoving, setIsRemoving] = useState(false);
    const handleRemove = () => {
        setIsRemoving(true);
        setTimeout(() => {
            onRemove(phone.id);
        }, 300);
    };
    const phonePrice = phone.price * (phone.quantity || 1);
    const scaleClass = getImageScaleClass(undefined, phone.name);

    return (
        <article
            className={`phone-cart-item ${isRemoving ? "exit-animation" : ""}`}
        >
            <div className={`phone-cart-img-container ${scaleClass}`}>
                <Image
                    src={phone.image}
                    alt={phone.name}
                    fill
                    className="phone-cart-img"
                    sizes="100px"
                    priority={false}
                    loading="eager"
                />
            </div>

            <div className="phone-cart-content">
                <header className="phone-cart-header">
                    <div className="phone-cart-header-specs">
                        <h3 className="shop-text fs-12">{phone.name}</h3>
                        <div className="phone-cart-specs">
                            <span className="shop-text fs-12">
                                {phone.storage}
                            </span>
                            <span className="fs-10 separator">|</span>
                            <span className="shop-text fs-12">
                                {phone.color}
                            </span>
                        </div>
                    </div>

                    <div className="price-stack">
                        <data className="phone-cart-price shop-text fs-12">
                            {phonePrice} eur
                        </data>
                        {phone.quantity && phone.quantity > 1 && (
                            <span className="shop-text fs-10">
                                {phone.quantity} unidades
                            </span>
                        )}
                    </div>
                </header>

                <div className="phone-cart-footer">
                    <button
                        onClick={handleRemove}
                        disabled={isRemoving}
                        className="shop-text fs-12 remove-item-btn"
                        aria-label={`Eliminar ${phone.name} del carrito`}
                    >
                        {isRemoving ? "Eliminando..." : "Eliminar"}
                    </button>
                </div>
            </div>
        </article>
    );
}
