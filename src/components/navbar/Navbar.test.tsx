import { render, screen } from "@testing-library/react";
import Navbar from "./Navbar";
import React from "react";

interface MockImageProps {
    src: string;
    alt: string;
}

jest.mock("next/image", () => ({
    __esModule: true,
    default: ({ src, alt }: MockImageProps) => {
        // eslint-disable-next-line @next/next/no-img-element
        return <img src={src} alt={alt} />;
    },
}));

jest.mock("next/dynamic", () => () => {
    const DynamicComponent = () => <div>Mock Cart Counter</div>;
    DynamicComponent.displayName = "DynamicComponent";
    return DynamicComponent;
});

describe("Navbar Component", () => {
    it("should render the home link with the logo", () => {
        render(<Navbar />);

        const homeLink = screen.getByRole("link", { name: /ir a inicio/i });
        expect(homeLink).toBeInTheDocument();
        expect(homeLink).toHaveAttribute("href", "/");
    });

    it("should render the cart link", () => {
        render(<Navbar />);

        const cartLink = screen.getByLabelText(/carrito de compras/i);
        expect(cartLink).toBeInTheDocument();
        expect(cartLink).toHaveAttribute("href", "/cart");
    });
});
