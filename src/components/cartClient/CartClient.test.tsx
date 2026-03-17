import { render, screen } from "@testing-library/react";
import CartClient from "./CartClient";
import { useCartContext } from "@/context/CartContext";
import React from "react";

interface PhoneCardCartProps {
    phone: {
        id: string;
        name: string;
        price: number;
    };
    onRemove: (id: string) => void;
}

jest.mock("@/context/CartContext", () => ({
    useCartContext: jest.fn(),
}));

// Mock del componente hijo tipado
jest.mock("@/components/phoneCardCart/PhoneCardCart", () => {
    return function MockPhoneCard({ phone, onRemove }: PhoneCardCartProps) {
        return (
            <div>
                <span>{phone.name}</span>
                <button onClick={() => onRemove(phone.id)}>Remove</button>
            </div>
        );
    };
});

describe("CartClient Component", () => {
    const mockCart = [
        {
            id: "1-black-128",
            name: "iPhone 15",
            price: 1000,
            quantity: 1,
            image: "/test.jpg",
            color: "black",
            storage: "128GB",
        },
    ];

    it("should calculate and display the total price correctly", () => {
        (useCartContext as jest.Mock).mockReturnValue({
            totalItems: 1,
            cart: mockCart,
            removeFromCart: jest.fn(),
        });

        render(<CartClient />);

        expect(screen.getByText(/1000 eur/i)).toBeInTheDocument();
        expect(screen.getByText("iPhone 15")).toBeInTheDocument();
    });

    it("should show empty state when totalItems is 0", () => {
        (useCartContext as jest.Mock).mockReturnValue({
            totalItems: 0,
            cart: [],
            removeFromCart: jest.fn(),
        });

        render(<CartClient />);

        const link = screen.getByRole("link");
        expect(link).toHaveAttribute("href", "/");
    });
});
