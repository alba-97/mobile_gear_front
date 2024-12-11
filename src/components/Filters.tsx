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

interface IFiltersProps {
  handleCategorySelect: (category: string) => void;
  handleBrandSelect: (brand: string) => void;
  minPriceInput: { value: string; setValue: (value: string) => void };
  maxPriceInput: { value: string; setValue: (value: string) => void };
}

const Filters = ({
  handleCategorySelect,
  handleBrandSelect,
  minPriceInput,
  maxPriceInput,
}: IFiltersProps) => {
  const stackDirection: StackDirection | undefined = useBreakpointValue({
    base: "column",
    md: "row",
  });

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
              <MenuItem onClick={() => handleCategorySelect("accesories")}>
                Accessories
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
        <Flex gap={4}>
          <Input
            type="text"
            placeholder="Min price"
            {...minPriceInput}
            {...styles}
            _active={styles}
            _focus={styles}
            _hover={styles}
          />
          <Input
            type="text"
            placeholder="Max price"
            {...maxPriceInput}
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
