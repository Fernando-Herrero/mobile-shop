import { API_KEY, API_URL } from "@/config/envs";
import { ProductList } from "@/types/products.types";

const headers = {
    "x-api-key": API_KEY,
};

export async function getProducts(search?: string) {
    const params = new URLSearchParams();
    if (search) params.append("search", search);

    const response = await fetch(`${API_URL}/products?${params}`, { headers });
    if (!response.ok) throw new Error("Error fetching products");

    const data: ProductList[] = await response.json();

    //Eliminamos duplicacion ya que tenemos un error con las keys por que hay una id(producto) repetido
    const uniquePhoneList = data.reduce(
        (acc, phone) => {
            if (!acc.find((p) => p.id === phone.id)) {
                acc.push(phone);
            }
            return acc;
        },
        [] as typeof data,
    );
    return uniquePhoneList.slice(0, 20);
}

export async function getProductById(id: string) {
    const response = await fetch(`${API_URL}/products/${id}`, { headers });
    if (!response.ok) throw new Error("Error fetching product");
    return response.json();
}
