import { useState, useEffect } from "react";
import { Flex, IconButton, Stack } from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { useSelector } from "react-redux";
import { ProductCard } from "../Product/ProductCard";
import { fetchDiscountedProducts } from "../../state/products/productsActions";
import { ProductState } from "@/state/products/productsSlice";

export const Slider = () => {
  const products = useSelector(
    (state: { products: ProductState }) => state.products.discountedProducts
  );
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    fetchDiscountedProducts();
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

      <Stack gap="6">
        {products.slice(currentSlide, currentSlide + 3).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </Stack>

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