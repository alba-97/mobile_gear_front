import React, { useState, useEffect } from "react";
import { Box, Center, Heading, Image, Select } from "@chakra-ui/react";
import { ProductGrid } from "./ProductGrid";
import { Slider } from "./Home/Slider";
import useInput from "../hooks/useInput";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../state/products/productsActions";

export const Home = () => {
  const dispatch = useDispatch();

  const brandInput = useInput();
  const categoryInput = useInput();
  const minPriceInput = useInput();
  const maxPriceInput = useInput();

  useEffect(() => {
    const filters = {
      brandName: brandInput.value,
      categoryName: categoryInput.value,
      min: minPriceInput.value,
      max: maxPriceInput.value,
    };

    dispatch(fetchProducts("", filters));
  }, [
    brandInput.value,
    categoryInput.value,
    minPriceInput.value,
    maxPriceInput.value,
    dispatch,
  ]);

  return (
    <Box backgroundColor="gray.100" minHeight="400px">
      <Image
        src="https://cdn.discordapp.com/attachments/1109602975460110380/1109611584818528256/43f5ae4e-9248-4b05-b56f-dd68497aac25.jpg"
        alt="banner"
        width="100%"
        height="400"
      />
      <Center mt="20" mb="20">
        <Heading>Special Offers</Heading>
      </Center>
      <Slider />

      <Center mt="20">
        <input type="text" placeholder="Brand" {...brandInput} />
        <input type="text" placeholder="Category" {...categoryInput} />
        <input type="text" placeholder="Min price" {...minPriceInput} />
        <input type="text" placeholder="Max price" {...maxPriceInput} />
      </Center>

      <ProductGrid />
    </Box>
  );
};
