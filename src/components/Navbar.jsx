import React, { useState } from "react";
import {
  Button,
  Flex,
  Heading,
  Spacer,
  ButtonGroup,
  Box,
  Menu,
  MenuList,
  MenuItem,
  MenuButton,
  MenuDivider,
  Input,
  IconButton,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { FaShoppingCart } from "react-icons/fa";

import { Link } from "react-router-dom";
import useInput from "../hooks/useInput";
import { useSelector } from "react-redux";

export const Navbar = () => {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const userData = useSelector((state) => state.user.userData);
  const isAdmin = useSelector((state) => state.user.isAdmin); // falta agregar las opciones de admin en el menu de user

  const searchInput = useInput();
  const [showSearchBar, setShowSearchBar] = useState(false);

  const toggleSearchBar = () => {
    setShowSearchBar(!showSearchBar);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // resto del código para manejar el search submit.
  };

  return (
    <>
      <Flex
        width="100%"
        alignItems="center"
        gap="2"
        p="4"
        // backgroundColor="#E91E63"
        backgroundColor="#EC4E20"
      >
        <Box p="2">
          <Heading
            as={Link}
            to="/"
            size="xl"
            color="white"
            // bgGradient="linear(to-r, white, orange)"
            // bgClip="text"
          >
            Mobile Gear
          </Heading>
        </Box>
        <Flex ml="20" gap="8">
          <Menu>
            <MenuButton fontSize="lg" color="white">
              Celulares
            </MenuButton>
            <MenuList>
              <MenuItem as={Link} to="/" _hover={{ color: "#F7DC6F" }}>
                Samsung
              </MenuItem>
              <MenuItem as={Link} to="/">
                Iphone
              </MenuItem>
            </MenuList>
          </Menu>
          <Menu>
            <MenuButton fontSize="lg" color="white">
              Tablets
            </MenuButton>
            <MenuList>
              <MenuItem as={Link} to="/">
                iPad Mini 4
              </MenuItem>
              <MenuItem as={Link} to="/">
                iPad Mini 9.7
              </MenuItem>
            </MenuList>
          </Menu>
          <Menu>
            <MenuButton fontSize="lg" color="white">
              Accesorios
            </MenuButton>
            <MenuList>
              <MenuItem as={Link} to="/">
                Auriculares
              </MenuItem>
              <MenuItem as={Link} to="/">
                Cargadores
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
        <Spacer />
        <Box mr={10}>
          <form onSubmit={handleSearchSubmit}>
            <Flex>
              {showSearchBar && (
                <Input
                  {...searchInput}
                  placeholder="Search"
                  variant="filled"
                  size="md"
                  borderRadius="full"
                  bg="white"
                  boxShadow="md"
                  _hover={{ boxShadow: "lg" }}
                  _focus={{ boxShadow: "lg", color: "white" }}
                />
              )}
              <IconButton
                icon={<SearchIcon />}
                type="submit"
                size="lg"
                ml={2}
                borderRadius="full"
                bg="secondary"
                color="white"
                _hover={{ bg: "#3498DB" }}
                _active={{ bg: "#3498DB" }}
                onClick={toggleSearchBar}
              />
              <IconButton
                icon={<FaShoppingCart />}
                size="lg"
                ml={2}
                borderRadius="full"
                bg="secondary"
                color="white"
                _hover={{ bg: "#3498DB" }}
                _active={{ bg: "#3498DB" }}
              />
            </Flex>
          </form>
        </Box>
        {isAuthenticated ? (
          <Menu>
            <MenuButton fontSize="2xl" color="white">
              {userData.userName}
            </MenuButton>
            <MenuList>
              <MenuItem as={Link} to="/">
                Account
              </MenuItem>
              <MenuItem as={Link} to="">
                My list
              </MenuItem>
              <MenuDivider />

              <MenuItem as={Link} to="/">
                Log out
              </MenuItem>
            </MenuList>
          </Menu>
        ) : (
          <ButtonGroup gap="2">
            <Link to="/signup">
              <Button variant="outline" border="1px solid black">
                Sign Up
              </Button>
            </Link>
            <Link to="/login">
              <Button backgroundColor="#3498DB" color="white">
                Log in
              </Button>
            </Link>
          </ButtonGroup>
        )}
      </Flex>
    </>
  );
};