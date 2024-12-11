import { useEffect, useRef } from "react";
import { Box, Center, Heading } from "@chakra-ui/react";
import { Slider } from "./Slider";

import { useDispatch } from "react-redux";
import Banner from "./Banner";
import { setLoading, setProducts } from "@/state/products/productsSlice";
import Filters from "@/components/Filters";
import { Footer } from "../Footer";
import { fetchProducts } from "@/state/products/productsActions";
import { ProductGrid } from "../Product/ProductGrid";
import { useSearchParams } from "react-router-dom";

export const Home = () => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const productGridRef = useRef<HTMLDivElement | null>(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const products = await fetchProducts(searchParams);
      await dispatch(setProducts(products));
    } catch (error) {
      console.error("Error fetching products:", error);
    }
    setLoading(false);

    const brandName = searchParams.get("brandName");
    const categoryName = searchParams.get("categoryName");
    const modelName = searchParams.get("modelName");

    if (brandName || categoryName || modelName)
      productGridRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    fetchData();
  }, [searchParams]);

  const handleBrandSelect = (brandName: string) => {
    searchParams.set("brandName", brandName === "All" ? "" : brandName);
    setSearchParams(searchParams);
  };

  const handleCategorySelect = (categoryName: string) => {
    searchParams.set(
      "categoryName",
      categoryName === "All" ? "" : categoryName
    );
    setSearchParams(searchParams);
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
      />
      <ProductGrid />
      <Footer />
    </Box>
  );
};
