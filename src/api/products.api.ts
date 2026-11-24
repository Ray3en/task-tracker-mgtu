import { apiClient } from "./apiClient";

type ProductItemResponse = {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  discountPrice: number | null;
};

type ProductsResponse = {
  items: ProductItemResponse[];
  pagination: {
    page: number;
    limit: number;
    totalItems: number;
    totalPages: number;
  };
};

type ProductsParams = {
  page?: number;
  limit?: number;
  search?: string;
};

export type CreateProductData = {
  name: string;
  price: number;
  description: string;
};


export async function getProducts(params?: ProductsParams): Promise<ProductsResponse> {
  const response = await apiClient.get<ProductsResponse>("/products", { params });
  return response.data;
}

export async function getProductDetail(id: string): Promise<ProductItemResponse> {
  const response = await apiClient.get<ProductItemResponse>(`/products/${id}`);
  return response.data;
}

export async function createProduct(data: CreateProductData): Promise<ProductItemResponse> {
  const response = await apiClient.post<ProductItemResponse>("/products", data);
  return response.data;
}
