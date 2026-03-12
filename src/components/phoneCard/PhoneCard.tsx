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
                    <span className="phone-card-brand text-info">
                        {phone.brand}
                    </span>
                    <span className="phone-card-name text-info">
                        {phone.name}
                    </span>
                </div>
                <span className="phone-card-price text-info">
                    {phone.basePrice} EUR
                </span>
            </div>
        </article>
    );
}
