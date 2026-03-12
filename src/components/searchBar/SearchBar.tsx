"use client";

import { useState } from "react";

export default function SearchBar() {
    const [value, setValue] = useState("");

    const handleSearch = (value: string) => {
        setValue(value);
    };
    return (
        <label>
            <input
                type="text"
                id="search"
                name="search"
                value={value}
                placeholder="Search for a smartphone..."
                onChange={() => handleSearch}
            />
        </label>
    );
}
