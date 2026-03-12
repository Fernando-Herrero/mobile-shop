"use client";

import PhoneCard from "@/components/phoneCard/PhoneCard";
import SearchBar from "@/components/searchBar/SearchBar";
import { ProductList } from "@/types/products.types";
import "./PhoneGrid.css";
interface PhoneGridProps {
    phones: ProductList[];
    resultsCount: number;
}

export default function PhoneGrid({ phones, resultsCount }: PhoneGridProps) {
    return (
        <>
            <SearchBar results={resultsCount} />
            {phones.length > 0 ? (
                <div className="phone-grid">
                    {phones.map((phone) => (
                        <PhoneCard key={phone.id} phone={phone} />
                    ))}
                </div>
            ) : (
                <div className="no-results">No smartphones found.</div>
            )}
        </>
    );
}
