import PhoneCard from "@/components/phoneCard/PhoneCard";
import { ProductList } from "@/types/products.types";

interface PhoneGridProps {
    phones: ProductList[];
}

export default function PhoneGrid({ phones }: PhoneGridProps) {
    return (
        <div className="phones-grid">
            {phones.map((phone) => (
                <PhoneCard key={phone.id} phone={phone} />
            ))}
        </div>
    );
}
