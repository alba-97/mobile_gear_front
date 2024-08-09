import { Link } from "react-router-dom";

import { CartItem } from "./CartItem";
import { CartOrderSummary } from "./CartOrderSummary";

import {
  Box,
  Flex,
  Heading,
  HStack,
  Stack,
  Button,
  useColorModeValue as mode,
  Center,
} from "@chakra-ui/react";

import { useSelector } from "react-redux";
import { RootState } from "@/state/store";
import { ICart } from "@/interfaces/Cart";

export const Cart = () => {
  const items = useSelector((state: RootState) => state.cart.items);
  return (
    <Center backgroundColor="#EDF2F7" minHeight="100vh">
      <Box
        backgroundColor="#ffff"
        mt="20"
        p="4"
        mb="20"
        border="1px solid"
        borderColor="gray.200"
        borderRadius="md"
        boxShadow="0 2px 4px rgba(0, 0, 0, 0.2)"
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
              Shopping Cart
            </Heading>

            <Stack spacing="6">
              {Object.values(items).map((_item) => {
                const item = _item as ICart;
                return <CartItem key={item.id} item={item} />;
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
    </Center>
  );
};
