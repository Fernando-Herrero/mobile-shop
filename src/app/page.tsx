import PhoneCard from "@/components/phoneCard/PhoneCard";
import { getProducts } from "@/services/api";
import { ProductList } from "@/types/products.types";

export default async function Home() {
    const phones: ProductList[] = await getProducts();
    return (
        <main className="home">
            <div className="phones-grid">
                {phones.map((phone) => (
                    <PhoneCard key={phone.id} phone={phone} />
                ))}
            </div>
        </main>
    );
}
