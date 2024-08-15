import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../state/products/productsActions";
import { Box } from "@chakra-ui/react";
import { AdminProductCard } from "./AdminProductCard";
import { AdminProductsDetails } from "./AdminProductDetails";
import { deleteProduct } from "../../state/products/productsActions";
import { ProductState } from "@/state/products/productsSlice";
import { Product } from "@/interfaces/Product";

export const AdminProductsGrid = () => {
  const products = useSelector(
    (state: { products: ProductState }) => state.products.products
  );
  const [selectedProduct, setSelectedProduct] = React.useState<Product>({});
  const [refetch, setRefetch] = useState(false);

  const handleDelete = (product: Product, event: React.MouseEvent<Element>) => {
    event.stopPropagation();
    product.id && deleteProduct(product.id)(dispatch);
    setRefetch(!refetch);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    fetchProducts()(dispatch);
  }, [refetch]);

  const handleClick = (product: Product) => {
    setSelectedProduct(product);
  };

  return !selectedProduct.id ? (
    <Box p="5">
      {products.map((product) => {
        return (
          <div
            style={{ cursor: "pointer" }}
            key={product.id}
            onClick={() => {
              handleClick(product);
            }}
          >
            <AdminProductCard product={product} handleDelete={handleDelete} />
          </div>
        );
      })}
    </Box>
  ) : (
    <AdminProductsDetails
      selectedProduct={selectedProduct}
      setSelectedProduct={setSelectedProduct}
    />
  );
};
