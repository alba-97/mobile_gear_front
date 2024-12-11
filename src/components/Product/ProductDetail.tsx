import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart } from "../../state/cart/cartSlice";
import { fetchProduct } from "../../state/products/productsActions";
import {
  Box,
  Heading,
  Text,
  Badge,
  Button,
  IconButton,
  Flex,
  Divider,
  Center,
  HStack,
  useColorModeValue as mode,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import { Image } from "@chakra-ui/react";
import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import { RootState } from "@/state/store";
import {
  setError,
  setLoading,
  setProduct,
} from "@/state/products/productsSlice";
import { AxiosError } from "axios";

export const ProductDetail = () => {
  const { id } = useParams();
  const product = useSelector((state: RootState) => state.products.product);
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const isAuthenticated = useSelector(
    (state: RootState) => state.user.isAuthenticated
  );

  const [count, setCount] = useState(0);
  const [showAlert, setShowAlert] = useState(false);

  const originalPrice =
    product?.price &&
    product?.discount &&
    Math.round(product.price * (product.discount / 100 + 1));

  const dispatch = useDispatch();

  const fetchData = async () => {
    if (!id) return;
    try {
      const product = await fetchProduct(+id);
      dispatch(setProduct(product));
    } catch (error) {
      if (error instanceof AxiosError) dispatch(setError(error.message));
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  if (!product || !product.brand) {
    return <div>Loading...</div>;
  }

  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };

  const handleAddToCart = () => {
    if (!isAuthenticated) alert("Login to add items to your cart");
    if (count <= 0) {
      alert("Please select a quantity");
      return;
    }
    const item = {
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.productImg,
      quantity: count > 0 ? count : 1,
    };

    const existingItem = item.id && cartItems[item.id];

    if (existingItem) {
      alert("Item is already in the cart");
    } else {
      dispatch(addItemToCart(item));
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
    }
  };

  const renderCartButton = () => {
    const existingItem = product.id && cartItems[product.id];

    if (existingItem) {
      return (
        <Button backgroundColor="orange" color="white" as={Link} to="/cart">
          Go to cart
        </Button>
      );
    } else {
      return (
        <Button
          onClick={handleAddToCart}
          backgroundColor="#3498DB"
          color="white"
        >
          Add to cart
        </Button>
      );
    }
  };

  return (
    <Center backgroundColor=" #EDF2F7" minHeight="100vh">
      <Flex
        p={["5", "10", "20"]}
        width={["95%", "85%", "75%", "50%"]}
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        bg="white"
        boxShadow="0 2px 4px rgba(0, 0, 0, 0.2)"
        direction={["column", "column", "row"]}
      >
        <Box flex="1">
          <Image
            src={product.productImg}
            alt={product.name}
            borderRadius="md"
          />
        </Box>
        <Box flex="1" ml={["0", "0", "5"]} mt={["5", "5", "0"]}>
          {showAlert && (
            <Alert status="success">
              <AlertIcon />
              Product successfully added!
            </Alert>
          )}
          <Text
            fontSize={["sm", "md"]}
            color="orange"
            textTransform="uppercase"
          >
            {product.brand.name}
          </Text>
          <Heading color="black" mb="5">
            {product.name}
          </Heading>
          <Text color="gray">{product.description}</Text>
          <Flex align="center" mt="5">
            <Text color="black">${product.price}</Text>
            <Badge colorScheme="orange" ml="2">
              {product.discount}%
            </Badge>
          </Flex>
          <Text color="gray" as="s">
            ${originalPrice}
          </Text>
          <Divider mt="5" mb="5" />
          <Flex align="center" justify="space-between">
            <Flex>
              <IconButton
                onClick={decrement}
                aria-label="Decrease"
                icon={<MinusIcon />}
              />
              <Box
                border="1px solid"
                borderColor="gray.200"
                px="2"
                py="1"
                mx="2"
              >
                {count}
              </Box>
              <IconButton
                onClick={increment}
                aria-label="Increase"
                icon={<AddIcon />}
              />
            </Flex>
            {renderCartButton()}
          </Flex>
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
        </Box>
      </Flex>
    </Center>
  );
};
