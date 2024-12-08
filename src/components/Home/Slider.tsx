import { useState, useEffect } from "react";
import { Flex, HStack, IconButton } from "@chakra-ui/react";
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
  const products = useSelector(
    (state: RootState) => state.products.discountedProducts
  );
  const [currentSlide, setCurrentSlide] = useState(0);

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
        sx={{
          _hover: {
            cursor: currentSlide === 0 ? "default" : "pointer",
          },
        }}
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
        sx={{
          _hover: {
            cursor: currentSlide >= products.length - 3 ? "default" : "pointer",
          },
        }}
      />
    </Flex>
  );
};
