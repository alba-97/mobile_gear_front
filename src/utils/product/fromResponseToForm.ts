import { ProductForm, ProductResponse } from "@/interfaces/Product";

const fromResponseToForm = (product: ProductResponse): ProductForm => {
  const { id, brand, category, ...rest } = product;
  return { brandId: brand.id, categoryId: category.id, ...rest };
};

export default fromResponseToForm;
