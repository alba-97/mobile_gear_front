import { useEffect, useRef } from "react";
import {
  Box,
  Center,
  Heading,
  Menu,
  MenuList,
  MenuButton,
  MenuItem,
} from "@chakra-ui/react";
import { ProductGrid } from "../Product/ProductGrid";
import { Slider } from "./Slider";
import useInput from "../../hooks/useInput";
import { fetchProducts } from "../../state/products/productsActions";
import { Footer } from "../Footer";
import { useDispatch } from "react-redux";
import Banner from "./Banner";
import { setProducts } from "@/state/products/productsSlice";

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
      <Center mt="20" gap="10">
        <Menu>
          <MenuButton fontSize="lg" color="black">
            Brands
          </MenuButton>
          <MenuList>
            <MenuItem onClick={() => handleBrandSelect("All")}>All</MenuItem>
            <MenuItem onClick={() => handleBrandSelect("samsung")}>
              Samsung
            </MenuItem>
            <MenuItem onClick={() => handleBrandSelect("apple")}>
              Apple
            </MenuItem>
          </MenuList>
        </Menu>
        <Menu>
          <MenuButton fontSize="lg" color="black">
            Categories
          </MenuButton>
          <MenuList>
            <MenuItem onClick={() => handleCategorySelect("All")}>All</MenuItem>
            <MenuItem onClick={() => handleCategorySelect("smartphone")}>
              Mobile Phones
            </MenuItem>
            <MenuItem onClick={() => handleCategorySelect("tablets")}>
              Tablets
            </MenuItem>
            <MenuItem onClick={() => handleCategorySelect("accesories")}>
              Accessories
            </MenuItem>
          </MenuList>
        </Menu>
        <input
          type="text"
          placeholder="Min price"
          {...minPriceInput}
          style={{ paddingLeft: "5px" }}
        />
        <input
          type="text"
          placeholder="Max price"
          {...maxPriceInput}
          style={{ paddingLeft: "5px" }}
        />
      </Center>
      <ProductGrid />
      <Footer />
    </Box>
  );
};
