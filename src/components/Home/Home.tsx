import { useEffect } from "react";
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

interface IHomeProps {
  productGridRef: React.RefObject<HTMLDivElement>;
}

export const Home = ({ productGridRef }: IHomeProps) => {
  const brandInput = useInput();
  const categoryInput = useInput();
  const minPriceInput = useInput();
  const maxPriceInput = useInput();

  const dispatch = useDispatch();

  useEffect(() => {
    const filters = {
      brandName: brandInput.value,
      categoryName: categoryInput.value,
      min: minPriceInput.value,
      max: maxPriceInput.value,
    };

    fetchProducts("", filters)(dispatch);
  }, [
    brandInput.value,
    categoryInput.value,
    minPriceInput.value,
    maxPriceInput.value,
  ]);

  const handleBrandSelect = (brandName: string) => {
    if (brandName === "All") {
      brandInput.setValue("");
    } else {
      brandInput.setValue(brandName);
    }
  };

  const handleCategorySelect = (categoryName: string) => {
    if (categoryName === "All") {
      categoryInput.setValue("");
    } else {
      categoryInput.setValue(categoryName);
    }
  };

  return (
    <Box backgroundColor="gray.100" minHeight="100vh">
      <Banner />
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
            <MenuItem onClick={() => handleCategorySelect("accesorios")}>
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
      <div ref={productGridRef}>
        <ProductGrid />
      </div>
      <Footer />
    </Box>
  );
};
