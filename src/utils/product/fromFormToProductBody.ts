import { ProductBody, ProductForm } from "@/interfaces/Product";

export const fromFormToProductBody = (
  productForm: ProductForm
): ProductBody => {
  const productData: ProductBody = { ...productForm };
  if (productData.productImg === "") delete productData.productImg;
  if (productData.features === "") delete productData.features;

  productData.price = +productData.price;
  productData.discount = +productData.discount;
  productData.stock = +productData.stock;

  return productData;
};
