import { ProductDetail } from "@/types/products.types";

interface ProductDetailsProps {
    product: ProductDetail;
}

export default function ProductDetails({ product }: ProductDetailsProps) {
    console.log(product);
    return <div>{}</div>;
}
