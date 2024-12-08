import { ProductData, ProductForm } from "@/interfaces/Product";

export const fromFormToProductData = (
  productForm: ProductForm
): ProductData => {
  const productData: ProductData = { ...productForm };
  if (productData.productImg === "") delete productData.productImg;
  if (productData.features === "") delete productData.features;

  productData.price = +productData.price;
  productData.discount = +productData.discount;
  productData.stock = +productData.stock;

  return productData;
};
