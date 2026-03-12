"use client";

import PhoneCard from "@/components/phoneCard/PhoneCard";
import SearchBar from "@/components/searchBar/SearchBar";
import { ProductList } from "@/types/products.types";
import { useState } from "react";

interface PhoneGridProps {
    phones: ProductList[];
}

export default function PhoneGrid({ phones }: PhoneGridProps) {
    const [search, setSearch] = useState("");

    const filteredPhones = phones.filter(
        (phone) =>
            phone.name.toLowerCase().includes(search.toLowerCase()) ||
            phone.brand.toLowerCase().includes(search.toLowerCase()),
    );

    return (
        <>
            <SearchBar
                search={search}
                setSearch={setSearch}
                results={filteredPhones.length}
            />
            <div className="phones-grid">
                {filteredPhones.map((phone) => (
                    <PhoneCard key={phone.id} phone={phone} />
                ))}
            </div>
        </>
    );
}
