import { useSelector } from "react-redux";
import { SimpleGrid, Center, Spinner, Text } from "@chakra-ui/react";
import { ProductCard } from "./ProductCard";
import { RootState } from "@/state/store";

export const ProductGrid = () => {
  const { products, isLoading } = useSelector(
    (state: RootState) => state.products
  );

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
        <>
          {products.length > 0 ? (
            <SimpleGrid
              maxWidth="1200px"
              columns={[1, 2, 3, 4]}
              spacing="20"
              p="5"
            >
              {products.slice(0, 20).map((product) => {
                return <ProductCard key={product.id} product={product} />;
              })}
            </SimpleGrid>
          ) : (
            <Text fontSize={20}>No products found</Text>
          )}
        </>
      )}
    </Center>
  );
};
