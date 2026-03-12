import { API_KEY, API_URL } from "@/config/envs";

const headers = {
    "x-api-key": API_KEY,
};

export async function getProducts(search?: string) {
    const params = new URLSearchParams();
    if (search) params.append("search", search);
    params.append("limit", "20");

    const response = await fetch(`${API_URL}/products?${params}`, { headers });
    if (!response.ok) throw new Error("Error fetching products");
    return response.json();
}

export async function getProductById(id: string) {
    const response = await fetch(`${API_URL}/products/${id}`, { headers });
    if (!response.ok) throw new Error("Error fetching product");
    return response.json();
}
