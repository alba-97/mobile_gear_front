import React from "react";
import { Link } from "react-router-dom";

import { CartItem } from "./Cart/CartItem";
import { CartOrderSummary } from "./Cart/CartOrderSummary";

import {
  Box,
  Flex,
  Heading,
  HStack,
  Stack,
  Button,
  useColorModeValue as mode,
} from "@chakra-ui/react";

import { useSelector } from "react-redux";

export const Cart = () => {
  const items = useSelector((state) => state.cart.items);
  return (
    <Box
      maxW={{
        base: "3xl",
        lg: "7xl",
      }}
      mx="auto"
      px={{
        base: "4",
        md: "8",
        lg: "12",
      }}
      py={{
        base: "6",
        md: "8",
        lg: "12",
      }}
    >
      <Stack
        direction={{
          base: "column",
          lg: "row",
        }}
        align={{
          lg: "flex-start",
        }}
        spacing={{
          base: "8",
          md: "16",
        }}
      >
        <Stack
          spacing={{
            base: "8",
            md: "10",
          }}
          flex="2"
        >
          <Heading fontSize="2xl" fontWeight="extrabold">
            Shopping Cart (3 items)
          </Heading>

          <Stack spacing="6">
            {Object.values(items).map((item) => {
              console.log(item);
              return <CartItem key={item.id} {...item} />;
            })}
          </Stack>
        </Stack>

        <Flex direction="column" align="center" flex="1">
          <CartOrderSummary />
          <HStack mt="6" fontWeight="semibold">
            <p>or</p>
            <Button
              type="button"
              color={mode("blue.500", "blue.200")}
              size="xs"
              fontSize="md"
              variant="ghost"
              as={Link}
              to="/"
            >
              Continue shopping
            </Button>
          </HStack>
        </Flex>
      </Stack>
    </Box>
  );
};
