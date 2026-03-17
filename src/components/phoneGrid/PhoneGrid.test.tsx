import { render, screen } from "@testing-library/react";
import PhoneGrid from "./PhoneGrid";
import { ProductList } from "@/types/products.types";

jest.mock("next/navigation", () => ({
    useRouter: () => ({
        push: jest.fn(),
    }),
    useSearchParams: () => new URLSearchParams(""),
}));

describe("PhoneGrid Component", () => {
    const mockPhones: ProductList[] = [
        {
            id: "1",
            name: "Phone 1",
            brand: "Brand A",
            basePrice: 100,
            imageUrl: "/phone-1.jpg",
        },
        {
            id: "2",
            name: "Phone 2",
            brand: "Brand B",
            basePrice: 200,
            imageUrl: "/phone-2.jpg",
        },
    ];

    it("should render the correct number of phone cards", () => {
        render(<PhoneGrid phones={mockPhones} resultsCount={2} />);

        expect(screen.getByText(/2 results/i)).toBeInTheDocument();
        expect(screen.getByText(/Phone 1/i)).toBeInTheDocument();
        expect(screen.getByText(/Phone 2/i)).toBeInTheDocument();
    });

    it("should show no-results div when phone list is empty", () => {
        const { container } = render(
            <PhoneGrid phones={[]} resultsCount={0} />,
        );

        const noResults = container.querySelector(".no-results");
        expect(noResults).toBeInTheDocument();
    });
});
