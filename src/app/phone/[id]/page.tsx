import Link from "next/link";
import "./ProductDetailPage.css";
import { getProductById } from "@/services/api";
import ProductDetails from "@/components/productDetails/ProductDetails";

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
            <Link href={"/"} className="product-detail-back">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/icons/chevron-left.svg" alt="chevron left icon" />
                <p className="shop-text fs-12">back</p>
            </Link>
            <ProductDetails product={product} />
        </main>
    );
}
