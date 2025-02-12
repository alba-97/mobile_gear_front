import { ICart } from "@/interfaces/Cart";
import {
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuGroup,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { FiShoppingCart } from "react-icons/fi";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";

const CartButton = () => {
  const cart = useSelector((state: RootState) => state.cart);

  return (
    <Menu>
      <MenuButton
        as={Button}
        leftIcon={<FiShoppingCart />}
        color="white"
        size="lg"
        bg="transparent"
        _hover={{ bg: "transparent" }}
        _active={{ bg: "transparent" }}
      />
      <MenuList>
        {cart.items.length === 0 ? (
          <MenuItem
            bg="transparent"
            cursor="default"
            _hover={{ cursor: "default", bg: "transparent" }}
            _active={{ bg: "transparent", cursor: "default" }}
            color="gray.600"
          >
            Your cart is empty
          </MenuItem>
        ) : (
          <>
            <MenuGroup title="Cart Items" color="black">
              {cart.items.map((item: ICart) => (
                <MenuItem key={item.id}>
                  <Flex
                    flexDirection={"column"}
                    justifyContent="space-between"
                    color="black"
                    width="100%"
                  >
                    <Text>{item.name}</Text>
                    <Text>Qty: {item.quantity}</Text>
                    <Text>${item.price}</Text>
                  </Flex>
                </MenuItem>
              ))}
            </MenuGroup>
            <MenuItem
              as={Link}
              to="/checkout"
              backgroundColor="blue.500"
              color="white"
              _hover={{ backgroundColor: "blue.600" }}
            >
              Checkout (${cart.totalPrice.toFixed(2)})
            </MenuItem>
          </>
        )}
      </MenuList>
    </Menu>
  );
};

export default CartButton;
