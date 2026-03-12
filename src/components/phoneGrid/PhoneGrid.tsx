"use client";

import PhoneCard from "@/components/phoneCard/PhoneCard";
import SearchBar from "@/components/searchBar/SearchBar";
import { ProductList } from "@/types/products.types";
interface PhoneGridProps {
    phones: ProductList[];
    resultsCount: number;
}

export default function PhoneGrid({ phones, resultsCount }: PhoneGridProps) {
    return (
        <>
            <SearchBar results={resultsCount} />
            <div className="phones-grid">
                {phones.map((phone) => (
                    <PhoneCard key={phone.id} phone={phone} />
                ))}
            </div>
        </>
    );
}
