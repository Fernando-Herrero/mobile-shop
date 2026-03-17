import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ProductDetails from "./ProductDetails";
import { CartProvider } from "@/context/CartContext";
import { ProductDetail } from "@/types/products.types";
import React from "react";

jest.mock("next/image", () => ({
    __esModule: true,
    default: ({
        fill: _fill,
        priority: _priority,
        ...props
    }: React.ImgHTMLAttributes<HTMLImageElement> & {
        fill?: boolean;
        priority?: boolean;
    }) => {
        // eslint-disable-next-line @next/next/no-img-element
        return <img {...props} alt={props.alt || "phone"} />;
    },
}));

jest.mock("next/navigation", () => ({
    useRouter: () => ({ push: jest.fn() }),
    useSearchParams: () => new URLSearchParams(""),
}));

const mockFullProduct: ProductDetail = {
    id: "test-id",
    brand: "Apple",
    name: "iPhone 15",
    basePrice: 1000,
    imageUrl: "/iphone.jpg",
    description: "The latest iPhone with incredible features.",
    rating: 4.8,
    specs: {
        screen: "6.1 inch",
        resolution: "2556 x 1179",
        processor: "A16 Bionic",
        mainCamera: "48MP",
        selfieCamera: "12MP",
        battery: "3349 mAh",
        os: "iOS 17",
        screenRefreshRate: "60Hz",
    },
    colorOptions: [
        { name: "Black", hexCode: "#000000", imageUrl: "/black.jpg" },
        { name: "Blue", hexCode: "#add8e6", imageUrl: "/blue.jpg" },
    ],
    storageOptions: [
        { capacity: "128GB", price: 1000 },
        { capacity: "256GB", price: 1150 },
    ],
    similarProducts: [
        {
            id: "sim-1",
            brand: "Samsung",
            name: "S23",
            basePrice: 900,
            imageUrl: "/s23.jpg",
        },
    ],
};

describe("ProductDetails Component", () => {
    it("should render main product information", () => {
        render(
            <CartProvider>
                <ProductDetails product={mockFullProduct} />
            </CartProvider>,
        );

        expect(
            screen.getByRole("heading", { name: /iPhone 15/i, level: 1 }),
        ).toBeInTheDocument();
        expect(screen.getByText(/1000 eur/i)).toBeInTheDocument();
        expect(screen.getByText("Apple")).toBeInTheDocument();
    });

    it("should handle option selection and enable add button", () => {
        render(
            <CartProvider>
                <ProductDetails product={mockFullProduct} />
            </CartProvider>,
        );

        const addButton = screen.getByRole("button", { name: /añadir/i });
        expect(addButton).toBeDisabled();

        fireEvent.click(screen.getByText("256GB"));
        fireEvent.click(screen.getByTitle("Blue"));

        expect(addButton).not.toBeDisabled();
        expect(screen.getByText(/1150 eur/i)).toBeInTheDocument();
    });

    it("should trigger loading state on click", async () => {
        render(
            <CartProvider>
                <ProductDetails product={mockFullProduct} />
            </CartProvider>,
        );

        fireEvent.click(screen.getByText("128GB"));
        fireEvent.click(screen.getByTitle("Black"));

        const addButton = screen.getByRole("button", { name: /añadir/i });
        fireEvent.click(addButton);

        expect(screen.getByText(/Añadiendo.../i)).toBeInTheDocument();

        await waitFor(
            () => {
                expect(
                    screen.queryByText(/Añadiendo.../i),
                ).not.toBeInTheDocument();
            },
            { timeout: 1000 },
        );
    });

    it("should display all technical specifications", () => {
        render(
            <CartProvider>
                <ProductDetails product={mockFullProduct} />
            </CartProvider>,
        );

        expect(screen.getByText("A16 Bionic")).toBeInTheDocument();
        expect(screen.getByText("2556 x 1179")).toBeInTheDocument();
        expect(screen.getByText("iOS 17")).toBeInTheDocument();
    });
});
