import { CartItem } from "@/types/cart.types";
import "./PhoneCardCart.css";
import Image from "next/image";

interface PhoneCardCartProps {
    phone: CartItem;
    onRemove: (id: string) => void;
}

export default function PhoneCardCart({ phone, onRemove }: PhoneCardCartProps) {
    const phonePrice = phone.price * (phone.quantity || 1);

    return (
        <article className="phone-cart-item">
            <div className="phone-cart-img-container">
                <Image
                    src={phone.image}
                    alt={phone.name}
                    fill
                    className="phone-cart-img"
                    sizes="100px"
                    priority={false}
                />
            </div>

            <div className="phone-cart-content">
                <header className="phone-cart-header">
                    <h3 className="shop-text fs-10">{phone.name}</h3>
                    <div className="phone-cart-specs">
                        <span className="shop-text fs-10">{phone.storage}</span>
                        <span className="fs-10 separator">|</span>
                        <span className="shop-text fs-10">{phone.color}</span>
                    </div>
                </header>

                <div className="phone-cart-footer">
                    <div className="price-stack">
                        <data className="phone-cart-price shop-text fs-10">
                            {phonePrice} eur
                        </data>
                        {phone.quantity && phone.quantity > 1 && (
                            <span className="shop-text fs-10">
                                {phone.quantity} unidades
                            </span>
                        )}
                    </div>

                    <button
                        onClick={() => onRemove(phone.id)}
                        className="shop-text fs-10 remove-item-btn"
                        aria-label={`Eliminar ${phone.name} del carrito`}
                    >
                        Eliminar
                    </button>
                </div>
            </div>
        </article>
    );
}
