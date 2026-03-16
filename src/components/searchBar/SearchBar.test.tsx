import { render, screen, fireEvent, act } from "@testing-library/react";
import SearchBar from "./SearchBar";
import { useRouter, useSearchParams } from "next/navigation";

const mockPush = jest.fn();
jest.mock("next/navigation", () => ({
    useRouter: () => ({
        push: mockPush,
    }),
    useSearchParams: () => new URLSearchParams(""),
}));

describe("SearchBar Component", () => {
    beforeEach(() => {
        jest.useFakeTimers();
        mockPush.mockClear();
    });

    afterEach(() => {
        jest.useRealTimers();
    });

    it("should render the search input and results count", () => {
        render(<SearchBar results={24} />);

        expect(
            screen.getByPlaceholderText(/search for a smartphone/i),
        ).toBeInTheDocument();
        expect(screen.getByText(/24 results/i)).toBeInTheDocument();
    });

    it("should update input and call router.push after debounce", () => {
        render(<SearchBar results={10} />);
        const input = screen.getByPlaceholderText(
            /search for a smartphone/i,
        ) as HTMLInputElement;

        fireEvent.change(input, { target: { value: "iPhone" } });
        expect(input.value).toBe("iPhone");

        act(() => {
            jest.advanceTimersByTime(400);
        });

        expect(mockPush).toHaveBeenCalledWith("?search=iPhone");
    });

    it("should clear the input when clear button is clicked", () => {
        render(<SearchBar results={10} />);
        const input = screen.getByPlaceholderText(/search for a smartphone/i);

        fireEvent.change(input, { target: { value: "Samsung" } });

        const clearButton = screen.getByLabelText(/clear search/i);
        fireEvent.click(clearButton);

        expect(input).toHaveValue("");
        expect(mockPush).toHaveBeenCalledWith("/");
    });

    it("should remove search param from URL when input is cleared", () => {
        render(<SearchBar results={10} />);
        const input = screen.getByPlaceholderText(
            /search for a smartphone/i,
        ) as HTMLInputElement;

        fireEvent.change(input, { target: { value: "iPhone" } });

        fireEvent.change(input, { target: { value: "" } });

        act(() => {
            jest.advanceTimersByTime(400);
        });

        expect(mockPush).toHaveBeenCalledWith("?");
    });
});
