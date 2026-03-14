"use client";

import { useCartContext } from "@/context/CartContext";
import "./CartClient.css";
import PhoneCardCart from "@/components/phoneCardCart/PhoneCardCart";

export default function CartClient() {
    const { totalItems, cart, removeFromCart } = useCartContext();

    const totalPrice = cart.reduce(
        (acc, item) => acc + item.price * (item.quantity || 1),
        0,
    );
    return (
        <div className="shop-container cart-wrapper">
            <header>
                <span className="shop-text fs-20 uppercase">
                    cart({totalItems})
                </span>
            </header>
            {totalItems > 0 ? (
                <div className="cart-main-content">
                    <div className="product-cart-container">
                        {cart.map((phone) => (
                            <PhoneCardCart
                                key={phone.id}
                                phone={phone}
                                onRemove={removeFromCart}
                            />
                        ))}
                    </div>

                    <div className="info-cart-container">
                        <div className="price-cart-container">
                            <p className="shop-text fs-14 total-price-text">
                                total
                            </p>
                            <span className="shop-text fs-14 total-price-text">
                                {totalPrice} eur
                            </span>
                        </div>
                        <div className="btn-cart-container">
                            <button className="shop-btn shop-text fs-10 continue-shopping-btn">
                                continue shopping
                            </button>
                            <button className="shop-btn shop-text fs-10 pay-btn">
                                pay
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="empty-cart-state">
                    <button className="continue-shopping-btn">
                        continue shopping
                    </button>
                </div>
            )}
        </div>
    );
}
