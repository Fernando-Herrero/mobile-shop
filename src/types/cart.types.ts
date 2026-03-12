export interface CartContextType {
    cart: CartItem[];
    addToCart: (item: CartItem) => void;
    removeFromCart: (id: string) => void;
    clearCart: () => void;
}

export interface CartItem {
    id: string;
    name: string;
    image: string;
    price: number;
    color: string;
    storage: string;
}
