import React from "react";
import {
  Button,
  Flex,
  Heading,
  ButtonGroup,
  Box,
  Menu,
  MenuList,
  MenuItem,
  MenuButton,
  MenuDivider,
  IconButton,
  useDisclosure,
  useBreakpointValue,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerCloseButton,
  DrawerBody,
} from "@chakra-ui/react";
import { FaBars } from "react-icons/fa";

import { Link, useLocation } from "react-router-dom";
import useInput from "../hooks/useInput";
import { useDispatch, useSelector } from "react-redux";

import { fetchProducts } from "../state/products/productsActions";
import { useNavigate } from "react-router-dom";

import { RootState } from "@/state/store";
import { logout } from "@/state/user/userSlice";
import { setProducts } from "@/state/products/productsSlice";
import DropdownSearch from "./DropdownSearch";
import Search from "./Search";

interface INavbarProps {
  productGridRef: React.RefObject<HTMLDivElement>;
}

export const Navbar = ({ productGridRef }: INavbarProps) => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.user.isAuthenticated
  );
  const userData = useSelector((state: RootState) => state.user.userData);
  const isAdmin = useSelector((state: RootState) => state.user.isAdmin);
  const categoryInput = useInput();

  const filters = {
    categoryName: categoryInput.value,
  };

  const navigate = useNavigate();

  const searchInput = useInput();

  const dispatch = useDispatch();

  const handleSearchSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const products = await fetchProducts({ modelName: searchInput.value });
    dispatch(setProducts(products));
    searchInput.reset();
    productGridRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  };

  const handleCategorySelect = async (categoryName: string) => {
    categoryInput.setValue(categoryName);
    filters.categoryName = categoryName;
    const products = await fetchProducts(filters);
    dispatch(setProducts(products));
    productGridRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  };

  const handleLogout = () => {
    localStorage.clear();
    dispatch(logout());
    navigate("/");
  };

  const { isOpen, onOpen, onClose } = useDisclosure();
  const isDesktop = useBreakpointValue({ base: false, md: true });

  const isHome = useLocation().pathname === "/";

  return (
    <Flex
      align="center"
      p={4}
      bg="gray.800"
      color="white"
      backgroundColor={"#EC4E20"}
      justifyContent="space-between"
    >
      <Heading as={Link} to="/" size="md" mr={4} _hover={{ color: "white" }}>
        MOBILE GEAR
      </Heading>

      {isDesktop ? (
        <Flex>
          {isHome && (
            <>
              <Menu>
                <MenuButton
                  fontSize="lg"
                  color="white"
                  _hover={{
                    bg: "#a62b07",
                  }}
                  borderRadius={"md"}
                  padding={3}
                  onClick={() => {
                    handleCategorySelect("smartphone");
                  }}
                >
                  Mobile Phones
                </MenuButton>
              </Menu>
              <Menu>
                <MenuButton
                  fontSize="lg"
                  color="white"
                  _hover={{
                    bg: "#a62b07",
                  }}
                  borderRadius={"md"}
                  padding={3}
                  onClick={() => {
                    handleCategorySelect("tablets");
                  }}
                >
                  Tablets
                </MenuButton>
              </Menu>
              <Menu>
                <MenuButton
                  fontSize="lg"
                  color="white"
                  _hover={{
                    bg: "#a62b07",
                  }}
                  borderRadius={"md"}
                  padding={3}
                  onClick={() => {
                    handleCategorySelect("accessories");
                  }}
                >
                  Accessories
                </MenuButton>
              </Menu>
            </>
          )}
        </Flex>
      ) : (
        <Flex>
          {isHome && (
            <DropdownSearch
              {...searchInput}
              handleSubmit={handleSearchSubmit}
            />
          )}
          <IconButton
            icon={<FaBars />}
            size="lg"
            ml={2}
            borderRadius="md"
            color="white"
            bg="transparent"
            _hover={{ bg: "#a62b07" }}
            onClick={onOpen}
            aria-label="Menu"
          />
        </Flex>
      )}

      {isDesktop && isHome && (
        <Search {...searchInput} handleSubmit={handleSearchSubmit} />
      )}

      {isDesktop &&
        (isAuthenticated ? (
          <Menu>
            <MenuButton
              as={Button}
              backgroundColor={"#3498DB"}
              color="white"
              _hover={{ bg: "#026bb0" }}
              _active={{ bg: "#026bb0" }}
            >
              Account
            </MenuButton>
            <MenuList>
              <MenuItem color="black" pointerEvents="none">
                {userData.username}
              </MenuItem>
              <MenuDivider />
              <MenuItem as={Link} to="/history" color="black">
                History
              </MenuItem>
              {isAdmin ? (
                <MenuItem as={Link} to="/admin" color="black">
                  My dashboard
                </MenuItem>
              ) : (
                <MenuItem as={Link} to="" color="black">
                  My list
                </MenuItem>
              )}
              <MenuDivider />
              <MenuItem as={Link} to="/" onClick={handleLogout} color="black">
                Log out
              </MenuItem>
            </MenuList>
          </Menu>
        ) : (
          <ButtonGroup gap="2">
            <Link to="/signup">
              <Button
                backgroundColor="transparent"
                color="white"
                _hover={{ bg: "#a62b07" }}
              >
                Sign Up
              </Button>
            </Link>
            <Link to="/login">
              <Button
                backgroundColor="#3498DB"
                color="white"
                _hover={{ bg: "#026bb0" }}
              >
                Log In
              </Button>
            </Link>
          </ButtonGroup>
        ))}

      {!isDesktop && (
        <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Menu</DrawerHeader>
            <DrawerBody>
              <Menu>
                <MenuButton
                  fontSize="lg"
                  color="black"
                  padding={3}
                  onClick={() => {
                    handleCategorySelect("smartphone");
                  }}
                >
                  Mobile Phones
                </MenuButton>
              </Menu>
              <Menu>
                <MenuButton
                  fontSize="lg"
                  color="black"
                  padding={3}
                  onClick={() => {
                    handleCategorySelect("tablets");
                  }}
                >
                  Tablets
                </MenuButton>
              </Menu>
              <Menu>
                <MenuButton
                  fontSize="lg"
                  color="black"
                  padding={3}
                  onClick={() => {
                    handleCategorySelect("accessories");
                  }}
                >
                  Accessories
                </MenuButton>
              </Menu>
              <Box mt={4}>
                {isAuthenticated ? (
                  <Menu>
                    <MenuItem as={Link} to="/history">
                      History
                    </MenuItem>
                    {isAdmin ? (
                      <MenuItem as={Link} to="/admin">
                        My dashboard
                      </MenuItem>
                    ) : (
                      <MenuItem as={Link} to="">
                        My list
                      </MenuItem>
                    )}
                    <MenuDivider />
                    <MenuItem as={Link} to="/" onClick={handleLogout}>
                      Log out
                    </MenuItem>
                  </Menu>
                ) : (
                  <ButtonGroup gap="2">
                    <Link to="/signup">
                      <Button
                        backgroundColor={"#3498DB"}
                        color="white"
                        width="100%"
                      >
                        Sign Up
                      </Button>
                    </Link>
                    <Link to="/login">
                      <Button
                        backgroundColor={"#3498DB"}
                        color="white"
                        width="100%"
                      >
                        Log In
                      </Button>
                    </Link>
                  </ButtonGroup>
                )}
              </Box>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      )}
    </Flex>
  );
};
