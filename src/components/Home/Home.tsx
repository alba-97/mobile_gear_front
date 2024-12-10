import { useEffect, useRef } from "react";
import { Box, Center, Heading } from "@chakra-ui/react";
import { ProductGrid } from "../Product/ProductGrid";
import { Slider } from "./Slider";
import useInput from "../../hooks/useInput";
import { fetchProducts } from "../../state/products/productsActions";
import { Footer } from "../Footer";
import { useDispatch } from "react-redux";
import Banner from "./Banner";
import { setProducts } from "@/state/products/productsSlice";
import Filters from "@/Filters";

interface IHomeProps {
  productGridRef: React.RefObject<HTMLDivElement>;
}

export const Home = ({ productGridRef }: IHomeProps) => {
  const brandInput = useInput();
  const categoryInput = useInput();
  const minPriceInput = useInput();
  const maxPriceInput = useInput();

  const dispatch = useDispatch();

  const fetchData = async () => {
    try {
      const filters = {
        brandName: brandInput.value,
        categoryName: categoryInput.value,
        minPrice: minPriceInput.value,
        maxPrice: maxPriceInput.value,
      };
      const products = await fetchProducts(filters);
      dispatch(setProducts(products));
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [
    brandInput.value,
    categoryInput.value,
    minPriceInput.value,
    maxPriceInput.value,
  ]);

  const handleBrandSelect = (brandName: string) => {
    brandInput.setValue(brandName === "All" ? "" : brandName);
    productGridRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  };

  const handleCategorySelect = (categoryName: string) => {
    categoryInput.setValue(categoryName === "All" ? "" : categoryName);
    productGridRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  };

  const discountedProductsRef = useRef<HTMLDivElement | null>(null);

  return (
    <Box backgroundColor="gray.100" minHeight="100vh">
      <Banner
        productsRef={productGridRef}
        discountedProductsRef={discountedProductsRef}
      />
      <div ref={discountedProductsRef} />
      <Center mt="20" mb="20">
        <Heading>Special Offers</Heading>
      </Center>
      <Slider />

      <div ref={productGridRef} />
      <Filters
        handleCategorySelect={handleCategorySelect}
        handleBrandSelect={handleBrandSelect}
        minPriceInput={minPriceInput}
        maxPriceInput={maxPriceInput}
      />
      <ProductGrid />
      <Footer />
    </Box>
  );
};
