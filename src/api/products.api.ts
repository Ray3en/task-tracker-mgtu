// src/api/products.api.ts
export type ApiProduct = {
  id: number;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
};
 
type ProductsResponse = { products: ApiProduct[] };
 
async function getJson<T>(url: string): Promise<T> {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  return (await response.json()) as T;
}
 
export async function fetchProducts() {
  const data = await getJson<ProductsResponse>("https://dummyjson.com/products");
  return data.products;
}
 
export function fetchProduct(id: string) {
  return getJson<ApiProduct>(`https://dummyjson.com/products/${id}`);
}