import { ProductForm, ProductResponse } from "@/interfaces/Product";

const fromResponseToForm = (product: ProductResponse): ProductForm => {
  console.log(product);
  const { id, brand, category, ...rest } = product;
  return { brandId: brand.id, categoryId: category.id, ...rest };
};

export default fromResponseToForm;
