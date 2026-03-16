"use client";

import { useRouter } from "next/navigation";
import "./BackButton.css";

export default function BackButton() {
    const router = useRouter();

    return (
        <button onClick={() => router.back()} className="product-detail-back">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/icons/chevron-left.svg" alt="chevron left icon" />
            <p className="shop-text fs-12">back</p>
        </button>
    );
}
