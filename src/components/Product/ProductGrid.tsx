import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../state/products/productsActions";
import { SimpleGrid, Center, Spinner } from "@chakra-ui/react";
import { ProductCard } from "./ProductCard";
import { RootState } from "@/state/store";
import {
  setError,
  setLoading,
  setProducts,
} from "@/state/products/productsSlice";
import { AxiosError } from "axios";

export const ProductGrid = () => {
  const { products, isLoading } = useSelector(
    (state: RootState) => state.products
  );
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
  }, []);

  return (
    <Center mt="5">
      {isLoading ? (
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      ) : (
        <SimpleGrid maxWidth="1200px" columns={[1, 2, 3, 4]} spacing="20" p="5">
          {products.slice(0, 20).map((product) => {
            return <ProductCard key={product.id} product={product} />;
          })}
        </SimpleGrid>
      )}
    </Center>
  );
};
