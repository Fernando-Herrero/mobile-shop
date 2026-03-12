import { getProducts } from "@/services/api";
import { ProductList } from "@/types/products.types";
import PhoneGrid from "@/components/phoneGrid/PhoneGrid";

interface HomeProps {
    searchParams: Promise<{ search?: string }>;
}

export default async function Home({ searchParams }: HomeProps) {
    const query = (await searchParams).search || "";
    const phones: ProductList[] = await getProducts(query);
    return (
        <main className="home">
            <PhoneGrid phones={phones} resultsCount={phones.length} />
        </main>
    );
}
