import "./SearchBar.css";
interface SearchBarProps {
    search: string;
    setSearch: (value: string) => void;
    results: number;
}

export default function SearchBar({
    search,
    setSearch,
    results,
}: SearchBarProps) {
    const handleClear = () => setSearch("");

    return (
        <div className="input-container">
            <div className="input-wrapper">
                <input
                    id="search"
                    type="text"
                    value={search}
                    placeholder="Search for a smartphone..."
                    onChange={(event) => setSearch(event.target.value)}
                    className="input-search"
                />
                {search && (
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
