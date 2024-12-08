import { BrandResponse } from "./Brand";
import { CategoryResponse } from "./Category";

interface BaseProduct {
  name: string;
  description: string;
  price: number;
  productImg: string;
  features: string;
  discount: number;
  stock: number;
}

export interface ProductForm extends BaseProduct {
  brandId: number;
  categoryId: number;
}

export interface ProductResponse extends BaseProduct {
  id: number;
  brand: BrandResponse;
  category: CategoryResponse;
}
