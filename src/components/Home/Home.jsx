import React, { useEffect } from "react";
import {
  Box,
  Center,
  Heading,
  Image,
  Menu,
  MenuList,
  MenuButton,
  MenuItem,
} from "@chakra-ui/react";
import { ProductGrid } from "../Product/ProductGrid";
import { Slider } from "./Slider";
import useInput from "../../hooks/useInput";
import { useDispatch } from "react-redux";
import { fetchProducts } from "../../state/products/productsActions";
import { Footer } from "../Footer";

export const Home = () => {
  const dispatch = useDispatch();

  const brandInput = useInput();
  const categoryInput = useInput();
  const minPriceInput = useInput();
  const maxPriceInput = useInput();

  useEffect(() => {
    const filters = {
      brandName: brandInput.value,
      categoryName: categoryInput.value,
      min: minPriceInput.value,
      max: maxPriceInput.value,
    };

    dispatch(fetchProducts("", filters));
  }, [
    brandInput.value,
    categoryInput.value,
    minPriceInput.value,
    maxPriceInput.value,
    dispatch,
  ]);

  const handleBrandSelect = (brandName) => {
    if (brandName === "All") {
      brandInput.setValue("");
    } else {
      brandInput.setValue(brandName);
    }
  };

  const handleCategorySelect = (categoryName) => {
    if (categoryName === "All") {
      categoryInput.setValue("");
    } else {
      categoryInput.setValue(categoryName);
    }
  };

  return (
    <Box backgroundColor="gray.100" minHeight="100vh">
      <Image
        src="https://i.imgur.com/z6Jbhdb.jpg"
        alt="banner"
        width="100%"
        height="400"
      />
      <Center mt="20" mb="20">
        <Heading>Special Offers</Heading>
      </Center>
      <Slider />

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
              Iphone
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
            <MenuItem onClick={() => handleCategorySelect("accesorios")}>
              Accessories
            </MenuItem>
          </MenuList>
        </Menu>
        <input type="text" placeholder="Min price" {...minPriceInput} />
        <input type="text" placeholder="Max price" {...maxPriceInput} />
      </Center>

      <ProductGrid />
      <Footer />
    </Box>
  );
};
