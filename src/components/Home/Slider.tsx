import { useState, useEffect } from "react";
import {
  Flex,
  HStack,
  IconButton,
  Spinner,
  useBreakpointValue,
} from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { ProductCard } from "../Product/ProductCard";
import { fetchDiscountedProducts } from "../../state/products/productsActions";
import { RootState } from "@/state/store";
import {
  setDiscountedProducts,
  setError,
  setLoading,
} from "@/state/products/productsSlice";
import { AxiosError } from "axios";

export const Slider = () => {
  const { discountedProducts: products, isLoading } = useSelector(
    (state: RootState) => state.products
  );

  const dispatch = useDispatch();

  const fetchData = async () => {
    dispatch(setLoading(true));
    try {
      const products = await fetchDiscountedProducts();
      dispatch(setDiscountedProducts(products));
    } catch (error) {
      if (error instanceof AxiosError) dispatch(setError(error.message));
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const [currentSlide, setCurrentSlide] = useState(0);
  const visibleSlides = useBreakpointValue({ base: 1, md: 2, lg: 3 }) ?? 0;

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => Math.max(0, prev - visibleSlides));
  };

  const handleNextSlide = () => {
    setCurrentSlide((prev) =>
      Math.min(products.length - visibleSlides, prev + visibleSlides)
    );
  };

  return (
    <Flex justify="center" align="center" width="100%">
      <IconButton
        icon={<ChevronLeftIcon />}
        onClick={handlePrevSlide}
        isDisabled={currentSlide === 0}
        margin="10"
        aria-label="Previous Slide"
        sx={{
          _hover: {
            cursor: currentSlide === 0 ? "default" : "pointer",
          },
        }}
      />

      <HStack gap="6">
        {isLoading ? (
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        ) : (
          products
            .slice(currentSlide, currentSlide + visibleSlides)
            .map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
        )}
      </HStack>

      <IconButton
        icon={<ChevronRightIcon />}
        onClick={handleNextSlide}
        isDisabled={currentSlide >= products.length - visibleSlides}
        margin="10"
        aria-label="Next Slide"
        sx={{
          _hover: {
            cursor:
              currentSlide >= products.length - visibleSlides
                ? "default"
                : "pointer",
          },
        }}
      />
    </Flex>
  );
};
