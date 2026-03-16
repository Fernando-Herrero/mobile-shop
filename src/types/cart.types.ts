export interface CartContextType {
    cart: CartItem[];
    setCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
    error: string | null;
    setError: React.Dispatch<React.SetStateAction<string | null>>;
    addToCart: (item: CartItem) => void;
    removeFromCart: (id: string) => void;
    clearCart: () => void;
    totalItems: number;
}

export interface CartItem {
    id: string;
    name: string;
    image: string;
    price: number;
    color: string;
    storage: string;
    quantity?: number;
}
