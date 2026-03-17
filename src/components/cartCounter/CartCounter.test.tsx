import { render, screen } from "@testing-library/react";
import CartCounter from "./CartCounter";
import { useCartContext } from "@/context/CartContext";

jest.mock("@/context/CartContext", () => ({
    useCartContext: jest.fn(),
}));

describe("CartCounter Component", () => {
    it("should display the correct number of items", () => {
        (useCartContext as jest.Mock).mockReturnValue({ totalItems: 5 });

        render(<CartCounter />);

        expect(screen.getByText("5")).toBeInTheDocument();
    });

    it("should show the empty cart icon when totalItems is 0", () => {
        (useCartContext as jest.Mock).mockReturnValue({ totalItems: 0 });

        render(<CartCounter />);

        const img = screen.getByAltText("Carrito de compras");
        expect(img).toHaveAttribute(
            "src",
            expect.stringContaining("cart-empty.svg"),
        );
    });
});
