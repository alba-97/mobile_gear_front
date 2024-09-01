import { useState, useEffect } from "react";
import { Flex, HStack, IconButton, Stack, VStack } from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { ProductCard } from "../Product/ProductCard";
import { fetchDiscountedProducts } from "../../state/products/productsActions";
import { ProductState } from "@/state/products/productsSlice";

export const Slider = () => {
  const products = useSelector(
    (state: { products: ProductState }) => state.products.discountedProducts
  );
  const [currentSlide, setCurrentSlide] = useState(0);

  const dispatch = useDispatch();

  useEffect(() => {
    fetchDiscountedProducts()(dispatch);
  }, []);

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev < products.length - 3 ? prev + 1 : prev));
  };

  return (
    <Flex justify="center" align="center" width="100%">
      <IconButton
        icon={<ChevronLeftIcon />}
        onClick={handlePrevSlide}
        isDisabled={currentSlide === 0}
        margin="10"
        aria-label="Previous Slide"
      />

      <HStack gap="6">
        {products.slice(currentSlide, currentSlide + 3).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </HStack>

      <IconButton
        icon={<ChevronRightIcon />}
        onClick={handleNextSlide}
        isDisabled={currentSlide >= products.length - 3}
        margin="10"
        aria-label="Next Slide"
      />
    </Flex>
  );
};
