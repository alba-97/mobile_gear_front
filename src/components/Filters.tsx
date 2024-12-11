import useInput from "@/hooks/useInput";
import {
  Center,
  Flex,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  StackDirection,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useSearchParams } from "react-router-dom";

interface IFiltersProps {
  handleCategorySelect: (category: string) => void;
  handleBrandSelect: (brand: string) => void;
}

const Filters = ({
  handleCategorySelect,
  handleBrandSelect,
}: IFiltersProps) => {
  const stackDirection: StackDirection | undefined = useBreakpointValue({
    base: "column",
    md: "row",
  });

  const minPriceInput = useInput();
  const maxPriceInput = useInput();

  const [searchParams, setSearchParams] = useSearchParams();

  const styles = {
    boxShadow: "none",
    border: "1px solid #ccc",
    background: "white",
    width: 150,
  };

  return (
    <Center mt="20" gap="10">
      <Stack direction={stackDirection} spacing={4} align="center">
        <Flex gap={4}>
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
              <MenuItem onClick={() => handleCategorySelect("All")}>
                All
              </MenuItem>
              <MenuItem onClick={() => handleCategorySelect("smartphone")}>
                Mobile Phones
              </MenuItem>
              <MenuItem onClick={() => handleCategorySelect("tablets")}>
                Tablets
              </MenuItem>
              <MenuItem onClick={() => handleCategorySelect("accessories")}>
                Accessories
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
        <Flex gap={4}>
          <Input
            type="text"
            placeholder="Min price"
            value={minPriceInput.value}
            onChange={(e) => {
              minPriceInput.setValue(e.target.value);
              searchParams.set("minPrice", e.target.value);
              setSearchParams(searchParams);
            }}
            {...styles}
            _active={styles}
            _focus={styles}
            _hover={styles}
          />
          <Input
            type="text"
            placeholder="Max price"
            onChange={(e) => {
              maxPriceInput.setValue(e.target.value);
              searchParams.set("maxPrice", e.target.value);
              setSearchParams(searchParams);
            }}
            {...styles}
            _active={styles}
            _focus={styles}
            _hover={styles}
          />
        </Flex>
      </Stack>
    </Center>
  );
};

export default Filters;
