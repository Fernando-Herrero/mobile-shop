import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import PhoneCardCart from "./PhoneCardCart";
import { CartItem } from "@/types/cart.types";
import React from "react";

jest.mock("next/image", () => ({
    __esModule: true,
    default: ({
        fill,
        priority,
        loading,
        ...props
    }: React.ImgHTMLAttributes<HTMLImageElement> & {
        fill?: boolean;
        priority?: boolean;
        loading?: string;
    }) => {
        // eslint-disable-next-line @next/next/no-img-element
        return <img {...props} alt={props.alt || "phone"} />;
    },
}));

const mockPhone: CartItem = {
    id: "test-id-128-black",
    name: "iPhone 15",
    image: "/iphone.jpg",
    price: 1000,
    storage: "128GB",
    color: "Black",
    quantity: 2,
};

describe("PhoneCardCart Component", () => {
    it("should render phone details correctly", () => {
        render(<PhoneCardCart phone={mockPhone} onRemove={jest.fn()} />);

        expect(screen.getByText("iPhone 15")).toBeInTheDocument();
        expect(screen.getByText("128GB")).toBeInTheDocument();
        expect(screen.getByText("Black")).toBeInTheDocument();
        expect(screen.getByText(/2000 eur/i)).toBeInTheDocument();
        expect(screen.getByText(/2 unidades/i)).toBeInTheDocument();
    });

    it("should call onRemove after the animation timeout", async () => {
        const mockOnRemove = jest.fn();
        render(<PhoneCardCart phone={mockPhone} onRemove={mockOnRemove} />);

        const removeButton = screen.getByRole("button", { name: /eliminar/i });
        fireEvent.click(removeButton);

        expect(screen.getByText(/eliminando.../i)).toBeInTheDocument();
        expect(removeButton).toBeDisabled();

        await waitFor(
            () => {
                expect(mockOnRemove).toHaveBeenCalledWith(mockPhone.id);
            },
            { timeout: 1000 },
        );
    });

    it("should use default quantity of 1 if not provided", () => {
        const phoneWithoutQty = { ...mockPhone, quantity: undefined };
        render(
            <PhoneCardCart
                phone={phoneWithoutQty as CartItem}
                onRemove={jest.fn()}
            />,
        );

        expect(screen.getByText(/1000 eur/i)).toBeInTheDocument();
    });
});
