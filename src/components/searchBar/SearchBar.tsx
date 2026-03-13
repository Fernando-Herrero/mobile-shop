"use client";

import { useRouter, useSearchParams } from "next/navigation";
import "./SearchBar.css";
import { useEffect, useState } from "react";
interface SearchBarProps {
    results: number;
}

export default function SearchBar({ results }: SearchBarProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [inputValue, setInputValue] = useState(
        searchParams.get("search") ?? "",
    );

    useEffect(() => {
        const timer = setTimeout(() => {
            const params = new URLSearchParams(searchParams);

            if (inputValue) {
                params.set("search", inputValue);
            } else {
                params.delete("search");
            }

            router.push(`?${params}`);
        }, 400);

        return () => clearTimeout(timer);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [inputValue, router]);

    const handleClear = () => {
        setInputValue("");
        router.push("/");
    };

    return (
        <div className="input-container">
            <div className="input-wrapper">
                <input
                    id="search"
                    type="text"
                    value={inputValue}
                    placeholder="Search for a smartphone..."
                    onChange={(event) => setInputValue(event.target.value)}
                    className="input-search shop-text fs-16"
                />
                {inputValue && (
                    <button
                        className="clear-btn fs-14"
                        onClick={handleClear}
                        aria-label="Clear search"
                    >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src="/icons/close-small.svg"
                            alt="x close button"
                        />
                    </button>
                )}
            </div>

            <span className="shop-text fs-12">{results} RESULTS</span>
        </div>
    );
}
