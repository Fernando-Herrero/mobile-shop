import { render, screen, act } from "@testing-library/react";
import { CartProvider, useCartContext } from "./CartContext";
import { CartItem } from "@/types/cart.types";

const TestComponent = () => {
    const { cart, addToCart, removeFromCart, clearCart, totalItems } =
        useCartContext();

    const mockItem: CartItem = {
        id: "1",
        name: "iPhone 15",
        image: "/test-img.jpg",
        price: 1000,
        color: "Black",
        storage: "128GB",
        quantity: 1,
    };

    return (
        <div>
            <span data-testid="total-items">{totalItems}</span>
            <span data-testid="cart-length">{cart.length}</span>
            <button onClick={() => addToCart(mockItem)}>Add iPhone</button>
            <button onClick={() => removeFromCart("1")}>Remove iPhone</button>
            <button onClick={clearCart}>Clear All</button>
        </div>
    );
};

describe("CartContext", () => {
    beforeEach(() => {
        window.localStorage.clear();
        jest.clearAllMocks();
    });

    it("should initialize with an empty cart", () => {
        render(
            <CartProvider>
                <TestComponent />
            </CartProvider>,
        );
        expect(screen.getByTestId("total-items").textContent).toBe("0");
    });

    it("should add a new item and increment totalItems", () => {
        render(
            <CartProvider>
                <TestComponent />
            </CartProvider>,
        );

        act(() => {
            screen.getByText("Add iPhone").click();
        });

        expect(screen.getByTestId("total-items").textContent).toBe("1");
        expect(screen.getByTestId("cart-length").textContent).toBe("1");
    });

    it("should increment quantity if the same item is added twice", () => {
        render(
            <CartProvider>
                <TestComponent />
            </CartProvider>,
        );

        act(() => {
            screen.getByText("Add iPhone").click();
            screen.getByText("Add iPhone").click();
        });

        expect(screen.getByTestId("total-items").textContent).toBe("2");
        expect(screen.getByTestId("cart-length").textContent).toBe("1");
    });

    it("should remove item from cart using id", () => {
        render(
            <CartProvider>
                <TestComponent />
            </CartProvider>,
        );

        act(() => {
            screen.getByText("Add iPhone").click();
        });

        act(() => {
            screen.getByText("Remove iPhone").click();
        });

        expect(screen.getByTestId("total-items").textContent).toBe("0");
    });

    it("should clear the entire cart", () => {
        render(
            <CartProvider>
                <TestComponent />
            </CartProvider>,
        );

        act(() => {
            screen.getByText("Add iPhone").click();
        });

        act(() => {
            screen.getByText("Clear All").click();
        });

        expect(screen.getByTestId("total-items").textContent).toBe("0");
    });
});
