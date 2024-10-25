import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../state/products/productsActions";
import { Box } from "@chakra-ui/react";
import { AdminProductCard } from "./AdminProductCard";
import { EditProduct } from "./EditProduct";
import { deleteProduct } from "../../state/products/productsActions";
import { ProductResponse } from "@/interfaces/Product";
import { RootState } from "@/state/store";

export const AdminProductsGrid = () => {
  const products = useSelector((state: RootState) => state.products.products);
  const [selectedProduct, setSelectedProduct] =
    useState<ProductResponse | null>();
  const [refetch, setRefetch] = useState(false);

  const handleDelete = (
    product: ProductResponse,
    event: React.MouseEvent<Element>
  ) => {
    event.stopPropagation();
    product.id && deleteProduct(product.id)(dispatch);
    setRefetch(!refetch);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    fetchProducts()(dispatch);
  }, [refetch]);

  const handleClick = (product: ProductResponse) => {
    setSelectedProduct(product);
  };

  return !selectedProduct?.id ? (
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
    <EditProduct
      selectedProduct={selectedProduct}
      setSelectedProduct={setSelectedProduct}
    />
  );
};
