import { ProductList } from "@/types/products.types";
import "./PhoneCard.css";
import Image from "next/image";

interface PhoneCardProps {
    phone: ProductList;
}

export default function PhoneCard({ phone }: PhoneCardProps) {
    return (
        <article className="phone-card">
            <Image
                src={phone.imageUrl}
                alt={phone.name}
                width={200}
                height={200}
            />
            <div className="phone-card-info">
                <div>
                    {" "}
                    <span className="phone-card-brand">{phone.brand}</span>
                    <span className="phone-card-name">{phone.name}</span>
                </div>
                <span className="phone-card-price">{phone.basePrice}</span>
            </div>
        </article>
    );
}
