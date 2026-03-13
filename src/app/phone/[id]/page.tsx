import Link from "next/link";
import "./ProductDetailPage.css";

interface ProductDetailPageProps {
    params: { id: string };
}

export default async function ProductDetailPage({
    params,
}: ProductDetailPageProps) {
    // const product = await getProductById(params.id);

    return (
        <main className="product-detail-container">
            <Link href={"/"} className="product-detail-back">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/icons/chevron-left.svg" alt="chevron left icon" />
                <p className="shop-text fs-12">back</p>
            </Link>
        </main>
    );
}
