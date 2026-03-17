import { getProducts, getProductById } from "./api";
import { ProductList } from "@/types/products.types";

describe("API Services", () => {
    afterEach(() => {
        jest.restoreAllMocks();
    });

    describe("getProducts", () => {
        const mockData: ProductList[] = [
            {
                id: "1",
                name: "iPhone 15",
                brand: "Apple",
                basePrice: 1000,
                imageUrl: "/1.jpg",
            },
            {
                id: "1",
                name: "iPhone 15 Duplicado",
                brand: "Apple",
                basePrice: 1000,
                imageUrl: "/1.jpg",
            },
            {
                id: "2",
                name: "S23",
                brand: "Samsung",
                basePrice: 900,
                imageUrl: "/2.jpg",
            },
        ];

        it("should fetch products and filter duplicates", async () => {
            global.fetch = jest.fn().mockResolvedValue({
                ok: true,
                json: jest.fn().mockResolvedValue(mockData),
            });

            const products = await getProducts();

            expect(global.fetch).toHaveBeenCalledWith(
                expect.stringContaining("/products?"),
                expect.any(Object),
            );

            expect(products).toHaveLength(2);
            expect(products[0].id).toBe("1");
            expect(products[1].id).toBe("2");
        });

        it("should call fetch with search params when provided", async () => {
            global.fetch = jest.fn().mockResolvedValue({
                ok: true,
                json: jest.fn().mockResolvedValue([]),
            });

            await getProducts("iPhone");

            expect(global.fetch).toHaveBeenCalledWith(
                expect.stringContaining("search=iPhone"),
                expect.any(Object),
            );
        });

        it("should throw an error if response is not ok", async () => {
            global.fetch = jest.fn().mockResolvedValue({
                ok: false,
            });

            await expect(getProducts()).rejects.toThrow(
                "Error fetching products",
            );
        });
    });

    describe("getProductById", () => {
        it("should fetch a single product by id", async () => {
            const mockDetail = {
                id: "1",
                name: "iPhone 15",
                description: "Nice phone",
            };

            global.fetch = jest.fn().mockResolvedValue({
                ok: true,
                json: jest.fn().mockResolvedValue(mockDetail),
            });

            const product = await getProductById("1");

            expect(global.fetch).toHaveBeenCalledWith(
                expect.stringContaining("/products/1"),
                expect.any(Object),
            );
            expect(product.name).toBe("iPhone 15");
        });

        it("should throw an error if product is not found", async () => {
            global.fetch = jest.fn().mockResolvedValue({
                ok: false,
            });

            await expect(getProductById("999")).rejects.toThrow(
                "Error fetching product",
            );
        });
    });
});
