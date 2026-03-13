"use client";

import { useCart } from "@/hooks/useCart";
import "./Cart.css";

export default function Cart() {
    const { totalItems } = useCart();
    return (
        <section className="cart-section">
            <span className="cart-span">cart({totalItems})</span>
            {totalItems > 0 ? (
                <div>
                    <button className="continue-shopping-btn">
                        Continue shopping
                    </button>
                </div>
            ) : (
                <div>
                    {" "}
                    <div className="product-cart-container"></div>
                    <div className="info-cart-container">
                        <div className="price-cart-container">
                            <p>TOTAL</p>
                            <span className="total-price-cart">EUR</span>
                        </div>
                        <div className="btn-cart-container">
                            <button className="continue-shopping-btn"></button>
                            <button className="pay-btn"></button>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}
