import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../state/products/productsActions";
import { Box } from "@chakra-ui/react";
import { AdminProductCard } from "./AdminProductCard";
import { EditProduct } from "./EditProduct";
import { ProductResponse } from "@/interfaces/Product";
import { RootState } from "@/state/store";
import {
  deleteProduct as deleteProductAction,
  setError,
  setLoading,
  setProducts,
} from "@/state/products/productsSlice";
import { deleteProduct } from "../../state/products/productsActions";
import { AxiosError } from "axios";

export const AdminProductsGrid = () => {
  const products = useSelector((state: RootState) => state.products.products);
  const [selectedProduct, setSelectedProduct] =
    useState<ProductResponse | null>();
  const [refetch, setRefetch] = useState(false);

  const handleDelete = async (
    product: ProductResponse,
    event: React.MouseEvent<Element>
  ) => {
    event.stopPropagation();
    if (!product.id) return;
    try {
      await deleteProduct(product.id);
    } catch (error) {
      console.error("delete error: ", error);
    } finally {
      dispatch(deleteProductAction(product.id));
      setRefetch(!refetch);
    }
  };

  const dispatch = useDispatch();

  const fetchData = async () => {
    dispatch(setLoading(true));
    try {
      const products = await fetchProducts();
      dispatch(setProducts(products));
    } catch (error) {
      if (error instanceof AxiosError) dispatch(setError(error.message));
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    fetchData();
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
