import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Heading, Text, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { checkout } from "../../state/checkout/checkoutActions";
import { clearCart } from "../../state/cart/cartSlice";
import { RootState } from "@/state/store";
import { ICart } from "@/interfaces/Cart";

export const CartOrderSummary = () => {
  const navigate = useNavigate();
  const items = useSelector((state: RootState) => state.cart.items);
  const checkoutLoading = useSelector(
    (state: RootState) => state.checkout.loading
  );
  const checkoutState = useSelector((state: RootState) => state.checkout);
  const deliveryAmount = 1000;

  const subtotal = Object.values(items).reduce((total: number, _item) => {
    const item = _item as ICart;
    return total + item.price * item.quantity;
  }, 0);

  const dispatch = useDispatch();

  const handleCheckout = () => {
    checkout(Object.values(items))(dispatch);
    clearCart();
    navigate("/payments");
  };

  useEffect(() => {
    if (checkoutState.completed && !checkoutState.loading) {
      navigate("/payments");
    } else if (checkoutState.error) {
      alert("error en el checkout");
    }
  }, [checkoutState]);

  return (
    <Box
      p="4"
      border="1px solid"
      borderColor="gray.200"
      borderRadius="md"
      w="100%"
    >
      <Heading as="h2" size="lg" mb="4">
        Order Summary
      </Heading>
      <Box mb="4">
        <Text>Subtotal: ${subtotal.toFixed(2)}</Text>
        <Text>Delivery: ${deliveryAmount.toFixed(2)}</Text>
      </Box>
      <Text fontSize="xl" mb="4">
        Total: ${(subtotal + deliveryAmount).toFixed(2)}
      </Text>
      <Button
        colorScheme="teal"
        width="full"
        onClick={handleCheckout}
        isLoading={checkoutLoading}
        isDisabled={checkoutLoading}
      >
        Checkout
      </Button>
    </Box>
  );
};
