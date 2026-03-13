"use client";

import { useCart } from "@/hooks/useCart";
import "./Cart.css";

export default function Cart() {
    const { totalItems } = useCart();
    return (
        <section className="shop-container main-container cart-section">
            <span className="shop-text fs-20">cart({totalItems})</span>
            {totalItems > 0 ? (
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
            ) : (
                <div>
                    <button className="shop-text fs-12 continue-shopping-btn">
                        Continue shopping
                    </button>
                </div>
            )}
        </section>
    );
}
