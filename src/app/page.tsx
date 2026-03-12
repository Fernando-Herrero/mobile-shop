import { getProducts } from "@/services/api";
import { ProductList } from "@/types/products.types";
import "./page.css";
import PhoneGrid from "@/components/phoneGrid/PhoneGrid";

export default async function Home() {
    const phones: ProductList[] = await getProducts();
    return (
        <main className="home">
            <PhoneGrid phones={phones} />
        </main>
    );
}
