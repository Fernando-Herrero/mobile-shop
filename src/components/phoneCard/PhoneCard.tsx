import { ProductList } from "@/types/products.types";
import "./PhoneCard.css";
import Image from "next/image";

interface PhoneCardProps {
    phone: ProductList;
}

export default function PhoneCard({ phone }: PhoneCardProps) {
    const isXiaomi = phone.brand.toLowerCase() === "xiaomi";
    return (
        <article className="phone-card">
            <div
                className={`phone-card-image-container ${isXiaomi ? "reduce-image" : ""}`}
            >
                {" "}
                <Image
                    src={phone.imageUrl}
                    alt={phone.name}
                    fill
                    className="phone-image"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
            </div>
            <div className="phone-card-info">
                <div className="phone-card-title">
                    {" "}
                    <span className="shop-text fs-10 phone-card-brand">
                        {phone.brand}
                    </span>
                    <span className="shop-text fs-12">{phone.name}</span>
                </div>
                <span className="shop-text fs-12">{phone.basePrice} EUR</span>
            </div>
        </article>
    );
}
