import "./ProductDetailPage.css";
import { getProductById } from "@/services/api";
import ProductDetails from "@/components/productDetails/ProductDetails";
import BackButton from "@/components/backButton/BackButton";

interface ProductDetailPageProps {
    params: Promise<{ id: string }>;
}

export default async function ProductDetailPage({
    params,
}: ProductDetailPageProps) {
    const { id } = await params;
    const product = await getProductById(id);

    return (
        <main className="product-detail-container">
            <BackButton />
            <ProductDetails product={product} />
        </main>
    );
}
