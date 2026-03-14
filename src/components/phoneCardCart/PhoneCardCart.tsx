import { CartItem } from "@/types/cart.types";
import "./PhoneCardCart.css";
import Image from "next/image";

interface PhoneCardCartProps {
    phone: CartItem;
    onRemove: (id: string) => void;
}

export default function PhoneCardCart({ phone, onRemove }: PhoneCardCartProps) {
    return (
        <article className="phone-cart-item">
            <div className="phone-cart-img-container">
                <Image
                    src={phone.image}
                    alt={phone.name}
                    fill
                    className="phone-cart-img"
                />
            </div>

            <div className="phone-cart-content">
                <header className="phone-cart-header">
                    <h3 className="shop-text fs-12">{phone.name}</h3>
                    <div className="phone-cart-specs">
                        <span className="shop-text fs-12">{phone.storage}</span>
                        <span className="separator">|</span>
                        <span className="shop-text fs-12">{phone.color}</span>
                    </div>
                </header>

                <div className="phone-cart-footer">
                    <data
                        className="phone-cart-price fs-14"
                        value={phone.price}
                    >
                        {phone.price} EUR
                    </data>

                    <button
                        onClick={() => onRemove(phone.id)}
                        className="btn-remove-item fs-12"
                        aria-label={`Eliminar ${phone.name} del carrito`}
                    >
                        Eliminar
                    </button>
                </div>
            </div>
        </article>
    );
}
