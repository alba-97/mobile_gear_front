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

import { Link as RouterLink, useSearchParams } from "react-router-dom";
import useInput from "../hooks/useInput";
import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";

import { RootState } from "@/state/store";
import { logout } from "@/state/user/userSlice";
import DropdownSearch from "./DropdownSearch";
import Search from "./Search";
import NavbarCategory from "./NavbarCategory";
import CartButton from "./CartButton";
import DrawerCategory from "./DrawerCategory";

export const Navbar = () => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.user.isAuthenticated
  );
  const userData = useSelector((state: RootState) => state.user.userData);
  const isAdmin = useSelector((state: RootState) => state.user.isAdmin);

  const navigate = useNavigate();
  const searchInput = useInput();
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSearchSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSearchParams({ modelName: searchInput.value });
    searchInput.reset();
  };

  const handleCategorySelect = async (categoryName: string) => {
    searchParams.set("categoryName", categoryName);
    navigate({ pathname: "/", search: searchParams.toString() });
  };

  const handleLogout = () => {
    localStorage.clear();
    dispatch(logout());
    navigate("/");
  };

  const { isOpen, onOpen, onClose } = useDisclosure();
  const isDesktop = useBreakpointValue({ base: false, md: true });

  return (
    <Flex
      align="center"
      p={4}
      bg="gray.800"
      color="white"
      backgroundColor="#EC4E20"
      justifyContent="space-between"
    >
      <Heading
        as={RouterLink}
        to="/"
        size="md"
        mr={4}
        _hover={{ color: "white" }}
      >
        MOBILE GEAR
      </Heading>

      {isDesktop && (
        <>
          <Flex>
            <NavbarCategory
              text="Mobile Phones"
              onClick={() => handleCategorySelect("smartphone")}
            />
            <NavbarCategory
              text="Tablets"
              onClick={() => handleCategorySelect("tablets")}
            />
            <NavbarCategory
              text="Accessories"
              onClick={() => handleCategorySelect("accessories")}
            />
          </Flex>
          <Search {...searchInput} handleSubmit={handleSearchSubmit} />
          {isAuthenticated ? (
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
                <MenuItem as={RouterLink} to="/history" color="black">
                  History
                </MenuItem>
                {isAdmin ? (
                  <MenuItem as={RouterLink} to="/admin" color="black">
                    My dashboard
                  </MenuItem>
                ) : (
                  <MenuItem as={RouterLink} to="" color="black">
                    My list
                  </MenuItem>
                )}
                <MenuDivider />
                <MenuItem
                  as={RouterLink}
                  to="/"
                  onClick={handleLogout}
                  color="black"
                >
                  Log out
                </MenuItem>
              </MenuList>
            </Menu>
          ) : (
            <ButtonGroup gap="2">
              <RouterLink to="/signup">
                <Button
                  backgroundColor="transparent"
                  color="white"
                  _hover={{ bg: "#a62b07" }}
                >
                  Sign Up
                </Button>
              </RouterLink>
              <RouterLink to="/login">
                <Button
                  backgroundColor="#3498DB"
                  color="white"
                  _hover={{ bg: "#026bb0" }}
                >
                  Log In
                </Button>
              </RouterLink>
            </ButtonGroup>
          )}
        </>
      )}

      {!isDesktop && (
        <Flex align="center">
          <DropdownSearch {...searchInput} handleSubmit={handleSearchSubmit} />

          {isAuthenticated && <CartButton />}

          <IconButton
            icon={<FaBars />}
            size="lg"
            borderRadius="md"
            color="white"
            bg="transparent"
            _hover={{ bg: "#a62b07" }}
            onClick={onOpen}
            aria-label="Menu"
          />

          <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
            <DrawerOverlay />
            <DrawerContent>
              <DrawerCloseButton />
              <DrawerHeader>Menu</DrawerHeader>
              <DrawerBody>
                <DrawerCategory
                  text="Mobile Phones"
                  onClick={() => handleCategorySelect("smartphone")}
                />
                <DrawerCategory
                  text="Tablets"
                  onClick={() => handleCategorySelect("tablets")}
                />
                <DrawerCategory
                  text="Accessories"
                  onClick={() => handleCategorySelect("accessories")}
                />
                <DrawerCategory
                  text="Laptops"
                  onClick={() => handleCategorySelect("laptops")}
                />
                <Box mt={4}>
                  {isAuthenticated ? (
                    <Menu>
                      <MenuItem as={RouterLink} to="/history">
                        History
                      </MenuItem>
                      {isAdmin ? (
                        <MenuItem as={RouterLink} to="/admin">
                          My dashboard
                        </MenuItem>
                      ) : (
                        <MenuItem as={RouterLink} to="">
                          My list
                        </MenuItem>
                      )}
                      <MenuDivider />
                      <MenuItem as={RouterLink} to="/" onClick={handleLogout}>
                        Log out
                      </MenuItem>
                    </Menu>
                  ) : (
                    <ButtonGroup gap="2">
                      <RouterLink to="/signup">
                        <Button
                          backgroundColor={"#3498DB"}
                          color="white"
                          width="100%"
                        >
                          Sign Up
                        </Button>
                      </RouterLink>
                      <RouterLink to="/login">
                        <Button
                          backgroundColor={"#3498DB"}
                          color="white"
                          width="100%"
                        >
                          Log In
                        </Button>
                      </RouterLink>
                    </ButtonGroup>
                  )}
                </Box>
              </DrawerBody>
            </DrawerContent>
          </Drawer>
        </Flex>
      )}
    </Flex>
  );
};
