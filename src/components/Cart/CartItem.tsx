import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Flex, Image, Text, IconButton } from "@chakra-ui/react";
import { AddIcon, MinusIcon, DeleteIcon } from "@chakra-ui/icons";
import { updateQuantity, removeItemFromCart } from "../../state/cart/cartSlice";
import { RootState } from "@/state/store";
import { ICart } from "@/interfaces/Cart";

interface ICartItemProps {
  item: ICart;
}

export const CartItem = ({ item }: ICartItemProps) => {
  const { id, name, image, price, quantity } = item;

  const navigate = useNavigate();

  const items = useSelector((state: RootState) => state.cart.items);

  const increment = () => {
    updateQuantity({ id, quantity: quantity + 1 });
  };

  const decrement = () => {
    if (quantity > 1) {
      updateQuantity({ id, quantity: quantity - 1 });
    }
  };

  const handleRemove = () => {
    removeItemFromCart(id);

    if (Object.keys(items).length === 1) {
      navigate("/");
    }
  };

  return (
    <Flex align="center" justify="space-between">
      <Image src={image} alt={name} boxSize="100px" objectFit="cover" />
      <Text flex="1" mx="4">
        {name}
      </Text>
      <Flex align="center">
        <IconButton
          onClick={decrement}
          aria-label="Decrease"
          icon={<MinusIcon />}
        />
        <Text mx="2">{quantity}</Text>
        <IconButton
          onClick={increment}
          aria-label="Increase"
          icon={<AddIcon />}
        />
      </Flex>
      <Text>${price * quantity}</Text>
      <IconButton
        onClick={handleRemove}
        aria-label="Delete"
        icon={<DeleteIcon />}
      />
    </Flex>
  );
};
