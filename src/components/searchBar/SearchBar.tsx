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
    return (
        <div>
            <input
                type="text"
                value={search}
                placeholder="Search for a smartphone..."
                onChange={(event) => setSearch(event.target.value)}
            />

            <span>{results} RESULTS</span>
        </div>
    );
}
