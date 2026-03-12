import { useRouter, useSearchParams } from "next/navigation";
import "./SearchBar.css";
interface SearchBarProps {
    results: number;
}

export default function SearchBar({ results }: SearchBarProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const currentSearch = searchParams.get("search") ?? "";

    const handleSearch = (search: string) => {
        const params = new URLSearchParams(searchParams);
        if (search) {
            params.set("search", search);
        } else {
            params.delete("search");
        }
        router.push(`?${params.toString()}`);
    };

    const handleClear = () => {
        router.push("/");
    };

    return (
        <div className="input-container">
            <div className="input-wrapper">
                <input
                    id="search"
                    type="text"
                    defaultValue={currentSearch}
                    placeholder="Search for a smartphone..."
                    onChange={(event) => handleSearch(event.target.value)}
                    className="input-search"
                />
                {currentSearch && (
                    <button
                        className="clear-btn"
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

            <span className="search-results">{results} RESULTS</span>
        </div>
    );
}
