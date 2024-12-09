import { BrandResponse } from "./Brand";
import { CategoryResponse } from "./Category";

export interface ProductForm {
  name: string;
  description: string;
  price: number;
  productImg: string;
  features: string;
  discount: number;
  stock: number;
  brandId: number;
  categoryId: number;
}

export interface ProductResponse {
  id: number;
  name: string;
  description: string;
  price: number;
  productImg: string;
  features: string;
  discount: number;
  stock: number;
  brand: BrandResponse;
  category: CategoryResponse;
}

export interface ProductBody {
  name: string;
  description: string;
  price: number;
  productImg?: string;
  features?: string;
  discount: number;
  stock: number;
  brandId: number;
  categoryId: number;
}
